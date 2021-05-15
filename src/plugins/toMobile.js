/* eslint-disable no-useless-escape */
/* eslint-disable no-mixed-operators */
// 移动端跳转
var OS = (function () {
  var a = navigator.userAgent
  var b = /(?:Android)/.test(a)
  var d = /(?:Firefox)/.test(a)
  var e = /(?:Mobile)/.test(a)
  var f = b && e
  var g = b && !f
  var c = /(?:iPad.*OS)/.test(a)
  var h = !c && /(?:iPhone\sOS)/.test(a)
  var k = c || g || /(?:PlayBook)/.test(a) || d && /(?:Tablet)/.test(a)
  a = !k && (b || h || /(?:(webOS|hpwOS)[\s\/]|BlackBerry.*Version\/|BB10.*Version\/|CriOS\/)/.test(a) || d && e)
  return {
    android: b,
    androidPad: g,
    androidPhone: f,
    ipad: c,
    iphone: h,
    tablet: k,
    phone: a
  }
}())

// 有些页面只有PC端有，移动端没有，不需要跳转移动端的页面
const PCPathname = [
  'signIn', // 登录页
  'editor', // 写文章页面
  'admin' // 个人中心相关页面
]

/**
 * 是否属于PC端独有页面
 * @param {*} PCPathname PC端独有页面的特殊标识字段数组
 * @param {*} location 当前location
 */
function isBelongPCPathname (PCPathname, location) {
  let flag = false
  const pathname = location.pathname
  for (let index = 0; index < PCPathname.length; index++) {
    const element = PCPathname[index]
    if (pathname.indexOf(element) !== -1) {
      flag = true
      break
    }
  }
  return flag
}

if (process.env.NODE_ENV === 'production' && (OS.phone || OS.ipad)) {
  if (!isBelongPCPathname(PCPathname, location)) {
    const url = `${location.origin}${location.pathname.replace('/vue-blog', '/blogNuxtM')}${location.search}${location.hash}`
    location.href = url
  }
}
