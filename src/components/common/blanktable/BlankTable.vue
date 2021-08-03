<template>
<div class="title">
  <div style="height:50px">
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="breadcrumb in breadcrumbList" :key=breadcrumb >{{breadcrumb}} </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="demo-input-suffix fl">
      <el-input
        v-if="ifSearch"
        placeholder="请输入搜索条件"
        prefix-icon="el-icon-search"
        v-model="search"
        @keyup.enter.native="getSearch()"
      >
      </el-input>
    </div>
    <div class="clickButton">
      <el-cascader
        v-if="ifInit"
        class="cascader"
        placeholder="初始化"
        v-model="value"
        :options="cascaderOptions"
        :show-all-levels="false"
        :props="{ expandTrigger: 'hover' }"
        clearable
        @change="handleChange"></el-cascader>
      <el-button type="primary" v-if="ifAdd" @click="addClick">添加</el-button>
      <el-button v-if="ifExport" type="primary" @click="exportExcel">导出</el-button>
      <el-button type="danger" v-if="ifDelete" @click="deleteAllClick">删除</el-button>
      <el-button v-if="ifFilter" @click="clearFilter">清除所有过滤器</el-button>
    </div>
  </div>

  <div class="container_table">
    <el-table
      :data="tableDataItem.slice((currentPage-1)*pageSize,currentPage*pageSize)"
      border style="width: 100%"
      max-height=800px ref="multipleTable"
      tooltip-effect="dark"
      @selection-change="handleSelectionChange"
      row-key="ID"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      @filter-change="filterChange"
      :default-sort = "defaultSort"
      >

      <el-table-column
          type="selection"
          width="55">
      </el-table-column>

      <template v-for="(item,index) in tableColumArray">
      <el-table-column
                       :width="item.width"
                       :prop="item.prop"
                       :label="item.label"
                       :key="index"
                       align="center"
                       v-if="item.filter === true"
                       :column-key="item.prop"
                       :filters="filterText(item.prop)"
                       :filter-method="filterHandler"
                       :sortable="sortAble(item.prop)"
                       filter-placement="bottom-end"
      >
        <template slot-scope="scope" >
          <el-link v-if="item.prop === linkColumnName " @click="checkClick(scope.row)" type="primary" size="big">{{ scope.row[linkColumnName] }}</el-link>

          <span  v-else  >{{ scope.row[item.prop] }}</span>
        </template>

      </el-table-column>

        <el-table-column
          :width="item.width"
          :prop="item.prop"
          :label="item.label"
          :key="index"
          align="center"
          v-else
          :sortable="sortAble(item.prop)"
        >
          <template slot-scope="scope" >
            <el-link v-if="item.prop === linkColumnName" @click="checkClick(scope.row)" type="primary" size="big">{{ scope.row[linkColumnName] }}</el-link>

            <span  v-else  >{{ scope.row[item.prop] }}</span>
          </template>

        </el-table-column>
      </template>

        <el-table-column
          fixed="right" min-width="240">
          <template slot-scope="scope">
            <el-button @click="deleteClick(scope.row)" v-if="ifItemDelete" type="text" size="small">删除</el-button>
            <slot name="BUTTON" :data="scope.row"></slot>
          </template>
        </el-table-column>
    </el-table>
    <el-pagination class="fy"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pageSizes"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableDataLength">
    </el-pagination>
  </div>
