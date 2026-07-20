/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ];
  },
};

module.exports = nextConfig;
