<template>
  <el-dialog :title="title" center :visible.sync="isModal" :showClose="mostrarClose" :before-close="closeModal" class="fontbold">
        <el-row :gutter="5" class="paddingTop0">
            <header-page :tittleModulo="subtitle"></header-page>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop0">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="fontnormal">
                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                            @current-change="SelectionChange"
                            highlight-current-row
                            style="width: 100%">

                        <el-table-column prop="DesProducto">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Producto</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(0)"></i>
                                    <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(0)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="ProductoTable"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Cantidad" width="105">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Cantidad</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(1)"></i>
                                    <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(1)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="CantidadTable"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CantidadCaja" width="110">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Cant. Caja</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                    <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="CantidadCajaTable"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="TipoMovimiento" width="170">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Tipo Movimiento</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                    <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="TipoMovTable"></el-input>
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
        <!--<el-row :gutter="5" type="flex" class="paddingTop10">
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
        </el-row>-->
  </el-dialog>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
//import AdministrarProductoService from '@/services/almacen/producto-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    props: ['isModal','title','listado','subtitle'],
    components: { 
      HeaderPage
    },
    data() {
        return {
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
            ProductoTable:"",
            CantidadTable:"",
            CantidadCajaTable:"",
            TipoMovTable:"",
            filtros:[
                {columna:'DesProducto', Valor:'',},
                {columna:'Cantidad', Valor:''},
                {columna:'CantidadCaja', Valor:''},
                {columna:'TipoMovimiento', Valor:''}
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
                this.lobeListado = this.listado;
                this.Paginar();
            }
        },
        ProductoTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        CantidadTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        CantidadCajaTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        TipoMovTable: function(n){
            this.filtros[3].Valor = n;
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
                    if (a.DesProducto < b.DesProducto)
                        return -1;
                    if (a.DesProducto > b.DesProducto)
                        return 1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Cantidad < b.Cantidad)
                        return -1;
                    if (a.Cantidad > b.Cantidad)
                        return 1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.CantidadCaja < b.CantidadCaja)
                        return -1;
                    if (a.CantidadCaja > b.CantidadCaja)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.TipoMovimiento < b.TipoMovimiento)
                        return -1;
                    if (a.TipoMovimiento > b.TipoMovimiento)
                        return 1;
                    return 0;
                });
            }
        },
        filtrarDescendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesProducto < b.DesProducto)
                        return 1;
                    if (a.DesProducto > b.DesProducto)
                        return -1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Cantidad < b.Cantidad)
                        return 1;
                    if (a.Cantidad > b.Cantidad)
                        return -1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.CantidadCaja < b.CantidadCaja)
                        return 1;
                    if (a.CantidadCaja > b.CantidadCaja)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.TipoMovimiento < b.TipoMovimiento)
                        return 1;
                    if (a.TipoMovimiento > b.TipoMovimiento)
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
                        if (a.Id < b.Id)
                            return -1;
                        if (a.Id > b.Id)
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
                        if (a.Id < b.Id)
                            return -1;
                        if (a.Id > b.Id)
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
                        (item.DesProducto.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesProducto')[0].Valor.toUpperCase()) >= 0) &&
                        (item.Cantidad == (this.filtros.filter(f => f.columna=='Cantidad')[0].Valor==''?item.Cantidad:this.filtros.filter(f => f.columna=='Cantidad')[0].Valor)) && 
                        (item.CantidadCaja == (this.filtros.filter(f => f.columna=='CantidadCaja')[0].Valor==''?item.CantidadCaja:this.filtros.filter(f => f.columna=='CantidadCaja')[0].Valor)) && 
                        (item.TipoMovimiento.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='TipoMovimiento')[0].Valor.toUpperCase()) >= 0) 
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.DesProducto.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesProducto')[0].Valor.toUpperCase()) >= 0) &&
                        (item.Cantidad == (this.filtros.filter(f => f.columna=='Cantidad')[0].Valor==''?item.Cantidad:this.filtros.filter(f => f.columna=='Cantidad')[0].Valor)) && 
                        (item.CantidadCaja == (this.filtros.filter(f => f.columna=='CantidadCaja')[0].Valor==''?item.CantidadCaja:this.filtros.filter(f => f.columna=='CantidadCaja')[0].Valor)) && 
                        (item.TipoMovimiento.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='TipoMovimiento')[0].Valor.toUpperCase()) >= 0) 
                        ));
                }, this).slice(filaInicio,filaFin);
        },
    }
};
</script>

<style lang="scss">

</style>
