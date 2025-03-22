import { GitContributors } from "C:/Users/86159/Desktop/Bz-blog/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_eb15484f6c545b11fc2c506e5ea1427e/node_modules/@vuepress/plugin-git/lib/client/components/GitContributors.js";
import { GitChangelog } from "C:/Users/86159/Desktop/Bz-blog/node_modules/.pnpm/@vuepress+plugin-git@2.0.0-_eb15484f6c545b11fc2c506e5ea1427e/node_modules/@vuepress/plugin-git/lib/client/components/GitChangelog.js";

export default {
  enhance: ({ app }) => {
    app.component("GitContributors", GitContributors);
    app.component("GitChangelog", GitChangelog);
  },
};
