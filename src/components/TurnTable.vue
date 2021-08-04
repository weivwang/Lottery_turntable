<template>
  <div class="container">
  <img src="../assets/img/home-bg.png" class="bg">
  <div class="turntable" :style="rotateStyle" >
   <div class="turntable-wrap shanxing1">
        <div class="slice-1 slice"></div>
        <div class="slice-2 slice"></div>
        <div class="slice-3 slice"></div>
        <div class="slice-4 slice"></div>
        <div class="slice-5 slice"></div>
        <div class="slice-6 slice"></div>
    </div>
  <p class="prize_1" > {{prizelist[0].prize_name}}元</p>
  <p class="prize_2" > {{prizelist[1].prize_name}}元 </p>
  <p class="prize_3" > {{prizelist[2].prize_name}}元 </p>
  <p class="prize_4" > {{prizelist[3].prize_name}}元 </p>
  <p class="prize_5" > {{prizelist[4].prize_name}}元 </p>
  <p class="prize_6">擦肩而过</p>
  </div>
  <img src="../assets/img/pointer.png" class="pointer">
  <p class="reminder" @click="run">点击抽奖</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TurnTable',
  inject: ['reload'],
  data () {
    return {
      prizelist: [],
      isrun: false,
      hasrun: false,
      rotateAngle: 0, // 角度
      duration: 5000, // 5s
      circle: 5,
      mode: 'ease-in-out',
      index: 0
    }
  },
  mounted () {
    axios.post('https://qcg1jg.fn.thelarkcloud.com/getPrize').then(
      res => {
        console.log(res)
        this.prizelist = res.data.response
      }
    )
  },
  computed: {
    rotateStyle () {
      return `
        transform-origin: 100% 50%;
        -webkit-transition: transform ${this.duration}ms ${this.mode};
        transition: transform ${this.duration}ms ${this.mode};
        -webkit-transform: rotate(${this.rotateAngle}deg);
        transform: rotate(${this.rotateAngle}deg);`
    }
  },
  methods: {
    async run () {
      await axios.post('https://qcg1jg.fn.thelarkcloud.com/returnPrize').then(
        res => {
          console.log(res)
          this.index = res.data.index
        }
      )
      if (this.isrun) return
      this.isrun = true
      console.log(this.index)
      this.rotateAngle = (this.circle - 1) * 360 - (30 + (this.index - 1) * 60)
      console.log((30 + (this.index - 1) * 60))
      this.hasrun = true
      setTimeout(this.note, 5000)
      this.isrun = false
    },
    note () {
      console.log(this.index)
      if (this.index === 5) { alert('差一点点就获奖了～') } else if (this.index === 6) {
        alert('恭喜获得' + this.prizelist[this.index - 2].prize_name + '元')
      } else {
        alert('恭喜获得' + this.prizelist[this.index - 1].prize_name + '元')
      }
      this.reload()
    }
  }
}
</script>

<style scoped>
.container{
    text-align: center;
    margin: auto;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.bg{
  width: 400px;
}
.turntable{
  position: absolute;
  width: 380px;
    height: 380px;
    margin: 307px -578px;
    display: inline;
}
.idal{
    width: 380px;
    position: absolute;

}
.pointer{
  width:150px;
  position: absolute;
  margin-left: -273px;
  margin-top: 418px;
}
.reminder{
  display: inline;
  color: black;
  font-size: 17px;
  position: absolute;
  margin-left: -232px;
  margin-top: 486px;

}
.prize_1{
  position: absolute;
  transform: rotate(27deg);
  margin-left: 425px;
  margin-top: 52px;
  line-height: 17px;
}
.prize_2{
  position: absolute;
  transform: rotate(90deg);
  margin-left: 494px;
  margin-top: 164px;
  line-height: 17px;
}
.prize_3{
  position: absolute;
  transform: rotate(140deg);
    margin-left: 436px;
    margin-top: 280px;
    line-height: 17px;
}
.prize_4{
  position: absolute;
  transform: rotate(220deg);
    margin-left: 296px;
    margin-top: 288px;
    line-height: 17px;
}
.prize_5{
  position: absolute;
  transform: rotate(-30deg);
    margin-left: 296px;
    margin-top: 59px;
    line-height: 17px;
}
.prize_6{
  position: absolute;
  transform: rotate(-90deg);
    margin-left: 210px;
    margin-top: 177px;
    line-height: 17px;
}
.turntable-wrap{
        position: absolute;
        overflow: hidden;
        margin: 13px 203px;
        width: 340px;
        height: 340px;
        border: 7px solid #b2a98d;
        border-radius: 50%;
        box-shadow: 0 0 20px #b2a98d;
    }
    .slice{
        overflow: hidden;
        position: absolute;
        width: 50%;
        height: 50%;
        transform-origin: 0% 100%;
    }
    .slice-1 {
        transform: rotate(0deg) skewY(30deg);
        margin: 50% 50%;
        background: rgb(250, 222, 178);
    }
    .slice-2 {
        transform: rotate(60deg) skewY(30deg);
        transform-origin: 0 0;
        margin: 50% 50%;
        background: rgb(255, 175, 38);
    }
    .slice-3 {
        transform: rotate(120deg) skewY(30deg);
        transform-origin: 0 0;
        margin: 50% 50%;
        background: rgb(250, 222, 178);
    }
    .slice-4 {
        transform: rotate(180deg) skewY(30deg);
        transform-origin: 0 0;
        margin: 50% 50%;
        background: rgb(255, 175, 38);
    }
    .slice-5 {
        transform: rotate(240deg) skewY(30deg);
        transform-origin: 0 0;
        margin: 50% 50%;
        background: rgb(250, 222, 178);
    }
    .slice-6 {
        transform: rotate(300deg) skewY(30deg);
        transform-origin: 0 0;
        margin: 50% 50%;
        background: rgb(255, 175, 38);
    }

</style>
