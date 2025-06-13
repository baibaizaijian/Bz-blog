<template>
  <div class="theme-toggle" id="theme-toggle">切换</div> <!-- 主题切换按钮 -->

  <svg
    style="position: absolute; width: 100%; height: 100%; z-index: 0"
    width="100%"
    height="100%"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <pattern
        id="dottedGrid"
        width="30"
        height="30"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="2" cy="2" r="1" fill="rgba(0,0,0,0.15)" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dottedGrid)" />
  </svg>

  <div class="book-title-overlay">
    <div class="book-title-text">好久不见</div>
  </div>

  <div class="shelf-container">
    <div class="book-shadow">
      <div class="book-shadow__item"></div>
      <div class="book-shadow__item side"></div>
      <div class="book-shadow__item"></div>
      <div class="book-shadow__item"></div>
    </div>

    <div class="shelf"></div>

    <div class="books-wrapper">
      <div class="books__item">
        <div class="books__container">
          <div class="books__cover">
            <div class="books__back-cover"></div>
            <div class="books__inside">
              <div class="books__page"></div>
              <div class="books__page"></div>
              <div class="books__page"></div>
            </div>
            <div class="books__image">
              <img
                src="https://covers.shakespeareandcompany.com/97818386/9781838661533.jpg"
                alt="Dieter Rams: The Complete Works"
              />
              <div class="books__effect"></div>
              <div class="books__light"></div>
            </div>
            <div
              class="books__hitbox"
              data-book-index="0"
              data-book-title="一号"
            ></div>
          </div>
        </div>
      </div>

      <div
        class="side-book"
        data-book-index="side"
        data-book-title="Design Systems"
      >
        <div class="side-book__title">二号</div>
        <div class="side-book__decoration"></div>
        <div class="side-book__decoration"></div>
      </div>

      <div class="books__item">
        <div class="books__container">
          <div class="books__cover">
            <div class="books__back-cover"></div>
            <div class="books__inside">
              <div class="books__page"></div>
              <div class="books__page"></div>
              <div class="books__page"></div>
            </div>
            <div class="books__image">
              <img
                src="https://covers.shakespeareandcompany.com/97802413/9780241371831.jpg"
                alt="Zen: The Art of Simple Living by Shunmyo Masuno"
              />
              <div class="books__effect"></div>
              <div class="books__light"></div>
            </div>
            <div
              class="books__hitbox"
              data-book-index="1"
              data-book-title="三号"
            ></div>
          </div>
        </div>
      </div>

      <div class="books__item" id="default-open-book">
        <div class="books__container">
          <div class="books__cover">
            <div class="books__back-cover"></div>
            <div class="books__inside">
              <div class="books__page"></div>
              <div class="books__page"></div>
              <div class="books__page"></div>
            </div>
            <div class="books__image">
              <img
                src="https://covers.shakespeareandcompany.com/97837913/9783791387321.jpg"
                alt="Dieter Rams: Ten Principles for Good Design"
              />
              <div class="books__effect"></div>
              <div class="books__light"></div>
            </div>
            <div
              class="books__hitbox"
              data-book-index="2"
              data-book-title="二号"
            ></div>
          </div>
        </div>
      </div>
    </div>

    <div class="book-descriptions">
      <div class="book-description" data-book-index="0">
        <h3>好久不见</h3>
        <div class="author">再见</div>
        <div class="lines-animation">
          <p>12312312</p>
        </div>
      </div>

      <div class="book-description" data-book-index="side">
        <h3>二号</h3>
        <div class="author">无敌</div>
        <div class="lines-animation">
          <p>8888888</p>
        </div>
      </div>

      <div class="book-description" data-book-index="1">
        <h3>三号</h3>
        <div class="author">哈哈哈</div>
        <div class="lines-animation">
          <p>984989</p>
        </div>
      </div>

      <div class="book-description active" data-book-index="2">
        <h3>飞天</h3>
        <div class="author">无敌</div>
        <div class="lines-animation">
          <p>阿加莎丢</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import SplitType from 'split-type'

const activeBookIndex = ref<number | string>(2)
let activeBookTimeline: gsap.core.Timeline | null = null
const bookTimelines: gsap.core.Timeline[] = []

