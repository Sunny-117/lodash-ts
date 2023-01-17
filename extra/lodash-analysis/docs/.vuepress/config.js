const fs = require('fs');
const path = require('path');
const internal_filePath = path.resolve('./docs/internal/');
const export_filePath = path.resolve('./docs/export/');
const other_filePath = path.resolve('./docs/other/')

function handleChildren(basePath, arr){
  return arr.map(item => {
    return `/${basePath}/${item}`
  })
}

const internal_path = fs.readdirSync(internal_filePath).filter(item => item !== 'README.md')
const export_path = fs.readdirSync(export_filePath).filter(item => item !== 'README.md')
const other_path = fs.readdirSync(other_filePath).filter(item => item !== 'README.md')


module.exports = {
  base: '/lodash-analysis/',
  dest: 'dist',
  title: 'Lodash 源码分析',
  description: 'Analysis lodash.js deeply',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    ['link', {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css'
    }],
    ['link', {
      rel: "stylesheet",
      href: "https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/2.10.0/github-markdown.min.css"
    }]
  ],
  markdown: {
    extendMarkdown: md => {
      md.set({
        html: true
      })
      md.use(require('markdown-it-katex'))
    }
  },
  themeConfig: {
    smoothScroll: true,
    repo: 'Underglaze-Blue/lodash-analysis',
    editLinks: true,
    docsDir: 'docs',
    editLinkText: ' 在 GitHub 上编辑此页',
    lastUpdated: ' 上次更新',
    docsBranch: 'main',
    searchMaxSuggestions: 10,
    nav: [
      {
        text: 'Bolg',
        link: 'https://underglaze-blue.github.io/blog/'
      },
      {
        text: 'Lodash',
        items: [
          { text: 'Lodash文档', link: 'https://www.lodashjs.com/' },
          { text: 'Lodash GitHub', link: 'https://github.com/lodash/lodash' }
        ]
      },
      {
        text: 'Mozilla',
        link: 'https://developer.mozilla.org/zh-CN/'
      }
    ],
    sidebar: [
      {
        title: 'Start',
        collapsable: false,
        sidebarDepth: 0,
        children: [
          '/start/start.md'
        ]
      },
      {
        title: 'Internal',   // 必要的
        collapsable: true,
        sidebarDepth: 0,
        children: handleChildren('internal', internal_path)
      },
      {
        title: 'Export',
        collapsable: true,
        sidebarDepth: 0,
        children: handleChildren('export', export_path),
      },
      {
        title: 'Other',
        collapsable: false,
        sidebarDepth: 0,
        children: handleChildren('other', other_path)
      }
    ]
  },
  // plugins: ["@vuepress/medium-zoom"]
  plugins: {
    '@vuepress/medium-zoom': {
      selector: '.content__default img',
      // medium-zoom options here
      // See: https://github.com/francoischalifour/medium-zoom#options
      options: {
        margin: 16,
        background: '#000'
      }
    }
  }
}
