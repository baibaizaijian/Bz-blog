<template>
  <div id="game">
    <div class="header">
      <div class="score">分数: {{ score.value }}</div>
      <button class="reset-btn" @click="resetGame">重新开始</button>
    </div>
    <div class="board">
      <div v-for="(row, rIndex) in board" :key="rIndex" class="row">
        <div v-for="(cell, cIndex) in row" :key="cIndex" 
             class="cell" 
             :class="{ 'cell-merged': mergedCells[`${rIndex}-${cIndex}`] }"
             :data-num="cell">
          <div class="cell-content" v-if="cell">
            {{ cell }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted, onUnmounted } from 'vue'

/** 生成4*4 二维数组，初始值都为0 */
const board = reactive(Array(4).fill(0).map(() => Array(4).fill(0)))
/** 游戏分数，使用reactive包装便于修改 */
const score = reactive({ value: 0 })
/** 记录已合并的单元格位置，用于添加合并动画 */
const mergedCells = reactive({})

/**
 * 重置游戏
 * 清空棋盘、重置分数、添加初始数字、清空合并状态
 */
function resetGame() {
  // 清空棋盘
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      board[r][c] = 0
    }
  }
  // 重置分数
  score.value = 0
  // 添加初始数字（两个）
  addNumber()
  addNumber()
  // 清空合并状态
  Object.keys(mergedCells).forEach(key => delete mergedCells[key])
}

/**
 * 在随机空位置添加一个数字（2或4）
 * 90%概率生成2，10%概率生成4
 */
function addNumber() {
  // 找出所有空位置
  const empty = []
  board.forEach((row, r) =>
    row.forEach((cell, c) => {
      if (cell === 0) empty.push([r, c])
    })
  )
  // 如果没有空位置，直接返回
  if (!empty.length) return
  // 随机选择一个空位置
  const [r, c] = empty[Math.floor(Math.random() * empty.length)]
  // 80%概率生成2，10%概率生成4
  board[r][c] = Math.random() < 0.8 ? 2 : 4
}

/**
 * 滑动并合并一行数字
 * @param {Array} row - 需要处理的行
 * @returns {Object} - 处理后的行和是否发生了合并
 */
function slideAndMerge(row) {
  // 确保输入是数组
  if (!Array.isArray(row)) {
    console.error('slideAndMerge: row is not an array', row)
    return { row: [0, 0, 0, 0], merged: false }
  }
  
  // 过滤掉0，将所有非0数字靠左排列
  let arr = row.filter(v => v !== 0)
  let merged = false
  
  // 合并相邻且相等的数字
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === arr[i + 1]) {
      arr[i] *= 2 // 将前一个数字翻倍
      score.value += arr[i] // 增加分数
      arr[i + 1] = 0 // 将后一个数字置为0
      merged = true
    }
  }
  
  // 再次过滤掉合并后产生的0
  arr = arr.filter(v => v !== 0)
  
  // 在数组末尾补充0，确保长度为4
  while (arr.length < 4) arr.push(0)
  
  return { row: arr, merged }
}

/**
 * 矩阵旋转90度（顺时针）
 * @param {Array} matrix - 二维数组
 * @returns {Array} - 旋转后的二维数组
 */
function rotate(matrix) {
  return matrix[0].map((_, i) => matrix.map(row => row[i]))
}

/**
 * 矩阵水平翻转（每行倒序）
 * @param {Array} matrix - 二维数组
 * @returns {Array} - 翻转后的二维数组
 */
function reverse(matrix) {
  return matrix.map(row => [...row].reverse())
}

/**
 * 根据方向移动棋盘
 * @param {string} direction - 移动方向：'up', 'down', 'left', 'right'
 * @returns {boolean} - 是否发生了移动
 */
function move(direction) {
  let moved = false
  // 复制棋盘，避免直接修改原始数据
  let b = board.map(row => [...row])
  // 清空之前的合并状态
  Object.keys(mergedCells).forEach(key => delete mergedCells[key])

  switch (direction) {
    case 'up':
      // 向上移动：先旋转，再按行处理，最后旋转回来
      b = rotate(b) // 顺时针旋转90度
      b = b.map((row, i) => {
        const result = slideAndMerge(row)
        if (result.merged) {
          // 记录合并的单元格位置
          result.row.forEach((val, j) => {
            if (val > 0) mergedCells[`${j}-${i}`] = true
          })
        }
        return result.row
      })
      // 旋转回原来的方向（逆时针旋转270度，即顺时针旋转3次）
      b = rotate(b)
      b = rotate(b)
      b = rotate(b)
      break
    case 'down':
      // 向下移动：先旋转，再反转行，按行处理，反转回来，最后旋转回来
      b = rotate(b) // 顺时针旋转90度
      b = b.map((row, i) => {
        row = [...row].reverse() // 反转行
        const result = slideAndMerge(row)
        if (result.merged) {
          // 记录合并的单元格位置，注意坐标转换
          result.row.forEach((val, j) => {
            if (val > 0) mergedCells[`${3-j}-${i}`] = true
          })
        }
        return result.row.reverse() // 反转回来
      })
      // 旋转回原来的方向
      b = rotate(b)
      b = rotate(b)
      b = rotate(b)
      break
    case 'left':
      // 向左移动：直接按行处理
      b = b.map((row, i) => {
        const result = slideAndMerge(row)
        if (result.merged) {
          // 记录合并的单元格位置
          result.row.forEach((val, j) => {
            if (val > 0) mergedCells[`${i}-${j}`] = true
          })
        }
        return result.row
      })
      break
    case 'right':
      // 向右移动：先反转行，按行处理，再反转回来
      b = b.map((row, i) => {
        row = [...row].reverse() // 反转行
        const result = slideAndMerge(row)
        if (result.merged) {
          // 记录合并的单元格位置，注意坐标转换
          result.row.forEach((val, j) => {
            if (val > 0) mergedCells[`${i}-${3-j}`] = true
          })
        }
        return result.row.reverse() // 反转回来
      })
      break
  }

  // 检查是否有移动发生
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      if (b[r][c] !== board[r][c]) moved = true
      board[r][c] = b[r][c] // 更新棋盘
    }
  }
  return moved
}

