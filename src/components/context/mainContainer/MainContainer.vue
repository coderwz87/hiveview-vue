<template>
  <div id="mainContainer">
  <el-container>
  <el-aside width="200px">
    <NavBar/>
  </el-aside>

  <el-container>
    <el-header>
      <HeaderBar/>
    </el-header>
    <el-main>
      <router-view/>
    </el-main>
    <el-footer>Copyright HIVEVIEW 家视天下 © 2014-2021</el-footer>
  </el-container>
  </el-container>
  </div>
</template>

<script>
import NavBar from "components/context/navBar/NavBar"
import HeaderBar from "components/context/headerBar/HeaderBar"

export default ({
  name: "MainContainer",
  components: {
    NavBar,
    HeaderBar
  }
})
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: right;
    line-height: 60px;
  }
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 100px;
    height: 100vh;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    padding-bottom: 0px;
    /* height: 600px;
    flex:0; */
    /* line-height: 160px; */

  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>

