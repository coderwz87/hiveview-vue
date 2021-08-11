<template>
  <el-menu>
    <el-menu-item index="1" @click="itemClick('/dashboard/')">
      <i class="el-icon-price-tag"></i>
      dashboard
    </el-menu-item>

    <el-submenu index="2">
      <template slot="title">资产信息</template>
      <el-menu-item-group>
          <el-menu-item index="2-1" @click="itemClick('/serverInfo/')">服务器信息</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">常用信息</template>
      <el-menu-item-group>
        <el-menu-item index="3-1" @click="itemClick('/commonLink/')">常用链接</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="4">
      <template slot="title">应用初始化</template>
      <el-menu-item-group>
        <el-menu-item index="4-1" @click="itemClick('/mysqlInit/')">Mysql初始化</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="4-2" @click="itemClick('/redisInit/')">Redis初始化</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="5">
      <template slot="title">备份情况</template>
      <el-menu-item-group>
        <el-menu-item index="5-1" @click="itemClick('/MysqlBackup/')">Mysql备份</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="5-2" @click="itemClick('/OtherBackup/')">其他备份</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="6">
      <template slot="title">应用相关</template>
      <el-menu-item-group>
        <el-menu-item index="6-1" @click="itemClick('/AppDetail/')">应用信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="6-2" @click="itemClick('/ApplicationUpdateLog/')">应用更新信息</el-menu-item>
      </el-menu-item-group>
      <el-menu-item-group>
        <el-menu-item index="6-3" @click="itemClick('/AllOperationDetail/')">操作日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>


</template>

<script>
export default {
  name: "NavBar",
  methods:{
    itemClick(path){
      this.$router.push(path)
    }
  }
}
</script>
