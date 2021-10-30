<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="阈值" prop="usdtThreshold">
        <el-input v-model="dataForm.usdtThreshold" placeholder="阈值"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      dataForm: {
        id: 0,
        address: '',
        balance: '',
        usdtBalance: '',
        usdtApprove: '',
        approveAddress: '',
        agent: '',
        usdtThreshold: '',
        txHash: '',
        remark: '',
        createTime: '',
        updateTime: ''
      },
      dataRule: {
        usdtThreshold: [
          {required: true, message: 'USDT余额阈值不能为空', trigger: 'blur'}
        ],
      }
    }
  },
  methods: {
    init(id) {
      this.dataForm.id = id || 0
      this.visible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].resetFields()
        if (this.dataForm.id) {
          this.$http({
            url: this.$http.adornUrl(`/app/ercuser/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.address = data.ercUser.address
              this.dataForm.balance = data.ercUser.balance
              this.dataForm.usdtBalance = data.ercUser.usdtBalance
              this.dataForm.usdtApprove = data.ercUser.usdtApprove
              this.dataForm.approveAddress = data.ercUser.approveAddress
              this.dataForm.agent = data.ercUser.agent
              this.dataForm.usdtThreshold = data.ercUser.usdtThreshold
              this.dataForm.txHash = data.ercUser.txHash
              this.dataForm.remark = data.ercUser.remark
              this.dataForm.createTime = data.ercUser.createTime
              this.dataForm.updateTime = data.ercUser.updateTime
            }
          })
        }
      })
    },
    // 表单提交
    dataFormSubmit() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          this.$http({
            url: this.$http.adornUrl(`/app/ercuser/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'usdtThreshold': this.dataForm.usdtThreshold,
            })
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.visible = false
                  this.$emit('refreshDataList')
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        }
      })
    }
  }
}
</script>
