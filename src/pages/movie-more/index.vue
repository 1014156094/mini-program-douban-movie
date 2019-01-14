<template>
    <div class="container">
        <block v-if="type === 'weekly' || type === 'usBox'">
            <div v-for="(item, index) of list" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.subject.id" v-bind:key="index">
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
        </block>
        <block v-if="type === 'inTheaters' || type === 'comingSoon' || type === 'top250' || type === 'newMovie'">
            <div v-for="(item, index) of list" class="movie-wrapper" @click="bindMovieDetail" :data-id="item.id" v-bind:key="index">
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
        </block>
    </div>
</template>

<script>
export default {
  data() {
    return {
      list: "",
      type: ""
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      let url = "";
      let _this = this;
      let type = this.$root.$mp.query.type;

      // 正在热映
      if (type === "inTheaters") {
        url = "https://douban.uieee.com/v2/movie/in_theaters?city=深圳";
      }
      // 即将上映
      if (type === "comingSoon") {
        url = "https://douban.uieee.com/v2/movie/coming_soon?city=深圳";
      }
      // 豆瓣电影Top250
      if (type === "top250") {
        url = "https://douban.uieee.com/v2/movie/top250?city=深圳";
      }
      // 口碑榜
      if (type === "weekly") {
        url = "https://douban.uieee.com/v2/movie/weekly?city=深圳";
      }
      // 北美票房榜
      if (type === "usBox") {
        url = "https://douban.uieee.com/v2/movie/us_box?city=深圳";
      }
      // 新片榜
      if (type === "newMovie") {
        url = "https://douban.uieee.com/v2/movie/new_movies?city=深圳";
      }

      wx.request({
        url: url,
        method: "GET",
        header: {
          "content-type": "json"
        },
        success(res) {
          _this.list = res.data.subjects;
          _this.type = type;
        }
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
.container {
  background: #fff;
}
.movie-wrapper {
  display: inline-block;
  margin: 10rpx 25rpx;
}

.movie-content {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>
