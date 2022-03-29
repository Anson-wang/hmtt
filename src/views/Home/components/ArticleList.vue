<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <ArticleItem
        v-for="obj in list"
        :key="obj.art_id"
        :artObj="obj"
      ></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import ArticleItem from "../../../components/ArticleItem.vue"
import { getAllArticleListAPI } from '@/api'
export default {
  components: {
    ArticleItem
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false
    }
  },
  props: {
    channelId: Number
  },
  created() {
    this.getArticle()
  },
  methods: {
    async getArticle() {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: (new Date()).getTime()
      })
      this.list = res?.data?.data?.results || []
    },
    onLoad() {}
  }

}
</script>

<style lang="less" scoped>

</style>
