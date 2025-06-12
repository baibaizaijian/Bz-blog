<template>
    <div class="theme-toggle" @click="toggleTheme"></div>

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

    <div class="book-title-overlay" ref="overlayRef">
      <div class="book-title-text" ref="overlayTextRef">Ten Principles for Good Design</div>
    </div>

    <div class="shelf-container" @mouseleave="handleShelfMouseLeave">
      <div class="book-shadow">
        <div class="book-shadow__item" ref="bookShadow0"></div>
        <div class="book-shadow__item side" ref="sideBookShadow"></div>
        <div class="book-shadow__item" ref="bookShadow1"></div>
        <div class="book-shadow__item" ref="bookShadow2"></div>
      </div>

      <div class="shelf"></div>

      <div class="books-wrapper">
        <div class="books__item" ref="book0">
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
                data-book-title="The Complete Works"
                @mouseenter="handleBookMouseEnter(0)"
              ></div>
            </div>
          </div>
        </div>

        <div
          class="side-book"
          data-book-index="side"
          data-book-title="Design Systems"
          ref="sideBookRef"
          @mouseenter="handleBookMouseEnter('side')"
        >
          <div class="side-book__title">Design Systems</div>
          <div class="side-book__decoration"></div>
          <div class="side-book__decoration"></div>
        </div>

        <div class="books__item" ref="book1">
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
                data-book-title="Simple Living"
                @mouseenter="handleBookMouseEnter(1)"
              ></div>
            </div>
          </div>
        </div>

        <div class="books__item" id="default-open-book" ref="book2">
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
                data-book-title="Ten Principles for Good Design"
                @mouseenter="handleBookMouseEnter(2)"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="book-descriptions">
        <div class="book-description" data-book-index="0" :class="{ active: activeBookIndex === 0 }" ref="desc0">
          <h3>Dieter Rams: The Complete Works</h3>
          <div class="author">by Klaus Klemp</div>
          <div class="lines-animation">
            <p>
              From legendary music producer Rick Rubin comes a profound guide to
              the powerful source of creative inspiration. The Creative Act is a
              beautiful and generous course of study that illuminates the path
              of the artist as a road we all can follow.
            </p>
          </div>
        </div>

        <div class="book-description" data-book-index="side" :class="{ active: activeBookIndex === 'side' }" ref="descSide">
          <h3>Design Systems</h3>
          <div class="author">A Practical Guide</div>
          <div class="lines-animation">
            <p>
              A comprehensive guide to creating, documenting, and maintaining
              design systems. This book covers the essential elements of design
              systems, from typography and color to components and patterns,
              helping teams build cohesive and scalable product experiences.
            </p>
          </div>
        </div>

        <div class="book-description" data-book-index="1" :class="{ active: activeBookIndex === 1 }" ref="desc1">
          <h3>Zen: The Art of Simple Living</h3>
          <div class="author">by Shunmyo Masuno</div>
          <div class="lines-animation">
            <p>
              Drawing on centuries of wisdom, renowned Zen Buddhist priest
              Shunmyo Masuno applies the essence of Zen to modern life. Through
              simple, practical lessons, discover how a few minutes a day can
              transform your life and bring happiness and fulfillment.
            </p>
          </div>
        </div>

        <div class="book-description" data-book-index="2" :class="{ active: activeBookIndex === 2 }" ref="desc2">
          <h3>Dieter Rams: Ten Principles for Good Design</h3>
          <div class="author">by Dieter Rams</div>
          <div class="lines-animation">
            <p>
              The definitive resource for designers at all levels. This
              comprehensive guide covers Dieter Rams' famous ten principles for
              good design, providing essential knowledge for creating
              functional, aesthetic, and long-lasting design solutions.
            </p>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { gsap } from 'gsap';
import SplitType from 'split-type';

const isDarkMode = ref(false);

const toggleTheme = () => {
  isDarkMode.value = !isDarkMode.value;
  localStorage.setItem('theme', isDarkMode.value ? 'dark' : 'light');
};

onMounted(() => {
  // Check for saved theme preference or use preferred color scheme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    isDarkMode.value = true;
  } else if (savedTheme === 'light') {
    isDarkMode.value = false;
  } else {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
    }
  }
});

// Apply dark-mode class based on isDarkMode ref
watch(isDarkMode, (newValue) => {
  if (newValue) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
}, { immediate: true });

// Refs for DOM elements
const overlayRef = ref(null);
const overlayTextRef = ref(null);

const book0 = ref(null);
const book1 = ref(null);
const book2 = ref(null);
const sideBookRef = ref(null);

