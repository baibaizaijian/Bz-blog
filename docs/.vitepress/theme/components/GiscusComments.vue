<template>
  <div ref="giscusContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const giscusContainer = ref(null);

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://giscus.app/client.js';
  script.setAttribute('data-repo', 'baibaizaijian/Bz-blog');
  script.setAttribute('data-repo-id', 'R_kgDOOM0WfQ');
  script.setAttribute('data-category', 'General');
  script.setAttribute('data-category-id', 'DIC_kwDOOM0Wfc4CrcKh');
  script.setAttribute('data-mapping', 'pathname');
  script.setAttribute('data-strict', '0');
  script.setAttribute('data-reactions-enabled', '1');
  script.setAttribute('data-emit-metadata', '0');
  script.setAttribute('data-input-position', 'bottom');
  script.setAttribute('data-theme', 'preferred_color_scheme');
  script.setAttribute('data-lang', 'zh-CN');
  script.setAttribute('crossorigin', 'anonymous');
  script.async = true;

  if (giscusContainer.value) {
    giscusContainer.value.appendChild(script);
  }
});
</script> 