<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()"
             label-width="80px">
      <el-form-item label="代币名称" prop="name">
        <el-input v-model="dataForm.name" placeholder="代币名称"></el-input>
      </el-form-item>
      <el-form-item label="精度" prop="decimals">
        <el-input v-model="dataForm.decimals" placeholder="精度"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="dataForm.type" placeholder="类型（0 erc，1 trc，2 heco，3 bsc）"></el-input>
      </el-form-item>
      <el-form-item label="合约地址" prop="contractAddress">
        <el-input v-model="dataForm.contractAddress" placeholder="合约地址"></el-input>
      </el-form-item>
      <el-form-item label="最小提币数量" prop="minWithdraw">
        <el-input v-model="dataForm.minWithdraw" placeholder="最小提币数量"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="priceUsdt">
        <el-input v-model="dataForm.priceUsdt" placeholder="价格"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-input v-model="dataForm.status" placeholder="状态（0 启用，-1 禁用）"></el-input>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="dataForm.sort" placeholder="排序"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="dataForm.remark" placeholder="备注"></el-input>
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
        name: '',
        decimals: '',
        type: '',
        contractAddress: '',
        minWithdraw: '',
        priceUsdt: '',
        status: '',
        sort: '',
        remark: '',
        createTime: '',
        updateTime: ''
      },
      dataRule: {
        // name: [
        //   {required: true, message: '代币名称不能为空', trigger: 'blur'}
        // ],
        // decimals: [
        //   {required: true, message: '精度不能为空', trigger: 'blur'}
        // ],
        // type: [
        //   {required: true, message: '类型（0 erc，1 trc，2 heco，3 bsc）不能为空', trigger: 'blur'}
        // ],
        // contractAddress: [
        //   {required: true, message: '合约地址不能为空', trigger: 'blur'}
        // ],
        // minWithdraw: [
        //   {required: true, message: '最小提币数量不能为空', trigger: 'blur'}
        // ],
        // priceUsdt: [
        //   {required: true, message: '价格不能为空', trigger: 'blur'}
        // ],
        // status: [
        //   {required: true, message: '状态（0 启用，-1 禁用）不能为空', trigger: 'blur'}
        // ],
        // sort: [
        //   {required: true, message: '排序不能为空', trigger: 'blur'}
        // ],
        // remark: [
        //   {required: true, message: '备注不能为空', trigger: 'blur'}
        // ],
        // createTime: [
        //   {required: true, message: '创建时间不能为空', trigger: 'blur'}
        // ],
        // updateTime: [
        //   {required: true, message: '更新时间不能为空', trigger: 'blur'}
        // ]
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
            url: this.$http.adornUrl(`/app/coin/info/${this.dataForm.id}`),
            method: 'get',
            params: this.$http.adornParams()
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.dataForm.name = data.coin.name
              this.dataForm.decimals = data.coin.decimals
              this.dataForm.type = data.coin.type
              this.dataForm.contractAddress = data.coin.contractAddress
              this.dataForm.minWithdraw = data.coin.minWithdraw
              this.dataForm.priceUsdt = data.coin.priceUsdt
              this.dataForm.status = data.coin.status
              this.dataForm.sort = data.coin.sort
              this.dataForm.remark = data.coin.remark
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
            url: this.$http.adornUrl(`/app/coin/${!this.dataForm.id ? 'save' : 'update'}`),
            method: 'post',
            data: this.$http.adornData({
              'id': this.dataForm.id || undefined,
              'name': this.dataForm.name,
              'decimals': this.dataForm.decimals,
              'type': this.dataForm.type,
              'contractAddress': this.dataForm.contractAddress,
              'minWithdraw': this.dataForm.minWithdraw,
              'priceUsdt': this.dataForm.priceUsdt,
              'status': this.dataForm.status,
              'sort': this.dataForm.sort,
              'remark': this.dataForm.remark,
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