// 更新书籍描述
const updateDescription = (bookIndex) => {
  // 获取所有书籍描述元素
  const descriptions = document.querySelectorAll('.book-description')
  // 遍历所有描述
  descriptions.forEach((desc) => {
    // 获取描述对应的书籍索引
    const descIndex = desc.getAttribute('data-book-index')
    // 如果描述的索引与当前激活的书籍索引不匹配，并且该描述当前是激活状态
    if (descIndex !== bookIndex && desc.classList.contains('active')) {
      // 移除激活类
      desc.classList.remove('active')
      // 动画：将文本行向下移动并淡出
      gsap.to(desc.querySelectorAll('.line-inner'), {
        yPercent: 100,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.in',
        stagger: 0.03
      })
    }
  })

  // 获取当前激活书籍的描述元素
  const activeDescription = document.querySelector(`.book-description[data-book-index="${bookIndex}"]`)
  // 如果激活描述存在
  if (activeDescription) {
    // 添加激活类
    activeDescription.classList.add('active')
    // 动画：将文本行从下方移入并淡入
    gsap.fromTo(
      activeDescription.querySelectorAll('.line-inner'),
      { yPercent: 100, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power1.out'
      }
    )
  }
}

onMounted(() => {
  // 主题切换
  const themeToggle = document.getElementById('theme-toggle')
  const body = document.body

  // 获取保存的主题设置
  // const savedTheme = localStorage.getItem('theme')
  // // 如果本地存储中保存了主题设置
  // if (savedTheme === 'dark') {
  //   // 设置为深色模式
  //   body.classList.add('dark-mode')
  // } else {
  //   // 否则，默认设置为浅色模式（移除深色模式类）
  //   body.classList.remove('dark-mode')
  // }

  // themeToggle?.addEventListener('click', () => {
  //   body.classList.toggle('dark-mode')
  //   localStorage.setItem('theme', body.classList.contains('dark-mode') ? 'dark' : 'light')
  // })

  // 书本解释
  const overlay = document.querySelector('.book-title-overlay')
  // 解释文字
  const overlayText = document.querySelector('.book-title-text')
  // 书包元素
  const books = document.querySelectorAll('.books__item')

  // 遍历每本书籍元素
  books.forEach((book, index) => {
    // 获取书籍的点击区域
    const hitbox = book.querySelector('.books__hitbox')
    if (!hitbox) return
    // 获取书籍封面图片元素
    const bookImage = book.querySelector('.books__image')
    // 获取书籍效果元素
    const bookEffect = book.querySelector('.books__effect')
    // 获取书籍页码元素
    const pages = book.querySelectorAll('.books__page')
    // 获取书籍光照效果元素
    const bookLight = book.querySelector('.books__light')
    // 书籍标题
    const bookTitle = hitbox.getAttribute('data-book-title')
    // 书籍索引
    const bookIndex = hitbox.getAttribute('data-book-index')
    // 计算书籍阴影的索引
    let shadowIndex = index >= 1 ? index + 1 : index
    // 获取书籍阴影元素
    const bookShadow = document.querySelectorAll('.book-shadow__item')[shadowIndex]

    // 设置书籍图片初始阴影样式
    gsap.set(bookImage, {
      boxShadow: 'var(--book-shadow) 10px 5px 20px, var(--book-shadow) 20px 0px 30px'
    })
    // 设置书籍光照效果初始透明度
    gsap.set(bookLight, { opacity: 0.1 })
    // 设置书籍页码初始位置
    gsap.set(pages, { x: 0 })

    // 创建书籍悬停进入动画时间线
    const hoverIn = gsap.timeline({ paused: true, defaults: { duration: 0.7, ease: 'power2.out' } })
    // 动画：书籍图片位移、缩放和阴影变化
    hoverIn.to(bookImage, {
      translateX: -10,
      scaleX: 0.96,
      boxShadow: 'var(--book-shadow-strong) 20px 5px 20px, var(--book-shadow) 30px 0px 30px'
    }, 0)
    // 动画：书籍阴影宽度和透明度变化
    hoverIn.to(bookShadow, { width: 130, opacity: 0.8 }, 0)
    // 动画：书籍效果边距变化
    hoverIn.to(bookEffect, { marginLeft: 10 }, 0)
    // 动画：书籍光照效果透明度变化
    hoverIn.to(bookLight, { opacity: 0.2 }, 0)
    // 如果有页码，动画：页码位移
    if (pages.length) {
      hoverIn.to(pages[0], { x: '2px', ease: 'power1.inOut' }, 0)
      hoverIn.to(pages[1], { x: '0px', ease: 'power1.inOut' }, 0)
      hoverIn.to(pages[2], { x: '-2px', ease: 'power1.inOut' }, 0)
    }

    // 将当前书籍的动画时间线存储到数组中
    bookTimelines[index] = hoverIn

    // 添加鼠标进入事件监听器
    hitbox.addEventListener('mouseenter', () => {
      // 如果当前有激活的书籍且不是当前书籍，则反转其动画
      if (activeBookIndex.value !== null && activeBookIndex.value !== index && activeBookTimeline) {
        activeBookTimeline.reverse()
      }
      // 设置当前激活书籍的索引
      activeBookIndex.value = index
      // 设置当前激活书籍的动画时间线
      activeBookTimeline = hoverIn
      // 播放当前书籍的动画
      hoverIn.play()
      // 更新覆盖层文本为书籍标题
      overlayText.textContent = bookTitle
      // 动画：覆盖层透明度变化
      gsap.to(overlay, { opacity: 1, duration: 0.3 })
      // 更新书籍描述
      updateDescription(bookIndex)
    })
  })

  // 获取侧边书籍元素
  const sideBook = document.querySelector('.side-book')
  // 获取侧边书籍阴影元素
  const sideBookShadow = document.querySelector('.book-shadow__item.side')
  // 获取侧边书籍标题
  const sideBookTitle = sideBook.getAttribute('data-book-title')

  // 创建侧边书籍悬停进入动画时间线
  const sideHoverIn = gsap.timeline({ paused: true, defaults: { duration: 0.5, ease: 'power2.out' } })
  // 动画：侧边书籍位移和阴影变化
  sideHoverIn.to(sideBook, {
    y: -5,
    boxShadow: 'var(--book-shadow) 8px -5px 15px, var(--book-shadow) 15px 0px 20px'
  }, 0)
  // 动画：侧边书籍阴影宽度和透明度变化
  sideHoverIn.to(sideBookShadow, { width: 35, opacity: 0.8 }, 0)

  // 添加侧边书籍鼠标进入事件监听器
  sideBook.addEventListener('mouseenter', () => {
    // 如果当前有激活的书籍，则反转其动画
    if (activeBookIndex.value !== null && activeBookTimeline) {
      activeBookTimeline.reverse()
    }
    // 设置当前激活书籍的索引为'side'
    activeBookIndex.value = 'side'
    // 设置当前激活书籍的动画时间线
    activeBookTimeline = sideHoverIn
    // 播放侧边书籍的动画
    sideHoverIn.play()
    // 更新覆盖层文本为侧边书籍标题
    overlayText.textContent = sideBookTitle
    // 动画：覆盖层透明度变化
    gsap.to(overlay, { opacity: 1, duration: 0.3 })
    // 更新书籍描述
    updateDescription('side')
  })

  // 设置默认展开书籍
  const defaultBook = books[2]
  const defaultBookTitle = defaultBook.querySelector('.books__hitbox').getAttribute('data-book-title')
  activeBookIndex.value = 2
  activeBookTimeline = bookTimelines[2]
  bookTimelines[2].play()
  overlayText.textContent = defaultBookTitle
  gsap.to(overlay, { opacity: 1, duration: 0.3 })
  updateDescription('2')

  // 添加书架容器鼠标离开事件监听器
  document.querySelector('.shelf-container').addEventListener('mouseleave', () => {
    // 如果当前激活书籍不是默认书籍且有激活动画，则反转动画
    if (activeBookIndex.value !== 2 && activeBookTimeline) {
      activeBookTimeline.reverse()
    }
    // 重置激活书籍为默认书籍
    activeBookIndex.value = 2
    activeBookTimeline = bookTimelines[2]
    bookTimelines[2].play()
    overlayText.textContent = defaultBookTitle
    gsap.to(overlay, { opacity: 1, duration: 0.3 })
    updateDescription('2')
  })

  // 初始化 SplitType
  const descriptions = document.querySelectorAll('.book-description')
  // 遍历每个书籍描述元素
  descriptions.forEach((desc) => {
    // 获取书籍索引
    const bookIndex = desc.getAttribute('data-book-index')
    // 获取标题元素
    const titleElement = desc.querySelector('h3') as HTMLElement
    // 获取作者元素
    const authorElement = desc.querySelector('.author') as HTMLElement
    // 获取文本内容元素
    const textElement = desc.querySelector('.lines-animation p') as HTMLElement

    try {
      // 使用 SplitType 分割标题、作者和文本为行，并添加 'line' 类
      new SplitType(titleElement, { types: 'lines', lineClass: 'line' })
      new SplitType(authorElement, { types: 'lines', lineClass: 'line' })
      new SplitType(textElement, { types: 'lines', lineClass: 'line' })
      // 为每个分割后的行添加 'line-inner' span 包装内容
      desc.querySelectorAll('.line').forEach((line) => {
        const content = line.innerHTML
        line.innerHTML = `<span class="line-inner">${content}</span>`
      })
    } catch (e) {
      // 捕获并打印 SplitType 错误
      console.error('SplitType 错误:', e)
    }

    // 根据书籍索引设置初始透明度和位移
    if (bookIndex !== '2') {
      gsap.set(desc.querySelectorAll('.line-inner'), {
        yPercent: 100,
        opacity: 0
      })
    } else {
      gsap.set(desc.querySelectorAll('.line-inner'), {
        yPercent: 0,
        opacity: 1
      })
    }
  })
})
</script>