</div>
</template>
<script>
export default {
  name: "BlankTable",
  props:{
    defaultSort:{
      type:Object,
      default() {
        return {}
      }
    },
    tableColumArray:{
      type: Array,
      default() {
        return []
      }
    },
    tableData:{
      type: Array,
      default() {
        return []
      },
    },
    breadcrumbList: {
      type: Array,
      default(){
        return []
      }
    },
    linkColumnName:{
      type:String,
      default: ""
    },
    sortPropList:{
      type: Array,
      default(){
        return []
      }
    },
    ifSearch:{
      type:Boolean,
      default() {
        return true
      }
    },
    ifInit:{
      type: Boolean,
      default() {
        return false
      }
    },
    ifExport:{
      type: Boolean,
      default() {
        return false
      }
    },
    ifAdd:{
      type: Boolean,
      default() {
        return true
      }
    },
    ifDelete:{
      type: Boolean,
      default() {
        return true
      }
    },
    ifItemDelete:{
      type: Boolean,
      default() {
        return true
      }
    },
    cascaderOptions:{
      type: Array,
      default() {
        return []
      }
    },
    initSearchKey:{
      type: String,
      default:"",
    },
    filterObjects:{
      type:Object,
      default(){
        return {}
      }
    },
    ifFilter:{
      type:Boolean,
      default: false,
    }

  },
  data(){
    return {
      value: [],
      search: "",
      searchResult: [],
      currentPage: 1,
      pageSize:50,
      pageSizes:[10,30,50],
      filter:-1,
      tmpSearchResult:[],
      tmpFilterResult:"",
      filterKey:{},
    }
  },
  methods: {
      clearFilter() {
        this.$refs.multipleTable.clearFilter();
        this.filter = -1
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      checkClick(row) {
        this.$emit("checkClick",row.ID)
      },
      deleteClick(row) {
        this.$emit("deleteClick",row.ID)
      },
      editClick(row) {
        this.$emit("editClick",row.ID)
      },
      deleteAllClick() {
          this.$emit("deleteAllClick",this.$refs.multipleTable.selection)
      },
      addClick() {
        // console.log(this.filterObject)
        this.$emit("addClick")

      },
      exportExcel() {
        this.$emit("exportExcel")
      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },

      handleSizeChange(val) {
        this.pageSize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      sortAble(label) {
        if(this.sortPropList.length === 0 ) {
          return false
        }else {
         return ! (this.sortPropList.indexOf(label) === -1)
        }


      },
    handleCommand(command) {
      this.$message('click on item ' + command);
    },
    handleChange(value) {
      if (value.length === 0) {
        return
      }
      if (this.$refs.multipleTable.selection.length === 0) {
        this.$message("not select host")
      }else{
        this.$emit("serviceInit",value,this.$refs.multipleTable.selection)
      }
    },
    getSearch() {
        this.$emit("getSearch",this.search)
    },
    filterText(prop) {
      let filterText = []
      for(let v in this.filterObjects[prop]){
        filterText.push({text:this.filterObjects[prop][v],value:this.filterObjects[prop][v]})
      }
      return filterText
    },
    filterChange(filters) {
      if (filters.length !== 0) {
        for ( let i in filters) {
          this.filterKey[i] = filters[i]
        }
      }
      this.tmpFilterResult = this.tableData
      let tmp = ""
      for ( let prop in this.filterKey) {

        for (let j in this.filterKey[prop]) {
          if (this.filterKey[prop][j] === "") {
            tmp = this.tmpFilterResult.filter((data) => ! data[prop])
          } else{
            tmp = this.tmpFilterResult.filter((data) => data[prop].toLowerCase().includes(this.filterKey[prop][j].toLowerCase()))
          }
          this.tmpSearchResult.push.apply(this.tmpSearchResult,tmp)
        }

        this.tmpFilterResult = this.tmpSearchResult
        this.tmpSearchResult = []
      }
      this.filter += 1
    }


  },
  computed: {
    tableDataLength(){
      return this.tableDataItem.length
    },
    tableDataItem() {
      if (this.filter >= 0) {
        return this.tmpFilterResult
      }else{
        return this.tableData
      }

    },
  },
  watch:{
    tableData() {
      this.filterChange("")
    }
  }
}
</script>
<style scoped>
.fl{
  float: right;
  margin-right:20px;
}
.fy{
  text-align:center;
  margin-top:30px;
}
.breadcrumb {
  float: left;
  width: auto;

}
.clickButton {
  float:right;
}
.searchDropDown {
  float:right;
  margin-left:10px;
  margin-right:3px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.dropdown {
  margin-left: 5px;
}

.cascader  {

}

</style>
