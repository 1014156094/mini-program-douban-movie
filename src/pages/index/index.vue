<template>
    <div class="container">
        <div class="session-search session-search-spacing">
            <icon class="session-search-icon" type="search" size="16"></icon>
            <text class="search-placeholder" @click="bindSearchNavigate">搜索电影</text>
        </div>
        <div class="page-session page-session-spacing">
            <div class="session-header">
                <text class="session-header-title">正在热映-深圳</text>
                <text class="session-header-more" @click="bindMore" data-type="inTheaters">更多</text>
            </div>
            <div class="session-content session-content-spacing">
            <scroll-view class="movie-scroll" scroll-x="true">
                <div v-for="(item, index) of inTheaters" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.id" v-bind:key="index">
                    <div class="movie-content">
                        <img class="poster" :src="item.images.medium"/>
                        <text class="name">{{item.title}}</text>
                        <div class="rating">
                            <div :class="'rating-star allstar' + item.rating.average || 0"></div>
                            <text class="rating-average">{{item.rating.average}}</text>
                        </div>
                        <text class="wish-count">{{item.collect_count}}人想看</text>
                    </div>
                </div>
            </scroll-view>
            </div>
        </div>
        <div class="page-session page-session-spacing">
            <div class="session-header">
                <text class="session-header-title">即将上映</text>
                <text class="session-header-more" @click="bindMore" data-type="comingSoon">更多</text>
            </div>
            <div class="session-content session-content-spacing">
            <scroll-view class="movie-scroll" scroll-x="true">
                <div v-for="(item, index) of comingSoon" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.id" v-bind:key="index">
                    <div class="movie-content">
                        <img class="poster" :src="item.images.medium"/>
                        <text class="name">{{item.title}}</text>
                        <div class="rating">
                            <div :class="'rating-star allstar' + item.rating.average || 0"></div>
                            <text class="rating-average">{{item.rating.average}}</text>
                        </div>
                        <text class="wish-count">{{item.collect_count}}人想看</text>
                    </div>
                </div>
            </scroll-view>
            </div>
        </div>
        <div class="page-session page-session-spacing">
            <div class="session-header">
                <text class="session-header-title">豆瓣电影Top250</text>
                <text class="session-header-more" @click="bindMore" data-type="top250">更多</text>
            </div>
            <div class="session-content session-content-spacing">
            <scroll-view class="selected-scroll" scroll-x="true">
                <div v-for="(item, index) of top250" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.id" v-bind:key="index">
                    <div class="movie-content">
                        <img class="poster" :src="item.images.medium"/>
                        <text class="name">{{item.title}}</text>
                        <div class="rating">
                            <div :class="'rating-star allstar' + item.rating.average || 0"></div>
                            <text class="rating-average">{{item.rating.average}}</text>
                        </div>
                        <text class="wish-count">{{item.collect_count}}人想看</text>
                    </div>
                </div>
            </scroll-view>
            </div>
        </div>
        <div class="page-session page-session-spacing">
            <div class="session-header">
                <text class="session-header-title">口碑榜</text>
                <text class="session-header-more" @click="bindMore" data-type="weekly">更多</text>
            </div>
            <div class="session-content session-content-spacing">
            <scroll-view class="selected-scroll" scroll-x="true">
                <div v-for="(item, index) of weekly" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.subject.id" v-bind:key="index">
                    <div class="movie-content">
                        <img class="poster" :src="item.subject.images.medium"/>
                        <text class="name">{{item.subject.title}}</text>
                        <div class="rating">
                            <div :class="'rating-star allstar' + item.subject.rating.average || 0"></div>
                            <text class="rating-average">{{item.subject.rating.average}}</text>
                        </div>
                        <text class="wish-count">{{item.subject.collect_count}}人想看</text>
                    </div>
                </div>
            </scroll-view>
            </div>
        </div>
        <div class="page-session page-session-spacing">
            <div class="session-header">
                <text class="session-header-title">北美票房榜</text>
                <text class="session-header-more" @click="bindMore" data-type="usBox">更多</text>
            </div>
            <div class="session-content session-content-spacing">
            <scroll-view class="selected-scroll" scroll-x="true">
                <div v-for="(item, index) of usBox" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.subject.id" v-bind:key="index">
                    <div class="movie-content">
                        <img class="poster" :src="item.subject.images.medium"/>
                        <text class="name">{{item.subject.title}}</text>
                        <div class="rating">
                            <div :class="'rating-star allstar' + item.subject.rating.average || 0"></div>
                            <text class="rating-average">{{item.subject.rating.average}}</text>
                        </div>
                        <text class="wish-count">{{item.subject.collect_count}}人想看</text>
                    </div>
                </div>
            </scroll-view>
            </div>
        </div>
        <div class="page-session page-session-spacing">
            <div class="session-header">
                <text class="session-header-title">新片榜</text>
                <text class="session-header-more" @click="bindMore" data-type="newMovie">更多</text>
            </div>
            <div class="session-content session-content-spacing">
            <scroll-view class="selected-scroll" scroll-x="true">
                <div v-for="(item, index) of newMovie" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.id" v-bind:key="index">
                    <div class="movie-content">
                        <img class="poster" :src="item.images.medium"/>
                        <text class="name">{{item.title}}</text>
                        <div class="rating">
                            <div :class="'rating-star allstar' + item.rating.average || 0"></div>
                            <text class="rating-average">{{item.rating.average}}</text>
                        </div>
                        <text class="wish-count">{{item.collect_count}}人想看</text>
                    </div>
                </div>
            </scroll-view>
            </div>
        </div>
        <bottom-nav></bottom-nav>
    </div>
