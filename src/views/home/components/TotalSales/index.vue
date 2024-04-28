<template>
  <div class="common-card">
    <common-card
    title="累计销售额"
    :value="salesToday">
    <!-- :value="'¥' +salesToday" -->
      <!-- 默认插槽 -->
      <template>
        <div class="compare-wrapper">
          <div class="compare">
            <span>日同比</span>
            <span class="emphasis">{{  salesGrowthLastDay }}</span>
            <div class="increase" />
          </div>
          <div class="compare">
            <span>月同比</span>
            <span class="emphasis">{{ salesGrowthLastMonth }}</span>
            <div class="decrease" />
          </div>
        </div>
      </template>
      <!-- name="footer"插槽 -->
      <template v-slot:footer>
        <span>昨日销售额</span>
        <span class="emphasis">{{ salesLastDay }}</span>
      </template>
    </common-card>
  </div>
</template>

<script>
import commonCardMixin from '@/mixins/commonCardMixin'
import commonDataMixin from '@/mixins/commonDataMixin'
export default {
  name: 'TotalSales',
  //   components: {
  //     CommonCard
  //   }相当于使用下面的
  mixins: [commonCardMixin, commonDataMixin]
}
</script>
<style lang="scss" scoped>
// .emphasis{
//     margin-left: 5px;
//     color: #333;
//     font-weight: 700;
//     font-size: 12px;
// }
.compare-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .compare {
    margin-top: 3px;
    display: flex;
    font-size: 12px;
    color: #666;
    display: flex;
    align-items: center;
  }
}
</style>
