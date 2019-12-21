<template>
  <div id="echart" style="height: 600px;"></div>
</template>

<script>
import { apiSelectViews } from './../service/admin'
const echarts = require('echarts')

export default {
  name: 'AdminViews',
  data () {
    return {
      monthStar: '',
      monthEnd: '',
      myChart: null
    }
  },
  mounted () {
    this.myChart = echarts.init(document.getElementById('echart'))
    const option = {
      title: {
        text: '本月访问量'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
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
    this.myChart.showLoading()
    this.monthStar = this.$moment().month(this.$moment().month()).startOf('month').format('YYYY-MM-DD')
    this.monthEnd = this.$moment().month(this.$moment().month()).endOf('month').format('YYYY-MM-DD')
    this.apiSelectViewsMethod()
  },
  methods: {
    async apiSelectViewsMethod () {
      let result = await apiSelectViews({
        start: this.monthStar,
        end: this.monthEnd
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
