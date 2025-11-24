module.exports = {
  // 基础格式化选项
  semi: false,                    // 不使用分号
  singleQuote: true,             // 使用单引号
  tabWidth: 2,                   // 缩进宽度
  useTabs: false,                // 使用空格而不是tab
  printWidth: 80,                // 每行最大字符数
  endOfLine: 'lf',               // 换行符类型
  
  // 尾随逗号
  trailingComma: 'es5',          // 在ES5中有效的地方添加尾随逗号
  
  // 括号和空格
  arrowParens: 'avoid',          // 箭头函数参数只有一个时省略括号
  bracketSpacing: true,          // 对象字面量的括号间添加空格
  bracketSameLine: false,        // 将>放在下一行
  
  // Vue特定配置
  vueIndentScriptAndStyle: false, // Vue文件中不缩进<script>和<style>标签
  
  // HTML相关
  htmlWhitespaceSensitivity: 'css', // HTML空白敏感性
  
  // Markdown相关
  proseWrap: 'preserve',         // Markdown文本换行保持原样
  
  // 嵌入式语言格式化
  embeddedLanguageFormatting: 'auto'
}