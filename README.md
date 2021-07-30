# turntable

> A Vue.js project
> 字学镜像计划
> 字节财团考核项目——抽奖转盘

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 需求说明
在营销活动中，抽奖是一种很常见的形式。其中转盘抽奖有动画效果好、用户参与度高、趣味性强等优势。因此，我们希望通过设计、研发出一个转盘抽奖系统，让大家体验这种趣味性营销活动的研发流程。
  - 转盘中有6个奖品
  - 用户点击中间抽奖按钮可以进行抽奖
  - 5秒后抽奖结束
  - 转盘的转速逐渐降低
  - 奖品通过Server端下发
  - 搭建一个简单的运营后台，支持简单的增加奖品、删除奖品、设置中奖概率、设置库存等功能

## other things
因为主界面的转盘找不到合适的素材，所以自己手画了一个，略丑，而且因为画的有点不标准，转盘转动稍微有一点晃动。

![](https://i.loli.net/2021/07/30/WsQlEIY6uUdGH8O.png){:height="50%" width="50%"}

部署到轻服务的网址：https://wangweiweiturntable.web.cloudendpoint.cn

访问后台：https://wangweiweiturntable.web.cloudendpoint.cn/#/admin

没有设置管理员登陆功能。

初始奖品设置：
![](https://i.loli.net/2021/07/30/o8kZ7UdKfzi6Q5R.png){:height="50%" width="50%"}

感觉自己只是把基本功能完成了，也是在网上看了很多资料，参考着写，代码的质量也不高，后面还需要系统地学习

## 实践流程记录


7月5-7月24
  - 由于学习暑期实训是这一段时间，所以白天8:00-18:00都在实验室，做老师的项目。最初的那一段时间晚上还有课，是18:30-21:00。这一段时间的学习进度，开发进度比较慢的。
  - 基本完成前端页面
  - 在网上找的vue教程视频看了2/3，了解了路由，以及created，beforecreated等等生命周期函数


7月24-7月30
  - 结束实训，开始专心看前后端数据交互部分
  - 完成了轻服务接口创建
  - 完成奖品后台搭建

