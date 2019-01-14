<template>
    <view v-if="detail">
        <div class="session-poster session-poster-spacing" :style="'background: url(' + detail.images.large + ') center center / cover no-repeat'"></div>
        <view class="poster" :style="'background: url(' + detail.images.large + ') center center / cover no-repeat'"></view>
        <view class="summary-session">
            <view class="movie-summary">
              <text class="text title">{{detail.title}}</text>
              <text class="text">{{detail.year}}/{{detail.genres}}</text>
              <text class="text">原名：{{detail.original_title}}</text>
              <text class="text">国家：{{detail.countries}}</text>
              <text class="text">时长：{{detail.durations}}</text>
              <text class="text">导演：{{directorsString}}</text>
              <text class="text">编剧：{{writersString || '无'}}</text>
            </view>
            <view class="movie-rating">
            <text class="average">{{detail.rating.average}}</text>
            <view class="rating">
                <view :class="'rating-star allstar' + detail.rating.average || 0"></view>
            </view>
            <text class="ratings_count">{{detail.ratingsCount}}</text>
            </view>
        </view>
        <view class="floor-wrapper desc-session">
            <text class="title">简介</text>
            <block v-if="detail.summary.length > 0">
                <view class="desc-wrapper">
                    <text :class="'desc-content ' + (showAllDesc ? 'desc-content-auto' : 'desc-content-3line')">{{detail.summary}}</text>
                    <block v-if="!showAllDesc">
                        <text class="extension" @click="showAllDesc = true">展开</text>
                    </block>
                </view>
            </block>
        </view>
        <view class="floor-wrapper prevue">
            <view class="title">预告片</view>
            <block v-if="detail.trailer_urls.length <= 0">
              <p style="font-size: 24rpx; color: #e6e6e6;">暂无内容</p>
            </block>
            <block v-for="(item, index) of detail.trailer_urls" v-bind:key="index">
              <video :src="item"></video>
            </block>
        </view>
        <view class="floor-wrapper directors-casts-session">
            <view class="title">主演（点击图片可查看）</view>
            <scroll-view class="directors-casts-scroll" scroll-x="true">
                <block v-for="(item, index) of detail.casts" v-bind:key="index">
                    <view v-if="item.avatars" class="directors-casts-wrapper" bindtap="handleCelebrity" :data-id="item.id" :data-avatar="item.avatars.large">
                    <view v-if="item.avatars && item.name" class="directors-casts-content">
                        <img class="image" :src="item.avatars.small" :data-src="item.avatars.large" @click="bindPreviewImage"/>
                        <text class="name">{{item.name}}</text>
                    </view>
                    </view>
                </block>
            </scroll-view>
        </view>
        <button class="share-btn" open-type="share">分享</button>
    </view>
</template>

<script>
export default {
  data() {
    return {
      showAllDesc: false, // 展开描述
      detail: "", // 详情
      directorsString: "", // 导演字符串
      writersString: "" // 编剧字符串
    };
  },
  mounted() {
    let { id } = this.$root.$mp.query,
      _this = this;

    // 获取正在热映电影
    wx.request({
      url: "https://douban.uieee.com/v2/movie/subject/" + id,
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.directorsString = "";
        _this.writersString = "";
        // 拼接导演字符串
        res.data.directors.forEach((item, index, array) => {
          _this.directorsString = _this.directorsString + item.name;
          if (index < array.length - 1) {
            _this.directorsString = _this.directorsString + ",";
          }
        });
        // 拼接编剧字符串
        res.data.writers.forEach((item, index, array) => {
          _this.writersString = _this.writersString + item.name;
          if (index < array.length - 1) {
            _this.writersString = _this.writersString + "，";
          }
        });
        _this.detail = res.data;
      }
    });
  },
  methods: {
    // 预览图片
    bindPreviewImage(event) {
      let _this = this;
      let avatars = [];

      _this.detail.casts.forEach((item, index, array) => {
        avatars.push(item.avatars.large);
      });

      wx.previewImage({
        current: event.currentTarget.dataset.src,
        urls: avatars
      });
    }
  }
};
</script>

<style scoped>
.share-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  height: 80rpx;
  line-height: 80rpx;
  background: red;
  color: #fff;
  text-align: center;
  font-size: 30rpx;
}
.session-poster {
  display: flex;
  align-items: center;
  width: 100%;
  background: #e9e9e9;
}

