<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar fixed>
      <template #left>
        <img class="logo" src="@/assets/logo.png" alt="logo" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#fff"></van-icon>
      </template>
    </van-nav-bar>
    <!-- tab导航 -->
    <div class="tabs">
      <van-tabs v-model="channelId" animated sticky offset-top="46px">
        <van-tab :title="obj.name" v-for="obj in userChannelList" :key="obj.id" :name="obj.id">
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import {
  getUserChannelsAPI,
  // getAllChannelsAPI,
  // updateChannelsAPI,
  // removeTheChannelAPI
} from '@/api'
import ArticleList from './components/ArticleList.vue';
export default {
  components: {
    ArticleList
  },
  data() {
    return {
      channelId: 0,
      userChannelList: [],
      articleList: []
    };
  },
  created() {
    this.getChannel()
  },
  methods: {
    async getChannel() {
      const res = await getUserChannelsAPI();
      this.userChannelList = res.data.data.channels;
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar {
  background-color: #007bff;
}

::v-deep{
  .van-tabs__line{
  background-color: #007bff;
  }
}
.logo {
  width: 100px;
  height: 30px;
}
.tabs {
  padding-top: 46px;
}
</style>
