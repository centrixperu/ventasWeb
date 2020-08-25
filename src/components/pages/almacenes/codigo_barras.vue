<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop0">
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <el-button @click="Generar()" class="width100" size="small" 
                                    type="primary" icon="fas fa-plus" plain> GENERAR PDF
                        </el-button>
                    </el-col>
                </el-row>

                <el-row :gutter="5" class="paddingTop10">
                    <el-tag type="success" class="cus-tag-header-panel">LISTADO DE PRODUCTOS</el-tag>
                </el-row>
                <el-row :gutter="5" class="paddingTop10 hidden-xs-only hidden-sm-only">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-table ref="listado" :data="lobeListadoProductoFiltrado" 
                                    style="width: 100%"
                                    highlight-current-row>
                                <el-table-column prop="Nombre" min-width="300">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Nombre</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(1)"></i>
                                            <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(1)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nombreTableProducto"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Cantidad" width="180" align="center">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Cantidad</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input-number v-model="scope.row.Cantidad" size="mini"
                                                :precision="0" class="width150P"
                                                :step="1" :min="0"></el-input-number><!--:disabled="!scope.row.Selec" -->
                                    </template>
                                </el-table-column>
                                <!--<el-table-column prop="Id" 
                                        width="70">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Id</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[ascP == 0?'colorOrderBottom':'']" @click="AscendenteProducto(0)"></i>
                                            <i class="sort-caret descending" v-bind:class="[descP == 0?'colorOrderTop':'']" @click="DescendenteProducto(0)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="idTableProducto"></el-input>
                                    </template>
                                </el-table-column>-->
                                <!--<el-table-column fixed="left" label="" width="75">
                                    <template slot-scope="scope">
                                        <el-checkbox v-model="scope.row.Selec" 
                                                    @change="SeleccionarProducto(scope.row.Id, scope.row)" label="" border>
                                        </el-checkbox>
                                    </template>
                                </el-table-column>-->
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
                <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                    <el-main class="padding5">
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-col :xs="24" :sm="24">
                                <el-input type="text" ref="nomProdBuscar"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Buscar Producto" 
                                    @keypress.native="keyUpProdBuscar"
                                    v-model="nomProdBuscar">
                                    <el-button slot="append" icon="el-icon-search"
                                            @click="BuscarProducto()"></el-button>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5"
                                v-for="oLista in lobeListadoProductoFiltrado" 
                                :key="oLista.Id" :value="oLista.Id">
                            <el-main class="padding5 cus-border">
                                <el-row :gutter="5" type="flex" class="paddingTop0">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <!--<el-checkbox v-model="oLista.Selec" class="paddingRight10 marginRight10"
                                                @change="SeleccionarProducto(oLista.Id, oLista)" label="" border>
                                            </el-checkbox>-->
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oLista.Nombre}}</span>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Cantidad :</span>
                                            <el-input-number v-model="oLista.Cantidad" size="mini"
                                                :precision="0" class="width150P" 
                                                :step="1" :min="0"></el-input-number><!--:disabled="!oLista.Selec" controls-position="right" -->
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-main>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-pagination
                                @current-change="Paginar"
                                :current-page.sync="currentPage"
                                :page-size="pageSize"
                                layout="total, prev, pager, next"
                                :total="totalrows">
                            </el-pagination>
                        </el-row>
                    </el-main>
                </el-row>
            </el-main>
        </el-container>
    </div>

  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import CodigoBarrasService from '@/services/almacen/barras-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            tittleModulo:'Código de Barras',
            nomProdBuscar:"",
            //-----------------------------------
            lobeListadoProducto:[],
            lobeListadoProductoFiltrado:[],
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            ascP: -1,
            descP: -1,
            //-----------------------------------
            //-----------------------------------
            idTableProducto:'',
            nombreTableProducto:'',
            filtrosProducto:[
                {columna:'Id', Valor:'',},
                {columna:'Nombre', Valor:''}
            ],
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
        nomProdBuscar: function(n){
            this.filtrosProducto[1].Valor = n;
            this.PaginarProducto();
        },
        //------ FILTROS PRODUCTO
        idTableProducto: function(n){
            this.filtrosProducto[0].Valor = n;
            this.PaginarProducto();
        },
        nombreTableProducto: function(n){
            this.filtrosProducto[1].Valor = n;
            this.PaginarProducto();
        },
    },
    methods: {
        ///===================
        filtrarAscendenteProducto(id){
            if(id==0){
                this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                    if (a.Id < b.Id)
                        return -1;
                    if (a.Id > b.Id)
                        return 1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                    if (a.Nombre < b.Nombre)
                        return -1;
                    if (a.Nombre > b.Nombre)
                        return 1;
                    return 0;
                });
            }
        },
        filtrarDescendenteProducto(id){
            if(id==0){
                this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                    if (a.Id < b.Id)
                        return 1;
                    if (a.Id > b.Id)
                        return -1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                    if (a.Nombre < b.Nombre)
                        return 1;
                    if (a.Nombre > b.Nombre)
                        return -1;
                    return 0;
                });
            }
        },
        AscendenteProducto(id){
            if(this.ascP==-1){
                this.ascP=id;
                this.descP=-1;
                this.filtrarAscendenteProducto(id);
            }else {
                if(this.ascP==id){
                    this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                        if (a.Id < b.Id)
                            return -1;
                        if (a.Id > b.Id)
                            return 1;
                        return 0;
                    });
                } else {
                    this.filtrarAscendenteProducto(id);
                }
                this.ascP= (this.ascP == id)?-1:id;
            }
        },
        DescendenteProducto(id){
            if(this.descP== -1){
                this.descP=id;
                this.ascP=-1;
                this.filtrarDescendenteProducto(id);
            }else{
                if(this.descP==id){
                    this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                        if (a.Id < b.Id)
                            return -1;
                        if (a.Id > b.Id)
                            return 1;
                        return 0;
                    });
                } else {
                    this.filtrarDescendenteProducto(id);
                }
                this.descP = (this.descP == id)?-1:id;
            }
        },
        ///===================
        SeleccionarProducto(id,row){
            if (!row.Selec){
                row.Cantidad=0;
            }
        },
        ///===================
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Productos...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          CodigoBarrasService.CargarDatosIniciales(this.usuario.usuarioLogin,this.usuario.idCliente)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeListadoProducto = res.result.loListado;
                    this.Paginar();
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
                loading.close();
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoProductoFiltrado = this.lobeListadoProducto;

            this.totalrows=this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        Generar(){
            let row = this.lobeListadoProducto.filter(obe=>obe.Cantidad>0); //obe.Selec==true &&
            if(row.length>0){
                /*
                let lobe = [];
                for(var i=0;i< row.length;i+=1){
                    let item = {
                        NombreProducto: row[i].Nombre,
                        IdProducto : row[i].Id.toString().padStart(12,'0'),
                        CodigoBarras: row[i].Id.toString().padStart(12,'0'),
                        Habilitado: true,
                        Cantidad: row[i].Cantidad
                    }
                    lobe.push(item);
                }
                */
                let lobe = "";
                for(var i=0;i< row.length;i+=1){
                    if(lobe==""){
                        lobe = row[i].Id.toString().padStart(12,'0') + "," + row[i].Nombre + "," + row[i].Cantidad.toString();
                    } else {
                        lobe = lobe + "|" + row[i].Id.toString().padStart(12,'0') + "," + row[i].Nombre + "," + row[i].Cantidad.toString();
                    }
                }
                CodigoBarrasService.downloadBarras(lobe);

            } else {
                this.$message({
                    showClose: true,
                    message: "Debe seleccionar Productos para generar código de barras.",
                    type: 'warning'
                });
            }
        },
        keyUpProdBuscar(a){
            if(a.key == "Enter" && this.nomProdBuscar.length>0)
            {
                this.BuscarProducto();
                a.returnValue = true;
            }
        },
        BuscarProducto(){
            this.filtrosProducto[1].Valor = this.nomProdBuscar;
            this.PaginarProducto();
        },
    }
};
</script>

<style lang="scss">

</style>
