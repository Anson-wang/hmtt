<template>
  <!-- 一条文章单元格 -->
  <van-cell>
    <!-- 标题区域的插槽 -->
    <template #title>
      <div class="title-box">
        <!-- 标题 -->
        <span>{{ artObj.title }}</span>
        <!-- 单图 -->
        <img v-if="artObj.cover.type === 1" class="thumb" :src="artObj.cover.images[0]" alt="">
      </div>
      <!-- 多图 -->
        <div v-if="artObj.cover.type > 1" class="thumb-box">
          <img class="thumb"
            v-for="(imgUrl, index) in artObj.cover.images"
            :key="index"
            :src="imgUrl"
            alt=""
          >
        </div>
    </template>
    <template #label>
      <div class="label-box">
        <div>
          <span>{{ artObj.aut_name }}</span>
          <span>{{ artObj.comm_count }}评论</span>
          <span>{{ formatTime(artObj.pubdate) }}</span>
        </div>
        <!-- 反馈按钮 -->
        <van-icon name="cross" />
      </div>
    </template>
  </van-cell>
</template>

<script>
import { timeAgo } from '@/utils/date.js'
// import { firstActions, secondActions } from '@/api/report.js'
export default {
  props: {
    artObj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: false, // 反馈面板显示/隐藏
      // actions: firstActions, // 反馈面板选项数组(套对象)
      bottomText: '取消' // 底部按钮的文字
    }
  },
  methods: {
    formatTime: timeAgo // 函数体是timeAgo
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

/* 图片的样式, 矩形黄金比例：0.618 */
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}

/* 三图, 图片容器 */
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>