<style scoped>
/* Original idea and inspiration for the Book Cover Effect by https://codepen.io/realvjy */

:root {
  /* Light mode variables */
  --bg-color: #ffffff; /* 背景颜色 */
  --text-color: #f5f5f5; /* 文本颜色 */
  --title-color: #000000; /* 标题颜色 */
  --overlay-text-color: rgba(0, 0, 0, 0.05); /* 覆盖层文本颜色 */
  --shelf-bg: linear-gradient(to bottom, #f0f0f0, #e0e0e0); /* 书架背景 */
  --shelf-edge-top: rgba(255, 255, 255, 0.01); /* 书架顶部边缘颜色 */
  --shelf-edge-bottom: rgba(0, 0, 0, 0.1); /* 书架底部边缘颜色 */
  --book-back-cover: #111111; /* 书籍封底颜色 */
  --book-page: #ffffff; /* 书籍页面颜色 */
  --book-page-border: rgba(0, 0, 0, 0.2); /* 书籍页面边框颜色 */
  --book-shadow: rgba(0, 0, 0, 0.15); /* 书籍阴影颜色 */
  --book-shadow-strong: rgba(0, 0, 0, 0.35); /* 书籍强阴影颜色 */
  --side-book-bg: linear-gradient(to right, #444 0%, #666 50%, #444 100%); /* 侧边书籍背景 */
  --side-book-text: #f0f0f0; /* 侧边书籍文本颜色 */
  --side-book-decoration: rgba(255, 255, 255, 0.3); /* 侧边书籍装饰颜色 */
  --toggle-dot: #333333; /* 主题切换点颜色 */
}


@font-face {
  font-family: "Cabinet Grotesk";
  font-style: normal;
  font-weight: 800;
  src: local("Cabinet Grotesk"),
    url("https://fonts.cdnfonts.com/s/85514/CabinetGrotesk-Extrabold.woff")
      format("woff");
}

@font-face {
  font-family: "Cabinet Grotesk";
  font-style: normal;
  font-weight: 400;
  src: local("Cabinet Grotesk"),
    url("https://fonts.cdnfonts.com/s/85514/CabinetGrotesk-Medium.woff")
      format("woff");
}

body {
  background-color: var(--bg-color); /* 背景颜色 */
  margin: 0;
  padding: 0;
  height: 100vh; /* 视口高度 */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  font-family: "Cabinet Grotesk", sans-serif;
  letter-spacing: -0.02em;
  color: var(--text-color); /* 文本颜色 */
  transition: background-color 0.5s ease, color 0.5s ease; /* 背景和颜色过渡效果 */
}

/* Theme toggle dot */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--toggle-dot); /* 切换点颜色 */
  cursor: pointer;
  z-index: 100;
  transition: background-color 0.3s ease; /* 背景颜色过渡效果 */
}

