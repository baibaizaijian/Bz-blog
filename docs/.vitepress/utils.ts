import { DefaultTheme } from 'vitepress'

export const nav: DefaultTheme.NavItem[] = [
  {
    text: '指南',
    link: '/guide/',
    activeMatch: '/guide/',
  },
  {
    text: '文章',
    link: '/posts/',
    activeMatch: '/posts/',
  },
  {
    text: '关于',
    link: '/about',
    activeMatch: '/about/',
  },
  {
    text: '今天吃什么',
    link: '/woele',
    activeMatch: '/woele/',
  },
]

export const sidebar: DefaultTheme.Sidebar = {
  '/guide/': [
    {
      text: '指南',
      collapsed: false,
      items: [
        { text: '介绍', link: '/guide/index' },
        { text: '快速开始', link: '/guide/getting-started' },
      ],
    },
  ],
  '/posts/': [
    {
      text: '日常记录',
      collapsed: false,
      items: [
        { text: 'JS 面试题', link: '/posts/js' },
        { text: 'SVG', link: '/posts/svg' },
        { text: '2048', link: '/posts/2048/index' },
      ],
    },
  ],
}
