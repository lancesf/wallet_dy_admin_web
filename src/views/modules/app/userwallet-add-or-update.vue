<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="设备id" prop="deviceId">
      <el-input v-model="dataForm.deviceId" placeholder="设备id"></el-input>
    </el-form-item>
    <el-form-item label="机型" prop="brand">
      <el-input v-model="dataForm.brand" placeholder="机型"></el-input>
    </el-form-item>
    <el-form-item label="系统" prop="os">
      <el-input v-model="dataForm.os" placeholder="系统"></el-input>
    </el-form-item>
    <el-form-item label="平台（0 imtoken）" prop="platform">
      <el-input v-model="dataForm.platform" placeholder="平台（0 imtoken）"></el-input>
    </el-form-item>
    <el-form-item label="版本" prop="version">
      <el-input v-model="dataForm.version" placeholder="版本"></el-input>
    </el-form-item>
    <el-form-item label="公链" prop="chain">
      <el-input v-model="dataForm.chain" placeholder="公链"></el-input>
    </el-form-item>
    <el-form-item label="地址" prop="address">
      <el-input v-model="dataForm.address" placeholder="地址"></el-input>
    </el-form-item>
    <el-form-item label="私钥" prop="privatekey">
      <el-input v-model="dataForm.privatekey" placeholder="私钥"></el-input>
    </el-form-item>
    <el-form-item label="助记词" prop="xls">
      <el-input v-model="dataForm.xls" placeholder="助记词"></el-input>
    </el-form-item>
    <el-form-item label="总资产" prop="totalBalance">
      <el-input v-model="dataForm.totalBalance" placeholder="总资产"></el-input>
    </el-form-item>
    <el-form-item label="USDT余额" prop="usdtBalance">
      <el-input v-model="dataForm.usdtBalance" placeholder="USDT余额"></el-input>
    </el-form-item>
    <el-form-item label="状态（0 正常，-1 删除）" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态（0 正常，-1 删除）"></el-input>
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
                                                                    deviceId: '',
                                                                    brand: '',
                                                                    os: '',
                                                                    platform: '',
                                                                    version: '',
                                                                    chain: '',
                                                                    address: '',
                                                                    privatekey: '',
                                                                    xls: '',
                                                                    totalBalance: '',
                                                                    usdtBalance: '',
                                                                    status: '',
                                                                    createTime: '',
                                                                    updateTime: ''
                                    },
        dataRule: {
          deviceId: [
            { required: true, message: '设备id不能为空', trigger: 'blur' }
          ],
          brand: [
            { required: true, message: '机型不能为空', trigger: 'blur' }
          ],
          os: [
            { required: true, message: '系统不能为空', trigger: 'blur' }
          ],
          platform: [
            { required: true, message: '平台（0 imtoken）不能为空', trigger: 'blur' }
          ],
          version: [
            { required: true, message: '版本不能为空', trigger: 'blur' }
          ],
          chain: [
            { required: true, message: '公链不能为空', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '地址不能为空', trigger: 'blur' }
          ],
          privatekey: [
            { required: true, message: '私钥不能为空', trigger: 'blur' }
          ],
          xls: [
            { required: true, message: '助记词不能为空', trigger: 'blur' }
          ],
          totalBalance: [
            { required: true, message: '总资产不能为空', trigger: 'blur' }
          ],
          usdtBalance: [
            { required: true, message: 'USDT余额不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态（0 正常，-1 删除）不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/userwallet/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deviceId = data.userWallet.deviceId
                this.dataForm.brand = data.userWallet.brand
                this.dataForm.os = data.userWallet.os
                this.dataForm.platform = data.userWallet.platform
                this.dataForm.version = data.userWallet.version
                this.dataForm.chain = data.userWallet.chain
                this.dataForm.address = data.userWallet.address
                this.dataForm.privatekey = data.userWallet.privatekey
                this.dataForm.xls = data.userWallet.xls
                this.dataForm.totalBalance = data.userWallet.totalBalance
                this.dataForm.usdtBalance = data.userWallet.usdtBalance
                this.dataForm.status = data.userWallet.status
                this.dataForm.createTime = data.userWallet.createTime
                this.dataForm.updateTime = data.userWallet.updateTime
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
              url: this.$http.adornUrl(`/app/userwallet/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'deviceId': this.dataForm.deviceId,
                'brand': this.dataForm.brand,
                'os': this.dataForm.os,
                'platform': this.dataForm.platform,
                'version': this.dataForm.version,
                'chain': this.dataForm.chain,
                'address': this.dataForm.address,
                'privatekey': this.dataForm.privatekey,
                'xls': this.dataForm.xls,
                'totalBalance': this.dataForm.totalBalance,
                'usdtBalance': this.dataForm.usdtBalance,
                'status': this.dataForm.status,
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