/* Big centered text that appears on hover */
.book-title-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: -1;
  opacity: 1;
  transition: opacity 0.1s ease;
  pointer-events: none;
  color:  #f5f5f5;; /* 添加独立的颜色变量 */
}

.book-title-text {
  font-family: "Cabinet Grotesk", sans-serif;
  font-weight: 800;
  font-size: 20rem;
  color:  #f5f5f5;;
  text-transform: uppercase;
  text-align: center;
  line-height: 1;
  max-width: 90vw;
  transition: color 0.5s ease;
}

/* Shelf container to manage stacking context */
.shelf-container {
  position: relative;
  width: 100%;
  height: 500px; /* Increased height to accommodate descriptions */ /* 增加高度以容纳描述 */
  margin: 0 auto;
  display: flex;
  justify-content: center;
  z-index: 1; /* Above the text overlay */ /* 在文本覆盖层之上 */
  /* Above the text overlay */
}

.shelf {
  display: block;
  position: absolute;
  bottom: 270px; /* Adjusted to make room for descriptions */
  width: 100%;
  max-width: 800px;
  height: 15px;
  background: var(--shelf-bg);
  border-radius: 1px;
  z-index: 20;
  box-shadow:
        /* Subtle top highlight */ 0px -1px 1px rgba(255, 255, 255, 0.15),
    /* Close shadow */ 0px 2px 3px rgba(0, 0, 0, 0.12),
    /* Medium shadow */ 0px 5px 10px rgba(0, 0, 0, 0.08),
    /* Larger shadow */ 0px 15px 20px rgba(0, 0, 0, 0.06),
    /* Very large diffused shadow */ 0px 25px 30px rgba(0, 0, 0, 0.04),
    /* Extra large ambient shadow */ 0px 40px 60px rgba(0, 0, 0, 0.2),
    /* Massive soft shadow for dramatic effect */ 0px 60px 80px
      rgba(0, 0, 0, 0.12);
  transition: background 0.5s ease, box-shadow 0.5s ease;
}

