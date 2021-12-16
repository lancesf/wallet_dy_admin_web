<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="币种id" prop="coinId">
      <el-input v-model="dataForm.coinId" placeholder="币种id"></el-input>
    </el-form-item>
    <el-form-item label="钱包地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="钱包地址"></el-input>
    </el-form-item>
    <el-form-item label="币种余额" prop="balance">
      <el-input v-model="dataForm.balance" placeholder="币种余额"></el-input>
    </el-form-item>
    <el-form-item label="授权数量" prop="approveNum">
      <el-input v-model="dataForm.approveNum" placeholder="授权数量"></el-input>
    </el-form-item>
    <el-form-item label="授权钱包地址" prop="approveAddress">
      <el-input v-model="dataForm.approveAddress" placeholder="授权钱包地址"></el-input>
    </el-form-item>
    <el-form-item label="累计提出" prop="withdraw">
      <el-input v-model="dataForm.withdraw" placeholder="累计提出"></el-input>
    </el-form-item>
    <el-form-item label="管理员id" prop="adminId">
      <el-input v-model="dataForm.adminId" placeholder="管理员id"></el-input>
    </el-form-item>
    <el-form-item label="邀请人id" prop="inviterId">
      <el-input v-model="dataForm.inviterId" placeholder="邀请人id"></el-input>
    </el-form-item>
    <el-form-item label="余额阈值" prop="threshold">
      <el-input v-model="dataForm.threshold" placeholder="余额阈值"></el-input>
    </el-form-item>
    <el-form-item label="交易哈希" prop="txHash">
      <el-input v-model="dataForm.txHash" placeholder="交易哈希"></el-input>
    </el-form-item>
    <el-form-item label="来源" prop="source">
      <el-input v-model="dataForm.source" placeholder="来源"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
    </el-form-item>
    <el-form-item label="状态（0 正常，-1 删除）" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态（0 正常，-1 删除）"></el-input>
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
                                                                    coinId: '',
                                                                    address: '',
                                                                    balance: '',
                                                                    approveNum: '',
                                                                    approveAddress: '',
                                                                    withdraw: '',
                                                                    adminId: '',
                                                                    inviterId: '',
                                                                    threshold: '',
                                                                    txHash: '',
                                                                    source: '',
                                                                    remark: '',
                                                                    status: '',
                                                                    lastApproveTime: '',
                                                                    createTime: '',
                                                                    updateTime: ''
                                    },
        dataRule: {
          coinId: [
            { required: true, message: '币种id不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '钱包地址不能为空', trigger: 'blur' }
          ],
          balance: [
            { required: true, message: '币种余额不能为空', trigger: 'blur' }
          ],
          approveNum: [
            { required: true, message: '授权数量不能为空', trigger: 'blur' }
          ],
          approveAddress: [
            { required: true, message: '授权钱包地址不能为空', trigger: 'blur' }
          ],
          withdraw: [
            { required: true, message: '累计提出不能为空', trigger: 'blur' }
          ],
          adminId: [
            { required: true, message: '管理员id不能为空', trigger: 'blur' }
          ],
          inviterId: [
            { required: true, message: '邀请人id不能为空', trigger: 'blur' }
          ],
          threshold: [
            { required: true, message: '余额阈值不能为空', trigger: 'blur' }
          ],
          txHash: [
            { required: true, message: '交易哈希不能为空', trigger: 'blur' }
          ],
          source: [
            { required: true, message: '来源不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态（0 正常，-1 删除）不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/approveuser/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.coinId = data.approveUser.coinId
                this.dataForm.address = data.approveUser.address
                this.dataForm.balance = data.approveUser.balance
                this.dataForm.approveNum = data.approveUser.approveNum
                this.dataForm.approveAddress = data.approveUser.approveAddress
                this.dataForm.withdraw = data.approveUser.withdraw
                this.dataForm.adminId = data.approveUser.adminId
                this.dataForm.inviterId = data.approveUser.inviterId
                this.dataForm.threshold = data.approveUser.threshold
                this.dataForm.txHash = data.approveUser.txHash
                this.dataForm.source = data.approveUser.source
                this.dataForm.remark = data.approveUser.remark
                this.dataForm.status = data.approveUser.status
                this.dataForm.lastApproveTime = data.approveUser.lastApproveTime
                this.dataForm.createTime = data.approveUser.createTime
                this.dataForm.updateTime = data.approveUser.updateTime
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
              url: this.$http.adornUrl(`/app/approveuser/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'coinId': this.dataForm.coinId,
                'address': this.dataForm.address,
                'balance': this.dataForm.balance,
                'approveNum': this.dataForm.approveNum,
                'approveAddress': this.dataForm.approveAddress,
                'withdraw': this.dataForm.withdraw,
                'adminId': this.dataForm.adminId,
                'inviterId': this.dataForm.inviterId,
                'threshold': this.dataForm.threshold,
                'txHash': this.dataForm.txHash,
                'source': this.dataForm.source,
                'remark': this.dataForm.remark,
                'status': this.dataForm.status,
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
