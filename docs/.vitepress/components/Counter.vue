<template>
    <div>
      <h3>这是一个 Vue Demo</h3>
      <p>计数器: {{ count }}</p>
      <button @click="increment">增加</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  const count = ref(0)
  const increment = () => count.value++
  </script>
  
  <style scoped>
  button {
    padding: 8px 16px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  </style>
  