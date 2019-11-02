<template>
  <el-container class="list">
    <el-aside width="268px">
      <aside-card
        :cardType="1"
        title="最新文章"></aside-card>
    </el-aside>
    <el-main class="content">
      <div class="content-header clearfix">
        <el-checkbox v-model="justOriginal">仅看原创</el-checkbox>
        <div class="content-header_select fr">
          <span>文章排序：</span>
          <el-select v-model="headerSelectValue" placeholder="请选择">
            <el-option
              v-for="item in headerSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="content-list">
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
        <list-article></list-article>
      </div>
      <div class="content-footer">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="1000">
        </el-pagination>
      </div>
    </el-main>
  </el-container>
</template>

<script>
import AsideCard from './../components/AsideCard.vue'
import ListArticle from './../components/ListArticle.vue'

export default {
  name: 'list',
  data () {
    return {
      justOriginal: false,
      headerSelectValue: '0',
      headerSelect: [
        {
          value: '0',
          label: '默认'
        }, {
          value: '1',
          label: '按访问量'
        }, {
          value: '2',
          label: '按点赞数'
        }
      ]
    }
  },
  components: {
    AsideCard,
    ListArticle
  }
}
</script>

<style scoped lang="scss">
@import './../style/views/home.scss';
</style>
