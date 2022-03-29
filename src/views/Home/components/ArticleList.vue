<template>
  <div>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
        offset="50"
      >
        <ArticleItem
          v-for="obj in list"
          :key="obj.art_id"
          :artObj="obj"
          @disLikeEV="disLikeFn"
          @reportEV="reportFn"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import ArticleItem from "../../../components/ArticleItem.vue";
import { getAllArticleListAPI, dislikeArticleAPI, reportArticleAPI } from '@/api'
import Notify from '@/ui/Notify.js'

export default {
  components: {
    ArticleItem,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: new Date().getTime(),
      isLoading: false,
    };
  },
  props: {
    channelId: Number,
  },
  created() {
    this.getArticle();
  },
  methods: {
    async getArticle() {
      const res = await getAllArticleListAPI({
        channel_id: this.channelId,
        timestamp: this.timestamp,
      });
      this.list = [...this.list, ...res.data.data.results];
      this.timestamp = res.data.data.pre_timestamp;

      this.loading = false;
      if (!res.data.data.pre_timestamp) this.finished = true;
      this.isLoading = false
    },
    onLoad() {
      this.getArticle();
    },
    onRefresh() {
      this.list = []
      this.timestamp = new Date().getTime()
      this.getArticle()
    },
    async disLikeFn (id) {
      try {
        await dislikeArticleAPI({
          artId: id
        })
        Notify({ type: 'success', message: '反馈成功' })
        console.log('成功了')
      } catch (err) {
        console.log('失败了')
      }
    },
    // 反馈-垃圾内容
    async reportFn (id, value) {
      await reportArticleAPI({
        artId: id,
        type: value
      })
      Notify({ type: 'success', message: '举报成功' })
    },
  },
};
</script>

<style lang="less" scoped>
</style>
