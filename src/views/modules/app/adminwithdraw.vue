<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.adminId" placeholder="代理id" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="dataForm.status" placeholder="状态">
          <el-option
            key="-10000"
            label="全部"
            value="-10000">
          </el-option>
          <el-option
            key="0"
            label="成功"
            value="0">
          </el-option>
          <el-option
            key="-1"
            label="等待打包"
            value="-1">
          </el-option>
          <el-option
            key="-2"
            label="打包失败"
            value="-2">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
<!--        <el-button v-if="isAuth('app:adminwithdraw:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>-->
<!--        <el-button v-if="isAuth('app:adminwithdraw:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>-->
      </el-form-item>
    </el-form>

    <el-card class="box-card">
      <div>
        <el-tag>共计成功次数: {{ stat.count }}</el-tag>
        <el-tag>共计成功提币金额: {{ stat.amount }}</el-tag>
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
<!--      <el-table-column-->
<!--        type="index"-->
<!--        :index="table_index"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        width="50"-->
<!--        label="序号">-->
<!--      </el-table-column>-->
      <el-table-column
        sortable
        width="100"
        prop="id"
        header-align="center"
        align="center"
        label="id">
      </el-table-column>
      <el-table-column
        width="80"
        prop="adminId"
        header-align="center"
        align="center"
        label="代理id">
      </el-table-column>
      <el-table-column
        prop="amount"
        header-align="center"
        align="center"
        label="提币金额">
      </el-table-column>
      <el-table-column
        prop="type"
        header-align="center"
        align="center"
        label="类型">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.typeTag"
            disable-transitions>{{scope.row.type}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="txHash"
        header-align="center"
        align="center"
        label="交易哈希">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="fromAddr"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="来源地址">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="toAddr"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="去向地址">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="status"
        header-align="center"
        align="center"
        label="状态">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.statusTag"
            disable-transitions>{{scope.row.status}}</el-tag>
        </template>
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="details"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="详情">-->
<!--      </el-table-column>-->
<!--      <el-table-column-->
<!--        prop="remark"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="备注">-->
<!--      </el-table-column>-->
      <el-table-column
        prop="createTime"
        header-align="center"
        align="center"
        label="创建时间">
      </el-table-column>
<!--      <el-table-column-->
<!--        prop="updateTime"-->
<!--        header-align="center"-->
<!--        align="center"-->
<!--        label="更新时间">-->
<!--      </el-table-column>-->
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
  import AddOrUpdate from './adminwithdraw-add-or-update'
  export default {
    data () {
      return {
        dataForm: {
          adminId: '',
          status: "-10000",
        },
        dataList: [],
        pageIndex: 1,
        pageSize: 100,
        totalPage: 0,
        stat: {
          count: "-",
          amount: "-",
        },
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false
      }
    },
    components: {
      AddOrUpdate
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/app/adminwithdraw/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'adminId': this.dataForm.adminId,
            'status': this.dataForm.status == -10000 ? undefined : this.dataForm.status,
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
            this.stat = data.stat

            for (let i = 0; i < this.dataList.length; i++) {
              this.dataList[i].typeTag = ""
              if (this.dataList[i].type == 0) {
                this.dataList[i].type = "ERC"
              } else if (this.dataList[i].type == 1) {
                this.dataList[i].type = "TRC"
              } else if (this.dataList[i].type == 2) {
                this.dataList[i].type = "HECO"
              } else if (this.dataList[i].type == 3) {
                this.dataList[i].type = "BSC"
              } else {
                this.dataList[i].type = "其他"
                this.dataList[i].typeTag = "info"
              }

              // （0 成功，-1 等待打包，-2 打包失败）
              if (this.dataList[i].status == 0) {
                this.dataList[i].status = "成功"
                this.dataList[i].statusTag = "success"
              } else if (this.dataList[i].status == -1) {
                this.dataList[i].status = "等待打包"
                this.dataList[i].statusTag = "warning"
              } else if (this.dataList[i].status == -2) {
                this.dataList[i].status = "打包失败"
                this.dataList[i].statusTag = "danger"
              } else {
                this.dataList[i].status = "其他"
                this.dataList[i].statusTag = "info"
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
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
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
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.id
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/app/adminwithdraw/delete'),
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
