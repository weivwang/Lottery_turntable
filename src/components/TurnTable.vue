<template>
  <div class="container">
  <img src="../assets/img/home-bg.png" class="bg">
  <div class="turntable" :style="rotateStyle">
  <img src="../assets/img/dial2.png" class="idal" >
  <p class="prize_1" > {{prizelist[0].prize_name}}元</p>
  <p class="prize_2" > {{prizelist[1].prize_name}}元 </p>
  <p class="prize_3" > {{prizelist[2].prize_name}}元 </p>
  <p class="prize_4" > {{prizelist[3].prize_name}}元 </p>
  <p class="prize_5" > {{prizelist[4].prize_name}}元 </p>
  </div>
  <img src="../assets/img/pointer.png" class="pointer">
  <p class="reminder" @click="run">点击抽奖</p>
  <div>  </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TurnTable',
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
    run () {
      var p = Math.round(Math.random())
      var probilitySum = new Array(5)
      console.log(this.prizelist[0].probility)
      probilitySum[0] = this.prizelist[0].probility
      for (var i = 1; i < 5; i++) {
        probilitySum[i] = probilitySum[i - 1] + this.prizelist[i].probility
        // console.log(probilitySum[i])
      }
      if (p < probilitySum[0]) { this.index = 1 } else if (probilitySum[0] <= p < probilitySum[1]) { this.index = 2 } else if (probilitySum[1] <= p < probilitySum[2]) { this.index = 3 } else if (probilitySum[2] < p < probilitySum[3]) { this.index = 4 } else if (probilitySum[3] <= p < probilitySum[4]) { this.index = 6 } else this.index = 5
      if (this.isrun) return
      this.isrun = true
      this.rotateAngle = (this.circle - 1) * 360 - (30 + (this.index - 1) * 60)
      this.hasrun = true
      setTimeout(this.note, 5000)
      console.log(this.index)
    },
    note () {
      if (this.index === 5) { alert('差一点点就获奖了～') } else if (this.index === 6) {
        alert('恭喜获得' + this.prizelist[this.index - 2].prize_name + '元')
        this.prizelist[this.index - 2].prize_amount--
        axios.post('https://qcg1jg.fn.thelarkcloud.com/reduceAmount', {
          name: this.prizelist[this.index - 2].prize_name
        })
      } else {
        alert('恭喜获得' + this.prizelist[this.index - 1].prize_name + '元')
        this.prizelist[this.index - 1].prize_amount--
        axios.post('https://qcg1jg.fn.thelarkcloud.com/reduceAmount', {
          name: this.prizelist[this.index - 1].prize_name
        })
      }
      location.reload()
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
  transform: rotate(20deg);
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

</style>
