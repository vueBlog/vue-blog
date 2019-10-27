<template>
  <div class="item_box">
    <router-link class="header" to="">
      <el-tag class="header_icon">原创</el-tag>
      <h2>Express4 环境变量配置</h2>
    </router-link>
    <router-link class="content" to="">在进项项目开发中经常会遇到不同环境切换的问题，比如说开发环境和正式环境对应不同服务器的 mysql ，总不能每次切换不同环境的时候修改代码，这样既容易出错，也不利于代码维护，所以这个时候就需要用到环境变量来进行配置了。开发环境在开发环境中，我们一般链接的是本地服务器的 mysql ，这个时候我...</router-link>
    <div class="footer clearfix">
      <div class="footer_item">2019-10-17 08:35:58</div>
      <div class="footer_line"></div>
      <div class="footer_item">views <span>9</span></div>
      <div class="footer_line"></div>
      <div class="footer_item">stars <span>1</span></div>
      <div class="footer_editor fr">
        <div class="footer_item">编辑</div>
        <div class="footer_line"></div>
        <div class="footer_item">删除</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import './../style/components/list-article.scss';
</style>
