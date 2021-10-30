<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.agent" placeholder="代理id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        隐藏0余额用户
        <el-switch v-model="dataForm.isHiddenForBalance">
        </el-switch>
      </el-form-item>
      <el-form-item>
        隐藏未授权用户
        <el-switch v-model="dataForm.isHiddenForApprove">
        </el-switch>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <!--        <el-button v-if="isAuth('app:trcuser:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
        <!--        <el-button v-if="isAuth('app:trcuser:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <div>
        <el-tag>共计用户数: {{ userStat.count }}</el-tag>
        <el-tag>共计余额: {{ userStat.usdtTotal }}</el-tag>
      </div>
    </el-card>

    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <!--      <el-table-column-->
      <!--        type="selection"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        width="50">-->
      <!--      </el-table-column>-->
      <el-table-column
        sortable
        width="100"
        prop="id"
        header-align="center"
        align="center"
        label="用户id">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="钱包地址">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="balance"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="TRX余额">-->
      <!--      </el-table-column>-->
      <el-table-column
        sortable
        prop="usdtBalance"
        header-align="center"
        align="center"
        label="USDT余额">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="usdtApprove"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="USDT授权额">-->
      <!--      </el-table-column>-->
      <el-table-column
        width="80"
        prop="agent"
        header-align="center"
        align="center"
        label="代理id">
      </el-table-column>
      <el-table-column
        width="100"
        prop="inviterId"
        header-align="center"
        align="center"
        label="邀请用户id">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="txHash"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="交易哈希">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="remark"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="备注">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="usdtApprove"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="USDT授权额">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="usdtApprove"
        header-align="center"
        align="center"
        label="是否授权">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.usdtApprove > 0" type="success" disable-transitions>已授权</el-tag>
          <el-tag v-if="scope.row.usdtApprove <= 0" type="danger" disable-transitions>未授权</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="withdraw"
        header-align="center"
        align="center"
        label="累计提出">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="usdtThreshold"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="USDT余额阈值">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="首次授权时间">
      </el-table-column>
      <el-table-column
        prop="lastApproveTime"
        header-align="center"
        align="center"
        label="最后授权时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="监控时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <!--          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>-->
          <!--          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
          <el-button v-if="isAuth('app:trcuser:save') && scope.row.usdtApprove > 0" type="text" size="small"
                     @click="openWithdrawalsBox(scope.row.id, scope.row.usdtBalance)">提币
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[20, 50, 100, 500]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './trcuser-add-or-update'

export default {
  data() {
    return {
      dataForm: {
        agent: '',
        isHiddenForBalance: true,
        isHiddenForApprove: true,
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 100,
      totalPage: 0,
      userStat: {
        count: "-",
        usdtTotal: "-",
      },
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false,
    }
  },
  components: {
    AddOrUpdate
  },
  activated() {
    let _self = this;

    // 表格
    _self.getDataList();
    setInterval(function () {
      _self.getDataList();
    }, 60 * 1000);
  },
  methods: {
    // 获取数据列表
    getDataList() {
      let _self = this;
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/app/trcuser/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'agent': this.dataForm.agent,
          'usdtBalanceGe': this.dataForm.isHiddenForBalance ? 0.00001 : undefined,
          'usdtApproveGe': this.dataForm.isHiddenForApprove ? 0.00001 : undefined,
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.total
          this.userStat = data.stat
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })

      // _self.getMsg();
    },
    // 提币
    openWithdrawalsBox(id, usdtBalance) {
      this.$prompt('请输入对 id[' + id + '] 用户的USDT提币数量', '提币', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: usdtBalance,
        inputPlaceholder: '最大可提' + usdtBalance,
      }).then(({value}) => {
        if (value > usdtBalance) {
          this.$message.error("USDT余额不足")
          return;
        }

        this.$http({
          url: this.$http.adornUrl(`/app/trcuser/transferFrom`),
          method: 'post',
          data: this.$http.adornData({
            'userId': id,
            'amount': value,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功！交易已广播，请稍等！交易哈希: ' + data.txHash,
              type: 'success',
              duration: 10 * 1000,
              onClose: () => {
                this.visible = false
                this.$emit('refreshDataList')
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    },
    // 每页数
    sizeChangeHandle(val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle(val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle(val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle(id) {
      this.addOrUpdateVisible = true
      this.$nextTick(() => {
        this.$refs.addOrUpdate.init(id)
      })
    },
    // 分页序号自增
    table_index(index) {
      return (this.pageIndex - 1) * this.pageSize + index + 1
    },
    // 删除
    deleteHandle(id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })
      this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/app/trcuser/delete'),
          method: 'post',
          data: this.$http.adornData(ids, false)
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.$message({
              message: '操作成功',
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(data.msg)
          }
        })
      })
    }
  }
}
</script>
