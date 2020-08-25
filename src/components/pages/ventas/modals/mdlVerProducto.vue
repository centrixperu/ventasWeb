<template>
  <el-dialog :title="title" center :visible.sync="isModalVer" :showClose="mostrarClose" :before-close="closeModal">
        <el-row :gutter="5" type="flex" class="paddingTop0">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <el-row :gutter="5">
                    <div v-for="oArchivo in loarchivos" :key="oArchivo.Id">
                        <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                            <el-card :body-style="{ padding: '0px' }" v-show="oArchivo.URL!=''">
                                <el-image
                                    class="width100 height100"
                                    :src="oArchivo.URL"
                                    fit="scale-down">
                                </el-image>
                                <!--<div style="padding: 14px;">
                                    <span>Yummy hamburger</span>
                                    <div class="bottom clearfix">
                                    <time class="time">{{ oArchivo.Descripcion }}</time>
                                    <el-button type="text" class="button">Operating</el-button>
                                    </div>
                                </div>-->
                            </el-card>
                        </el-col>
                    </div>
                </el-row>   
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="12" :sm="10" :md="8" :lg="5" :xl="3">
                <el-button @click="Cancelar()" class="width100" size="small" 
                            type="danger" icon="fas fa-ban" plain> SALIR
                </el-button>
            </el-col>
        </el-row>
  </el-dialog>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import VentaService from '@/services/ventas/venta-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    props: ['isModal','idProducto'],
    components: { 
      HeaderPage
    },
    data() {
        return {
            title:'Detalle de Producto',
            isModalVer:false,
            //-----------------------------------
            loarchivos:[],
            //-----------------------------------
            //-----------------------------------
            //-----------------------------------
            //-----------------------------------
            mostrarClose: true,
            //-----------------------------------
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        }
    },
    computed: {
        ...mapState(["usuario","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        isModal: function(n){
            if(n){
                this.CargarDatosIniciales();
            } else {
                this.isModalVer=false;
            }
        },
    },
    updated(){

    },
    methods: {
        ///===================
        closeModal: function () {
            this.$emit('interface', !this.isModal);
        },
        ///===================
        CargarDatosIniciales(){
          VentaService.CargarImagenesProductosModal(this.usuario.usuarioLogin,this.usuario.idCliente,this.idProducto)
            .then(res => {
                if (res.status==200){
                    this.isModalVer=true;
                    this.loarchivos = res.result;
                } else if (res.status==300){
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'warning'
                    });
                    this.Cancelar();
                } else if (res.status==400){
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'error'
                    });
                    this.Cancelar();
                }
            })
            .catch((err) => {
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        Cancelar(){
            this.loarchivos=[];
            this.$emit('interface', !this.isModal);
        },
    }
};
</script>

<style lang="scss">

</style>
