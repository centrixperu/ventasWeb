<template>
  <el-dialog :title="title" center :visible.sync="isModal" :showClose="mostrarClose" :before-close="closeModal">
        <el-row :gutter="5" type="flex" class="paddingTop0" v-show="permisos.isAdministrador">
            <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Cliente:</span>
                </div>
            </el-col>
            <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-select v-model="IdCliente" filterable placeholder="Select"
                        size="small" ref="IdCliente" class="width100">
                        <el-option v-for="oCliente in lobeCliente" 
                            :key="oCliente.codigo" 
                            :label="oCliente.descripcion"
                            :value="oCliente.codigo">
                        </el-option>                            
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Nombre:</span>
                </div>
            </el-col>
            <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="almacen"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="Nombre Almacén" 
                        v-model="almacen"
                        show-word-limit
                        maxlength="150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Activo:</span>
                </div>
            </el-col>
            <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-radio-group size="small" v-model="activo"
                        ref="activo">
                        <el-radio-button label="NO"></el-radio-button>
                        <el-radio-button label="SI"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>   
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="12" :sm="10" :md="8" :lg="5" :xl="3">
                <el-button @click="Guardar()" class="width100" size="small" 
                            type="primary" icon="fas fa-save" plain> GUARDAR
                </el-button>
            </el-col>
            <el-col :xs="12" :sm="10" :md="8" :lg="5" :xl="3">
                <el-button @click="Cancelar()" class="width100" size="small" 
                            type="danger" icon="fas fa-ban" plain> CANCELAR
                </el-button>
            </el-col>
        </el-row>
  </el-dialog>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AjusteAlmacenService from '@/services/ajustes/almacen-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    props: ['isModal'],
    components: { 
      HeaderPage
    },
    data() {
        return {
            title:'Almacenes',
            //-----------------------------------
            IdCliente:-1,
            lobeCliente:[],
            almacen:'',
            activo:'SI',
            //-----------------------------------
            //-----------------------------------
            mostrarClose: false,
            //-----------------------------------
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        } else {
            this.CargarDatosIniciales();
        }
    },
    computed: {
        ...mapState(["usuario","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        
    },
    methods: {
        closeModal: function () {
            this.$emit('interface', !this.isModal);
        },
        ///===================
        CargarDatosIniciales(){
          AjusteAlmacenService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeCliente = res.result.loCliente;
                    this.IdCliente = this.usuario.idCliente;
                } else if (res.status==300){
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'warning'
                    });
                } else if (res.status==400){
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        Cancelar(){
            this.IdCliente=this.usuario.idCliente;
            this.almacen='';
            this.activo='SI';
            //--------
            this.$emit('interface', !this.isModal);
            //--------
        },
        ValidarGuardar(){
            if(this.permisos.isAdministrador && this.IdCliente==-1){
                return 'Debe seleccionar Cliente.';
            }
            if(this.almacen==''){
                return 'Debe ingresar Nombre Almacén.';
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            if (tipo==1){
                item.Id = this.Id;
                item.Nombre = this.almacen;
                item.Estado = (this.activo=='SI')?1:0;
                item.IdCliente = this.IdCliente;//==-1?this.usuario.idCliente:this.IdCliente;
                item.DesCliente = this.lobeCliente.filter(obe=>obe.codigo==item.IdCliente)[0].descripcion;
                item.UsrCreador = this.usuario.usuarioLogin;
            } else if (tipo==2){
                item.Id = id
                item.IdCliente = this.IdCliente;
                item.UsrModificador = this.usuario.usuarioLogin;
            }
            return item;
        },
        Guardar(){
            var msj = this.ValidarGuardar();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.GuardarBD();
            }
        },
        GuardarBD(){
            AjusteAlmacenService.Guardar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    if (res.status==200){
                        this.$message({
                            showClose: true,
                            message: 'Se Guardó Correctamente.',
                            type: 'success'
                        });
                        this.Cancelar();
                    } else if (res.status==300){
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'warning'
                        });
                    } else if (res.status==400){
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'error'
                        });
                    }
                })
                .catch((err) => {
                    console.log("Error",err);
                    this.$message({
                        showClose: true,
                        message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                        type: 'error'
                    });
                });
        },
    }
};
</script>

<style lang="scss">

</style>
