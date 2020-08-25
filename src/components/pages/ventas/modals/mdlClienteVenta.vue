<template>
  <el-dialog :title="title" center :visible.sync="isModal" :showClose="mostrarClose" :before-close="closeModal">
        <el-row :gutter="5" type="flex" class="paddingTop0">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div>
                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                            @current-change="SelectionChange"
                            highlight-current-row
                            style="width: 100%">
                        <el-table-column prop="codigo">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">N° Documento</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(0)"></i>
                                    <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(0)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="codigoTable"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="descripcion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Nonmbre / Razón Social</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                    <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="descripcionTable"></el-input>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @current-change="Paginar"
                        :current-page.sync="currentPage"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="totalrows">
                    </el-pagination>
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
import AdministrarProductoService from '@/services/almacen/producto-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    props: ['isModal','loClientes'],
    components: { 
      HeaderPage
    },
    data() {
        return {
            title:'Cliente de Compras',
            isModalVer:false,
            //-----------------------------------

            //-----------------------------------
            lobeListado:[],
            lobeListadoFiltrado:[],
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            asc: -1,
            desc: -1,
            //-----------------------------------
            list:[],
            //-----------------------------------
            mostrarClose: true,
            //-----------------------------------
            codigoTable:"",
            descripcionTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'Nombre', Valor:''}
            ],
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
        ...mapState(["usuario"]),
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
        codigoTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        descripcionTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
    },
    updated(){

    },
    methods: {
        ///===================
        filtrarAscendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.codigo < b.codigo)
                        return -1;
                    if (a.codigo > b.codigo)
                        return 1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.descripcion < b.descripcion)
                        return -1;
                    if (a.descripcion > b.descripcion)
                        return 1;
                    return 0;
                });
            }
        },
        filtrarDescendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.codigo < b.codigo)
                        return 1;
                    if (a.codigo > b.codigo)
                        return -1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.descripcion < b.descripcion)
                        return 1;
                    if (a.descripcion > b.descripcion)
                        return -1;
                    return 0;
                });
            }
        },
        Ascendente(id){
            if(this.asc==-1){
                this.asc=id;
                this.desc=-1;
                this.filtrarAscendente(id);
            }else {
                if(this.asc==id){
                    this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                        if (a.codigo < b.codigo)
                            return -1;
                        if (a.codigo > b.codigo)
                            return 1;
                        return 0;
                    });
                } else {
                    this.filtrarAscendente(id);
                }
                this.asc= (this.asc == id)?-1:id;
            }
        },
        Descendente(id){
            if(this.desc== -1){
                this.desc=id;
                this.asc=-1;
                this.filtrarDescendente(id);
            }else{
                if(this.desc==id){
                    this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                        if (a.codigo < b.codigo)
                            return -1;
                        if (a.codigo > b.codigo)
                            return 1;
                        return 0;
                    });
                } else {
                    this.filtrarDescendente(id);
                }
                this.desc = (this.desc == id)?-1:id;
            }
        },
        ///===================
        SelectionChange(val) {
            this.list = val;
        },
        ///===================
        closeModal: function () {
            this.$emit('interface', !this.isModal, null);
        },
        ///===================
        CargarDatosIniciales(){
            this.lobeListado = this.loClientes;
            this.Paginar();
            //this.isModalVer=true;
        /*  AdministrarProductoService.CargarProductosModal(this.usuario.usuarioLogin,this.usuario.idCliente, this.busqueda)
            .then(res => {
                if (res.status==200){
                    this.lobeListado = res.result;
                    if(this.lobeListado.length==1) {
                        this.$emit('interface', !this.isModal, this.lobeListado[0]);
                    } else {
                        this.Paginar();
                    }
                } else if (res.status==300){
                    this.Cancelar();
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'warning'
                    });
                } else if (res.status==400){
                    this.Cancelar();
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'error'
                    });
                }
            })
            .catch((err) => {
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });*/
        },
        Cancelar(){
            //this.$refs.listado.clearSelection();
            this.$emit('interface', !this.isModal, null);
        },
        Guardar(){
            this.$emit('interface', !this.isModal, this.list);
        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.codigo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Id')[0].Valor.toUpperCase()) >= 0) && 
                        (item.descripcion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) 
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.codigo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Id')[0].Valor.toUpperCase()) >= 0) && 
                        (item.descripcion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) 
                        ));
                }, this).slice(filaInicio,filaFin);
        },
    }
};
</script>

<style lang="scss">

</style>
