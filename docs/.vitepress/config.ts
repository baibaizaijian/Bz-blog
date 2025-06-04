import { defineConfig } from "vitepress";
import { normalizeClass } from "vue";

export default defineConfig({
  title: "Bz Blog",
  description: "A Personal Blog",
  base: "/Bz-blog/",
  lastUpdated: true,
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: "提示",
      warningLabel: "警告",
      dangerLabel: "危险",
      infoLabel: "信息",
      detailsLabel: "详情",
    },
  },
  themeConfig: {
    // 导航栏
    nav: [
      { text: "首页", link: "/" },
      { text: "文章", link: "/posts/" },
      { text: "关于", link: "/about" },
    ],

    // 社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/your-github-account" },
    ],

    // 侧边栏
    sidebar: {
      "/posts/": [
        {
          text: "所有文章",
          items: [],
        },
      ],
    },

    // 页脚
    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024-present",
    },
    lastUpdated: {
      text: "更新时间",
      formatOptions: {
        dateStyle: "medium",
        timeStyle: "short",
      },
    },
    sidebarMenuLabel: "菜单",
    returnToTopLabel: "返回顶部",
    darkModeSwitchLabel: "外观",
    lightModeSwitchTitle: "浅色模式",
    darkModeSwitchTitle: "深色模式",
    outline: {
      label: "目录",
      level: "deep",
    },
    search: {
      provider: "local",
      options: {
        translations:{
          "button": {
            "buttonText": "搜索",
            "buttonAriaLabel": "搜索"
          },
          modal:{
            noResultsText: "没有找到结果",
            resetButtonTitle: "重置搜索",
            footer: {
              selectText: "选择",
              navigateText: "切换",
              closeText: "关闭",
            }
          }
        },
        
      },
    },
  },
});