/**
 * 处理键盘事件
 * @param {KeyboardEvent} e - 键盘事件对象
 */
function handleKey(e) {
  let moved = false
  switch (e.key) {
    case 'ArrowUp': 
      e.preventDefault(); // 阻止页面滚动
      moved = move('up'); 
      break;
    case 'ArrowDown': 
      e.preventDefault(); // 阻止页面滚动
      moved = move('down'); 
      break;
    case 'ArrowLeft': 
      e.preventDefault(); // 阻止页面滚动
      moved = move('left'); 
      break;
    case 'ArrowRight': 
      e.preventDefault(); // 阻止页面滚动
      moved = move('right'); 
      break;
  }
  
  // 如果发生了移动
  if (moved) {
    addNumber() // 添加新数字
    if (checkWin()) setTimeout(() => alert('你赢了 2048!'), 300) // 检查是否获胜
    if (checkGameOver()) setTimeout(() => alert('游戏结束!'), 300) // 检查是否游戏结束
  }
}

/**
 * 检查是否获胜（出现2048）
 * @returns {boolean} - 是否获胜
 */
function checkWin() {
  return board.flat().includes(2048)
}

/**
 * 检查游戏是否结束（没有空格且没有可合并的相邻单元格）
 * @returns {boolean} - 是否游戏结束
 */
function checkGameOver() {
  // 如果还有空格，游戏未结束
  if (board.flat().includes(0)) return false
  
  // 检查是否有相邻且相等的单元格
  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      const val = board[r][c]
      // 检查右侧和下方的单元格
      if ((c < 3 && board[r][c + 1] === val) || (r < 3 && board[r + 1][c] === val)) return false
    }
  }
  return true // 没有空格且没有可合并的相邻单元格，游戏结束
}

// 组件挂载时初始化游戏
onMounted(() => {
  addNumber() // 添加两个初始数字
  addNumber()
  window.addEventListener('keydown', handleKey) // 添加键盘事件监听
})

// 组件卸载时移除事件监听
onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})
</script>


<style scoped>
#game { 
  width: 400px; 
  margin: 0 auto;
  padding: 0 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score { 
  font-size: 24px; 
  font-weight: bold;
  color: #776e65;
}

.reset-btn {
  padding: 10px 20px;
  font-size: 18px;
  background: #8f7a66;
  color: #f9f6f2;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-btn:hover {
  background: #9f8b77;
  transform: translateY(-2px);
}

.board { 
  display: grid; 
  grid-template-rows: repeat(4, 1fr); 
  gap: 10px; 
  background: #bbada0; 
  padding: 10px; 
  border-radius: 10px; 
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  width: 380px; /* 确保宽度正确 */
  box-sizing: border-box; /* 确保padding不会增加总宽度 */
}

.row { 
  display: grid; 
  grid-template-columns: repeat(4, 1fr); 
  gap: 10px; 
}

.cell { 
  width: 80px; /* 调整单元格宽度 */
  height: 80px; /* 调整单元格高度 */
  border-radius: 8px; 
  background: #ccc0b3; 
  position: relative;
  transition: transform 0.15s ease-in-out;
}

.cell-content {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  color: #776e65;
  animation: appear 0.2s ease-in-out;
}

.cell-merged {
  animation: merge 0.2s ease-in-out;
}

@keyframes appear {
  0% { 
    opacity: 0;
    transform: scale(0.5);
  }
  100% { 
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes merge {
  0% { 
    transform: scale(1);
  }
  50% { 
    transform: scale(1.2);
  }
  100% { 
    transform: scale(1);
  }
}

.cell[data-num="2"] { background: #eee4da; }
.cell[data-num="4"] { background: #ede0c8; }
.cell[data-num="8"] { 
  background: #f2b179; 
}
.cell[data-num="8"] .cell-content { 
  color: #f9f6f2; 
}
.cell[data-num="16"] { 
  background: #f59563; 
}
.cell[data-num="16"] .cell-content { 
  color: #f9f6f2; 
}
.cell[data-num="32"] { 
  background: #f67c5f; 
}
.cell[data-num="32"] .cell-content { 
  color: #f9f6f2; 
}
.cell[data-num="64"] { 
  background: #f65e3b; 
}
.cell[data-num="64"] .cell-content { 
  color: #f9f6f2; 
}
.cell[data-num="128"] { 
  background: #edcf72; 
}
.cell[data-num="128"] .cell-content { 
  color: #f9f6f2; 
  font-size: 20px; 
}
.cell[data-num="256"] { 
  background: #edcc61; 
}
.cell[data-num="256"] .cell-content { 
  color: #f9f6f2; 
  font-size: 20px; 
}
.cell[data-num="512"] { 
  background: #edc850; 
}
.cell[data-num="512"] .cell-content { 
  color: #f9f6f2; 
  font-size: 20px; 
}
.cell[data-num="1024"] { 
  background: #edc53f; 
}
.cell[data-num="1024"] .cell-content { 
  color: #f9f6f2; 
  font-size: 16px; 
}
.cell[data-num="2048"] { 
  background: #edc22e; 
}
.cell[data-num="2048"] .cell-content { 
  color: #f9f6f2; 
  font-size: 16px; 
}
</style>
