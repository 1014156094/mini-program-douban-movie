<template>
    <view class="container">
        <open-data type="userAvatarUrl" class="user-avatar"></open-data>
        <open-data type="userNickName" class="user-name"></open-data>
        <ul class="system-info">
            <li>手机品牌：{{systemInfo.brand}}</li>
            <li>手机型号：{{systemInfo.model}}</li>
            <li>设备像素比：{{systemInfo.pixelRatio}}</li>
            <li>屏幕宽度：{{systemInfo.screenWidth}}</li>
            <li>屏幕高度：{{systemInfo.screenHeight}}</li>
            <li>可使用窗口宽度：{{systemInfo.windowWidth}}</li>
            <li>可使用窗口高度：{{systemInfo.windowHeight}}</li>
            <li>状态栏的高度：{{systemInfo.statusBarHeight}}</li>
            <li>微信设置的语言：{{systemInfo.language}}</li>
            <li>微信版本号：{{systemInfo.version}}</li>
            <li>操作系统版本：{{systemInfo.system}}</li>
            <li>客户端平台：{{systemInfo.platform}}</li>
            <li>用户字体大小设置：{{systemInfo.fontSizeSetting}}</li>
            <li>客户端基础库版本：{{systemInfo.SDKVersion}}</li>
        </ul>
        <bottom-nav></bottom-nav>
    </view>
</template>

<script>
import BottomNav from "@/components/bottom-nav/bottom-nav";

export default {
  components: {
    "bottom-nav": BottomNav
  },
  data() {
    return {
      systemInfo: ""
    };
  },
  mounted() {
    let _this = this;

    wx.getSystemInfo({
      success(res) {
        _this.systemInfo = res;
      }
    });
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  text-align: center;
}
.user-avatar {
  width: 100rpx;
  height: 100rpx;
  margin: 30rpx auto;
}
.user-name {
  font-size: 36rpx;
}
.system-info {
  text-align: left;
  width: 50%;
  margin: 100rpx auto;
  font-size: 26rpx;
  color: #555;
}
.system-info li {
  margin-bottom: 10rpx;
}
</style>
