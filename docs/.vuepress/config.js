import { blogPlugin } from "@vuepress/plugin-blog";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";
// 在 imports 部分添加
import { searchPlugin } from "@vuepress/plugin-search";

export default defineUserConfig({
  lang: "zh-CN",
  // 使用环境变量配置路径
  // base: process.env.BASE_PATH || "./",
  title: "BZZ的记录博客",
  description: "这是我的第一个博客站点",

  theme: defaultTheme({
    logo: "https://vuejs.press/images/hero.png",
    navbar: [
      "/",
      {
        text: "js",
        // 修正文件名大小写（确保实际文件名为 main.md）
        link: "/main.md" 
      },
    ],
  }),

  plugins: [
    blogPlugin({
      // 文章过滤器：仅处理 posts/ 目录下的文件
      filter: ({ filePathRelative }) =>
        filePathRelative ? filePathRelative.startsWith("posts/") : false,

      // 文章元数据提取器
      getInfo: ({ frontmatter, title, data }) => ({
        title, // 文章标题
        author: frontmatter.author || "", // 作者（从 frontmatter 获取）
        date: frontmatter.date || null, // 发布日期
        category: frontmatter.category || [], // 分类标签
        tag: frontmatter.tag || [], // 文章标签
        excerpt:
          // 摘要生成策略：优先使用手动设置的摘要，否则自动生成
          typeof frontmatter.excerpt === "string"
            ? frontmatter.excerpt
            : data?.excerpt || "",
      }),

      // 摘要生成过滤器：排除首页且未禁用自动摘要的文章
      excerptFilter: ({ frontmatter }) =>
        !frontmatter.home &&
        frontmatter.excerpt !== false &&
        typeof frontmatter.excerpt !== "string",

      // 分类系统配置
      category: [
        // 主分类配置
        {
          key: "category",
          getter: (page) => page.frontmatter.category || [], // 分类数据来源
          layout: "Category", // 分类列表布局组件
          itemLayout: "Category", // 单个分类布局组件
          frontmatter: () => ({
            // 分类页面的元数据
            title: "Categories",
            sidebar: false,
          }),
          // 单个分类页面的元数据
          itemFrontmatter: (name) => ({
            title: `Category ${name}`,
            sidebar: false,
          }),
        },
        {
          key: "tag",
          getter: (page) => page.frontmatter.tag || [],
          layout: "Tag",
          itemLayout: "Tag",
          frontmatter: () => ({
            title: "Tags",
            sidebar: false,
          }),
          itemFrontmatter: (name) => ({
            title: `Tag ${name}`,
            sidebar: false,
          }),
        },
      ],

      type: [
        {
          key: "article",
          // Remove archive articles
          filter: (page) => !page.frontmatter.archive,
          layout: "Article",
          frontmatter: () => ({
            title: "Articles",
            sidebar: false,
          }),
          // Sort pages with time and sticky
          sorter: (pageA, pageB) => {
            if (pageA.frontmatter.sticky && pageB.frontmatter.sticky)
              return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

            if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky)
              return -1;

            if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

            if (!pageB.frontmatter.date) return 1;
            if (!pageA.frontmatter.date) return -1;

            return (
              new Date(pageB.frontmatter.date).getTime() -
              new Date(pageA.frontmatter.date).getTime()
            );
          },
        },
        {
          key: "timeline",
          // Only article with date should be added to timeline
          filter: (page) => page.frontmatter.date instanceof Date,
          // Sort pages with time
          sorter: (pageA, pageB) =>
            new Date(pageB.frontmatter.date).getTime() -
            new Date(pageA.frontmatter.date).getTime(),
          layout: "Timeline",
          frontmatter: () => ({
            title: "Timeline",
            sidebar: false,
          }),
        },
      ],
      hotReload: true,
    }),
    searchPlugin({
      // 搜索热键
      hotKeys: ["s", "/"],
      // 最大建议数
      maxSuggestions: 7,
      // 搜索框占位符
      placeholder: "搜索文档",
      // 排除首页
      isSearchable: (page) => page.path !== "/",
    }),
  ],

  bundler: viteBundler(),
});
