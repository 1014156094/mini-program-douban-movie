<template>
    <view id="bottom-menu">
        <view class="bottom-menu-item" @click="toList">
          <view class="iconfont icon-bangdan"></view>
        榜单
        </view>
        <view class="bottom-menu-item" @click="toSearch">
            <i class="iconfont icon-sousuo"></i>
        搜索
        </view>
        <view class="bottom-menu-item" @click="toUserCenter">
          <view class="iconfont icon-icon"></view>
        我的
        </view>
    </view>
</template>

<script>
export default {
  methods: {
    toList() {
      wx.redirectTo({
        url: "../../pages/index/main"
      });
    },
    toSearch() {
      wx.redirectTo({
        url: "../../pages/search/main"
      });
    },
    toUserCenter() {
      wx.redirectTo({
        url: "../../pages/user-center/main"
      });
    }
  }
};
</script>

<style scoped>
#bottom-menu {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  flex-direction: row;
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  background: #fff;
  border-top: 1rpx #f5f5f5 solid;
}
#bottom-menu .bottom-menu-item {
  flex: 1;
  font-size: 30rpx;
  text-align: center;
}
</style>
