<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="参数名" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('app:coin:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('app:coin:delete')" type="danger" @click="deleteHandle()"
                   :disabled="dataListSelections.length <= 0">批量删除
        </el-button>
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
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        type="index"
        :index="table_index"
        header-align="center"
        align="center"
        width="50"
        label="序号">
      </el-table-column>
      <el-table-column
        prop="id"
        header-align="center"
        align="center"
        label="id">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="name"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="代币名称">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="name"
        header-align="center"
        align="center"
        label="代币名称">
        <template slot-scope="scope">
          <div>
            <el-tag disable-transitions>
              {{ scope.row.name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <div>
            <div>
              <el-tag v-if="scope.row.type == 0" type="success" disable-transitions>
                ERC
              </el-tag>
              <el-tag v-if="scope.row.type == 1" type="success" disable-transitions>
                TRC
              </el-tag>
              <el-tag v-if="scope.row.type == 2" type="success" disable-transitions>
                HECO
              </el-tag>
              <el-tag v-if="scope.row.type == 3" type="success" disable-transitions>
                BSC
              </el-tag>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="decimals"
        header-align="center"
        align="center"
        label="精度">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="type"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="类型">-->
      <!--      </el-table-column>-->
      <!--      <el-table-column-->
      <!--        prop="contractAddress"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="合约地址">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="contractAddress"
        header-align="center"
        align="center"
        label="合约地址">
        <template slot-scope="scope">
          <div>
            <a v-if="scope.row.type == 0" target="_blank"
               :href="'https://etherscan.io/address/'+scope.row.contractAddress">
              {{ scope.row.contractAddress }}
            </a>
            <a v-if="scope.row.type == 1" target="_blank"
               :href="'https://tronscan.org/#/contract/'+scope.row.contractAddress">
              {{ scope.row.contractAddress }}
            </a>
            <a v-if="scope.row.type == 2" target="_blank"
               :href="'https://hecoinfo.com/address/'+scope.row.contractAddress">
              {{ scope.row.contractAddress }}
            </a>
            <a v-if="scope.row.type == 3" target="_blank"
               :href="'https://bscscan.com/address/'+scope.row.contractAddress">
              {{ scope.row.contractAddress }}
            </a>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="minWithdraw"
        header-align="center"
        align="center"
        label="最小提币数量">
      </el-table-column>
      <el-table-column
        prop="priceUsdt"
        header-align="center"
        align="center"
        label="价格（U）">
      </el-table-column>
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="sort"
        header-align="center"
        align="center"
        label="排序">
      </el-table-column>
      <el-table-column
        prop="remark"
        header-align="center"
        align="center"
        label="备注">
      </el-table-column>
      <!--      <el-table-column-->
      <!--        prop="createTime"-->
      <!--        header-align="center"-->
      <!--        align="center"-->
      <!--        label="创建时间">-->
      <!--      </el-table-column>-->
      <el-table-column
        prop="updateTime"
        header-align="center"
        align="center"
        label="更新时间">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="addOrUpdateHandle(scope.row.id)">修改</el-button>
          <el-button type="text" size="small" @click="deleteHandle(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
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
import AddOrUpdate from './coin-add-or-update'

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
        url: this.$http.adornUrl('/app/coin/list'),
        method: 'get',
        params: this.$http.adornParams({
          'page': this.pageIndex,
          'limit': this.pageSize,
          'key': this.dataForm.key
        })
      }).then(({data}) => {
        if (data && data.code === 0) {
          for (let i = 0; i < data.page.list.length; i++) {
            data.page.list[i].priceUsdt = data.page.list[i].priceUsdt * 1
          }

          this.dataList = data.page.list
          this.totalPage = data.page.totalCount


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
          url: this.$http.adornUrl('/app/coin/delete'),
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
