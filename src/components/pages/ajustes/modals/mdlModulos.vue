<template>
  <el-dialog :title="title" center :visible.sync="isModal" :showClose="mostrarClose" :before-close="closeModal">
        <el-row :gutter="5" type="flex" class="paddingTop0">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div>
                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                            @select="SelectionChange" @select-all="SelectionAllChange"
                                style="width: 100%" >
                        
                        <el-table-column type="selection" width="55">
                        </el-table-column>

                        <el-table-column prop="codigo" width="70">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Código</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="descripcion" width="300">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Descripción</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="menuPadre" width="300">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Menú Padre</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!---->
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
            <!--<el-col :xs="12" :sm="10" :md="8" :lg="5" :xl="3">
                <el-button @click="Cancelar()" class="width100" size="small" 
                            type="danger" icon="fas fa-ban" plain> CANCELAR
                </el-button>
            </el-col>-->
        </el-row>
  </el-dialog>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AjusteAlmacenService from '@/services/ajustes/almacen-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    props: ['isModal','loModulos','loModuloSelec'],
    components: { 
      HeaderPage
    },
    data() {
        return {
            title:'Módulos del Sistema',
            //-----------------------------------
            IdCliente:-1,
            lobeCliente:[],
            almacen:'',
            activo:'SI',
            //-----------------------------------
            multipleSelection:[],
            lobeListadoFiltrado:[],
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            //-----------------------------------
            list:[],
            //-----------------------------------
            mostrarClose: true,
            //-----------------------------------
            //-----------------------------------
        };
    },
    mounted() {
        this.selectRowsData(this.list);
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
                this.list = [];
                for(var x=0;x<this.loModulos.length;x+=1){
                    for(var i=0;i<this.loModuloSelec.length;i+=1){
                        if(this.loModulos[x].codigo==this.loModuloSelec[i].codigo){
                            this.list.push(this.loModulos[x]);
                        }
                    }
                }
                //this.selectRowsData(this.list);
                this.Paginar();
            }
        },
    },
    updated(){
        this.selectRowsData(this.list);
    },
    methods: {
        selectRowsData(rows){
            if(this.$refs.listado != undefined)
            {
                if (rows) {
                    rows.forEach(row => {
                            this.$refs.listado.toggleRowSelection(row);
                        });
                    }
                else {
                    this.$refs.listado.clearSelection();
                }
            }
        },
        /*SelectionChange(val) {
            this.multipleSelection = val;
        },*/
        SelectionChange(a, b) {
            this.list=a;
        },
        SelectionAllChange(rows){
            this.list=this.loModulos;
        },
        ///===================
        closeModal: function () {
            this.list = [];
            this.$emit('interface', !this.isModal, []);
        },
        ///===================
        Cancelar(){
            this.IdCliente=this.usuario.idCliente;
            this.almacen='';
            this.activo='SI';
            this.$refs.listado.clearSelection();
            //--------
            //this.$emit('interface', !this.isModal, []);
            //--------
        },
        Guardar(){
            this.$emit('interface', !this.isModal, this.list);
        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.loModulos;

            this.totalrows=this.lobeListadoFiltrado.length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.slice(filaInicio,filaFin);
        },
    }
};
</script>

<style lang="scss">

</style>