</template>

<script>
import BottomNav from "@/components/bottom-nav/bottom-nav";

export default {
  components: {
    "bottom-nav": BottomNav
  },
  data() {
    return {
      inTheaters: {}, // 正在热映
      comingSoon: {}, // 即将上映
      top250: {}, // 豆瓣Top250
      weekly: {}, // 口碑榜
      newMovie: {}, //  新片榜
      usBox: {} // 北美票房榜
    };
  },
  mounted() {
    let _this = this;

    // 获取正在热映电影
    wx.request({
      url:
        "https://douban.uieee.com/v2/movie/in_theaters?city=深圳&&start=0&&count=10",
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.inTheaters = res.data.subjects;
      }
    });

    // 获取即将上映电影
    wx.request({
      url:
        "https://douban.uieee.com/v2/movie/coming_soon?city=深圳&&start=0&&count=10",
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.comingSoon = res.data.subjects;
      }
    });

    // 获取top250
    wx.request({
      url:
        "https://douban.uieee.com/v2/movie/top250?city=深圳&&start=0&&count=10",
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.top250 = res.data.subjects;
      }
    });

    // 获取口碑榜
    wx.request({
      url:
        "https://douban.uieee.com/v2/movie/weekly?city=深圳&&start=0&&count=10",
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.weekly = res.data.subjects;
      }
    });

    // 获取北美票房榜
    wx.request({
      url:
        "https://douban.uieee.com/v2/movie/us_box?city=深圳&&start=0&&count=10",
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.usBox = res.data.subjects;
      }
    });

    // 获取新片榜
    wx.request({
      url:
        "https://douban.uieee.com/v2/movie/new_movies?city=深圳&&start=0&&count=10",
      method: "GET",
      header: {
        "content-type": "json"
      },
      success(res) {
        _this.newMovie = res.data.subjects;
      }
    });
  },
  methods: {
    /** 搜索电影 */
    bindSearchNavigate(event) {
      wx.navigateTo({
        url: "../search/main"
      });
    },
    /** 显示更多电影列表 */
    bindMore(event) {
      var type = event.currentTarget.dataset.type;

      wx.navigateTo({
        url: "../movie-more/main?type=" + type
      });
    },
    /** 跳转电影详情页 */
    bindMovieDetail(event) {
      let id = event.currentTarget.dataset.id;

      wx.navigateTo({
        url: "../movie-detail/main?id=" + id
      });
    }
  },
  onPullDownRefresh() {
    console.log("pull");
    setTimeout(function() {
      // 数据成功后，停止下拉刷新
      wx.stopPullDownRefresh();
    }, 1000);
  }
};
</script>

<style scoped>
.movie-scroll,
selected-scroll {
  width: 100%;
  white-space: nowrap;
}
.search-placeholder {
  flex: 1;
  font-size: 28rpx;
  margin-left: 20rpx;
  color: #9e9e9e;
}
.movie-wrapper {
  display: inline-block;
  margin-left: 10rpx;
  margin-right: 10rpx;
}

