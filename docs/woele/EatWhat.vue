<template>
  <div class="eatwhat-container">
    <!-- 头部导航 -->
    <header class="header">
      <div class="header-inner">
        <div class="logo">
          <span class="icon-logo">🍽️</span>
          <h1>今天吃什么</h1>
        </div>
        <button
          class="btn-favorites"
          type="button"
          @click="showFavorites = true"
        >
          <span>❤️</span>
          <span>我的收藏</span>
        </button>
      </div>
    </header>

    <main class="main-content">
      <!-- 介绍区域 -->
      <section class="intro">
        <h2>不知道今天吃什么？</h2>
        <p>
          让我们帮你做决定！点击下方按钮，随机推荐美味佳肴，解决你的选择困难症。
        </p>

        <!-- 分类选择 -->
        <div class="categories">
          <button
            v-for="cat in categories"
            :key="cat.id"
            class="btn-category"
            :class="{ active: currentCategory === cat.id }"
            type="button"
            @click="currentCategory = cat.id"
          >
            {{ cat.name }}
          </button>
        </div>
      </section>

      <!-- 结果展示面板 -->
      <section class="result-panel">
        <div class="result-card">
          <!-- 空状态 -->
          <div v-if="!currentFood" class="empty-state">
            <div class="empty-icon">❓</div>
            <p>点击下方按钮开始随机推荐</p>
          </div>

          <!-- 推荐结果 -->
          <div v-else :key="currentFood.name" class="result-content">
            <span class="food-badge">{{ currentFood.categoryName }}</span>
            <h3 class="food-title">{{ currentFood.name }}</h3>
            <p class="food-desc">{{ currentFood.description }}</p>

            <div class="actions">
              <button
                class="btn btn-secondary"
                type="button"
                @click="toggleFavorite"
              >
                {{ isFavorite(currentFood) ? '💔 取消收藏' : '❤️ 收藏' }}
              </button>
              <button
                class="btn btn-primary"
                type="button"
                @click="generateRandomFood"
              >
                🔄 换一个
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- 主操作按钮 -->
      <div class="cta-section">
        <button
          class="btn btn-primary btn-large"
          type="button"
          @click="generateRandomFood"
        >
          🎲 随机推荐
        </button>
      </div>

      <!-- 历史记录 -->
      <section class="history-section">
        <h3 class="section-title">🕒 历史推荐</h3>
        <div v-if="history.length === 0" class="empty-text">暂无历史记录</div>
        <div v-else class="history-grid">
          <button
            v-for="(food, index) in history"
            :key="index"
            class="history-item"
            type="button"
            @click="currentFood = food"
          >
            <div class="history-name">{{ food.name }}</div>
            <div class="history-cat">{{ food.categoryName }}</div>
          </button>
        </div>
      </section>
    </main>

    <!-- 收藏夹弹窗 -->
    <div
      v-if="showFavorites"
      class="modal-overlay"
      @click.self="showFavorites = false"
    >
      <div class="modal-container" role="dialog" aria-modal="true">
        <div class="modal-header">
          <div class="modal-title">我的收藏</div>
          <button
            class="btn-close"
            type="button"
            @click="showFavorites = false"
          >
            &times;
          </button>
        </div>
        <div class="modal-body">
          <div v-if="favorites.length === 0" class="empty-text">
            暂无收藏的食物
          </div>
          <div v-else class="fav-list">
            <div v-for="food in favorites" :key="food.name" class="fav-item">
              <div class="fav-info">
                <h4>{{ food.name }}</h4>
                <span>{{ food.categoryName }}</span>
              </div>
              <button
                class="btn-remove"
                type="button"
                @click="removeFavorite(food)"
              >
                移除
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 提示消息 -->
    <div v-if="toastMessage" class="toast">{{ toastMessage }}</div>

    <footer class="footer">© 2026 今天吃什么</footer>
  </div>
</template>

<script setup lang="ts">
/**
 * EatWhatApp - 今天吃什么
 * 一个简单的随机食物推荐应用
 * 包含分类筛选、历史记录、收藏功能
 */
import { onMounted, onUnmounted, ref } from 'vue'
// 导入数据和类型
import { categories, foodData, type FoodItem } from './data'

defineOptions({ name: 'EatWhatApp' })

// 状态定义
const currentCategory = ref('all') // 当前选中的分类
const currentFood = ref<FoodItem | null>(null) // 当前展示的食物
const history = ref<FoodItem[]>([]) // 历史记录
const favorites = ref<FoodItem[]>([]) // 收藏列表
const showFavorites = ref(false) // 是否显示收藏弹窗
const toastMessage = ref('') // 提示消息内容
const isScrolled = ref(false) // 是否发生滚动

/**
 * 添加到历史记录
 * @param food 食物对象
 */
function addToHistory(food: FoodItem) {
  // 避免重复连续添加相同食物
  const exists = history.value.length > 0 && history.value[0].name === food.name
  if (!exists) {
    history.value.unshift({ ...food, timestamp: new Date() })
    // 限制历史记录数量为 12 条
    if (history.value.length > 12) {
      history.value.pop()
    }
    localStorage.setItem('foodHistory', JSON.stringify(history.value))
  }
}

/**
 * 检查是否已收藏
 */
function isFavorite(food: FoodItem) {
  return favorites.value.some(fav => fav.name === food.name)
}

/**
 * 显示提示消息
 */
function showToast(message: string) {
  toastMessage.value = message
  setTimeout(() => {
    toastMessage.value = ''
  }, 3000)
}

/**
 * 添加收藏
 */
function addFavorite(food: FoodItem) {
  if (isFavorite(food)) return
  favorites.value.push(food)
  localStorage.setItem('foodFavorites', JSON.stringify(favorites.value))
  showToast('已添加到收藏')
}

/**
 * 移除收藏
 */
function removeFavorite(food: FoodItem) {
  favorites.value = favorites.value.filter(fav => fav.name !== food.name)
  localStorage.setItem('foodFavorites', JSON.stringify(favorites.value))
  showToast('已从收藏中移除')
}

/**
 * 切换收藏状态
 */
function toggleFavorite() {
  if (!currentFood.value) return

  if (isFavorite(currentFood.value)) {
    removeFavorite(currentFood.value)
  } else {
    addFavorite(currentFood.value)
  }
}

/**
 * 生成随机食物
 */
function generateRandomFood() {
  // 根据分类筛选
  const filteredFoods =
    currentCategory.value === 'all'
      ? foodData
      : foodData.filter(food => food.category === currentCategory.value)

  if (filteredFoods.length === 0) return

  // 随机选择
  const randomIndex = Math.floor(Math.random() * filteredFoods.length)
  currentFood.value = filteredFoods[randomIndex]

  // 记录历史
  if (currentFood.value) addToHistory(currentFood.value)
}

/**
 * 处理滚动事件，用于头部样式变化
 */
function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

// 生命周期钩子
onMounted(() => {
  // 恢复历史记录
  const savedHistory = localStorage.getItem('foodHistory')
  if (savedHistory) {
    try {
      history.value = JSON.parse(savedHistory) as FoodItem[]
    } catch {
      history.value = []
      localStorage.removeItem('foodHistory')
    }
  }

  // 恢复收藏列表
  const savedFavorites = localStorage.getItem('foodFavorites')
  if (savedFavorites) {
    try {
      favorites.value = JSON.parse(savedFavorites) as FoodItem[]
    } catch {
      favorites.value = []
      localStorage.removeItem('foodFavorites')
    }
  }

  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped src="./eatwhat.css"></style>
