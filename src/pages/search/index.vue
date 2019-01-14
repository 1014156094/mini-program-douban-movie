<template>
    <view class="container">
        <view class="session-search session-search-spacing">
            <icon class="search-icon" type="search" size="16"></icon>
            <input class="search-content" placeholder-class="search-placeholder" @input="bindSearchInput" placeholder="搜索电影" v-model="searchValue" />
            <block v-if="showDelete">
                <text class="search-delete" @click="bindSearchDelete">x</text>
            </block>
            <!-- <text class="search-cancel" @click="bindSearchCancel">取消</text> -->
        </view>
        <view class="session-movie">
            <block v-for="(item, index) of result.subjects" v-bind:key="index">
                <view class="movie-wrapper" :data-id="item.id" @click="bindMovieDetail">
                    <view class="movie-content">
                        <image class="poster" :src="item.images.small"></image>
                        <view class="summary">
                            <text class="name">{{item.title}}</text>
                            <text class="desc">{{item.summary}}</text>
                        </view>
                    </view>
                </view>
            </block>
        </view>
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
      showDelete: false,
      searchValue: "",
      result: ""
    };
  },
  methods: {
    /** 搜索影视 */
    bindSearchInput(event) {
      this.showDelete = false;
      if (this.searchValue.replace(/\s+/g, "") !== "") {
        this.showDelete = true;
        this.handleSearchData(this.searchValue);
      }
    },
    /** 跳转电影详情页 */
    bindMovieDetail(event) {
      let id = event.currentTarget.dataset.id;

      wx.navigateTo({
        url: "../movie-detail/main?id=" + id
      });
    },
    /** 提交搜索请求 */
    handleSearchData: function(value) {
      let _this = this;

      wx.request({
        url: "https://douban.uieee.com/v2/movie/search?q=" + this.searchValue,
        method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: { "content-type": "json" }, // 设置请求的 header
        success: function(res) {
          let data = res.data;
          _this.processSearchData(data);
        }
      });
    },
    /**清空输入框 */
    bindSearchDelete: function(event) {
      this.searchValue = "";
      this.showDelete = false;
      this.result = "";
    },
    /**点击取消 */
    bindSearchCancel: function(event) {
      wx.navigateBack();
    },
    /**组装搜索数据 */
    processSearchData(data) {
      var movies = [];
      for (let idx in data.subjects) {
        var subject = data.subjects[idx];
        var directors = "";
        var separate = " / ";
        for (let i in subject.directors) {
          directors += subject.directors[i].name + separate;
        }
        directors = directors.substring(0, directors.length - separate.length);
        var summary =
          subject.rating.average +
          "分" +
          separate +
          subject.year +
          separate +
          directors;
        var temp = {
          id: subject.id,
          casts: subject.casts,
          collect_count: subject.collect_count,
          directors: subject.directors,
          title: subject.title,
          images: subject.images,
          rating: subject.rating,
          year: subject.year,
          summary: summary
        };
        movies.push(temp);
      }
      this.result = {};
      this.result.subjects = movies;
    }
  }
};
</script>

<style scoped>
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

.search-content {
  flex: 1;
  margin-left: 20rpx;
  color: #4a4a4a;
  font-size: 28rpx;
}

.search-placeholder {
  color: #9e9e9e;
  font-size: 28rpx;
}

.search-delete {
  color: #9e9e9e;
  width: 48rpx;
  height: 48rpx;
  font-size: 42rpx;
  line-height: 48rpx;
  text-align: center;
}

.search-cancel {
  color: #9e9e9e;
  width: 60rpx;
  height: 48rpx;
  line-height: 48rpx;
  text-align: center;
  font-size: 28rpx;
}

.session-movie {
  background: #fff;
}

.movie-wrapper {
  padding: 0rpx 30rpx 0rpx 30rpx;
  border-bottom: 1px solid #e6e6e6;
  box-sizing: border-box;
}

.movie-wrapper:last-child {
  border-bottom: 0px solid #e6e6e6;
  margin-bottom: 120rpx;
}

.movie-content {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 15rpx 0rpx 15rpx 0rpx;
}

.movie-content .poster {
  width: 80rpx;
  height: 100rpx;
}

.summary {
  width: 100%;
  margin-left: 20rpx;
  display: flex;
  flex-direction: column;
}

.movie-content .name {
  width: 100%;
  font-size: 32rpx;
  color: #4a4a4a;
  font-weight: 600;
}

.movie-content .desc {
  width: 100%;
  font-size: 28rpx;
  color: #9e9e9e;
}
</style>
