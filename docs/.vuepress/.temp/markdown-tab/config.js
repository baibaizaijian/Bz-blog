import { CodeTabs } from "C:/Users/86159/Desktop/Bz-blog/node_modules/.pnpm/@vuepress+plugin-markdown-t_807eca25ce0cc6835757a1669a077451/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/CodeTabs.js";
import { Tabs } from "C:/Users/86159/Desktop/Bz-blog/node_modules/.pnpm/@vuepress+plugin-markdown-t_807eca25ce0cc6835757a1669a077451/node_modules/@vuepress/plugin-markdown-tab/lib/client/components/Tabs.js";
import "C:/Users/86159/Desktop/Bz-blog/node_modules/.pnpm/@vuepress+plugin-markdown-t_807eca25ce0cc6835757a1669a077451/node_modules/@vuepress/plugin-markdown-tab/lib/client/styles/vars.css";

export default {
  enhance: ({ app }) => {
    app.component("CodeTabs", CodeTabs);
    app.component("Tabs", Tabs);
  },
};
