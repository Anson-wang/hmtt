<template>
  <div>
    <van-nav-bar
      title="标题"

    />
    <div>
      <van-form @submit="onSubmit">
        <van-field
          v-model="user.mobile"
          required
          name="mobile"
          label="手机号"
          placeholder="请输入11位手机号"
          :rules="[
            {
              required: true,
              message: '请填写正确手机号',
              pattern: /^1[3-9]\d{9}$/,
            },
          ]"
        />
        <van-field
          v-model="user.code"
          required
          type="password"
          name="code"
          label="密码"
          placeholder="请输入6位密码"
          :rules="[
            { required: true, message: '请填写密码', pattern: /^\d{6}$/ },
          ]"
        />
        <div style="margin: 16px">
          <!-- round是否为圆形
              block代表块级元素
              type代表类型(有默认颜色)
              native-type代表原生button的type属性
              代表这个van-button组件渲染的原生button标签type是submit提交整个表单功能的按钮
            -->
          <van-button
            round
            block
            type="info"
            native-type="submit"
            :disabled="isLoading"
            :loading="isLoading"
            loading-text="正在登录ing..."
            >登录</van-button
          >
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from "@/api";
import { setToken } from "@/utils/token.js";
import Notify from "@/ui/Notify";
import { setStorage } from "@/utils/storage.js";
export default {
  data() {
    return {
      user: {
        mobile: "13888888888", // 手机号
        code: "246810", // 验证码(密码-必须是246810后台规定s的, 无论手机号是什么)
      },
      isLoading: false, // 登录按钮-加载状态
    };
  },
  methods: {
    async onSubmit(values) {
      // 状态设置true
      this.isLoading = true;

      try {
        const res = await loginAPI(this.user);
        Notify({ type: "success", message: "登录成功啦!!!" });
        setToken(res.data.data.token);
        setStorage("refresh_token", res.data.data.refresh_token);
        this.$router.replace({
          path: this.$route.query.path || "/layout/home", // 因为我们路由规则里/layout里没有重定向, 所以直接在这里写全
        });
      } catch (err) {
        Notify({ type: "danger", message: "账号或密码错误" });
      }

      this.isLoading = false; // 网络请求完成无论成功/报错, 把状态关掉
    },
  },
};
</script>

<style scoped lang="less">
.van-nav-bar {
  background-color: #007bff;
}
/deep/ .van-nav-bar__title {
  color: white;
}
</style>