const bookShadow0 = ref(null);
const bookShadow1 = ref(null);
const bookShadow2 = ref(null);
const sideBookShadow = ref(null);

const desc0 = ref(null);
const desc1 = ref(null);
const desc2 = ref(null);
const descSide = ref(null);


// Reactive state for active book
const activeBookIndex = ref(2); // Start with the last book (index 2)
let activeBookTimeline = null; // Will store the GSAP timeline

// Store all book references and their corresponding shadows
const allBooks = [
  { ref: book0, shadowRef: bookShadow0, index: 0, title: "The Complete Works" },
  { ref: sideBookRef, shadowRef: sideBookShadow, index: 'side', title: "Design Systems" }, // Side book is handled separately or integrated here
  { ref: book1, shadowRef: bookShadow1, index: 1, title: "Simple Living" },
  { ref: book2, shadowRef: bookShadow2, index: 2, title: "Ten Principles for Good Design" },
];

const bookTimelines = {}; // Object to store GSAP timelines by book index

// Function to update description
const updateDescription = (index) => {
  const allDescriptions = [
    { ref: desc0, index: 0 },
    { ref: descSide, index: 'side' },
    { ref: desc1, index: 1 },
    { ref: desc2, index: 2 },
  ];

  allDescriptions.forEach(desc => {
    if (desc.ref.value) { // Ensure ref is not null
      const isActive = desc.index === index;
      const currentElement = desc.ref.value;

      if (isActive && !currentElement.classList.contains('active')) {
        currentElement.classList.add('active');
        gsap.fromTo(
          currentElement.querySelectorAll('.line-inner'),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power1.out',
          }
        );
      } else if (!isActive && currentElement.classList.contains('active')) {
        currentElement.classList.remove('active');
        gsap.to(currentElement.querySelectorAll('.line-inner'), {
          yPercent: 100,
          opacity: 0,
          duration: 0.4,
          ease: 'power1.in',
          stagger: 0.03,
        });
      }
    }
  });
};

const handleBookMouseEnter = (index) => {
  if (activeBookIndex.value !== null && activeBookIndex.value !== index && activeBookTimeline) {
    activeBookTimeline.reverse();
  }

  activeBookIndex.value = index;
  activeBookTimeline = bookTimelines[index];

  if (activeBookTimeline) {
    activeBookTimeline.play();
  }

  // Update overlay text
  const bookInfo = allBooks.find(book => book.index === index);
  if (bookInfo && overlayTextRef.value) {
    overlayTextRef.value.textContent = bookInfo.title;
    gsap.to(overlayRef.value, {
      opacity: 1,
      duration: 0.3,
    });
  }

  updateDescription(index);
};

const handleShelfMouseLeave = () => {
  if (activeBookIndex.value !== 2 && activeBookTimeline) {
    activeBookTimeline.reverse();
  }

  activeBookIndex.value = 2;
  activeBookTimeline = bookTimelines[2];

  if (activeBookTimeline) {
    activeBookTimeline.play();
  }

  // Set default book title in overlay
  const defaultBookInfo = allBooks.find(book => book.index === 2);
  if (defaultBookInfo && overlayTextRef.value) {
    overlayTextRef.value.textContent = defaultBookInfo.title;
    gsap.to(overlayRef.value, {
      opacity: 1,
      duration: 0.3,
    });
  }

  updateDescription(2);
};


