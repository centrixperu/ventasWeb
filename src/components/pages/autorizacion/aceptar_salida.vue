<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
            </el-main>
        </el-container>
    </div>

  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            tittleModulo:'Aceptar Salida',
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        }else{
            this.CargarDatosIniciales();
        }
    },
    computed: {
        ...mapState(["usuario"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {

    },
    methods: {
        CargarDatosIniciales(){

        },
    }
};
</script>

<style lang="scss">

</style>
