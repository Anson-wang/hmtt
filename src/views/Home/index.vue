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
        <van-tab
          :title="obj.name"
          v-for="obj in userChannelList"
          :key="obj.id"
          :name="obj.id"
        >
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <!-- 编辑频道图标 -->
      <div class="moreChannels">
        <van-icon
          name="plus"
          size="0.37333334rem"
          @click="plusClickFn"
        />
      </div>
    </div>
    <!-- 频道管理弹出层 -->
    <van-popup class="channel_popup" v-model="show">
      <ChannelEdit
        :userList="userChannelList"
        :unCheckList="unCheckChannelList"
        @addChannelEV="addChannelFn"
        @removeChannelEV="removeChannelFn"
        @closeEV="closeFn"
        ref="editRef"
        v-model="channelId"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import {
  getUserChannelsAPI,
  getAllChannelsAPI,
  updateChannelsAPI,
  removeTheChannelAPI,
} from "@/api";
import ArticleList from "./components/ArticleList.vue";
import ChannelEdit from "./ChannelEdit.vue";
export default {
  components: {
    ArticleList,
    ChannelEdit,
  },
  data() {
    return {
      channelId: 0,
      userChannelList: [],
      articleList: [],
      show: false,
      allChannelList: [],
    };
  },
  created() {
    this.getChannel();
    this.getAllChannel();
  },
  methods: {
    async getChannel() {
      const res = await getUserChannelsAPI();
      this.userChannelList = res.data.data.channels;
    },
    async getAllChannel() {
      const res2 = await getAllChannelsAPI();
      this.allChannelList = res2.data.data.channels;
    },
    plusClickFn() {
      this.show = true;
    },
    async addChannelFn(channelObj) {
      this.userChannelList.push(channelObj);
      const newArr = this.userChannelList.filter((obj) => obj.id !== 0);
      const theNewArr = newArr.map((obj, index) => {
        const newObj = { ...obj }; // 拷贝(浅拷贝)
        delete newObj.name;
        newObj.seq = index;

        return newObj; // 让map方法把新对象收集起来形成一个新数组
      });
      const res = await updateChannelsAPI({
        channels: theNewArr,
      });
      console.log(res);
    },
    async removeChannelFn(channelObj) {
      const index = this.userChannelList.findIndex(
        (obj) => obj.id === channelObj.id
      );
      this.userChannelList.splice(index, 1);

      // 第一种方式: 把现在用户数组的数据, 再覆盖式的发给后台
      // 需要把上面的更新数组过程, 封装一个函数, add和remove里调用(笔记里)
      // 第二种方式: 只调用删除的接口
      const res = await removeTheChannelAPI({
        channelId: channelObj.id,
      });
      console.log(res);
    },
    closeFn() {
      this.show = false;
      // 我要让内部的编辑状态回归false
      this.$refs.editRef.isEdit = false;
    },
  },
  computed: {
    unCheckChannelList() {
      return this.allChannelList.filter(
        (bigObj) =>
          this.userChannelList.findIndex(
            (smallObj) => smallObj.id === bigObj.id
          ) === -1
      );
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep .van-nav-bar {
  background-color: #007bff;
}

::v-deep {
  .van-tabs__line {
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
.moreChannels {
  position: fixed;
  top: 46px;
  right: 0;
  z-index: 999;
  height: 44px;
  width: 20px;
  line-height: 44px;
  background-color: white;
}
.channel_popup {
  width: 100vw;
  height: 100vh;
}
</style>
