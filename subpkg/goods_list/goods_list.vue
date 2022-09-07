<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods-detail/goods-detail?id=${item.goods_id}`" s v-for="item in goods"
      :key="item.goods_id" :price="item.goods_price | getFixed" :title="item.goods_name"
      :thumb="item.goods_small_logo || defaultPic">
    </van-card>
  </view>
</template>

<script>
  import {
    getGoodsList
  } from '../../api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: 0,
        idLoading: false,
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
      }
    },
    onLoad({
      query
    }) {
      this.queryData.query = query
      this.getGoodsList()
    },
    methods: {
      async getGoodsList(stopPullDown) {
        this.idLoading = true
        const res = await getGoodsList(this.queryData)
        this.idLoading = false
        this.goods = [...this.goods, ...res.goods]
        this.total = res.total
        stopPullDown && stopPullDown()
      }
    },
    onPullDownRefresh() {
      this.queryData = {
          query: this.queryData.query,
          cid: '',
          pagenum: 1,
          pagesize: 10
        },
        this.goods = [],
        this.total = 0,
        this.getGoodsList(() => {
          uni.stopPullDownRefresh()
        })
    },
    onReachBottom() {
      if (this.queryData.pagenum * this.queryData.pagesize > this.total) return toast('数据加载完毕')
      if (this.idLoading) return
      this.queryData.pagenum++
      this.getGoodsList()
    }
  }
</script>

<style>

</style>
