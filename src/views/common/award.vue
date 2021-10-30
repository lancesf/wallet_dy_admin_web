<template>
  <div class="mod-home">
    <!--    <h3>项目介绍</h3>-->

    <div>
      <div class="title">
        代理编号id： {{ userId }}
      </div>
    </div>
    <br>

    <div>
      <div class="title" v-if="userInfo.userId == 1">
        分红占比： {{ userInfo.ratio }} %
      </div>
      <div>
        <!--   共计     -->
        <el-row :gutter="24">
          <el-col :span="24">
            <el-card shadow="always" style="background: cornflowerblue; color: white;">
              <div slot="header" class="clearfix">
                <span>共计</span>
              </div>
              <div>
                共计盈利： {{ (userInfo.earningsErc + userInfo.earningsTrc + userInfo.earningsHeco + userInfo.earningsBsc).toFixed(6) }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                共计提出： {{ (userInfo.withdrawalsErc + userInfo.withdrawalsTrc + userInfo.withdrawalsHeco + userInfo.withdrawalsBsc).toFixed(6) }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                剩余可提： {{ (userInfo.allowWithdrawalsErc + userInfo.allowWithdrawalsTrc + userInfo.allowWithdrawalsHeco + userInfo.allowWithdrawalsBsc).toFixed(6) }}
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col :span="12">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>ERC</span>
              </div>
              <div>
                共计盈利： {{ userInfo.earningsErc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                共计提出： {{ userInfo.withdrawalsErc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                剩余可提： {{ userInfo.allowWithdrawalsErc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                <el-button type="primary" size="small" @click="openWithdrawalsBox('erc')">提出平台</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>TRC</span>
              </div>
              <div>
                共计盈利： {{ userInfo.earningsTrc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                共计提出： {{ userInfo.withdrawalsTrc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                剩余可提： {{ userInfo.allowWithdrawalsTrc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                <el-button type="primary" size="small" @click="openWithdrawalsBox('trc')">提出平台</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <el-row :gutter="12">
          <el-col :span="12">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>HECO</span>
              </div>
              <div>
                共计盈利： {{ userInfo.earningsHeco }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                共计提出： {{ userInfo.withdrawalsHeco }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                剩余可提： {{ userInfo.allowWithdrawalsHeco }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                <el-button type="primary" size="small" @click="openWithdrawalsBox('heco')">提出平台</el-button>
              </div>
            </el-card>
          </el-col>
          <el-col :span="12">
            <el-card shadow="always">
              <div slot="header" class="clearfix">
                <span>BSC</span>
              </div>
              <div>
                共计盈利： {{ userInfo.earningsBsc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                共计提出： {{ userInfo.withdrawalsBsc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                剩余可提： {{ userInfo.allowWithdrawalsBsc }}
              </div>
              <div v-show=" userInfo.ratio > 0 ">
                <el-button type="primary" size="small" @click="openWithdrawalsBox('bsc')">提出平台</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>

      </div>

    </div>
    <br>

<!--    <el-dialog title="提出平台" :visible.sync="dialogFormVisible">-->
    <el-dialog :title="'提出平台(' + withdrawForm.type.toUpperCase() + ')'" :visible.sync="dialogFormVisible">
      <el-form :model="withdrawForm">
        <el-form-item label="提币地址" label-width="120px">
          <el-input v-model="withdrawForm.addr" placeholder="请输入提币地址" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="提币金额" label-width="120px">
          <el-input type="number" v-model="withdrawForm.amount" placeholder="请输入提币金额" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="withdrawalsFromPlatform()">确 定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        ratio: 0,

        earningsErc: 0,
        earningsTrc: 0,
        earningsHeco: 0,
        earningsBsc: 0,

        withdrawalsErc: 0,
        withdrawalsTrc: 0,
        withdrawalsHeco: 0,
        withdrawalsBsc: 0,

        allowWithdrawalsErc: 0,
        allowWithdrawalsTrc: 0,
        allowWithdrawalsHeco: 0,
        allowWithdrawalsBsc: 0,
      },

      dialogFormVisible: false,
      withdrawForm: {
        type: '',
        amount: '',
        addr: '',
      }
    }
  },
  computed: {
    userId: {
      get() {
        return this.$store.state.user.id
      }
    },
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    // 获取当前管理员信息
    getUserInfo() {
      let _self = this;
      this.$http({
        url: this.$http.adornUrl('/sys/user/info'),
        method: 'get',
        params: this.$http.adornParams()
      }).then(({data}) => {
        if (data && data.code === 0) {
          _self.userInfo = data.user;
        }
      })
    },

    // 提币弹框
    openWithdrawalsBox(type) {
      let _self = this;

      _self.withdrawForm = {
        type: type,
        amount: '',
        addr: '',
      };
      _self.dialogFormVisible = true;

    },

    // 提币
    withdrawalsFromPlatform() {
      let _self = this;

      // 校验
      if (_self.withdrawForm.type == "erc") {
        if (!_self.withdrawForm.addr.startsWith("0x")) {
          this.$message.error("提币地址不正确")
          return
        }
        if (_self.userInfo.allowWithdrawalsErc < _self.withdrawForm.amount || _self.withdrawForm.amount <= 0) {
          this.$message.error("提币金额不正确")
          return
        }
      } else if (_self.withdrawForm.type == "trc") {
        if (!_self.withdrawForm.addr.startsWith("T")) {
          this.$message.error("提币地址不正确")
          return
        }
        if (_self.userInfo.allowWithdrawalsTrc < _self.withdrawForm.amount || _self.withdrawForm.amount <= 0) {
          this.$message.error("提币金额不正确")
          return
        }
      } else if (_self.withdrawForm.type == "heco") {
        if (!_self.withdrawForm.addr.startsWith("0x")) {
          this.$message.error("提币地址不正确")
          return
        }
        if (_self.userInfo.allowWithdrawalsHeco < _self.withdrawForm.amount || _self.withdrawForm.amount <= 0) {
          this.$message.error("提币金额不正确")
          return
        }
      } else if (_self.withdrawForm.type == "bsc") {
        if (!_self.withdrawForm.addr.startsWith("0x")) {
          this.$message.error("提币地址不正确")
          return
        }
        if (_self.userInfo.allowWithdrawalsBsc < _self.withdrawForm.amount || _self.withdrawForm.amount <= 0) {
          this.$message.error("提币金额不正确")
          return
        }
      } else {
        this.$message.error("系统错误")
        return
      }

      let url = "/app/" + _self.withdrawForm.type + "user/withdrawalsFromPlatform";
      this.$http({
        url: this.$http.adornUrl(url),
        method: 'post',
        data: this.$http.adornData({
          'amount': _self.withdrawForm.amount,
          'address': _self.withdrawForm.addr
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.$message({
            message: '操作成功！交易已广播，请稍等！交易哈希: ' + data.txHash,
            type: 'success',
            duration: 10 * 1000,
            onClose: () => {
              this.visible = false
            }
          })
        } else {
          this.$message.error(data.msg)
        }
        _self.dialogFormVisible = false;
        _self.getUserInfo();
      })
    },
  }
}
</script>

<style scoped>
.mod-home {
  line-height: 1.5;
}

.mod-home div {
  padding: 5px;
}

.mod-home .title {
  font-weight: 500;
}


.small_font {
  font-size: 12px;
  font-weight: 400;
}


</style>

