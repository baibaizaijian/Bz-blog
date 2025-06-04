import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Bz Blog",
  description: "A Personal Blog",
  base: "/Bz-blog/",
  srcDir: 'docs',
  lastUpdated: true,
  themeConfig: {
    // 导航栏
    nav: [
      { text: '首页', link: '/' },
      { text: '文章', link: '/posts/' },
      { text: '关于', link: '/about' }
    ],

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-github-account' }
    ],

    // 侧边栏
    sidebar: {
      '/posts/': [
        {
          text: '所有文章',
          items: []
        }
      ]
    },

    // 页脚
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2024-present'
    },
    lastUpdated:{
      text: '更新时间',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short',
      },
    }
  }
}) 