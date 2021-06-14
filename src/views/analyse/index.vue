<template>
  <div>
    <div class="charts" v-show="!showDetail">
      <div class="topic">
        <span class="title">统计分析</span>
        <span>
          <a-select v-model="form.organize" placeholder="请选择机构" style="width:160px;">
            <a-select-option value="lucy">
              Lucy
            </a-select-option>
            <a-select-option value="Lily">
              Lily
            </a-select-option>
          </a-select>
          <a-range-picker v-model="form.date" style="margin:0 10px" @change="onChange" />
          <a-button type="primary">查询</a-button>
        </span>
      </div>
      <a-card>
        <div class="theme">
          <span class="title"><a-icon type="retweet" /> 合作达成量</span>
          <span class="detail" @click="toDetail('hzdcl')">详情 <a-icon type="right-circle" /></span>
        </div>
        <div id="hzdcl" style="height:400px"></div>
      </a-card>
      <a-card style="margin-top:15px">
        <div class="theme">
          <span class="title"><a-icon type="apartment" /> 机构数量</span>
          <span class="detail" @click="toDetail('fwjg')">详情 <a-icon type="right-circle" /></span>
        </div>
        <div id="jgsl" style="height:400px"></div>
      </a-card>
      <div class="bottom">
        <div class="lt">
          <a-card style="margin-bottom:15px">
            <div class="tp">
              <div class="theme">
                <span class="title"><a-icon type="usergroup-add" /> 用户分布</span>
              </div>
              <div id="yhfb" style="height:300px"></div>
            </div>
          </a-card>
          <a-card>
            <div class="bt">
              <div class="theme">
                <span class="title"><a-icon type="smile" /> 满意度分布</span>
                <span class="detail" @click="toDetail('myd')">详情 <a-icon type="right-circle" /></span>
              </div>
              <div id="mydfb" style="height:300px"></div>
            </div>
          </a-card>
        </div>
        <div class="rt">
          <a-card>
            <div class="theme">
              <span class="title"><a-icon type="heart" /> 服务分布</span>
            </div>
            <div id="fwfb" style="height:690px"></div>
          </a-card>
        </div>
      </div>
    </div>
    <a-card v-show="showDetail">
      <div class="topic">
        <span class="title">{{ currentTitle }}</span>
        <a-button type="primary" @click="back">返回</a-button>
      </div>
      <!-- 列表 -->
      <a-table :columns="columns" :data-source="data" :pagination="pagination" style="margin-top:30px">
        <span slot="doing" slot-scope="text" style="color:green;">
          {{ text }}
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import * as echarts from 'echarts/core'
import {
    TooltipComponent,
    GridComponent,
    LegendComponent
} from 'echarts/components'
import {
    LineChart,
    BarChart,
    PieChart
} from 'echarts/charts'
import {
    CanvasRenderer
} from 'echarts/renderers'

