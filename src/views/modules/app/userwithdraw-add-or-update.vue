<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户id" prop="userId">
      <el-input v-model="dataForm.userId" placeholder="用户id"></el-input>
    </el-form-item>
    <el-form-item label="代理id" prop="adminId">
      <el-input v-model="dataForm.adminId" placeholder="代理id"></el-input>
    </el-form-item>
    <el-form-item label="提币金额" prop="amount">
      <el-input v-model="dataForm.amount" placeholder="提币金额"></el-input>
    </el-form-item>
    <el-form-item label="类型（0 erc usdt，1 trc usdt）" prop="type">
      <el-input v-model="dataForm.type" placeholder="类型（0 erc usdt，1 trc usdt）"></el-input>
    </el-form-item>
    <el-form-item label="交易哈希" prop="txHash">
      <el-input v-model="dataForm.txHash" placeholder="交易哈希"></el-input>
    </el-form-item>
    <el-form-item label="来源地址" prop="from">
      <el-input v-model="dataForm.from" placeholder="来源地址"></el-input>
    </el-form-item>
    <el-form-item label="去向地址" prop="to">
      <el-input v-model="dataForm.to" placeholder="去向地址"></el-input>
    </el-form-item>
    <el-form-item label="状态（0 成功，-1 等待打包，-2 打包失败）" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态（0 成功，-1 等待打包，-2 打包失败）"></el-input>
    </el-form-item>
    <el-form-item label="详情" prop="details">
      <el-input v-model="dataForm.details" placeholder="详情"></el-input>
    </el-form-item>
    <el-form-item label="备注" prop="remark">
      <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
                                                                    userId: '',
                                                                    adminId: '',
                                                                    amount: '',
                                                                    type: '',
                                                                    txHash: '',
                                                                    from: '',
                                                                    to: '',
                                                                    status: '',
                                                                    details: '',
                                                                    remark: '',
                                                                    createTime: '',
                                                                    updateTime: ''
                                    },
        dataRule: {
          userId: [
            { required: true, message: '用户id不能为空', trigger: 'blur' }
          ],
          adminId: [
            { required: true, message: '代理id不能为空', trigger: 'blur' }
          ],
          amount: [
            { required: true, message: '提币金额不能为空', trigger: 'blur' }
          ],
          type: [
            { required: true, message: '类型（0 erc usdt，1 trc usdt）不能为空', trigger: 'blur' }
          ],
          txHash: [
            { required: true, message: '交易哈希不能为空', trigger: 'blur' }
          ],
          from: [
            { required: true, message: '来源地址不能为空', trigger: 'blur' }
          ],
          to: [
            { required: true, message: '去向地址不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态（0 成功，-1 等待打包，-2 打包失败）不能为空', trigger: 'blur' }
          ],
          details: [
            { required: true, message: '详情不能为空', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '备注不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/userwithdraw/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.userId = data.userWithdraw.userId
                this.dataForm.adminId = data.userWithdraw.adminId
                this.dataForm.amount = data.userWithdraw.amount
                this.dataForm.type = data.userWithdraw.type
                this.dataForm.txHash = data.userWithdraw.txHash
                this.dataForm.from = data.userWithdraw.from
                this.dataForm.to = data.userWithdraw.to
                this.dataForm.status = data.userWithdraw.status
                this.dataForm.details = data.userWithdraw.details
                this.dataForm.remark = data.userWithdraw.remark
                this.dataForm.createTime = data.userWithdraw.createTime
                this.dataForm.updateTime = data.userWithdraw.updateTime
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
              url: this.$http.adornUrl(`/app/userwithdraw/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'userId': this.dataForm.userId,
                'adminId': this.dataForm.adminId,
                'amount': this.dataForm.amount,
                'type': this.dataForm.type,
                'txHash': this.dataForm.txHash,
                'from': this.dataForm.from,
                'to': this.dataForm.to,
                'status': this.dataForm.status,
                'details': this.dataForm.details,
                'remark': this.dataForm.remark,
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
