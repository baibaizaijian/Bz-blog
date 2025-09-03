<template>
  <div class="app" @mousemove="updateMouse" :class="{ dark: isDark }">
    <button class="toggle-btn" @click="toggleTheme">
      切换 {{ isDark ? '浅色' : '深色' }} 模式
    </button>

    <svg class="background-grid" width="100%" height="100%">
      <circle
        v-for="(dot, index) in dots"
        :key="index"
        :cx="dot.x"
        :cy="dot.y"
        :r="dotSize(dot)"
        :fill="dotColor(dot)"
        class="dot"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const isDark = ref(false);
const mouseX = ref(0);
const mouseY = ref(0);
const containerWidth = ref(500);
const containerHeight = ref(300);
const isTransitioning = ref(false);

// 生成点阵
const dots = ref([]);

onMounted(() => {
  dots.value = Array.from({ length: 200 }, () => ({
    x: Math.random() * containerWidth.value,
    y: Math.random() * containerHeight.value,
    velocity: Math.random() * 2 + 1, // 添加速度属性
  }));
});

const updateMouse = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  mouseX.value = e.clientX - rect.left;
  mouseY.value = e.clientY - rect.top;
};

// 根据鼠标距离动态改变颜色和大小
const dotColor = (dot) => {
  const dx = dot.x - mouseX.value;
  const dy = dot.y - mouseY.value;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const base = isDark.value ? 255 : 0;
  const alpha = Math.max(0.1, 1 - dist / 150);
  return `rgba(${base}, ${base}, ${base}, ${alpha})`;
};

const dotSize = (dot) => {
  const dx = dot.x - mouseX.value;
  const dy = dot.y - mouseY.value;
  const dist = Math.sqrt(dx * dx + dy * dy);
  return Math.max(1.5, 4 - dist / 50); // 根据距离动态改变点的大小
};

const toggleTheme = () => {
  isTransitioning.value = true;
  isDark.value = !isDark.value;
  setTimeout(() => {
    isTransitioning.value = false;
  }, 300);
};
</script>

<style scoped>
.app {
  width: 500px;
  height: 300px;
  margin: 20px auto;
  overflow: hidden;
  position: relative;
  background-color: #fff;
  transition: all 0.3s ease;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.app.dark {
  background-color: #111;
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.05);
}

.toggle-btn {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.dark .toggle-btn {
  background-color: #333;
  color: #fff;
  border-color: #444;
}

.dark .toggle-btn:hover {
  box-shadow: 0 2px 8px rgba(255, 255, 255, 0.1);
}

.background-grid {
  position: absolute;
  top: 0;
  left: 0;
}

.dot {
  transition: r 0.2s ease;
}
</style>