onMounted(() => {
  // Initialize GSAP animations for each book
  allBooks.forEach(bookData => {
    const book = bookData.ref.value;
    const bookIndex = bookData.index;

    if (!book) return; // Skip if ref is not yet assigned

    const bookImage = book.querySelector('.books__image');
    const bookEffect = book.querySelector('.books__effect');
    const pages = book.querySelectorAll('.books__page');
    const bookLight = book.querySelector('.books__light');
    const bookShadow = bookData.shadowRef.value;

    if (bookIndex !== 'side') { // Regular books
      gsap.set(bookImage, {
        boxShadow: "var(--book-shadow) 10px 5px 20px, var(--book-shadow) 20px 0px 30px",
      });
      gsap.set(bookLight, { opacity: 0.1 });
      gsap.set(pages, { x: 0 });

      const hoverIn = gsap.timeline({
        paused: true,
        defaults: { duration: 0.7, ease: 'power2.out' },
      });

      hoverIn.to(bookImage, {
        translateX: -10,
        scaleX: 0.96,
        boxShadow: "var(--book-shadow-strong) 20px 5px 20px, var(--book-shadow) 30px 0px 30px",
      }, 0);

      if (bookShadow) {
        hoverIn.to(bookShadow, { width: 130, opacity: 0.8 }, 0);
      }

      hoverIn.to(bookEffect, { marginLeft: 10 }, 0);
      hoverIn.to(bookLight, { opacity: 0.2 }, 0);

      if (pages.length) {
        hoverIn.to(pages[0], { x: '2px', ease: 'power1.inOut' }, 0);
        hoverIn.to(pages[1], { x: '0px', ease: 'power1.inOut' }, 0);
        hoverIn.to(pages[2], { x: '-2px', ease: 'power1.inOut' }, 0);
      }
      bookTimelines[bookIndex] = hoverIn;

    } else { // Side book
      gsap.set(book, {
          y: 0,
          boxShadow: "var(--book-shadow) 5px -3px 10px, var(--book-shadow) 10px 0px 15px",
        });
        if (bookShadow) {
            gsap.set(bookShadow, { width: 25, opacity: 1 });
        }


      const sideHoverIn = gsap.timeline({
        paused: true,
        defaults: { duration: 0.5, ease: 'power2.out' },
      });

      sideHoverIn.to(book, {
        y: -5,
        boxShadow: "var(--book-shadow) 8px -5px 15px, var(--book-shadow) 15px 0px 20px",
      }, 0);

      if (bookShadow) {
        sideHoverIn.to(bookShadow, { width: 35, opacity: 0.8 }, 0);
      }
      bookTimelines[bookIndex] = sideHoverIn;
    }
  });

  // Initialize SplitType for all descriptions
  const descriptionsElements = [desc0.value, descSide.value, desc1.value, desc2.value].filter(Boolean); // Filter out nulls
  descriptionsElements.forEach((desc) => {
    if (window.SplitType) {
      try {
        new SplitType(desc.querySelector('h3'), { types: 'lines', lineClass: 'line' });
        new SplitType(desc.querySelector('.author'), { types: 'lines', lineClass: 'line' });
        new SplitType(desc.querySelector('.lines-animation p'), { types: 'lines', lineClass: 'line' });

        desc.querySelectorAll('.line').forEach(line => {
          const content = line.innerHTML;
          line.innerHTML = `<span class="line-inner">${content}</span>`;
        });
      } catch (e) {
        console.error("Error with SplitType:", e);
      }
    }
  });

  // Set the default open book (index 2)
  const defaultBookInfo = allBooks.find(book => book.index === 2);
  if (defaultBookInfo && overlayTextRef.value) {
    overlayTextRef.value.textContent = defaultBookInfo.title;
    gsap.to(overlayRef.value, { opacity: 1, duration: 0.3 });
  }

  // Play the default book's animation
  if (bookTimelines[2]) {
    bookTimelines[2].play();
  }

  // Initialize the default book's text animation
  updateDescription(2);
});
</script>

