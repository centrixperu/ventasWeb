<template>
  <el-dialog :title="title" fullscreen :visible.sync="isModal" :showClose="mostrarClose" :before-close="closeModal">
        <el-row :gutter="5" type="flex" class="paddingTop0">
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                <el-button @click="Guardar()" class="width100" size="small" 
                            type="primary" icon="fas fa-save" plain> GUARDAR
                </el-button>
            </el-col>
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                <el-button @click="Cancelar()" class="width100" size="small" 
                            type="danger" icon="fas fa-ban" plain> CANCELAR
                </el-button>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Almacén:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-select v-model="IdAlmacen" filterable placeholder="Select"
                        size="small" ref="IdAlmacen" class="width100">
                        <el-option v-for="oAlmacen in lobeAlmacen" 
                            :key="oAlmacen.codigo" 
                            :label="oAlmacen.descripcion"
                            :value="oAlmacen.codigo">
                        </el-option>                            
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Tienda:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-select v-model="IdTienda" filterable placeholder="Select"
                        size="small" ref="IdTienda" class="width100" :disabled="IdAlmacen==0">
                        <el-option v-for="oTienda in lobeTienda" 
                            :key="oTienda.codigo" 
                            :label="oTienda.descripcion"
                            :value="oTienda.codigo">
                        </el-option>                            
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Guía Entrada:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="guia"
                        @keyup.native="KeyUpGuia"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="Guía Entrada Tienda" 
                        v-model="guia"
                        show-word-limit
                        maxlength="20">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Fecha Guía:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-date-picker
                        v-model="fechaguia"
                        type="datetime" size="mini"
                        placeholder="Fecha Guía Entrada">
                    </el-date-picker>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Actualizar Precio:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="20">
                <div>
                    <el-radio-group size="small" v-model="precio"
                        ref="precio">
                        <el-radio-button label="NO"></el-radio-button>
                        <el-radio-button label="SI"></el-radio-button>
                    </el-radio-group>
                </div>
            </el-col>   
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only" v-if="IdTienda!=0">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="cus-border q-px-md q-pb-md">
                    <el-table ref="listado" :data="lobeListadoProductoFiltrado" 
                            style="width: 100%"
                            highlight-current-row>
                        <el-table-column prop="Nombre" min-width="300" align="left">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Nombre</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(1)"></i>
                                    <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(1)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="nombreTableProducto"></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DesProdLaboratorio" width="70" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Lab.</span>
                            </template>
                            <template slot-scope="scope">
                                <el-tag class="fontsize12 width60P" effect="plain" size="mini">{{scope.row.DesProdLaboratorio}}</el-tag>
                            </template>
                        </el-table-column>
                        <!--<el-table-column prop="Id" 
                                width="70">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Id</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[ascP == 0?'colorOrderBottom':'']" @click="AscendenteProducto(0)"></i>
                                    <i class="sort-caret descending" v-bind:class="[descP == 0?'colorOrderTop':'']" @click="DescendenteProducto(0)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="idTableProducto"></el-input>
                            </template>
                        </el-table-column>-->
                        <el-table-column prop="Tipo" width="110" align="center" v-if="isTipoProducto">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Tipo</span>
                            </template>
                            <template slot-scope="scope">
                                <span class="width95P">{{scope.row.loTipoProducto.filter(obe=>obe.codigo==scope.row.idTipo)[0].descripcion}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Cantidad" width="80" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Stock en Almacén</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Stock" width="75" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Stock en Tienda</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CantidadCaja" width="100" align="center" v-if="isTipoProducto">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Unid. x Caja</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input v-model="scope.row.CantidadCaja" size="mini"
                                    v-show="scope.row.isTipoBase" readonly>
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="CantidadTienda" width="155" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Cantidad</span>
                            </template>
                            <template slot-scope="scope"><!--controls-position="right"-->
                                <el-input-number v-model="scope.row.CantidadTienda" size="mini"
                                        :precision="0" class="width130P"
                                        :step="1" :min="0" :max="scope.row.Cantidad">
                                </el-input-number><!--:disabled="!scope.row.Selec" -->
                                <!--<span v-show="precio=='SI'">{{scope.row.CantidadTienda}}</span>-->
                            </template>
                        </el-table-column>
                        <el-table-column prop="Precio" width="150" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Precio Unitario</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.Precio" size="mini"
                                        :precision="2" class="width130P" v-show="precio=='SI'"
                                        :step="0.01" :min="0">
                                </el-input-number><!--:disabled="(!precio=='NO')" -->
                                <span v-show="precio=='NO'">{{scope.row.Precio}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="PrecioBlister" width="150" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Precio Blister</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.PrecioBlister" size="mini"
                                        :precision="2" class="width130P" v-show="precio=='SI' && scope.row.idTipo==1"
                                        :step="0.01" :min="0">
                                </el-input-number>
                                <span v-show="precio=='NO' && scope.row.idTipo==1">{{scope.row.PrecioBlister}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="PrecioCosto" width="120" align="center" v-if="isCostoProduccion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Precio Compra Unitario</span>
                            </template>
                            <template slot-scope="scope">
                                <!--<el-input-number v-model="scope.row.PrecioCosto" size="mini"
                                        controls-position="right" :precision="2" :step="1" 
                                        @keypress.native="keyUpPrecioCosto"
                                        @keydown.native="keyUpPrecioCosto"
                                        class="width105P" :controls="false">
                                </el-input-number>-->
                                <span class="width105P">{{scope.row.PrecioCosto}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Ubicacion" width="120" align="center" v-if="isUbicacion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Ubicación</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input type="text"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Ubicación" 
                                    v-model="scope.row.Ubicacion">
                                </el-input>
                            </template>
                        </el-table-column>
                        <!--<el-table-column
                            fixed="left"
                            label=""
                            width="75">
                            <template slot-scope="scope">
                                <el-checkbox v-model="scope.row.Selec" 
                                            @change="SeleccionarProducto(scope.row.Id, scope.row)" label="" border>
                                </el-checkbox>
                            </template>
                        </el-table-column>-->
                    </el-table>
                    <el-pagination
                        @current-change="PaginarProducto"
                        :current-page.sync="currentPageProducto"
                        :page-size="pageSizeProducto"
                        layout="total, prev, pager, next"
                        :total="totalrowsProducto">
                    </el-pagination>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only" v-show="IdTienda!=0">
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
                        v-for="oListado in lobeListadoProductoFiltrado" 
                        :key="oListado.Id" :value="oListado.Id">
                    <el-main class="padding5 cus-border">
                        <el-row :gutter="5" type="flex" class="paddingTop0">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <el-checkbox v-model="oListado.Selec" class="paddingRight10 marginRight10"
                                        @change="SeleccionarProducto(oListado.Id, oListado)" label="" border>
                                    </el-checkbox>
                                    <span class="cus-label textAdjust textAlignL fontbold">{{oListado.Nombre}}</span>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="oListado.idTipo!=-1">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Tipo:</span>
                                    <el-select v-model="oListado.idTipo" filterable placeholder="Select"
                                        size="small" ref="oListado.idTipo" class="width100"
                                        @change="SeleccionarTipo(oListado.Id, oListado)">
                                        <el-option v-for="oTipo in oListado.loTipoProducto" 
                                            :disabled="true"
                                            :key="oTipo.codigo" 
                                            :label="oTipo.descripcion"
                                            :value="oTipo.codigo">
                                        </el-option>                            
                                    </el-select>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Cantidad :</span>
                                    <el-input v-model="oListado.Cantidad" size="mini" readonly></el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="oListado.idTipo!=-1">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Unid. x Caja :</span>
                                    <el-input v-model="oListado.CantidadCaja" size="mini" readonly>
                                    </el-input>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Transferir :</span>
                                    <el-input-number v-model="oListado.CantidadTienda" size="mini"
                                        :precision="0" class="width130P"
                                        :disabled="!oListado.Selec" :step="1" :min="0" 
                                        :max="oListado.Cantidad"></el-input-number>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Precio :</span>
                                    <el-input-number v-model="oListado.Precio" size="mini"
                                        :precision="2" class="width130P"
                                        :disabled="((!oListado.Selec) || precio=='NO')" 
                                        :step="0.01" :min="0"></el-input-number>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="isCostoProduccion">
                            <el-col :xs="24" :sm="24"><!--v-show="oListado.idTipo!=-1"-->
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Precio Compra Unitario :</span>
                                    <el-input-number v-model="oListado.PrecioCosto" size="mini"
                                        controls-position="right" :precision="2" :step="1" 
                                        @keypress.native="keyUpPrecioCosto"
                                        @keydown.native="keyUpPrecioCosto"
                                        class="width105P" :controls="false"></el-input-number>
                                </div>
                            </el-col>
                        </el-row>
                    </el-main>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop5">
                    <el-pagination
                        @current-change="PaginarProducto"
                        :current-page.sync="currentPageProducto"
                        :page-size="pageSizeProducto"
                        layout="total, prev, pager, next"
                        :total="totalrowsProducto">
                    </el-pagination>
                </el-row>
            </el-main>
        </el-row>
  </el-dialog>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AsignarAlmacenService from '@/services/almacen/almacen-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    props: ['isModal'],
    components: { 
      HeaderPage
    },
    data() {
        return {
            title:'Asignación de Productos a Tienda',
            nomProdBuscar:"",
            //-----------------------------------
            isTipoProducto:true,
            isFechaVenProd:true,
            isCostoProduccion:true,
            isUbicacion:true,
            //-----------------------------------
            IdAlmacen:0,
            lobeAlmacen:[],
            IdTienda:0,
            lobeTienda:[],
            guia:'',
            fechaguia: new Date(),
            precio:'NO',
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
            idTableProducto:"",
            nombreTableProducto:"",
            filtrosProducto:[
                {columna:'Id', Valor:'',},
                {columna:'Nombre', Valor:''}
            ],
            //-----------------------------------
            list:[],
            //-----------------------------------
            mostrarClose: false,
            //-----------------------------------
            IdCliente:-1,
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        } else {
            this.fechaguia = new Date();
        }
    },
    computed: {
        ...mapState(["usuario","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        nomProdBuscar: function(n){
            this.filtrosProducto[1].Valor = n;
            this.PaginarProducto();
        },
        IdAlmacen: function(n){
            if(n!=0){
                this.CargarTienda(n);
            }
        },
        IdTienda: function(n){
            if(n!=0){
                this.CargarProductos(n);
            }
        },
        //-----------------------------
        isModal: function(n){
            this.LimpiarCampos();
            if(n){
                this.CargarDatosIniciales();
            }
        },
        precio: function(n){
            if(n=='NO'){
                let count = this.lobeListadoProducto.length;
                for(var i = 0; i < count; i+=1){
                    this.lobeListadoProducto[i].Precio = this.lobeListadoProducto[i].OldPrecio;
                }
            }
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
    updated(){
            this.selectRowsData(this.list);
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
        SelectionChange(a, b) {
            this.list=a;
        },
        SelectionAllChange(rows){
            this.list=this.loModulos;
        },
        ///===================
        closeModal: function () {
            this.Cancelar();
            //this.$emit('interface', !this.isModal, []);
        },
        ///===================
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Datos Iniciales...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          AsignarAlmacenService.CargarDatosIniciales(this.usuario.usuarioLogin,this.usuario.idCliente)
            .then(res => {
                loading.close();
                if (res.status==200){
                    //this.lobeListado = res.result.loListado;
                    this.IdAlmacen=0;
                    this.lobeAlmacen = res.result.loAlmacen;
                    if(this.lobeAlmacen.filter(obe=>obe.codigo!=0).length==1){
                        this.IdAlmacen = this.lobeAlmacen.filter(obe=>obe.codigo!=0)[0].codigo;
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
        CargarTienda(idAlmacen){
          AsignarAlmacenService.CargarTienda(this.usuario.usuarioLogin,this.usuario.idCliente,idAlmacen)
            .then(res => {
                if (res.status==200){
                    this.lobeTienda = res.result;
                    this.IdTienda = this.lobeTienda.length==2?this.lobeTienda[1].codigo:0;
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
        CargarProductos(idTienda){
          AsignarAlmacenService.CargarProductosTienda(this.usuario.usuarioLogin,this.usuario.idCliente, this.IdAlmacen, idTienda)
            .then(res => {
                if (res.status==200){
                    this.lobeListadoProducto = res.result;
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
            this.isUbicacion = this.permisos.isUbicacion;
            this.PaginarProducto();
        },
        SeleccionarProducto(id,row){
            if (!row.Selec){
                row.CantidadTienda=0;
                row.Precio = row.OldPrecio;
            }
        },
        Cancelar(){
            this.IdAlmacen=0;
            this.IdTienda=0;
            this.lobeTienda = [];
            this.guia="";
            this.fechaguia= new Date();
            this.precio='NO';
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado = [];
            this.$emit('interface', !this.isModal, []);
        },
        LimpiarCampos(){
            this.IdAlmacen=0;
            this.IdTienda=0;
            this.lobeTienda = [];
            this.guia="";
            this.fechaguia= new Date();
            this.precio='NO';
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado = [];
        },
        PaginarProducto(){
            var filaInicio = (this.currentPageProducto - 1) * this.pageSizeProducto;
            var filaFin = (this.currentPageProducto * this.pageSizeProducto) ;

            this.lobeListadoProductoFiltrado = this.lobeListadoProducto;

            this.totalrowsProducto=this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        ValidarGuardar(){
            if(this.IdTienda==0){
                return 'Debe seleccionar Tienda.';
            }
            if(this.guia==''){
                return 'Debe ingresar Guía Entrada Tienda.';
            }
            if(this.fechaguia==''){
                return 'Debe ingresar Fecha Guía Entrada.';
            }
            let lobe = this.lobeListadoProducto.filter(obe=>obe.CantidadTienda>0 
                        && (obe.OldPrecio != obe.Precio || (obe.Precio==0 && obe.OldPrecio != obe.Precio && this.precio=="SI")
                        || obe.OldPrecioBlister != obe.PrecioBlister || (obe.PrecioBlister==0 && obe.OldPrecioBlister != obe.PrecioBlister && this.precio=="SI")));
            if(lobe.length==0){
                return 'Debe ingresar cantidad Productos a Asignar.';
            }
            if(lobe.filter(obe=>obe.CantidadTienda==0 && obe.Precio!=0).length>0 && this.precio=="NO"){
                return 'Cantidad a transferir debe ser mayor a 0.';
            }
            if(lobe.filter(obe=>obe.Precio==0).length>0){
                return 'Precio Unitario de Producto debe ser mayor a 0.';
            }
            if(lobe.filter(obe=>obe.Precio<=obe.PrecioCosto).length>0){
                return 'Precio Unitario de Producto debe ser mayor a Precio Compra Unitario.';
            }
            if(lobe.filter(obe=>obe.PrecioBlister==0 && obe.idTipo==1).length>0){
                return 'Precio Blister de Producto debe ser mayor a 0.';
            }
            if(lobe.filter(obe=>obe.PrecioBlister<=obe.Precio).length>0){
                return 'Precio Blister de Producto debe ser mayor a Precio Unitario.';
            }
            if(lobe.filter(obe=>obe.Ubicacion=='').length>0 && this.isUbicacion){
                return 'Debe ingresar Ubicación de Producto.';
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            var fecha = this.fechaguia.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaguia.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaguia.getDate().toString().padStart(2,'0') + 
                            ' ' + this.fechaguia.getHours().toString().padStart(2,'0') + 
                            ':' + this.fechaguia.getMinutes().toString().padStart(2,'0') + 
                            ':' + this.fechaguia.getSeconds().toString().padStart(2,'0');
            if (tipo==1){
                item.Id = this.id;
                item.IdAlmacen = this.IdAlmacen;
                item.IdTienda = this.IdTienda;
                item.NroGuia = this.guia;
                item.FechaGuia = fecha;
                item.IdCliente = this.usuario.idCliente; //this.IdCliente==-1?this.usuario.idCliente:this.IdCliente;
                item.isCostoProduccion = this.isCostoProduccion;
                item.UsrCreador = this.usuario.usuarioLogin;
                item.loProducto = this.lobeListadoProducto.filter(obe=>obe.CantidadTienda>0 || 
                    obe.OldPrecio != obe.Precio || 
                    (obe.Precio==0 && obe.OldPrecio != obe.Precio && this.precio=="SI") || 
                    obe.OldPrecioBlister != obe.PrecioBlister || 
                    (obe.PrecioBlister==0 && obe.OldPrecioBlister != obe.PrecioBlister && this.precio=="SI"));//obe=>obe.Selec==true);
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
            const loading = this.$loading({
                lock: true,
                text: 'Guardando Información...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            AsignarAlmacenService.GuardarAsignarTienda(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.$message({
                            showClose: true,
                            message: 'Se Asignó Productos Correctamente.',
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
        keyUpPrecioCosto(a){
            a.returnValue = false;
        },
        KeyUpGuia(){
            this.guia = this.guia.toUpperCase();
        }
    }
};
</script>

<style lang="scss">

</style>
