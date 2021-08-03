<template>
  <div >
    <el-dropdown @command="handleCommand"  float="right" trigger="click" >
    <span class="el-dropdown-link">
      设置<i class="el-icon-setting"></i>
      <i class="el-icon-arrow-down el-icon--right"></i>
    </span>
      <el-dropdown-menu slot="dropdown" >
        <el-dropdown-item command="logout">注销</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import util from "@/util"
export default {
  name: "HeaderBar",
  methods: {
    handleCommand(command) {
      switch (command){
        case "logout":
          util.DeleteLoginToken()
          this.$router.push("/login")
      }


    }
  }
}
</script>

<style scoped>
.el-dropdown {
  margin-right:50px;
}
</style>
