// lib/threads.js
// 封裝 Threads API 呼叫邏輯：兩階段發文流程（建立 media container -> 發布）、
// 取得 Threads user id、刷新 long-lived access token。
const THREADS_API_BASE = "https://graph.threads.net/v1.0";

function getAccessToken() {
  const token = process.env.THREADS_ACCESS_TOKEN;
  if (!token) {
    throw new Error("未設定 THREADS_ACCESS_TOKEN");
  }
  return token;
}

function formatApiError(step, data) {
  const message =
    data && data.error && data.error.message
      ? data.error.message
      : JSON.stringify(data);
  return new Error(`Threads API 錯誤（${step}）：${message}`);
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 建立 media container 後，Threads 需要一小段時間處理才能發布，
// 若太早呼叫 threads_publish 會收到「The requested resource does not exist」，
// 所以先輪詢 container 狀態直到 FINISHED 再發布。
async function waitForContainerReady(containerId, accessToken) {
  const maxAttempts = 8;
  const intervalMs = 1500;

  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const url = `${THREADS_API_BASE}/${containerId}?${new URLSearchParams({
      fields: "status,error_message",
      access_token: accessToken,
    })}`;

    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      throw formatApiError("查詢貼文容器狀態", data);
    }

    if (data.status === "FINISHED") {
      return;
    }

    if (data.status === "ERROR" || data.status === "EXPIRED") {
      throw formatApiError("貼文容器處理失敗", data);
    }

    await sleep(intervalMs);
  }

  throw new Error("Threads API 錯誤（貼文容器逾時）：等待處理超過預期時間");
}

async function getThreadsUserId(accessToken) {
  if (process.env.THREADS_USER_ID) {
    return process.env.THREADS_USER_ID;
  }

  const url = `${THREADS_API_BASE}/me?${new URLSearchParams({
    fields: "id",
    access_token: accessToken,
  })}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.id) {
    throw formatApiError("取得 User ID", data);
  }

  return data.id;
}

// 發布一則 Threads 純文字貼文，成功回傳貼文 ID
export async function publishThreadsPost(text) {
  const accessToken = getAccessToken();
  const userId = await getThreadsUserId(accessToken);

  // 第一階段：建立 media container
  const createUrl = `${THREADS_API_BASE}/${userId}/threads?${new URLSearchParams(
    {
      media_type: "TEXT",
      text,
      access_token: accessToken,
    }
  )}`;

  const createResponse = await fetch(createUrl, { method: "POST" });
  const createData = await createResponse.json();

  if (!createResponse.ok || !createData.id) {
    throw formatApiError("建立貼文容器", createData);
  }

  await waitForContainerReady(createData.id, accessToken);

  // 第二階段：發布
  // 實測發現即使 container 狀態已是 FINISHED，緊接著呼叫 threads_publish
  // 仍可能間歇性收到「The requested resource does not exist」（疑似 Meta
  // 後端的短暫資料傳播延遲），所以加上重試機制而非直接失敗。
  const publishUrl = `${THREADS_API_BASE}/${userId}/threads_publish?${new URLSearchParams(
    {
      creation_id: createData.id,
      access_token: accessToken,
    }
  )}`;

  const maxPublishAttempts = 3;
  const retryDelaysMs = [2000, 4000];
  let lastError;

  for (let attempt = 0; attempt < maxPublishAttempts; attempt += 1) {
    const publishResponse = await fetch(publishUrl, { method: "POST" });
    const publishData = await publishResponse.json();

    if (publishResponse.ok && publishData.id) {
      return publishData.id;
    }

    lastError = formatApiError("發布貼文", publishData);

    if (attempt < maxPublishAttempts - 1) {
      await sleep(retryDelaysMs[attempt]);
    }
  }

  throw lastError;
}

// 刷新 long-lived access token（有效期 60 天），回傳 { access_token, token_type, expires_in }
export async function refreshThreadsToken() {
  const accessToken = getAccessToken();

  const url = `${THREADS_API_BASE}/refresh_access_token?${new URLSearchParams({
    grant_type: "th_refresh_token",
    access_token: accessToken,
  })}`;

  const response = await fetch(url);
  const data = await response.json();

  if (!response.ok || !data.access_token) {
    throw formatApiError("刷新 Token", data);
  }

  return data;
}
