---
hello: world
---

<script setup>
import { ref } from 'vue'
import GiscusComments from '../.vitepress/theme/components/GiscusComments.vue'
const count = ref(0)
const increment = () => count.value++
</script>

## Markdown Content

The count is: {{ count }}

<el-button type="primary" @click="increment">增加</el-button>
<style module>

</style>

<GiscusComments />