echarts.use(
    [GridComponent, TooltipComponent, LegendComponent, LineChart, BarChart, PieChart, CanvasRenderer]
)
export default {
  data () {
    return {
      showDetail: false,
      form: {
        organize: undefined,
        date: undefined
      },
      currentTitle: '',
      titles: {
        'hzdcl': '合作达成量',
        'fwjg': '服务机构数量',
        'myd': '满意度情况'
      },
      columns: [],
      // 合作达成量
      hzdclColumns: [
        {
          title: '序号',
          customRender: (text, record, index) => `${(this.pagination.current - 1) * this.pagination.pageSize + index + 1}`
        },
        {
          title: '涉税服务机构',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '所属税务机关',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '税务代理人',
          dataIndex: 'agent',
          key: 'agent'
        },
        {
          title: '证件类型',
          key: 'tags',
          dataIndex: 'tags'
        },
        {
          title: '证件号码',
          key: 'num',
          dataIndex: 'num'
        }
      ],
      // 服务机构数量
      fwjgColumns: [
        {
          title: '序号',
          customRender: (text, record, index) => `${(this.pagination.current - 1) * this.pagination.pageSize + index + 1}`
        },
        {
          title: '涉税服务机构',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '所属税务机关',
          dataIndex: 'age',
          key: 'age'
        },
        {
          title: '代理人数',
          dataIndex: 'agent',
          key: 'agent'
        },
        {
          title: '合作达成量',
          key: 'tags',
          dataIndex: 'tags'
        },
        {
          title: '已完成',
          key: 'finish',
          dataIndex: 'finish'
        },
        {
          title: '进行中',
          key: 'doing',
          dataIndex: 'doing',
          scopedSlots: { customRender: 'doing' }
        }
      ],
      // 满意度列
      mydColumns: [
        {
          title: '序号',
          customRender: (text, record, index) => `${(this.pagination.current - 1) * this.pagination.pageSize + index + 1}`
        },
        {
          title: '名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '用户类型',
          dataIndex: 'type',
          key: 'type'
        },
        {
          title: '联系方式',
          dataIndex: 'tel',
          key: 'tel'
        },
        {
          title: '满意度',
          key: 'satisfy',
          dataIndex: 'satisfy',
          customRender: function (text, record, index) {
               let label
               switch (text) {
                   case 0:
                     label = '不满意'
                     break
                   case 1:
                     label = '一般'
                     break
                   case 2:
                     label = '满意'
                     break
                   default:
                     label = text
                     break
               }

               return label
          }
        },
        {
          title: '详情',
          dataIndex: 'detail',
          key: 'detail',
          scopedSlots: { customRender: 'detail' }
        }
      ],
      data: [],
      pagination: {
        total: 1000,
        current: 1,
        pageSize: 10
      }
    }
  },
  mounted () {
    this.initLine()
    this.initBar()
    this.initPie()
    this.initCirclePie('yhfb', {
          data: [
            {
              name: '机构数量'
            }, {
              name: '普通纳税人'
            }, {
              name: '企业数量'
            }
          ]
    })
    this.initCirclePie('mydfb', {
          data: [
            {
              name: '不满意'
            }, {
              name: '满意'
            }, {
              name: '一般'
            }
          ]
    })
  },
  methods: {
   toDetail (label) {
     this.showDetail = true
     this.currentTitle = this.titles[label]
     this.columns = this[`${label}Columns`]
     // 此处异步获取对应数据
     this.data = []
   },
   back () {
     this.showDetail = false
   },
   initLine () {
    var chartDom = document.getElementById('hzdcl')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      grid: {
        left: 40,
        right: 40,
        bottom: 30
      },
      xAxis: {
          type: 'category',
          boundaryGap: true,
          data: ['05/16', '05/17', '05/18', '05/19', '05/20', '05/21', '05/22', '05/23', '05/24', '05/25', '05/26', '05/27', '05/28', '05/29', '05/30', '05/31'],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          label: {
            offset: 30
          }
      },
      yAxis: {
          type: 'value',
          name: '户',
          splitLine: {
            show: true
          }
      },
      series: [{
          data: [901, 934, 1290, 820, 932, 901, 934, 1290, 1330, 901, 934, 1290, 1320, 932, 901, 934],
          type: 'line',
          smooth: true,
          showSymbol: false,
          lineStyle: {
            color: '#1890ff'
          },
          areaStyle: {
            color: 'rgba(24,144,155,0.1)'
          }
      }]
    }
    option && myChart.setOption(option)
   },
   initBar () {
      var chartDom = document.getElementById('jgsl')
      var myChart = echarts.init(chartDom)
      var option

      option = {
          grid: {
            left: 40,
            right: 40,
            bottom: 30
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
          },
          xAxis: {
              type: 'category',
              data: ['05/16', '05/17', '05/18', '05/19', '05/20', '05/21', '05/22', '05/23', '05/24', '05/25', '05/26', '05/27', '05/28', '05/29', '05/30', '05/31'],
              axisTick: {
                  show: false
              },
              axisLine: {
                show: false
              }
          },
          yAxis: {
              type: 'value',
              name: '户'
          },
          series: [
              {
                  name: '直接访问',
                  type: 'bar',
                  itemStyle: {
                    color: '#1890ff'
                  },
                  barWidth: '30%',
                  data: [901, 934, 1290, 820, 932, 901, 934, 1290, 1330, 901, 934, 1290, 1320, 932, 901, 934]
              }
          ]
      }

      option && myChart.setOption(option)
   },
   initPie () {
      var chartDom = document.getElementById('fwfb')
      var myChart = echarts.init(chartDom)
      var option

      option = {
        color: ['#c4deff', '#9cc3ff', '#73a6ff', '#4b87ff', '#3465d9', '#2248b3', '#14308c', '#0d1f66'],
        legend: {
            icon: 'circle',
            bottom: 30,
            width: '60%',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 30,
            formatter: function (name) {
                var data = option.series[0].data
                var total = 0
                var tarValue
                for (var i = 0; i < data.length; i++) {
                  total += data[i].value
                  if (data[i].name === name) {
                    tarValue = data[i].value
                  }
                }
                var v = tarValue
                var p = parseFloat(((tarValue / total) * 100).toFixed(2))
                return `${name}  ${v}人(${p}%)`
            }
        },
        series: [
            {
              type: 'pie',
              radius: '50%',
              center: ['50%', '40%'],

              label: {
                show: false
              },
              data: [{
                name: '涉税鉴证',
                value: 120
              }, {
                name: '纳税情况审查',
                value: 120
              }, {
                name: '税收策划',
                value: 120
              }, {
                name: '专业税务顾问',
                value: 240
              }, {
                name: '一般税务咨询',
                value: 120
              }, {
                name: '纳税申报代理',
                value: 120
              }, {
                name: '其他税务事项代理',
                value: 120
              }, {
                name: '其他税务服务',
                value: 120
              }],
              emphasis: {
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
        ]
      }

      option && myChart.setOption(option)
   },
   initCirclePie (id, legend) {
      var chartDom = document.getElementById(id)
      var myChart = echarts.init(chartDom)
      var option

      option = {
        tooltip: {
            trigger: 'item'
        },
        legend,
        color: ['#c4deff', '#3465d9', '#0d1f66'],
        series: [
            {
              type: 'pie',
              radius: ['40%', '70%'],
              data: [1, 2, 3],
              itemStyle: {
                borderColor: '#fff',
                borderWidth: 2
              }
            }
        ]
      }

      option && myChart.setOption(option)
   },
   onChange () {

   }
  }
}
</script>

<style lang="less" scoped>
.topic{
  display:flex;
  justify-content:space-between;
  height:18px;
  line-height:18px;
  border-left:3px solid #1890ff;
  padding-left:10px;
  letter-spacing:1px;
  margin-bottom:30px;
  .title{
    font-weight:bold;
    font-size:16px;
  }
}
.theme{
  .title{
   font-size:16px;
   font-weight:bold;
  }
  display:flex;
  justify-content:space-between;
}
.bottom{
  margin:15px 0;
  display:flex;
  justify-content:space-between;
  .lt,.rt{
    flex:1;
  }
  .lt{
    margin-right:15px;
  }
}
.detail{
  color: #1890ff;
  cursor:pointer;
}
</style>
