<template>
    <el-row :gutter="5" class="row-bg">
      <el-tag type="success" class="cus-tag-header-panel">{{tittleModulo}}</el-tag>
    </el-row>
</template>

<script>

export default {
  name: 'header',
  components: {
    //HelloWorld
  },
  props: ['tittleModulo'],
  mounted () {
    
  },
  created(){

  },
  computed: {

  },
  data () {
    return {
      
    }
  },
  methods: {

  }
}
</script>