<template>
  <el-tabs v-model="activeName" @tab-click="tabClick">
    <el-tab-pane label="访问量概览" name="first">
      <div>
        <span>查看时间段：</span>
        <el-date-picker
          v-model="selectDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="selectDateChange">
        </el-date-picker>
      </div>
      <div id="echart" style="height: 600px;"></div>
    </el-tab-pane>
    <el-tab-pane label="访问量详情" name="second">
      <div style="margin: 0 0 15px 0;">
        <span>查看时间段：</span>
        <el-date-picker
          v-model="selectDate"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          @change="selectDateChange">
        </el-date-picker>
      </div>
      <el-table
        :data="viewDetails"
        stripe
        border
        height="350"
        style="width: 100%">
        <el-table-column
          prop="time"
          label="日期"
          width="220">
        </el-table-column>
        <el-table-column
          prop="routeFrom"
          label="from路由"
          width="220">
        </el-table-column>
        <el-table-column
          prop="routeTo"
          label="to路由">
        </el-table-column>
      </el-table>
      <div style="margin: 15px 0 0;">
        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :total="total"
          :page-size="limit"
          :current-page="page"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { apiSelectViews, apiSelectViewsDetail } from './../service/admin'
const echarts = require('echarts')

export default {
  name: 'AdminViews',
  data () {
    return {
      monthStar: '',
      monthEnd: '',
      myChart: null,
      activeName: 'first',
      selectDate: [],
      viewDetails: [],
      total: 0,
      limit: 20,
      page: 1
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('echart'))
    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: []
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '访问量',
          type: 'line',
          stack: '总量',
          areaStyle: {},
          data: []
        }
      ]
    }
    this.myChart.setOption(option)
    this.monthStar = this.$moment().month(this.$moment().month()).startOf('month').format('YYYY-MM-DD')
    this.monthEnd = this.$moment().month(this.$moment().month()).endOf('month').format('YYYY-MM-DD')
    this.selectDate = [this.monthStar, this.monthEnd]
    this.apiSelectViewsMethod(...this.selectDate)
    this.apiSelectViewsDetailMethod(...this.selectDate)
  },
  methods: {
    async apiSelectViewsMethod (start, end) {
      this.myChart.showLoading()
      let result = await apiSelectViews({
        start,
        end
      })
      if (result.isok) {
        this.myChart.hideLoading()
        const xData = []
        const seriesData = []
        result.data.map(item => {
          xData.push(item.time)
          seriesData.push(item.views)
        })
        this.myChart.setOption({
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: xData
            }
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: seriesData
            }
          ]
        })
      }
    },
    async apiSelectViewsDetailMethod (start, end, page) {
      let result = await apiSelectViewsDetail({
        start,
        end,
        limit: this.limit,
        page: page || 1
      })
      if (result.isok) {
        this.viewDetails = result.data.selectData
        this.total = result.data.total
      }
    },
    tabClick () {
      console.log(this.activeName)
    },
    selectDateChange () {
      this.myChart.showLoading()
      this.apiSelectViewsMethod(...this.selectDate)
      this.apiSelectViewsDetailMethod(...this.selectDate, this.page)
    },
    handleCurrentChange (val) {
      this.apiSelectViewsDetailMethod(...this.selectDate, val)
      this.page = val
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