.session-poster-spacing {
  position: relative;
  height: 440rpx;
  filter: blur(5px);
}
.poster {
  position: absolute;
  left: 15px;
  top: 70rpx;
  width: 240rpx;
  height: 340rpx;
  box-shadow: 0 0 10rpx #fff;
}

.summary-session {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.movie-summary {
  display: flex;
  flex-direction: column;
  width: 520rpx;
  margin: 30rpx 30rpx 30rpx 30rpx;
}

.movie-summary .text {
  font-size: 24rpx;
  color: #9e9e9e;
  margin-bottom: 10rpx;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.movie-summary .title {
  width: 100%;
  color: #4a4a4a;
  font-size: 42rpx;
  font-weight: 700;
  line-height: 1.6;
}
.movie-rating {
  position: absolute;
  right: 40rpx;
  top: 40rpx;
  width: 120rpx;
  height: 120rpx;
  border: 1px solid #9e9e9e;
  box-shadow: 4rpx 4rpx 2rpx #e6e6e6;
  border-radius: 6rpx;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.movie-rating .average {
  font-size: 36rpx;
  font-weight: 700;
}

.movie-rating .ratings_count {
  font-size: 20rpx;
}

.wish-do-session {
  display: flex;
  align-self: center;
  flex-direction: row;
  padding-left: 30rpx;
  padding-right: 30rpx;
}

.wish-do-session .wish-btn {
  font-size: 28rpx;
  color: #de9703;
  padding: 10rpx 70rpx 10rpx 70rpx;
  margin-right: 80rpx;
  text-align: center;
  border-radius: 6rpx;
  border: 1px solid #de9703;
  box-sizing: border-box;
}

.wish-do-session .do-btn {
  font-size: 28rpx;
  color: #de9703;
  padding: 10rpx 70rpx 10rpx 70rpx;
  margin-left: 80rpx;
  text-align: center;
  border-radius: 6rpx;
  border: 1px solid #de9703;
  box-sizing: border-box;
}

.floor-wrapper .title {
  color: #9e9e9e;
  font-size: 30rpx;
  line-height: 42rpx;
  margin-bottom: 10rpx;
}

.floor-wrapper {
  display: flex;
  flex-direction: column;
  padding: 0rpx 30rpx 0rpx 30rpx;
  margin: 20rpx 0rpx 20rpx 0rpx;
}

.floor-wrapper.directors-casts-session{
  margin-bottom: 100rpx;
}

.floor-wrapper.prevue video {
  width: 100%;
  margin-bottom: 10rpx;
}

.desc-wrapper {
  display: inline-block;
}

.desc-session .desc-content {
  font-size: 24rpx;
  color: #4a4a4a;
  line-height: 38rpx;
  text-indent: 2em;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
}

.desc-session .desc-content-auto {
  height: auto;
}

.desc-session .desc-content-3line {
  height: 114rpx;
}

.desc-session .extension {
  background: #fff;
  height: 38rpx;
  font-size: 24rpx;
  line-height: 38rpx;
  color: #32cd32;
}

.directors-casts-scroll {
  width: 100%;
  white-space: nowrap;
}

.directors-casts-wrapper {
  display: inline-block;
}

.directors-casts-content {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.directors-casts-wrapper .image {
  width: 140rpx;
  height: 200rpx;
  margin-left: 12rpx;
  margin-right: 12rpx;
}

.directors-casts-wrapper .image:first-child {
  margin-left: 0rpx;
}

.directors-casts-wrapper .image:last-child {
  margin-right: 0rpx;
}

.directors-casts-wrapper .name {
  width: 140rpx;
  color: #4a4a4a;
  font-size: 22rpx;
  word-break: keep-all;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.rating {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.rating-star {
  display: inline-block;
  width: 55px;
  height: 11px;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-image: url(../../../static/ic_rating_s.png);
}

.allstar10 {
  background-position: 0px 0px;
}

.allstar9 {
  background-position: 0px -11px;
}

.allstar8 {
  background-position: 0px -22px;
}

.allstar7 {
  background-position: 0px -33px;
}

.allstar6 {
  background-position: 0px -44px;
}

.allstar5 {
  background-position: 0px -55px;
}

.allstar4 {
  background-position: 0px -66px;
}

.allstar3 {
  background-position: 0px -77px;
}

.allstar2 {
  background-position: 0px -88px;
}

.allstar1 {
  background-position: 0px -99px;
}

.allstar0 {
  background-position: 0px -110px;
}

.rating-average {
  margin-left: 120rpx;
  font-size: 20rpx;
  line-height: 22rpx;
  color: #878787;
  height: 22rpx;
}
</style>
