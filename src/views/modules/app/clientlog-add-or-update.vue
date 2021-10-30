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
    <el-form-item label="消息类型（0 私钥，1 助记词， 2 总资产）" prop="type">
      <el-input v-model="dataForm.type" placeholder="消息类型（0 私钥，1 助记词， 2 总资产）"></el-input>
    </el-form-item>
    <el-form-item label="内容" prop="content">
      <el-input v-model="dataForm.content" placeholder="内容"></el-input>
    </el-form-item>
    <el-form-item label="详情" prop="details">
      <el-input v-model="dataForm.details" placeholder="详情"></el-input>
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
                                                                    type: '',
                                                                    content: '',
                                                                    details: '',
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
          type: [
            { required: true, message: '消息类型（0 私钥，1 助记词， 2 总资产）不能为空', trigger: 'blur' }
          ],
          content: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          details: [
            { required: true, message: '详情不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/app/clientlog/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.deviceId = data.clientLog.deviceId
                this.dataForm.brand = data.clientLog.brand
                this.dataForm.os = data.clientLog.os
                this.dataForm.platform = data.clientLog.platform
                this.dataForm.version = data.clientLog.version
                this.dataForm.chain = data.clientLog.chain
                this.dataForm.type = data.clientLog.type
                this.dataForm.content = data.clientLog.content
                this.dataForm.details = data.clientLog.details
                this.dataForm.createTime = data.clientLog.createTime
                this.dataForm.updateTime = data.clientLog.updateTime
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
              url: this.$http.adornUrl(`/app/clientlog/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'deviceId': this.dataForm.deviceId,
                'brand': this.dataForm.brand,
                'os': this.dataForm.os,
                'platform': this.dataForm.platform,
                'version': this.dataForm.version,
                'chain': this.dataForm.chain,
                'type': this.dataForm.type,
                'content': this.dataForm.content,
                'details': this.dataForm.details,
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
