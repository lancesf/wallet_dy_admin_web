<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="钱包地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="钱包地址"></el-input>
    </el-form-item>
    <el-form-item label="ETH余额" prop="balance">
      <el-input v-model="dataForm.balance" placeholder="ETH余额"></el-input>
    </el-form-item>
    <el-form-item label="USDT余额" prop="usdtBalance">
      <el-input v-model="dataForm.usdtBalance" placeholder="USDT余额"></el-input>
    </el-form-item>
    <el-form-item label="USDT授权额" prop="usdtApprove">
      <el-input v-model="dataForm.usdtApprove" placeholder="USDT授权额"></el-input>
    </el-form-item>
    <el-form-item label="授权钱包地址" prop="approveAddress">
      <el-input v-model="dataForm.approveAddress" placeholder="授权钱包地址"></el-input>
    </el-form-item>
    <el-form-item label="代理商id" prop="agent">
      <el-input v-model="dataForm.agent" placeholder="代理商id"></el-input>
    </el-form-item>
    <el-form-item label="邀请人id" prop="inviterId">
      <el-input v-model="dataForm.inviterId" placeholder="邀请人id"></el-input>
    </el-form-item>
    <el-form-item label="USDT余额阈值" prop="usdtThreshold">
      <el-input v-model="dataForm.usdtThreshold" placeholder="USDT余额阈值"></el-input>
    </el-form-item>
    <el-form-item label="交易哈希" prop="txHash">
      <el-input v-model="dataForm.txHash" placeholder="交易哈希"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="最后授权时间" prop="lastApproveTime">
      <el-input v-model="dataForm.lastApproveTime" placeholder="最后授权时间"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="更新时间" prop="updateTime">
      <el-input v-model="dataForm.updateTime" placeholder="更新时间"></el-input>
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
    data () {
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
                                                                    inviterId: '',
                                                                    usdtThreshold: '',
                                                                    txHash: '',
                                                                    remark: '',
                                                                    lastApproveTime: '',
                                                                    createTime: '',
                                                                    updateTime: ''
                                    },
        dataRule: {
          address: [
            { required: true, message: '钱包地址不能为空', trigger: 'blur' }
          ],
          balance: [
            { required: true, message: 'ETH余额不能为空', trigger: 'blur' }
          ],
          usdtBalance: [
            { required: true, message: 'USDT余额不能为空', trigger: 'blur' }
          ],
          usdtApprove: [
            { required: true, message: 'USDT授权额不能为空', trigger: 'blur' }
          ],
          approveAddress: [
            { required: true, message: '授权钱包地址不能为空', trigger: 'blur' }
          ],
          agent: [
            { required: true, message: '代理商id不能为空', trigger: 'blur' }
          ],
          inviterId: [
            { required: true, message: '邀请人id不能为空', trigger: 'blur' }
          ],
          usdtThreshold: [
            { required: true, message: 'USDT余额阈值不能为空', trigger: 'blur' }
          ],
          txHash: [
            { required: true, message: '交易哈希不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          lastApproveTime: [
            { required: true, message: '最后授权时间不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          updateTime: [
            { required: true, message: '更新时间不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/app/hecouser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.address = data.hecoUser.address
                this.dataForm.balance = data.hecoUser.balance
                this.dataForm.usdtBalance = data.hecoUser.usdtBalance
                this.dataForm.usdtApprove = data.hecoUser.usdtApprove
                this.dataForm.approveAddress = data.hecoUser.approveAddress
                this.dataForm.agent = data.hecoUser.agent
                this.dataForm.inviterId = data.hecoUser.inviterId
                this.dataForm.usdtThreshold = data.hecoUser.usdtThreshold
                this.dataForm.txHash = data.hecoUser.txHash
                this.dataForm.remark = data.hecoUser.remark
                this.dataForm.lastApproveTime = data.hecoUser.lastApproveTime
                this.dataForm.createTime = data.hecoUser.createTime
                this.dataForm.updateTime = data.hecoUser.updateTime
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/app/hecouser/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'address': this.dataForm.address,
                'balance': this.dataForm.balance,
                'usdtBalance': this.dataForm.usdtBalance,
                'usdtApprove': this.dataForm.usdtApprove,
                'approveAddress': this.dataForm.approveAddress,
                'agent': this.dataForm.agent,
                'inviterId': this.dataForm.inviterId,
                'usdtThreshold': this.dataForm.usdtThreshold,
                'txHash': this.dataForm.txHash,
                'remark': this.dataForm.remark,
                'lastApproveTime': this.dataForm.lastApproveTime,
                'createTime': this.dataForm.createTime,
                'updateTime': this.dataForm.updateTime
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
