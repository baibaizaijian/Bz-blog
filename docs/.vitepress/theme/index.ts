import DefaultTheme from 'vitepress/theme'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Layout from './Layout.vue'

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.use(ElementPlus)
  }
} 