<style scoped>
    /* Original idea and inspiration for the Book Cover Effect by https://codepen.io/realvjy */

    :root {
      /* Light mode variables */
      --bg-color: #ffffff;
      --text-color: #333333;
      --title-color: #000000;
      --overlay-text-color: rgba(0, 0, 0, 0.05);
      --shelf-bg: linear-gradient(to bottom, #f0f0f0, #e0e0e0);
      --shelf-edge-top: rgba(255, 255, 255, 0.01);
      --shelf-edge-bottom: rgba(0, 0, 0, 0.1);
      --book-back-cover: #111111;
      --book-page: #ffffff;
      --book-page-border: rgba(0, 0, 0, 0.2);
      --book-shadow: rgba(0, 0, 0, 0.15);
      --book-shadow-strong: rgba(0, 0, 0, 0.35);
      --side-book-bg: linear-gradient(to right, #444 0%, #666 50%, #444 100%);
      --side-book-text: #f0f0f0;
      --side-book-decoration: rgba(255, 255, 255, 0.3);
      --toggle-dot: #333333;
    }

    .dark-mode {
      /* Dark mode variables */
      --bg-color: #121212;
      --text-color: #e0e0e0;
      --title-color: #ffffff;
      --overlay-text-color: rgba(255, 255, 255, 0.05);
      --shelf-bg: linear-gradient(to bottom, #2a2a2a, #1a1a1a);
      --shelf-edge-top: rgba(255, 255, 255, 0.03); /* Lighter in dark mode */
      --shelf-edge-bottom: rgba(0, 0, 0, 0.3);
      --book-back-cover: #ffffff; /* Changed to white in dark mode */
      --book-page: #ffffff; /* Changed to white in dark mode */
      --book-page-border: rgba(0, 0, 0, 0.2);
      --book-shadow: rgba(0, 0, 0, 0.3);
      --book-shadow-strong: rgba(0, 0, 0, 0.5);
      --side-book-bg: linear-gradient(to right, #222 0%, #444 50%, #222 100%);
      --side-book-text: #ffffff;
      --side-book-decoration: rgba(255, 255, 255, 0.2);
      --toggle-dot: #ffffff;
    }

    @font-face {
      font-family: "Cabinet Grotesk";
      font-style: normal;
      font-weight: 800;
      src:
        local("Cabinet Grotesk"),
        url("https://fonts.cdnfonts.com/s/85514/CabinetGrotesk-Extrabold.woff")
          format("woff");
    }

    @font-face {
      font-family: "Cabinet Grotesk";
      font-style: normal;
      font-weight: 400;
      src:
        local("Cabinet Grotesk"),
        url("https://fonts.cdnfonts.com/s/85514/CabinetGrotesk-Medium.woff")
          format("woff");
    }

    body {
      background-color: var(--bg-color);
      margin: 0;
      padding: 0;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      font-family: "Cabinet Grotesk", sans-serif;
      letter-spacing: -0.02em;
      color: var(--text-color);
      transition:
        background-color 0.5s ease,
        color 0.5s ease;
    }

    /* Theme toggle dot */
    .theme-toggle {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: var(--toggle-dot);
      cursor: pointer;
      z-index: 100;
      transition: background-color 0.3s ease;
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
      opacity: 1; /* Visible by default */
      transition: opacity 0.3s ease;
      pointer-events: none;
    }

    .book-title-text {
      font-family: "Cabinet Grotesk", sans-serif;
      font-weight: 800;
      font-size: 20rem;
      color: var(--overlay-text-color);
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
      height: 500px; /* Increased height to accommodate descriptions */
      margin: 0 auto;
      display: flex;
      justify-content: center;
      z-index: 1;
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
        /* Subtle top highlight */
        0px -1px 1px rgba(255, 255, 255, 0.15),
        /* Close shadow */ 0px 2px 3px rgba(0, 0, 0, 0.12),
        /* Medium shadow */ 0px 5px 10px rgba(0, 0, 0, 0.08),
        /* Larger shadow */ 0px 15px 20px rgba(0, 0, 0, 0.06),
        /* Very large diffused shadow */ 0px 25px 30px rgba(0, 0, 0, 0.04),
        /* Extra large ambient shadow */ 0px 40px 60px rgba(0, 0, 0, 0.2),
        /* Massive soft shadow for dramatic effect */ 0px 60px 80px
          rgba(0, 0, 0, 0.12);
      transition:
        background 0.5s ease,
        box-shadow 0.5s ease;
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
      transition:
        background 0.5s ease,
        border-color 0.5s ease;
    }

    /* Front Cover Image */
    .books__image {
      line-height: 0;
      position: relative;
      border-radius: 2px 6px 6px 2px;
      height: 100%;
      box-shadow:
        var(--book-shadow) 10px -5px 20px,
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
        rgba(255, 255, 0.5) 100%
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
      box-shadow:
        var(--book-shadow) 5px -3px 10px,
        var(--book-shadow) 10px 0px 15px;
      transform-origin: bottom center;
      will-change: transform, box-shadow;
      transition:
        background 0.5s ease,
        box-shadow 0.5s ease;
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
      background-color: var(--side-book-decoration);
      transition: background-color 0.5s ease;
    }

    .side-book__decoration:nth-child(2) {
      top: auto;
      bottom: 20px;
    }

    /* Contact shadow where book meets shelf */
    .book-shadow {
      position: absolute;
      bottom: 285px; /* Adjusted to match new shelf position */
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 2rem;
      z-index: 15;
      /* Between books and shelf */
    }

    .book-shadow__item {
      width: 120px;
      height: 2px;
      background: radial-gradient(
        ellipse at center,
        var(--book-shadow) 0%,
        rgba(0, 0, 0, 0) 70%
      );
      border-radius: 50%;
      will-change: width, opacity;
      transition: background 0.5s ease;
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
      height: 200px; /* Fixed height for descriptions */
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
      color: var(--text-color);
      transition:
        opacity 0.3s ease,
        visibility 0.3s ease,
        color 0.5s ease;
    }

    .book-description.active {
      opacity: 1;
      visibility: visible;
    }

    .book-description h3 {
      font-weight: 800;
      font-size: 1.8rem;
      margin-bottom: 0.5rem;
      color: var(--title-color);
      transition: color 0.5s ease;
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
      transform: translateY(
        0
      ); /* Changed from 100% to make text visible by default */
      opacity: 1; /* Changed from 0 to make text visible by default */
    }
</style> 