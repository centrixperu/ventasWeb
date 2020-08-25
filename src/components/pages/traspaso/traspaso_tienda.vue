<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop0">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0" v-show="lobeTiendaOrigen.length>0">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Tienda Origen:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdTiendaOrigen" filterable placeholder="Select"
                                            size="small" ref="IdTiendaOrigen" class="width100">
                                            <el-option v-for="oTienda in lobeTiendaOrigen" 
                                                :key="oTienda.codigo" 
                                                :label="oTienda.descripcion"
                                                :value="oTienda.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(IdTiendaOrigen!=0)">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Guía Salida:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="GuiaSalida"
                                            @keyup.native="KeyUpGuiaSalida"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Guía Salida" 
                                            v-model="GuiaSalida"
                                            show-word-limit
                                            maxlength="20">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="IdTiendaOrigen!=0">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Tienda Destino:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdTiendaDestino" filterable placeholder="Select"
                                            size="small" ref="IdTiendaDestino" class="width100">
                                            <el-option v-for="oTienda in lobeTiendaDestino" 
                                                :key="oTienda.codigo" 
                                                :label="oTienda.descripcion"
                                                :value="oTienda.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(IdTiendaDestino!=0)">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Guía Entrada:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="GuiaEntrada"
                                            @keyup.native="KeyUpGuiaEntrada"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Guía Entrada" 
                                            v-model="GuiaEntrada"
                                            show-word-limit
                                            maxlength="20">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(IdTiendaOrigen!=0 && IdTiendaDestino!=0)">
                                <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Fecha Guía:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-date-picker
                                            v-model="FechaGuia"
                                            type="datetime" size="mini"
                                            placeholder="Fecha Guía">
                                        </el-date-picker>
                                    </div>
                                </el-col>
                            </el-row>
                            
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="lobeTiendaDestino.length>0">
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                    <el-button @click="Traspasar()" class="width100" size="small" 
                                                type="primary" icon="fas fa-save" plain> TRASPASAR
                                    </el-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" v-show="lobeTiendaDestino.length>0">
                                    <el-button @click="Cancelar()" class="width100" size="small" 
                                                type="warning" icon="fas fa-broom" plain> CANCELAR
                                    </el-button>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(IdTiendaOrigen!=0)">
                                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL fontkursiva fontbold">Productos {{DesTiendaOrigen}}:</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only" v-show="(IdTiendaOrigen!=0)">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="cus-border q-px-md q-pb-md">
                                        <el-table ref="listado" :data="lobeListadoProductoFiltrado" 
                                                style="width: 100%"
                                                highlight-current-row>
                                            <!--<el-table-column fixed="left" label="" width="75">
                                                <template slot-scope="scope">
                                                    <el-checkbox v-model="scope.row.Selec" 
                                                                @change="SeleccionarProducto(scope.row.Id, scope.row)" label="" border>
                                                    </el-checkbox>
                                                </template>
                                            </el-table-column>-->
                                            <el-table-column prop="Nombre" min-width="300">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Nombre</span>
                                                    <span class="caret-wrapper">
                                                        <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(0)"></i>
                                                        <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(0)"></i>
                                                    </span>
                                                    <el-input size="mini" class="padding0" v-model="nombreTable"></el-input>
                                                </template>
                                                <template slot-scope="scope">
                                                    <div class="cus-label-form-left width95">
                                                        <span class="cus-label textAdjust textAlignL">{{scope.row.Nombre}}</span>
                                                        <el-tag align="right" class="fontbold" v-show="scope.row.Color!=''" type="success">{{scope.row.Color}}</el-tag>
                                                        <el-tag align="right" class="fontbold" v-show="scope.row.Talla!=''" type="danger">{{scope.row.Talla}}</el-tag>
                                                    </div>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="FecVencimiento" width="120" align="center" v-if="isFechaVenProd">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Fec. Venc.</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-tag class="fontbold" v-show="!scope.row.isXVencer && scope.row.FecVencimiento!=''" type="success">{{scope.row.FecVencimiento}}</el-tag>
                                                    <el-tag class="fontbold" v-show="scope.row.isXVencer && scope.row.FecVencimiento!=''" type="danger">{{scope.row.FecVencimiento}}</el-tag>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="Precio" width="95">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Precio</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-input v-model="scope.row.Precio" size="mini" readonly></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="CantidadTienda" width="85">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Stock</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-input class="borderform" v-model="scope.row.CantidadTienda" size="mini" readonly></el-input>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="Cantidad" width="160" align="center">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Transferir</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-input-number v-model="scope.row.Cantidad" size="mini"
                                                            :precision="0" class="width130P" :step="1" :min="0" 
                                                            :max="scope.row.CantidadTienda">
                                                    </el-input-number><!--:disabled="!scope.row.Selec" -->
                                                </template>
                                            </el-table-column>
                                        </el-table>
                                        <el-pagination
                                            @current-change="Paginar"
                                            :current-page.sync="currentPageProducto"
                                            :page-size="pageSizeProducto"
                                            layout="total, prev, pager, next"
                                            :total="totalrowsProducto">
                                        </el-pagination>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--
                            <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only" v-show="(IdTiendaOrigen!=0)">
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
                                            :key="oLista.IdProductoAlmacen" :value="oLista.IdProductoAlmacen">
                                        <el-main class="padding5 cus-border">
                                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                                <el-col :xs="24" :sm="24">
                                                    <div class="cus-label-form-left width95">
                                                        <div class="cus-label-form-left">
                                                            <span class="cus-label textAdjust textAlignL fontbold">{{oLista.Nombre}}</span>
                                                            <el-tag align="right" class="fontbold" v-show="oLista.Color!=''" type="success">{{oLista.Color}}</el-tag>
                                                            <el-tag align="right" class="fontbold" v-show="oLista.Talla!=''" type="danger">{{oLista.Talla}}</el-tag>
                                                        </div>
                                                        <el-tag align="right" class="fontbold" v-show="!oLista.isXVencer && oLista.FecVencimiento!=''" type="success">Fec. Venc.: {{oLista.FecVencimiento}}</el-tag>
                                                        <el-tag align="right" class="fontbold" v-show="oLista.isXVencer && oLista.FecVencimiento!=''" type="danger">Fec. Venc.: {{oLista.FecVencimiento}}</el-tag>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                <el-col :xs="24" :sm="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL width95P">Stock:</span>
                                                        <el-input class="borderform marginRight10 width110" v-model="oLista.CantidadTienda" size="mini" readonly></el-input>
                                                        <el-button-group v-show="(oLista.isAddStock)">
                                                            <el-button v-show="(oLista.idProductoBase==0)"
                                                                size="mini" type="info" icon="el-icon-plus"
                                                                @click="AgregarStock(oLista.IdProductoAlmacen, oLista)"></el-button>
                                                            <el-button v-show="(oLista.idProductoBase==0)"
                                                                size="mini" type="info" icon="el-icon-minus"
                                                                @click="DisminuirStock(oLista.IdProductoAlmacen, oLista)"></el-button>
                                                            <el-button v-show="(oLista.idProductoBase!=0)"
                                                                size="mini" type="info" icon="el-icon-plus"
                                                                @click="AgregarStockGrupo(oLista.IdProductoAlmacen, oLista)"></el-button>
                                                            <el-button v-show="(oLista.idProductoBase!=0)"
                                                                size="mini" type="info" icon="el-icon-minus"
                                                                @click="DisminuirStockGrupo(oLista.IdProductoAlmacen, oLista)"></el-button>
                                                    </el-button-group>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                <el-col :xs="24" :sm="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL width95P">Cantidad :</span>
                                                        <el-input-number v-model="oLista.Cantidad" size="mini"
                                                            :precision="0" class="width130P" @change="CambiarPrecio(oLista)"
                                                            :step="1" :min="0" :max="oLista.CantidadTienda"></el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                <el-col :xs="24" :sm="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL width95P">Precio:</span>
                                                        <el-input v-model="oLista.Precio" size="mini" readonly></el-input>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                <el-col :xs="24" :sm="24">
                                                    <div class="cus-label-form-left width130P">
                                                        <el-button v-show="(oLista.Cantidad>0)"
                                                            size="mini" type="info" icon="el-icon-plus"
                                                            @click="AgregarPreVenta(oLista.IdProductoAlmacen, oLista)">Agregar</el-button>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                        </el-main>
                                    </el-row>
                                    <el-row :gutter="5" type="flex" class="paddingTop5">
                                        <el-pagination
                                            @current-change="Paginar"
                                            :current-page.sync="currentPageProducto"
                                            :page-size="pageSizeProducto"
                                            layout="total, prev, pager, next"
                                            :total="totalrowsProducto">
                                        </el-pagination>
                                    </el-row>
                                </el-main>
                            </el-row>
                            -->
                        </el-main>
                    </div>
                </el-row>
            </el-main>
        </el-container>
    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import TraspasoService from '@/services/traspaso/traspaso-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            tittleModulo:'Traspaso Tienda',
            //-----------------------------------
            lobeTiendaOrigen:[],
            lobeTiendaDestino:[],
            lobeTienda:[],
            IdTiendaOrigen:0,
            DesTiendaOrigen:'',
            IdTiendaDestino:0,
            //-----------------------------------
            GuiaEntrada:'',
            GuiaSalida:'',
            FechaGuia: new Date(),
            //-----------------------------------
            isTipoProducto:true,
            isFechaVenProd:true,
            isCostoProduccion:true,
            //-----------------------------------
            lobeListadoProducto:[],
            lobeListadoProductoFiltrado:[],
            //-----------------------------------
            currentPageProducto: 1,
            pageSizeProducto: 5,
            totalrowsProducto: 0,
            ascP: -1,
            descP: -1,
            //-----------------------------------
            nombreTable:'',
            //-----------------------------------
            filtrosProducto:[
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
            this.FechaGuia = new Date();
            this.CargarDatosIniciales();
        }
    },
    computed: {
        ...mapState(["usuario","loTienda","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        IdTiendaOrigen: function(n){
            if(n!=0){
                let index = this.lobeTiendaOrigen.findIndex(obe=>obe.codigo==n);
                this.DesTiendaOrigen = this.lobeTiendaOrigen[index].descripcion;
                this.lobeTiendaDestino = this.lobeTienda.filter(obe=>obe.codigo!=n);
                this.CargarProductos(n);
            } else {
                this.DesTiendaOrigen = "";
                this.IdTiendaDestino = 0;
                this.lobeTiendaDestino = [];
            }
        },
        IdTiendaDestino: function(n){
            if(n!=0){
                
            }
        },
        nombreTable: function(n){
            this.filtrosProducto[0].Valor = n;
            this.Paginar();
        },
    },
    methods: {
        KeyUpGuiaEntrada(){
            this.GuiaEntrada = this.GuiaEntrada.toUpperCase();
        },
        KeyUpGuiaSalida(){
            this.GuiaSalida = this.GuiaSalida.toUpperCase();
        },
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Tiendas...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          TraspasoService.CargarDatosIniciales(this.usuario.usuarioLogin,this.usuario.idCliente)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeTiendaOrigen = this.loTienda;//res.result.loTienda;
                    this.lobeTienda = res.result.loTienda;
                    if(this.loTienda && this.loTienda.length==2){
                        let index = this.lobeTiendaOrigen.findIndex(obe=>obe.codigo==this.loTienda[1].codigo);
                        if(index!=-1){
                            this.IdTiendaOrigen = this.lobeTiendaOrigen[index].codigo;
                        }
                    }
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
        CargarProductos(idTienda){
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado=[];
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Productos...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });

          TraspasoService.CargarProductos(this.usuario.usuarioLogin,this.usuario.idCliente, idTienda)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeListadoProducto = res.result.loProducto;
                    //console.log("Productos", this.lobeListadoProducto);
                    this.Paginar();
                    this.MostrarColumnas();
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
        MostrarColumnas(){
            this.isTipoProducto = this.permisos.isTipoProducto; 
            this.isFechaVenProd = this.permisos.isCostoProduccion; 
            this.isCostoProduccion = this.permisos.isFechaVenProd; 
        },
        Paginar(){
            var filaInicio = (this.currentPageProducto - 1) * this.pageSizeProducto;
            var filaFin = (this.currentPageProducto * this.pageSizeProducto) ;

            this.lobeListadoProductoFiltrado = this.lobeListadoProducto;

            this.totalrowsProducto=this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        SeleccionarProducto(id,row){
            if (!row.Selec){
                row.Cantidad=0;
            }
        },
        Cancelar(){
            this.IdTiendaOrigen=0;
            this.DesTiendaOrigen="";
            this.IdTiendaDestino=0;
            this.GuiaEntrada="";
            this.GuiaSalida="";
            this.FechaGuia = new Date();
        },
        ValidarGuardar(){
            if(this.IdTiendaOrigen==0){
                return 'Debe seleccionar Tienda Origen.';
            }
            if(this.GuiaSalida==''){
                return 'Debe ingresar Guía Salida de Tienda Origen.';
            }
            if(this.IdTiendaDestino==''){
                return 'Debe seleccionar Tienda Destino.';
            }
            if(this.GuiaEntrada==''){
                return 'Debe ingresar Guía Entrada de Tienda Destino.';
            }
            if(this.FechaGuia==''){
                return 'Debe ingresar Fecha Guía.';
            }
            let lobe = this.lobeListadoProducto.filter(obe=>obe.Cantidad>0);//Selec==true);
            if(lobe.length==0){
                return 'Debe ingresar Cantidad de Productos a transferir.';
            }
            /*if(lobe.filter(obe=>obe.Cantidad==0).length>0){
                return 'Cantidad a transferir debe ser mayor a 0.';
            }*/
            return '';
        },
        Traspasar(){
            var msj = this.ValidarGuardar();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.TraspasarBD();
            }
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            var fecha = this.FechaGuia.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.FechaGuia.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.FechaGuia.getDate().toString().padStart(2,'0') + 
                            ' ' + this.FechaGuia.getHours().toString().padStart(2,'0') + 
                            ':' + this.FechaGuia.getMinutes().toString().padStart(2,'0') + 
                            ':' + this.FechaGuia.getSeconds().toString().padStart(2,'0');
            if (tipo==1){
                item.IdTiendaOrigen = this.IdTiendaOrigen;
                item.DesTiendaOrigen = this.lobeTiendaOrigen.filter(obe=>obe.codigo==this.IdTiendaOrigen)[0].descripcion;
                item.IdTiendaDestino = this.IdTiendaDestino;
                item.DesTiendaDestino = this.lobeTiendaDestino.filter(obe=>obe.codigo==this.IdTiendaDestino)[0].descripcion;
                item.GuiaEntrada = this.GuiaEntrada;
                item.GuiaSalida = this.GuiaSalida;
                item.FechaGuia = fecha;
                item.IdCliente = this.usuario.idCliente;
                item.UsrCreador = this.usuario.usuarioLogin;
                item.loProducto = this.lobeListadoProducto.filter(obe=>obe.Cantidad>0);//Selec==true);
            }
            return item;
        },
        TraspasarBD(){
            const loading = this.$loading({
                lock: true,
                text: 'Traspasando Productos...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            TraspasoService.TraspasarTienda(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.$message({
                            showClose: true,
                            message: res.result,
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
                    loading.close();
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
