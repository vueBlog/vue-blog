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
if (OS.phone || OS.ipad) {
  const url = `${location.origin}${location.pathname.replace('/vue-blog', '/blogNuxtM')}${location.search}${location.hash}`
  location.href = url
}
