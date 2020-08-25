<template>
  <el-dialog :title="title" fullscreen :visible.sync="isModal" 
                :showClose="mostrarClose" :before-close="closeModal">
        <el-row :gutter="5" type="flex" class="paddingTop0">
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                <el-button @click="AgregarPreventa()" class="width100" size="small" 
                            type="primary" icon="fas fa-save" plain> AGREGAR PREVENTA
                </el-button>
            </el-col>
            <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                <el-button @click="Cancelar()" class="width100" size="small" 
                            type="danger" icon="fas fa-ban" plain> CANCELAR
                </el-button>
            </el-col>
        </el-row>

        <el-row :gutter="5" type="flex" class="paddingTop10" v-show="lobeListadoProducto.length>0">
            <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1">
                <div class="width100">
                    <el-tag class="width100" type="info" effect="dark">Sub Total: <span class="fontsize12Bold textAlignR">{{SubTotal}}</span></el-tag>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="cus-border q-px-md q-pb-md">

                    <el-row :gutter="5" type="flex" class="paddingTop10">
                        <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                            <div class="cus-label-form-left">
                                <span class="cus-label textAdjust textAlignL">Buscar Producto:</span>
                            </div>
                        </el-col>
                        <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                            <div>
                                <el-input type="text"
                                    size="small"
                                    ref="BProducto"
                                    :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Nombre Producto" 
                                    v-model="BProducto"
                                    show-word-limit
                                    maxlength="50">
                                </el-input>
                            </div>
                        </el-col>
                    </el-row>
                    <el-divider></el-divider>
                    <el-table ref="listado" :data="lobeListadoProductoFiltrado" 
                            style="width: 100%"
                            highlight-current-row>
                        <!--<el-table-column fixed="left" label="" width="66" v-if="isVisibleColumn">
                            <template slot-scope="scope">
                                <el-button v-show="(scope.row.Cantidad>0)"
                                    size="mini" type="info" icon="el-icon-plus"
                                    @click="AgregarPreVenta(scope.row.IdProductoAlmacen, scope.row)"></el-button>
                            </template>
                        </el-table-column>-->
                        <el-table-column prop="Nombre" min-width="200" fixed="left" v-if="isVisibleColumn">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Nombre</span>
                            </template>
                            <!--<template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Nombre</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(1)"></i>
                                    <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(1)"></i>
                                </span>
                                <el-input size="mini" class="padding0" v-model="nombreTableProducto"></el-input>
                            </template>-->
                            <template slot-scope="scope">
                                <div class="cus-label-form-left width95">
                                    <span class="cus-label fontsize12 textAdjustWord textAlignL">{{scope.row.Nombre}}</span>
                                    <el-tag align="right" class="fontbold" v-show="scope.row.Color!=''" type="success">{{scope.row.Color}}</el-tag>
                                    <el-tag align="right" class="fontbold" v-show="scope.row.Talla!=''" type="danger">{{scope.row.Talla}}</el-tag>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DesNombreGenerico" min-width="150" v-if="isVisibleColumn">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Genérico</span>
                            </template>
                            <!--<template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Genérico</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(1)"></i>
                                    <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(1)"></i>
                                </span>
                                <el-input size="mini" class="padding0" v-model="nombreTableProducto"></el-input>
                            </template>-->
                            <template slot-scope="scope">
                                <div class="cus-label-form-left width95">
                                    <span class="cus-label fontsize12 textAdjustWord textAlignL">{{scope.row.DesNombreGenerico}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <!--<el-table-column prop="DesComposicion" min-width="200" v-if="isComposicion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Composición</span>
                            </template>
                            <template slot-scope="scope">
                                <div class="cus-label-form-left width95">
                                    <span class="cus-label fontsize12 textAdjustWord textAlignL">{{scope.row.DesComposicion}}</span>
                                </div>
                            </template>
                        </el-table-column>-->
                        <el-table-column prop="DesProdLaboratorio" min-width="120" align="center" v-if="isTipoPresentacion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">LAB</span>
                            </template>
                            <template slot-scope="scope">
                                <div class="cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.DesProdLaboratorio!=''">
                                    <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdLaboratorio}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DesProdTipoPresentacion" min-width="120" align="center" v-if="isTipoPresentacion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">PRE</span>
                            </template>
                            <template slot-scope="scope">
                                <div class="cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.DesProdTipoPresentacion!=''">
                                    <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdTipoPresentacion}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DesProdGrupo" min-width="120" align="center" v-if="isTipoPresentacion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">GRUP</span>
                            </template>
                            <template slot-scope="scope">
                                <div class="cus-label-form-left cus-border-tag-1 width100 padding5" v-show="scope.row.DesProdGrupo!=''">
                                    <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdGrupo}}</span>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="FecVencimiento" width="120" align="center" v-if="isFechaVenProd">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Fec. Venc.</span>
                            </template>
                            <template slot-scope="scope">
                                <el-tag class="fontbold" v-show="!scope.row.isXVencer && scope.row.FecVencimiento!=''" type="success">{{scope.row.FecVencimiento}}</el-tag>
                                <el-tag class="fontbold" v-show="scope.row.isXVencer && scope.row.FecVencimiento!=''" type="danger">{{scope.row.FecVencimiento}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Cantidad" width="100" fixed="right" align="center" v-if="isVisibleColumn">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Cantidad</span>
                            </template>
                            <template slot-scope="scope">
                                <!--<el-input-number v-model="scope.row.Cantidad" size="mini" :controls="!isVentaActual"
                                        :precision="0" class="width130P" @change="CambiarPrecio(scope.row)"
                                        @keypress.native="keyEnviar"
                                        :step="1" :min="0" :max="scope.row.CantidadTienda">
                                </el-input-number>--><!--@keypress.native="keyEnviar" :min="0" :max="scope.row.CantidadTienda"-->
                                <el-input v-model="scope.row.Cantidad" size="mini" type="number"
                                    @keypress.native="keyEnviar" 
                                    :min="0" :max="scope.row.CantidadTienda"
                                    @change="CambiarPrecio(scope.row)">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Precio" width="95" fixed="right" v-if="isVisibleColumn" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Precio</span>
                            </template>
                            <template slot-scope="scope">
                                <span class="width105P">{{scope.row.Precio}}</span>
                                <!--<el-input v-model="scope.row.Precio" size="mini" readonly></el-input>-->
                            </template>
                        </el-table-column>
                        <el-table-column prop="CantidadTienda" width="85" fixed="right" v-if="isVisibleColumn" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjustWord">Stock</span>
                            </template>
                            <template slot-scope="scope">
                                <span class="width105P">{{scope.row.CantidadTienda}}</span>
                                <!--<el-input class="borderform" v-model="scope.row.CantidadTienda" size="mini" readonly></el-input>-->
                            </template>
                        </el-table-column>
                        <el-table-column label="+ Stock" width="115" fixed="right" v-if="isColumnAddStock">
                            <template slot-scope="scope">
                                <el-button-group>
                                    <el-button v-show="(scope.row.idProductoBase==0 && scope.row.isAddStock)"
                                        size="mini" type="info" icon="el-icon-plus"
                                        @click="AgregarStock(scope.row.Id, scope.row)"></el-button>
                                    <el-button v-show="(scope.row.idProductoBase==0 && scope.row.isAddStock)"
                                        size="mini" type="info" icon="el-icon-minus"
                                        @click="DisminuirStock(scope.row.Id, scope.row)"></el-button>
                                    <el-button v-show="(scope.row.idProductoBase!=0 && scope.row.isAddStock)"
                                        size="mini" type="info" icon="el-icon-plus"
                                        @click="AgregarStockGrupo(scope.row.Id, scope.row)"></el-button>
                                    <el-button v-show="(scope.row.idProductoBase!=0 && scope.row.isAddStock)"
                                        size="mini" type="info" icon="el-icon-minus"
                                        @click="DisminuirStockGrupo(scope.row.Id, scope.row)"></el-button>
                                </el-button-group>
                            </template>
                        </el-table-column>
                        <el-table-column fixed="right" label="" width="66">
                            <template slot-scope="scope">
                                <el-button size="mini"
                                    type="info" icon="el-icon-picture"
                                    @click="VerProducto(scope.row.Id, scope.row)"></el-button>
                            </template>
                        </el-table-column>
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
                        :key="oLista.IdProductoAlmacen" :value="oLista.IdProductoAlmacen">
                    <el-main class="padding5 cus-border">
                        <el-row :gutter="5" type="flex" class="paddingTop0">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left width95">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjustWord textAlignL fontbold">{{oLista.Nombre}}</span>
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
                                    <span class="cus-label textAdjustWord textAlignL width95P">Stock:</span>
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
                                    <span class="cus-label textAdjustWord textAlignL width95P">Cantidad :</span>
                                    <el-input-number v-model="oLista.Cantidad" size="mini" :controls="!isVentaActual"
                                        :precision="0" class="width130P" @change="CambiarPrecio(oLista)"
                                        :step="1" :min="0" :max="oLista.CantidadTienda"></el-input-number>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjustWord textAlignL width95P">Precio:</span>
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
                        @current-change="PaginarProducto"
                        :current-page.sync="currentPageProducto"
                        :page-size="pageSizeProducto"
                        layout="total, prev, pager, next"
                        :total="totalrowsProducto">
                    </el-pagination>
                </el-row>
            </el-main>
        </el-row>

        <!--<modal-ver-productos :isModal="isModalVer" :idProducto="idProductoImagen" @interface="Cargar">
        </modal-ver-productos>-->
        <el-dialog :title="titleDet" center :visible.sync="isModalVer" append-to-body
                    :showClose="mostrarCloseDet" :before-close="closeModalDet">
            <el-row :gutter="5" type="flex" class="paddingTop0">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-row :gutter="5">
                        <div v-for="oArchivo in loarchivos" :key="oArchivo.Id">
                            <el-col :xs="12" :sm="12" :md="8" :lg="8" :xl="8">
                                <el-card :body-style="{ padding: '0px' }">
                                    <el-image v-show="oArchivo.URL!=''"
                                        class="width100 height100"
                                        :src="oArchivo.URL"
                                        fit="scale-down">
                                    </el-image>
                                </el-card>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row :gutter="5" class="paddingTop10">
                        <div v-for="oArchivo in loarchivosDatos" :key="oArchivo.Id">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <el-row v-show="oArchivo.Descripcion!=''">
                                        <span class="fontbold">Descripción:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.Descripcion!=''">
                                        <span class="textAdjustWord">{{ oArchivo.Descripcion }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesNombreGenerico!=''">
                                        <span class="fontbold">Genérico:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesNombreGenerico!=''">
                                        <span class="textAdjustWord">{{ oArchivo.DesNombreGenerico }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesProdLaboratorio!=''">
                                        <span class="fontbold">Laboratorio</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesProdLaboratorio!=''">
                                        <span class="textAdjustWord">{{ oArchivo.DesProdLaboratorio }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesProdGrupo!=''">
                                        <span class="fontbold">Grupo:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesProdGrupo!=''">
                                        <span class="textAdjustWord">{{ oArchivo.DesProdGrupo }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesProdTipoPresentacion!=''">
                                        <span class="fontbold">Presentación:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesProdTipoPresentacion!=''">
                                        <span class="textAdjustWord">{{ oArchivo.DesProdTipoPresentacion }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesTipoProducto!=''">
                                        <span class="fontbold">Tipo:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesTipoProducto!=''">
                                        <span class="textAdjustWord">{{ oArchivo.DesTipoProducto }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesComposicion!=''">
                                        <span class="fontbold backgroundColorY">Composición:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesComposicion!=''">
                                        <span class="textAdjustWord backgroundColorY">{{ oArchivo.DesComposicion }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesIndicaciones!=''">
                                        <span class="fontbold backgroundColorY">Indicaciones:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesIndicaciones!=''">
                                        <span class="textAdjustWord backgroundColorY">{{ oArchivo.DesIndicaciones }}</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesContraIndicaciones!=''">
                                        <span class="fontbold backgroundColorY">ContraIndicaciones:</span>
                                    </el-row>
                                    <el-row v-show="oArchivo.DesContraIndicaciones!=''">
                                        <span class="textAdjustWord backgroundColorY">{{ oArchivo.DesContraIndicaciones }}</span>
                                    </el-row>
                            </el-col>
                        </div>
                    </el-row>   
                </el-col>
            </el-row>
            <el-row :gutter="5" type="flex" class="paddingTop10">
                <el-col :xs="12" :sm="10" :md="8" :lg="5" :xl="3">
                    <el-button @click="CancelarDet()" class="width100" size="small" 
                                type="danger" icon="fas fa-ban" plain> SALIR
                    </el-button>
                </el-col>
            </el-row>
        </el-dialog>
  </el-dialog>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AsignarAlmacenService from '@/services/almacen/almacen-service'
import VentaService from '@/services/ventas/venta-service'
import { mapState,mapGetters } from "vuex";
//MODALES
//import ModalVerProductos from '@/components/pages/ventas/modals/mdlVerProducto'

export default {
    name: "app",
    props: ['isModal','idTienda','lobeLista','lobeListaBkp'],
    components: { 
      HeaderPage//, ModalVerProductos
    },
    data() {
        return {
            SubTotal:0,
            //-----------------------------------
            isVentaActual:false,
            isVisibleColumn:true,
            isColumnAddStock:true,
            isComposicion:true,
            isTipoPresentacion:true,
            //-----------------------------------
            isModalVer:false,
            idProductoImagen:0,
            mostrarClose: true,
            mostrarCloseDet: true,
            loarchivos:[],
            loarchivosDatos:[],
            title:'Detalle de Producto',
            //-----------------------------------
            titleDet:'Detalle de Producto',
            nomProdBuscar:"",
            BProducto:"",
            //-----------------------------------
            isTipoProducto:true,
            isFechaVenProd:true,
            isCostoProduccion:true,
            //-----------------------------------
            IdAlmacen:0,
            lobeAlmacen:[],
            lobeTienda:[],
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
        //-----------------------------
        IdAlmacen: function(n){
            if(n!=0){
                this.CargarProductos(n);
            } else {
                this.lobeListadoProducto = [];
                this.lobeListadoProductoFiltrado=[];
            }
        },
        isModal: function(n){
            this.LimpiarCampos();
            if(n){
                //this.CargarDatosIniciales();
                this.lobeListadoProducto = this.lobeLista;
                this.PaginarProducto();
                this.MostrarColumnasProducto();
            }
            this.CalcularSubTotal();
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
        BProducto: function(n){
            this.filtrosProducto[1].Valor = n;
            this.PaginarProducto();
        },
    },
    updated(){
        //this.selectRowsData(this.list);
    },
    methods: {
        //@keypress.native="keyEnviar"
        keyEnviar(a){
            if(a.key == "Enter")
            {
                //a.returnValue = true;
                this.AgregarPreventa();
            } else {
                a.returnValue = true;
            }
        },
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
            } else if(id==2){
                this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                    if (a.Stock < b.Stock)
                        return -1;
                    if (a.Stock > b.Stock)
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
            } else if(id==2){
                this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.sort(function(a, b) {
                    if (a.Stock < b.Stock)
                        return 1;
                    if (a.Stock > b.Stock)
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
        Cargar(val){
            this.isModalVer=val;
        },
        VerProducto(id,row){
            this.CargarDetalleProducto(id)
            //this.idProductoImagen = id;
            //this.isModalVer = true;
        },
        closeModal: function () {
            this.Cancelar();
        },
        LimpiarCampos(){
            this.SubTotal = 0;
            this.IdAlmacen=0;
            this.precio='NO';
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado = [];
        },
        AgregarPreventa(){
            this.$emit('interface', !this.isModal, this.lobeListadoProducto.filter(obe=>obe.isCambio==true || obe.Cantidad>0));
            //this.lobeListadoProducto.filter(obe=>obe.Cantidad>0));
        },
        Cancelar(){
            this.SubTotal = 0;
            this.IdAlmacen=0;
            this.precio='NO';
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado = [];
            this.$emit('interface', !this.isModal, []);
        },
        closeModalDet: function () {
            //this.$emit('interface', !this.isModal);
            this.isModalVer = false;
        },
        CargarDetalleProducto(idProducto){
          VentaService.CargarImagenesProductosModal(this.usuario.usuarioLogin,this.usuario.idCliente,idProducto)
            .then(res => {
                if (res.status==200){
                    this.isModalVer=true;
                    this.loarchivos = res.result;
                    this.loarchivosDatos = [];
                    if(res.result.length>1){
                        this.loarchivosDatos.push(res.result[0]);
                    } else {
                        this.loarchivosDatos = res.result;
                    }
                } else if (res.status==300){
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'warning'
                    });
                    this.CancelarDet();
                } else if (res.status==400){
                    this.$message({
                        showClose: true,
                        message: res.result,
                        type: 'error'
                    });
                    this.CancelarDet();
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
        CancelarDet(){
            this.loarchivos=[];
            this.loarchivosDatos=[];
            this.isModalVer=false;
            //this.$emit('interface', !this.isModal);
        },
        CambiarPrecio(row){
            row.Precio = Math.round(row.OldPrecio * (row.Cantidad==0?1:row.Cantidad) * 100)/100;
            this.CalcularSubTotal();
        },
        CalcularSubTotal(){
            let lobe = this.lobeListadoProducto.filter(obe=>obe.Cantidad>0);
            this.SubTotal = 0;
            for(var i=0;i<lobe.length;i+=1){
                var subt = Math.round(lobe[i].Cantidad*lobe[i].OldPrecio*100)/100;
                this.SubTotal += subt;
            }
        },
        CargarProductos(idAlmacen){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Productos de Almacén...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            loading.close();
            //this.limpiarCamposDependientes(true);
            this.lobeListadoProducto=[];
            VentaService.CargarProductos(this.usuario.usuarioLogin, this.usuario.idCliente, this.idTienda)
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.lobeListadoProducto = res.result.loProducto;
                        this.PaginarProducto();
                        this.MostrarColumnasProducto();
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
        MostrarColumnasProducto(){
            this.isTipoProducto = this.permisos.isTipoProducto; 
            this.isFechaVenProd = this.permisos.isFechaVenProd; 
            this.isCostoProduccion = this.permisos.isCostoProduccion;
            this.isComposicion = this.permisos.isComposicion;
            this.isTipoPresentacion = this.permisos.isTipoPresentacion;

            let cantidad = this.lobeListadoProducto.length;
            let add = 0;
            for(var i=0; i<cantidad; i+=1){
                if(this.lobeListadoProducto[i].isAddStock){
                    add += 1;
                }
            }
            this.isColumnAddStock = add>0?true:false;
        },
        PaginarProducto(){
            var filaInicio = (this.currentPageProducto - 1) * this.pageSizeProducto;
            var filaFin = (this.currentPageProducto * this.pageSizeProducto) ;

            this.lobeListadoProductoFiltrado = this.lobeListadoProducto;

            this.totalrowsProducto=this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor)) && 
                        (
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesComposicion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesProdTipoPresentacion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) 
                        )
                        ));
                }, this).length;

            this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtrosProducto.filter(f => f.columna=='Id')[0].Valor)) && 
                        (
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesComposicion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesProdTipoPresentacion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        )
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        AgregarStock(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.idProductoBase==id);
            let indexC = this.lobeListadoProducto.findIndex(obe=>obe.Id==id);//lobeListado
            let indexCB = this.lobeListadoProducto.findIndex(obe=>obe.Id==this.lobeListadoProducto[index].Id);//lobeListado - lobeListadoProducto
            if(index!=-1){
                if(this.lobeListadoProducto[index].CantidadTienda > 0){
                    this.lobeListadoProducto[index].CantidadTienda -=1;
                    this.lobeListadoProducto[index].isCambio = true;
                    row.CantidadTienda += this.lobeListadoProducto[index].CantidadCaja;
                    if(indexC!=-1){
                        this.lobeListadoProducto[indexC].Stock = this.lobeListadoProducto[indexC].Cantidad + row.CantidadTienda;//lobeListado
                        this.lobeListadoProducto[indexC].isCambio = true;
                    }
                    if(indexCB!=-1){
                        this.lobeListadoProducto[indexCB].Stock = this.lobeListadoProducto[indexCB].Cantidad - 1;//lobeListado
                        this.lobeListadoProducto[indexCB].isCambio = true;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: 'No hay mas Stock disponible.',
                        type: 'warning'
                    });
                }
            }
        },
        DisminuirStock(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.idProductoBase==id);
            let indexC = this.lobeListadoProducto.findIndex(obe=>obe.Id==id);//lobeListado
            let indexCB = this.lobeListadoProducto.findIndex(obe=>obe.Id==this.lobeListadoProducto[index].Id);//lobeListado - lobeListadoProducto
            if(index!=-1){
                if(this.lobeListadoProducto[index].CantidadCaja <= row.CantidadTienda){
                    this.lobeListadoProducto[index].CantidadTienda +=1;
                    this.lobeListadoProducto[index].isCambio = true;
                    row.CantidadTienda -= this.lobeListadoProducto[index].CantidadCaja;
                    if(indexC!=-1){
                        this.lobeListadoProducto[indexC].Stock = this.lobeListadoProducto[indexC].Cantidad - row.CantidadTienda;//lobeListado
                        this.lobeListadoProducto[indexC].isCambio = true;
                    }
                    if(indexCB!=-1){
                        this.lobeListadoProducto[indexCB].Stock = this.lobeListadoProducto[indexCB].Cantidad + 1;//lobeListado
                        this.lobeListadoProducto[indexCB].isCambio = true;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: 'No hay mas Stock disponible.',
                        type: 'warning'
                    });
                }
            }
        },
        AgregarStockGrupo(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.Id==row.idProductoBase);
            let indexC = this.lobeListadoProducto.findIndex(obe=>obe.Id==id);//lobeListado
            let indexCB = this.lobeListadoProducto.findIndex(obe=>obe.Id==row.idProductoBase);//lobeListado
            if(index!=-1){
                if(this.lobeListadoProducto[index].CantidadTienda >= row.CantidadCaja){
                    this.lobeListadoProducto[index].CantidadTienda -= row.CantidadCaja;
                    this.lobeListadoProducto[index].isCambio = true;
                    row.CantidadTienda += 1;
                    if(indexC!=-1){
                        this.lobeListadoProducto[indexC].Stock = this.lobeListadoProducto[indexC].Cantidad + 1;//lobeListado
                        this.lobeListadoProducto[indexC].isCambio = true;
                    }
                    if(indexCB!=-1){
                        this.lobeListadoProducto[indexCB].Stock = this.lobeListadoProducto[indexCB].Cantidad - row.CantidadCaja;//lobeListado
                        this.lobeListadoProducto[indexCB].isCambio = true;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: 'No hay mas Stock disponible.',
                        type: 'warning'
                    });
                }
            }
        },
        DisminuirStockGrupo(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.Id==row.idProductoBase);
            let indexC = this.lobeListadoProducto.findIndex(obe=>obe.Id==id); //lobeListado
            let indexCB = this.lobeListadoProducto.findIndex(obe=>obe.Id==row.idProductoBase); //lobeListado
            if(index!=-1){
                if(row.CantidadTienda > 0){
                    row.CantidadTienda -= 1;
                    this.lobeListadoProducto[index].CantidadTienda += row.CantidadCaja;
                    this.lobeListadoProducto[index].isCambio = true;
                    if(indexC!=-1){
                        this.lobeListadoProducto[indexC].Stock = this.lobeListadoProducto[indexC].Cantidad - 1;//lobeListado
                        this.lobeListadoProducto[indexC].isCambio = true;
                    }
                    if(indexCB!=-1){
                        this.lobeListadoProducto[indexCB].Stock = this.lobeListadoProducto[indexCB].Cantidad + row.CantidadCaja;//lobeListado
                        this.lobeListadoProducto[indexCB].isCambio = true;
                    }
                } else {
                    this.$message({
                        showClose: true,
                        message: 'No hay mas Stock disponible.',
                        type: 'warning'
                    });
                }
            }
        },
        //--------------------------------------------------------------
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
        //--------------------------------------------------------------
        SeleccionarProducto(id,row){
            if (!row.Selec){
                row.CantidadTienda=0;
                row.Precio = row.OldPrecio;
            }
        },
        ValidarGuardar(){
            /*if(this.IdCliente==-1){
                return "Debe seleccionar Cliente.";
            }*/
            if(this.IdAlmacen==0){
                return "Debe seleccionar Almacen.";
            }
            let cantreg = this.lobeListadoProducto.filter(obe=>obe.Cantidad>0).length;
            if(cantreg==0){
                return "Ingresar Cantidad de Productos.";
            }
            if(cantreg>0){
                let lobe = this.lobeListadoProducto.filter(obe=>obe.Cantidad>0);
                for(var i=0;i<lobe.length;i+=1){
                    let idTipo = lobe[i].idTipo;
                    let isTipoBase = lobe[i].isTipoBase;

                    if(idTipo==-1 || !isTipoBase){
                        if(lobe[i].Cantidad==0){
                            return "Debe ingresar Cantidad de Producto de: " + lobe[i].Nombre;
                        } else if(lobe[i].PrecioCosto==0 && this.isCostoProduccion){
                            return "Debe ingresar Precio Compra del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].FecVencimiento=="" && this.isFechaVenProd){
                            return "Debe ingresar Fecha de Vencimiento del Producto: " + lobe[i].Nombre;
                        }
                    } else if (idTipo==0){
                        return "No se ingreso Tipo de Producto para: " + lobe[i].Nombre;
                    } else {
                        if(lobe[i].Cantidad==0){
                            return "Debe ingresar Cantidad del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].CantidadCaja==0 && this.isTipoProducto){
                            return "Debe ingresar Unidades/Caja del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].PrecioCosto==0 && this.isCostoProduccion){
                            return "Debe ingresar Precio Compra del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].FecVencimiento=="" && this.isFechaVenProd){
                            return "Debe ingresar Fecha de Vencimiento del Producto: " + lobe[i].Nombre;
                        }
                    }
                }
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            if (tipo==1){
                item.Id = this.Id;
                item.IdAlmacen = this.IdAlmacen;
                item.DesAlmacen = this.lobeAlmacen.filter(obe=>obe.codigo==item.IdAlmacen)[0].descripcion;
                item.IdCliente = this.usuario.idCliente;//this.IdCliente==-1?this.usuario.idCliente:this.IdCliente;
                //item.DesCliente = this.lobeCliente.filter(obe=>obe.codigo==item.IdCliente)[0].descripcion;
                item.loProducto = this.CrearObjetoProducto(this.lobeListadoProducto.filter(obe=>obe.Cantidad>0));
                item.UsrCreador = this.usuario.usuarioLogin;
            }
            return item;
        },
        CrearObjetoProducto(listado){
            let lobe = listado;
            for(var i=0;i<lobe.length;i+=1){
                let fechaVen = lobe[i].FecVencimiento==""?new Date(1900,1,1,0,0,0,0):lobe[i].FecVencimiento;
                var fecha = fechaVen.getFullYear().toString().padStart(4,'0') + 
                            '-' + (fechaVen.getMonth()+1).toString().padStart(2,'0') +
                            '-' + fechaVen.getDate().toString().padStart(2,'0') + 
                            ' ' + fechaVen.getHours().toString().padStart(2,'0') + 
                            ':' + fechaVen.getMinutes().toString().padStart(2,'0') + 
                            ':' + fechaVen.getSeconds().toString().padStart(2,'0');
                lobe[i].FecVencimiento = fecha;
            }
            return lobe;
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
            AsignarAlmacenService.Guardar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: 'Se Asignó Productos a Almacén Correctamente.',
                            type: 'success'
                        });
                        this.Cancelar(true);
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

    }
};
</script>

<style lang="scss">

</style>