.movie-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.movie-wrapper:first-child {
  margin-left: 0rpx;
}

.movie-wrapper:last-child {
  margin-right: 0rpx;
}

.movie-wrapper .poster {
  width: 200rpx;
  height: 280rpx;
}

.movie-wrapper .name {
  width: 200rpx;
  color: #4a4a4a;
  font-size: 28rpx;
  font-weight: 600;
  text-align: center;
  line-height: 1.6;
  word-break: keep-all;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.movie-wrapper .wish-count {
  color: #9e9e9e;
  font-size: 24rpx;
  font-weight: 500;
}
.rating {
  display: flex;
  flex-direction: row;
  position: relative;
  margin-top: 10rpx;
  margin-bottom: 10rpx;
}

.rating-star {
  content: "";
  display: inline-block;
  width: 55px;
  height: 11px;
  position: absolute;
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
.selected-wrapper {
  display: inline-block;
  border-radius: 20rpx;
  box-sizing: border-box;
  margin-left: 12rpx;
  margin-right: 12rpx;
}

.top250-gradient {
  background: -webkit-linear-gradient(#ff8c00, #f9ebcf);
  background: linear-gradient(#ff8c00, #f9ebcf);
}

.weekly-gradient {
  background: -webkit-linear-gradient(#1fb552, #d4f1de);
  background: linear-gradient(#1fb552, #d4f1de);
}

.newMovie-gradient {
  background: -webkit-linear-gradient(#9957db, #ede1f3);
  background: linear-gradient(#9957db, #ede1f3);
}

.usBox-gradient {
  background: -webkit-linear-gradient(#f85b84, #fee4ef);
  background: linear-gradient(#f85b84, #fee4ef);
}

.selected-wrapper:first-child {
  margin-left: 0rpx;
}

.selected-wrapper:last-child {
  margin-right: 0rpx;
}

.selected-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300rpx;
  height: 300rpx;
}

.selected-content .name {
  font-size: 36rpx;
  font-weight: 600;
  color: #fff;
  margin-top: 30rpx;
}

.selected-content .desc {
  font-size: 24rpx;
  color: #fff;
}

.selected-poster {
  margin-top: 18rpx;
}

.selected-content .selected-poster-left,
.selected-poster-right {
  width: 72rpx;
  height: 110rpx;
  margin-bottom: 15rpx;
}

.selected-content .selected-poster-center {
  width: 100rpx;
  height: 148rpx;
}
page {
  height: 100%;
  background: #f8f8f8;
  font-family: -apple-system-font, Arial, Helvetica, sans-serif;
  font-size: 32rpx;
  line-height: 1.42857;
}

.container {
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.page-session {
  background: #fff;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #e6e6e6;
}

.page-session-spacing {
  margin-bottom: 30rpx;
  padding-bottom: 30rpx;
}

.session-search {
  padding: 20rpx 30rpx 20rpx 30rpx;
  display: flex;
  align-items: center;
  background: #fff;
  border-width: 1px 0px 1px 0px;
  border-style: solid;
  border-color: #e6e6e6;
}

.session-search-spacing {
  margin-bottom: 30rpx;
}

.session-header {
  padding: 20rpx 30rpx 20rpx 30rpx;
  display: flex;
  align-items: center;
}

.session-header-title {
  color: #4a4a4a;
  font-size: 36rpx;
  line-height: 1.42857;
  font-weight: 500;
  flex: 1;
}

.session-header-more {
  font-size: 28rpx;
  color: #32cd32;
  font-weight: 500;
  position: relative;
  padding-right: 20rpx;
}

.session-header-more::after {
  content: " ";
  display: inline-block;
  position: absolute;
  top: 50%;
  width: 12rpx;
  height: 12rpx;
  transform: matrix(0.71, 0.71, -0.71, 0.71, 0, 0);
  margin-top: -8rpx;
  border-width: 2rpx 2rpx 0px 0px;
  border-color: #32cd32;
  border-style: solid;
}

.session-content {
  width: 100%;
  white-space: nowrap;
}

.session-content-spacing {
  padding: 0rpx 30rpx 0rpx 30rpx;
  margin-top: 20rpx;
  box-sizing: border-box;
}
</style>
