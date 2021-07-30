<template>
  <div class="tablebox">
    <p>当前奖品列表</p>
    <p>请保证奖品数量为5，且中奖概率不超过1</p>
    <el-table :data="prizelist.filter(data => !search || data.prize_name.includes(search.toLowerCase()))" border show-summary style="width: 50%; margin:0 auto">
    <el-table-column prop="prize_name" label="奖品名称"></el-table-column>
    <el-table-column prop="prize_amount" label="奖品数量"></el-table-column>
    <el-table-column prop="probility" label="中奖概率"></el-table-column>
    <el-table-column align="right">
      <template slot="header">
        <el-input
          v-model="search"
          size="mini"
          placeholder="输入关键字搜索"/>
      </template>
      <template slot-scope="scope">
          <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除奖品</el-button>
      </template>
      </el-table-column>
    </el-table>
    <el-row class="buttonrow">
    <el-button type="primary" @click="dialogFormVisible = true">添加奖品</el-button>
    <el-button type="primary" @click="updateDialogFormVisible = true">修改奖品</el-button>
    </el-row>
    <!-- Form -->
    <el-dialog title="添加奖品" :visible.sync="dialogFormVisible">
    <el-form :model="prize">
    <el-form-item label="奖品名称" :label-width="formLabelWidth">
      <el-input v-model="prize.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="奖品数量" :label-width="formLabelWidth">
      <el-input v-model="prize.amount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="中奖概率" :label-width="formLabelWidth">
      <el-input v-model="prize.prize_probility" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogFormVisible = false; createPrize()">确 定</el-button>
  </div>
</el-dialog>

<!-- 修改Form -->
    <el-dialog title="修改奖品" :visible.sync="updateDialogFormVisible">
    <el-form :model="prize">
    <el-form-item label="需修改的奖品名称" :label-width="formLabelWidth">
      <el-input v-model="prize.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="奖品数量" :label-width="formLabelWidth">
      <el-input v-model="prize.amount" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="中奖概率" :label-width="formLabelWidth">
      <el-input v-model="prize.prize_probility" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="updateDialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateDialogFormVisible = false; updatePrize()">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data () {
    return {
      prizelist: [],
      search: '',
      dialogFormVisible: false,
      updateDialogFormVisible: false,
      prize: {
        name: '',
        amount: '',
        prize_probility: ''
      },
      formLabelWidth: '140px'
    }
  },
  methods: {
    handleDelete (index, row) {
      console.log(row.prize_name)
      this.$confirm('此操作永久删除该数据，是否继续？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.prizelist.splice(index, 1)
        axios.post('https://qcg1jg.fn.thelarkcloud.com/deletePrize', {
          'prize_name': row.prize_name
        }).then((res) => {
          this.$message.success('删除成功！')
          this.findAll()
        })
          .catch((res) => {
            this.$message.console.error('删除失败！')
          })
      })
    },
    findAll () {
      axios.post('https://qcg1jg.fn.thelarkcloud.com/getPrize').then(
        res => {
          console.log(res)
          this.prizelist = res.data.response
        }
      )
    },
    createPrize () {
      console.log(this.prize)
      console.log(this.prize.probility)
      axios.post('https://qcg1jg.fn.thelarkcloud.com/createPrize', this.prize).then((res) => {
        this.$message.success('添加成功！')
        this.findAll()
      })
        .catch((res) => {
          this.$message.console.error('添加失败！')
        })
    },
    updatePrize () {
      console.log(this.prize)
      axios.post('https://qcg1jg.fn.thelarkcloud.com/updatePrize', this.prize).then((res) => {
        this.$message.success('更新成功！')
        this.findAll()
      })
        .catch((res) => {
          this.$message.console.error('更新失败！')
        })
    }
  },
  mounted () {
    this.findAll()
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tablebox{
  margin: 0 auto;
  text-align: center;
}
.buttonrow{
  margin-top: 20px;
}
</style>