/* Add a subtle edge to the shelf */
.shelf:after {
  content: "";
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: var(--shelf-edge-bottom);
  transition: background-color 0.5s ease;
}

.shelf:before {
  content: "";
  position: absolute;
  top: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--shelf-edge-top);
  transition: background-color 0.5s ease;
}

/* Books wrapper */
.books-wrapper {
  position: absolute;
  bottom: 287px; /* Adjusted to match new shelf position */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  z-index: 10;
  /* Below the shelf */
}

/* Book Item Styles */
.books__item {
  text-align: center;
  cursor: default;
  height: 220px;
}

.books__container {
  position: relative;
  width: 160px;
  margin: 0 auto;
  height: 100%;
}

.books__cover {
  position: relative;
  will-change: transform;
  height: 100%;
}

.books__hitbox {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 10;
  cursor: pointer;
}

/* Back Cover: 96% with 2% margin */
.books__back-cover {
  position: absolute;
  width: 96%;
  height: 96%;
  top: 2%;
  left: 2%;
  background: var(--book-back-cover);
  border-radius: 0 6px 6px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.25);
  z-index: -10;
  transition: background 0.5s ease;
}

/* Paper Container: 90% with equal top/bottom margin */
.books__inside {
  position: absolute;
  width: 90%;
  height: 94%;
  top: 3%;
  left: 5%;
  z-index: 0;
}

/* Paper Pages: height is 100% */
.books__page {
  position: absolute;
  top: 0;
  right: 0;
  width: 98%;
  height: 100%;
  background: var(--book-page);
  border: 1px solid var(--book-page-border);
  border-radius: 0 6px 6px 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  transform-origin: right center;
  z-index: -5;
  transition: background 0.5s ease, border-color 0.5s ease;
}

