import Mock from 'mockjs'
const Random = Mock.Random

let data = []
data.push({
  'title': '最新文章',
  'type': 1,
  'info|1-10': [
    {
      'id|1-100': 100,
      'title': function () {
        return Random.ctitle(3, 5)
      },
      'num|1-100': 100
    }
  ]
})
data.push({
  'title': '博客专栏',
  'type': 2,
  'info|1-10': [{
    'id|1-100': 100,
    'title': function () {
      return Random.ctitle(3, 5)
    },
    'num|1-100': 100
  }]
})
data.push({
  'title': '热门文章',
  'type': 3,
  'info|1-10': [{
    'id|1-100': 100,
    'title': function () {
      return Random.ctitle(3, 5)
    },
    'num|1-100': 100
  }]
})
data.push({
  'title': '博客归档',
  'type': 4,
  'info|1-10': [{
    'id|1-100': 100,
    'title': function () {
      return Random.ctitle(3, 5)
    },
    'num|1-100': 100
  }]
})

export default {
  isok: true,
  data: {
    list: data
  },
  msg: ''
}
