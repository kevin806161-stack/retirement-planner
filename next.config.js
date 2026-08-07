/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // 把 Vercel 預設網域永久轉址到正式網域，避免重複內容分散 SEO 權重
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "retirement-planner-mocha.vercel.app",
          },
        ],
        destination: "https://www.retirementplantw.com/:path*",
        permanent: true,
      },
      // no-www 版本轉址到 www 版本，作為 Vercel 平台層網域轉址之外的第二道保險
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "retirementplantw.com",
          },
        ],
        destination: "https://www.retirementplantw.com/:path*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