/* Front Cover Image */
.books__image {
  line-height: 0;
  position: relative;
  border-radius: 2px 6px 6px 2px;
  height: 100%;
  box-shadow: var(--book-shadow) 10px -5px 20px,
    var(--book-shadow) 20px 0px 30px;
  transform-origin: left center;
  cursor: pointer;
  will-change: transform, box-shadow;
  z-index: 10;
  transition: box-shadow 0.5s ease;
}

.books__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px 6px 6px 2px;
}

.books__effect {
  position: absolute;
  width: 24px;
  height: 100%;
  margin-left: 12px;
  top: 0;
  border-left: 2px solid rgba(0, 0, 0, 0.08);
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.25) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  transform-origin: left center;
  z-index: 5;
  pointer-events: none;
  will-change: margin-left;
}

.books__light {
  width: 100%;
  height: 100%;
  position: absolute;
  border-radius: 2px 6px 6px 2px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.5) 100%
  );
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.15;
  transform-origin: left center;
  z-index: 4;
  pointer-events: none;
  mix-blend-mode: overlay;
  will-change: opacity;
}

/* Side view book styles */
.side-book {
  height: 220px;
  width: 30px;
  /* Thin width for side view */
  position: relative;
  cursor: pointer;
  background: var(--side-book-bg);
  border-radius: 2px;
  box-shadow: var(--book-shadow) 5px -3px 10px, var(--book-shadow) 10px 0px 15px;
  transform-origin: bottom center;
  will-change: transform, box-shadow;
  transition: background 0.5s ease, box-shadow 0.5s ease;
}

.side-book__title {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  writing-mode: vertical-rl;
  text-orientation: mixed;
  transform: rotate(180deg);
  color: var(--side-book-text);
  font-size: 12px;
  padding: 5px 0;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: color 0.5s ease;
}

.side-book__decoration {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  transition: background-color 0.5s ease;
}

.side-book__decoration:nth-child(2) {
  top: auto;
  bottom: 20px;
}

/* Contact shadow where book meets shelf */
.book-shadow {
  position: absolute;
  bottom: 285px; /* 调整以匹配新的书架位置 */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 2rem;
  z-index: 15; /* 在书籍和书架之间 */
}

.book-shadow__item {
  width: 120px;
  height: 2px;
  background: radial-gradient(
    ellipse at center,
    var(--book-shadow) 0%,
    rgba(0, 0, 0, 0) 70%
  ); /* 书籍阴影背景 */
  border-radius: 50%;
  will-change: width, opacity;
  transition: background 0.5s ease; /* 背景过渡效果 */
}

.book-shadow__item.side {
  width: 25px;
}

/* Book descriptions */
.book-descriptions {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 640px;
  z-index: 5;
  height: 200px; /* 描述的固定高度 */
}

.book-description {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  opacity: 0;
  visibility: hidden;
  font-family: "Cabinet Grotesk", sans-serif;
  font-weight: 400;
  font-size: 1.1rem;
  line-height: 1.5;
  color: var(--text-color); /* 文本颜色 */
  transition: opacity 0.3s ease, visibility 0.3s ease, color 0.5s ease; /* 透明度、可见性和颜色过渡效果 */
}

.book-description.active {
  opacity: 1;
  visibility: visible;
}

.book-description h3 {
  font-weight: 800;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
  color: var(--title-color); /* 标题颜色 */
  transition: color 0.5s ease; /* 颜色过渡效果 */
}

.book-description .author {
  font-style: italic;
  opacity: 0.8;
  margin-bottom: 1rem;
}

.book-description p {
  margin-bottom: 0.75rem;
}

/* Split Type styles */
.lines-animation {
  overflow: hidden;
}

/* Critical fix: Ensure each line has overflow hidden */
.line {
  overflow: hidden !important;
  display: block;
}

/* Ensure the line inner content has proper transform properties */
.line .line-inner {
  display: block;
  transform: translateY(0); /* 从100%改为0，默认显示文本 */
  opacity: 1; /* 从0改为1，默认显示文本 */
}

</style>
