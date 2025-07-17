const fs = require('fs')
const path = require('path')
const basePath = '/MoseBlog' 
// Markdown 日记根目录
const baseDir = path.resolve(__dirname, '../docs/daily')
// sidebar 输出路径
const sidebarPath = path.resolve(__dirname, '../docs/.vitepress/sidebar.json')
// index.md 输出路径
const indexMdPath = path.resolve(__dirname, '../docs/daily/index.md')

// 如果 .vitepress 目录不存在，先创建
const vitepressDir = path.dirname(sidebarPath)
if (!fs.existsSync(vitepressDir)) {
  fs.mkdirSync(vitepressDir, { recursive: true })
}

// 构建 sidebar 对象
const sidebar = [
  {
    text: 'daily',
    items: [],
  },
]

// 获取所有月份目录
const months = fs
  .readdirSync(baseDir)
  .filter(f => fs.statSync(path.join(baseDir, f)).isDirectory())
  .sort()

// 最新日记的链接
let latestLink = ''
let latestText = ''

months.forEach(month => {
  const monthDir = path.join(baseDir, month)
  const files = fs
    .readdirSync(monthDir)
    .filter(f => f.endsWith('.md'))
    .sort()

  const items = files.map(file => {
    const text = file.replace('.md', '')
    const link = `/daily/${month}/${text}`
    // 记录最新的
    latestLink = "/MoseBlog" + link
    latestText = text
    return { text, link }
  })

  if (items.length > 0) {
    sidebar[0].items.push({
      text: month,
      items,
    })
  }
})

// ✅ 写入 sidebar.json
fs.writeFileSync(sidebarPath, JSON.stringify(sidebar, null, 2), 'utf-8')
console.log('✅ sidebar.json 生成成功')

// ✅ 写入 index.md
const indexMdContent = `\
<script setup>
if (typeof window !== 'undefined') {
  window.location.href = '${latestLink}'
}
</script>

正在跳转到最新日记：${latestText}
`
fs.writeFileSync(indexMdPath, indexMdContent, 'utf-8')
console.log('✅ docs/daily/index.md 生成成功，跳转到最新日记：' + latestLink)
