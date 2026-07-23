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

  // 第二階段：發布
  const publishUrl = `${THREADS_API_BASE}/${userId}/threads_publish?${new URLSearchParams(
    {
      creation_id: createData.id,
      access_token: accessToken,
    }
  )}`;

  const publishResponse = await fetch(publishUrl, { method: "POST" });
  const publishData = await publishResponse.json();

  if (!publishResponse.ok || !publishData.id) {
    throw formatApiError("發布貼文", publishData);
  }

  return publishData.id;
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
