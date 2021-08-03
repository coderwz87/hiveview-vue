<template>
<div>
  <slot name="formName"></slot>
  <el-form ref="form" :model="form" label-width="200px" class="formClass">

    <template v-for="item in InputItems">
    <el-form-item :label="item.label" :title="item.title" >
      <el-input v-model="item.value"></el-input>
    </el-form-item>
    </template>

    <template v-for="item in SelectItems">
      <el-form-item :label="item.label" :title="item.title">
        <el-select v-model="item.value" >
          <el-option  v-for="one in item.select" :key="one" :label="one" :value="one" ></el-option>
        </el-select>
      </el-form-item>
    </template>


    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="cancel">取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: "BlankForm",
  props:{
    InputItems:{
      type:Array,
      default() {
        return []
      }
    },
    SelectItems:{
      type:Array,
      default() {
        return []
      }
    },
  },
  data(){
    return {
      form:{

      }
    }
  },
  methods:{
    onSubmit(){
      this.$emit("Submit" , this.InputItems,this.SelectItems);
    },
    cancel(){
      this.$emit("cancel")
    }
  }
}
</script>

<style scoped>

.formClass {
  width:600px;
  text-align:left;
  margin: 50px;
}

</style>
