import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

// 取得所有文章的 metadata（給列表頁用）
export function getAllArticles() {
  const filenames = fs.readdirSync(articlesDirectory);

  const articles = filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);

      return {
        slug: data.slug,
        title: data.title,
        description: data.description,
        publishedAt: data.publishedAt,
        category: data.category,
      };
    });

  // 依發布日期新到舊排序
  return articles.sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
}

// 取得單篇文章完整內容（給文章詳情頁用）
export function getArticleBySlug(slug) {
  const filenames = fs.readdirSync(articlesDirectory);
  const targetFile = filenames.find((filename) => {
    const filePath = path.join(articlesDirectory, filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);
    return data.slug === slug;
  });

  if (!targetFile) return null;

  const filePath = path.join(articlesDirectory, targetFile);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    content,
  };
}

// 取得所有文章的 slug（給 getStaticPaths 用）
export function getAllArticleSlugs() {
  const filenames = fs.readdirSync(articlesDirectory);

  return filenames
    .filter((name) => name.endsWith(".md"))
    .map((filename) => {
      const filePath = path.join(articlesDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      return data.slug;
    });
}
