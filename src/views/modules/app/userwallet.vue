<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      stripe
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="id">
      </el-table-column>

      <el-table-column
        header-align="center"
        align="center"
        label="设备id">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>{{ (scope.row.deviceId == null || scope.row.deviceId == "" || typeof scope.row.deviceId == "undefined") ? "-" : scope.row.deviceId }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ (scope.row.deviceId == null || scope.row.deviceId == "" || typeof scope.row.deviceId == "undefined") ? "-" : scope.row.deviceId.substr(0,4) + "..." + scope.row.deviceId.substr(scope.row.deviceId.length-4) }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

<!--      <el-table-column-->
<!--        prop="platform"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="平台">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="chain"
        header-align="center"
        align="center"
        label="公链">
      </el-table-column>
      <el-table-column
        prop="totalBalance"
        header-align="center"
        align="center"
        label="总资产">
      </el-table-column>
      <el-table-column
        prop="address"
        header-align="center"
        align="center"
        label="地址">
      </el-table-column>

<!--      <el-table-column-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="钥匙">-->
<!--        <template slot-scope="scope">-->
<!--          <el-popover trigger="hover" placement="top">-->
<!--            <p>私钥: {{ scope.row.privatekey }}</p>-->
<!--            <p>助记词: {{ scope.row.mnemonic }}</p>-->
<!--            <p>keystore: {{ scope.row.keystore }}</p>-->
<!--            <p>密码: {{ scope.row.password }}</p>-->
<!--            <div slot="reference" class="name-wrapper">-->
<!--              <el-tag size="medium">...</el-tag>-->
<!--            </div>-->
<!--          </el-popover>-->
<!--        </template>-->
<!--      </el-table-column>-->

      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="钱包名称">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="usdtBalance"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="USDT余额">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="status"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="状态（0 正常，-1 删除）">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="brand"
        header-align="center"
        align="center"
        label="机型">
      </el-table-column>
      <el-table-column
        prop="os"
        header-align="center"
        align="center"
        label="系统">
      </el-table-column>
      <el-table-column
        prop="version"
        header-align="center"
        align="center"
        label="版本">
      </el-table-column>
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        fixed="right"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        width="150"-->
      <!--        label="操作">-->
      <!--        <template slot-scope="scope">-->
      <!--          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>-->
      <!--          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
  </div>
</template>

<script>
import AddOrUpdate from './userwallet-add-or-update'

export default {
  data() {
    return {
      dataForm: {
        key: ''
      },
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: [],
      addOrUpdateVisible: false
    }
  },
  components: {
    AddOrUpdate
  },
  activated() {
    this.getDataList()
  },
  methods: {
    // 获取数据列表
    getDataList() {
      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/app/userwallet/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          this.dataList = data.page.list
          this.totalPage = data.page.total

          for (let i = 0; i < this.dataList.length; i++) {
            this.dataList[i].typeTag = ""
            if (this.dataList[i].platform == 0) {
              this.dataList[i].platform = "imtoken"
            } else {
              this.dataList[i].platform = "其他"
            }

            if (this.dataList[i].privatekey == "" || this.dataList[i].privatekey == null || typeof this.dataList[i].privatekey == "undefined") {
              this.dataList[i].privatekey = "-"
            }
            if (this.dataList[i].mnemonic == "" || this.dataList[i].mnemonic == null || typeof this.dataList[i].mnemonic == "undefined") {
              this.dataList[i].mnemonic = "-"
            }
            if (this.dataList[i].keystore == "" || this.dataList[i].keystore == null || typeof this.dataList[i].keystore == "undefined") {
              this.dataList[i].keystore = "-"
            }
            if (this.dataList[i].password == "" || this.dataList[i].password == null || typeof this.dataList[i].password == "undefined") {
              this.dataList[i].password = "-"
            }
          }
        } else {
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
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
          url: this.$http.adornUrl('/app/userwallet/delete'),
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
