<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
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

                <el-row :gutter="5" class="paddingTop10">
                    <el-tag type="success" class="cus-tag-header-panel">LISTADO DE PRODUCTOS</el-tag>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop0">
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <el-button @click="Actualizar()" class="width100" size="medium" 
                                    v-show="ExisteCambio()"
                                    type="primary" icon="el-icon-refresh" plain> ACTUALIZAR
                        </el-button>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <div class="cus-label-form-left">
                            <el-checkbox v-model="BStock" size="medium"
                                label="STock Total" border></el-checkbox>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <el-button @click="Exportar()" class="width100" size="small" 
                                    v-show="BStock"
                                    type="warning" icon="fas fa-download" plain> EXPORTAR
                        </el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5" class="paddingTop10 hidden-xs-only hidden-sm-only" v-show="!BStock">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-table ref="listado" :data="lobeListadoFiltrado" 
                                    style="width: 100%"
                                    highlight-current-row>
                                <el-table-column prop="NombreProducto" label-class-name="fontsize17Bold" min-width="150" fixed="left" v-if="isVisibleColumn">
                                    <!--<template slot="header">
                                        <span class="textAdjustWord">Nombre</span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="NombreProductoTable"></el-input>
                                    </template>-->
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjustWord">Nombre</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="NombreProductoTable"></el-input>
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="cus-label-form-left width95">
                                            <span class="cus-label fontsize12 textAdjustWord textAlignL" v-show="scope.row.RecetaMedica=='SI'">
                                                    <el-tag align="right" class="fontbold" type="danger" size="small">C/ Receta</el-tag>
                                                    <br>{{scope.row.NombreProducto}}
                                            </span>
                                            <span class="cus-label fontsize12 textAdjustWord textAlignL" v-show="scope.row.RecetaMedica=='NO'">
                                                {{scope.row.NombreProducto}}
                                            </span>
                                            <!--<el-tag align="right" class="fontbold" v-show="scope.row.Color!=''" type="success">{{scope.row.Color}}</el-tag>
                                            <el-tag align="right" class="fontbold" v-show="scope.row.Talla!=''" type="danger">{{scope.row.Talla}}</el-tag>-->
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="CodProdLaboratorio" label-class-name="fontsize17Bold" width="85" align="center" v-if="isLaboratorio">
                                    <template slot="header">
                                        <span class="textAdjustWord">LAB</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="fontbold cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.CodProdLaboratorio!=''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.CodProdLaboratorio}}</span>
                                        </div>
                                        <div class="fontbold cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.CodProdLaboratorio==''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdLaboratorio}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="CodProdTipoPresentacion" label-class-name="fontsize17Bold" width="88" align="center" v-if="isTipoPresentacion">
                                    <template slot="header">
                                        <span class="textAdjustWord">PRE</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="fontbold cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.CodProdTipoPresentacion!=''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.CodProdTipoPresentacion}}</span>
                                        </div>
                                        <div class="fontbold cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.CodProdTipoPresentacion==''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdTipoPresentacion}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="FecVencimiento" label-class-name="fontsize17Bold" width="90" align="center" v-if="isFechaVenProd">
                                    <template slot="header">
                                        <span class="textAdjustWord">Fec. Venc.</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold" v-show="!scope.row.isXVencer && scope.row.FecVencimiento!=''" type="success">{{scope.row.FecVencimiento}}</el-tag>
                                        <el-tag class="fontbold" v-show="scope.row.isXVencer && scope.row.FecVencimiento!=''" type="danger">{{scope.row.FecVencimiento}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Stock" label-class-name="fontsize17Bold" width="90" fixed="right" align="center" v-if="isVisibleColumn">
                                    <template slot="header">
                                        <span class="textAdjustWord">Stock</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" type="primary">{{scope.row.Cantidad}}</el-tag>
                                        <!--<span class="width105P">{{scope.row.Cantidad}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column prop="CantidadCaja" label-class-name="fontsize17Bold" width="95" fixed="right" align="center" v-if="isVisibleColumn">
                                    <template slot="header">
                                        <span class="textAdjustWord">Und. x Caja</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" v-show="!scope.row.CantidadCaja==0" type="primary">{{scope.row.CantidadCaja}}</el-tag>
                                        <!--<span class="width105P">{{scope.row.CantidadCaja}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Precio" label-class-name="fontsize17Bold" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                    <template slot="header">
                                        <span class="textAdjustWord">Precio</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" type="primary">{{scope.row.Precio}}</el-tag>
                                        <!--<span class="width105P">{{scope.row.Precio}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column prop="PrecioBlister" label-class-name="fontsize17Bold" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                    <template slot="header">
                                        <span class="textAdjustWord">Precio Blister</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag v-show="scope.row.IdTipo==1" class="fontbold width100" type="primary">{{scope.row.PrecioBlister}}</el-tag>
                                        <!--<span class="width105P">{{scope.row.Precio}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column prop="PrecioCosto" label-class-name="fontsize17Bold" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                    <template slot="header">
                                        <span class="textAdjustWord">Prec. Costo</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" type="primary">{{scope.row.PrecioCosto}}</el-tag>
                                        <!--<span class="width105P">{{scope.row.PrecioCosto}}</span>-->
                                    </template>
                                </el-table-column>
                                <el-table-column prop="StockN" label-class-name="fontsize17Bold" width="90" fixed="right" align="center" v-if="isVisibleColumn">
                                    <template slot="header">
                                        <span class="textAdjustWord">Cambiar Stock</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.StockN" size="medium" type="number"
                                            :min="0"><!--@keypress.native="keyEnviar"-->
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="PrecioN" label-class-name="fontsize17Bold" width="100" fixed="right" align="center" v-if="isVisibleColumn">
                                    <template slot="header">
                                        <span class="textAdjustWord">Cambiar Precio</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-model="scope.row.PrecioN" size="medium" type="number"
                                            :min="scope.row.Precio"><!--@keypress.native="keyEnviar"-->
                                        </el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="PrecioBlisterN" label-class-name="fontsize17Bold" width="100" fixed="right" align="center" v-if="isVisibleColumn">
                                    <template slot="header">
                                        <span class="textAdjustWord">Cambiar Precio Blister</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-input v-show="scope.row.IdTipo==1" 
                                            v-model="scope.row.PrecioBlisterN" size="medium" type="number"
                                            :min="scope.row.Precio"><!--@keypress.native="keyEnviar"-->
                                        </el-input>
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

                <el-row :gutter="5" class="paddingTop10 hidden-xs-only hidden-sm-only" v-show="BStock">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-table ref="listado" :data="lobeListadoStockFiltrado" 
                                    style="width: 100%"
                                    highlight-current-row>
                                <el-table-column prop="NombreProducto" label-class-name="fontsize17Bold" min-width="150" fixed="left" v-if="isVisibleColumn">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjustWord">Nombre</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente2(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente2(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="NombreProductoTable2"></el-input>
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="cus-label-form-left width95">
                                            <span class="cus-label fontsize12 textAdjustWord textAlignL" v-show="scope.row.RecetaMedica=='SI'">
                                                    <el-tag align="right" class="fontbold" type="danger" size="small">C/ Receta</el-tag>
                                                    <br>{{scope.row.NombreProducto}}
                                            </span>
                                            <span class="cus-label fontsize12 textAdjustWord textAlignL" v-show="scope.row.RecetaMedica=='NO'">
                                                {{scope.row.NombreProducto}}
                                            </span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="CodProdLaboratorio" label-class-name="fontsize17Bold" width="85" align="center" v-if="isLaboratorio">
                                    <template slot="header">
                                        <span class="textAdjustWord">LAB</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="fontbold cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.CodProdLaboratorio!=''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.CodProdLaboratorio}}</span>
                                        </div>
                                        <div class="fontbold cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.CodProdLaboratorio==''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdLaboratorio}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="CodProdTipoPresentacion" label-class-name="fontsize17Bold" width="88" align="center" v-if="isTipoPresentacion">
                                    <template slot="header">
                                        <span class="textAdjustWord">PRE</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <div class="fontbold cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.CodProdTipoPresentacion!=''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.CodProdTipoPresentacion}}</span>
                                        </div>
                                        <div class="fontbold cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.CodProdTipoPresentacion==''">
                                            <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdTipoPresentacion}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="FecVencimiento" label-class-name="fontsize17Bold" width="90" align="center" v-if="isFechaVenProd">
                                    <template slot="header">
                                        <span class="textAdjustWord">Fec. Venc.</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold" v-show="!scope.row.isXVencer && scope.row.FecVencimiento!=''" type="success">{{scope.row.FecVencimiento}}</el-tag>
                                        <el-tag class="fontbold" v-show="scope.row.isXVencer && scope.row.FecVencimiento!=''" type="danger">{{scope.row.FecVencimiento}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="StockTotal" label-class-name="fontsize17Bold" width="100" fixed="right" align="center" v-if="isVisibleColumn">
                                    <template slot="header">
                                        <span class="textAdjustWord">Stock Total</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <!--<el-tag v-show="scope.row.StockTotal>40" class="fontbold width100" type="primary">{{scope.row.StockTotal}}</el-tag>-->
                                        <div class="cus-label-form-left cus-border-tag-Blue width100 padding5" v-show="scope.row.Val1">
                                            <span class="fontsize17Bold textAdjustWord textAlignC colorB">{{scope.row.StockTotal}}</span>
                                        </div>
                                        <!--<el-tag v-show="scope.row.StockTotal<=40 && scope.row.StockTotal>20" class="fontbold width100" type="danger">{{scope.row.StockTotal}}</el-tag>-->
                                        <div class="cus-label-form-left cus-border-tag-Red width100 padding5" v-show="scope.row.Val2">
                                            <span class="fontsize17Bold textAdjustWord textAlignC colorY">{{scope.row.StockTotal}}</span>
                                        </div>
                                        <!--<el-tag v-show="scope.row.StockTotal<=20" class="fontsize15Bold width100 backgroundColorB colorY">{{scope.row.StockTotal}}</el-tag>-->
                                        <div class="cus-label-form-left cus-border-tag-Black width100 padding5" v-show="scope.row.Val3">
                                            <span class="fontsize17Bold textAdjustWord textAlignC colorY">{{scope.row.StockTotal}}</span>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Precio" label-class-name="fontsize17Bold" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                    <template slot="header">
                                        <span class="textAdjustWord">Precio</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" type="primary">{{scope.row.Precio}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="PrecioBlister" label-class-name="fontsize17Bold" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                    <template slot="header">
                                        <span class="textAdjustWord">Precio Blister</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" type="primary">{{scope.row.PrecioBlister}}</el-tag>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="PrecioCosto" label-class-name="fontsize17Bold" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                    <template slot="header">
                                        <span class="textAdjustWord">Prec. Costo</span>
                                    </template>
                                    <template slot-scope="scope">
                                        <el-tag class="fontbold width100" type="primary">{{scope.row.PrecioCosto}}</el-tag>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-pagination
                                @current-change="PaginarStock"
                                :current-page.sync="currentPageS"
                                :page-size="pageSizeS"
                                layout="total, prev, pager, next"
                                :total="totalrowsS">
                            </el-pagination>
                        </div>
                    </el-col>
                </el-row>
            </el-main>
        </el-container>
    </div>

  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AsignarAlmacenService from '@/services/almacen/almacen-service'
import ControlStockService from '@/services/almacen/controlstock-service'
import ExcelService from '@/services/excel/excel-service'
import { mapState,mapGetters } from "vuex";

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            tittleModulo:'Control de Stock',
            //-----------------------------------
            IdAlmacen:0,
            lobeAlmacen:[],
            IdTienda:0,
            lobeTienda:[],
            //-----------------------------------
            nomProdBuscar:"",
            //-----------------------------------
            lobeListadoProducto:[],
            lobeListadoProductoFiltrado:[],
            //-----------------------------------
            currentPage: 1,
            pageSize: 8,
            totalrows: 0,
            ascP: -1,
            descP: -1,
            //-----------------------------------
            loColumns:[],
            lobeListado:[],
            lobeListadoFiltrado:[],
            lobeListadoReporte:[],
            //-----------------------------------
            asc: -1,
            desc: -1,
            BStock:false,
            lobeListadoStock:[],
            lobeListadoStockFiltrado:[],
            currentPageS: 1,
            pageSizeS: 10,
            totalrowsS: 0,
            //-----------------------------------
            isVisibleColumn:true,
            isLaboratorio:true,
            isTipoPresentacion:true,
            isFechaVenProd:true,
            //-----------------------------------
            NombreProductoTable:"",
            filtrosProducto:[
                {columna:'Id', Valor:'',},
                {columna:'Nombre', Valor:''}
            ],
            //-----------------------------------
            NombreProductoTable2:"",
            filtrosProducto2:[
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
        IdAlmacen: function(n){
            if(n!=0){
                this.CargarTienda(n);
            } else {
                this.lobeTienda = [];
                this.IdTienda = 0;
            }
        },
        IdTienda: function(n){
            if(n!=0){
                this.CargarProductos(n);
            } else {
                this.lobeListado = [];
                this.lobeListadoFiltrado = [];
                this.loColumns = [];
            }
        },
        //-----------------------------------
        nomProdBuscar: function(n){
            this.filtrosProducto[1].Valor = n;
            this.PaginarProducto();
        },
        //------ FILTROS PRODUCTO
        NombreProductoTable: function(n){
            this.filtrosProducto[1].Valor = n;
            this.Paginar();
        },
        //------ FILTROS PRODUCTO
        NombreProductoTable2: function(n){
            this.filtrosProducto2[1].Valor = n;
            this.PaginarStock();
        },
        //-----------------------------------
        BStock: function(n){
            if(n){
                for(var i=0;i<this.lobeListado.length;i++){
                    this.lobeListado[i].StockN=this.lobeListado[i].Stock;
                }
                this.PaginarStock();
            }
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
          ControlStockService.CargarProductosTienda(this.usuario.usuarioLogin,this.usuario.idCliente, this.IdAlmacen, idTienda)
            .then(res => {
                if (res.status==200){
                    this.lobeListado = res.result.listado;
                    this.lobeListadoReporte = res.result.listadoReporte;
                    this.loColumns = res.result.columnas;
                    this.Paginar();
                    console.log(res.result);
                    //this.MostrarColumnas();
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
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.NombreProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.NombreProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        ExisteCambio(){
            if(this.lobeListado.filter(x=>x.Stock!=x.StockN || x.Precio!=x.PrecioN || x.PrecioBlister!=x.PrecioBlisterN).length>0){
                return true;
            } else {
                return false;
            }
        },
        CreaObjetoEnvioBD : function(){           
            let item = {}
            item.idCliente = this.usuario.idCliente;
            item.usuario = this.usuario.usuarioLogin;
            item.listado = this.lobeListado.filter(x=>x.Stock!=x.StockN || x.Precio!=x.PrecioN || x.PrecioBlister!=x.PrecioBlisterN);
            return item;
        },
        Actualizar(){
            const loading = this.$loading({
                lock: true,
                text: 'Actualizando Stock ...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            ControlStockService.Actualizar(this.CreaObjetoEnvioBD())
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.CargarProductos(this.IdTienda);
                        this.$message({
                            showClose: true,
                            message: 'Se Guardó Correctamente.',
                            type: 'success'
                        });
                    } else if (res.status==210){
                        this.CargarProductos(this.IdTienda);
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'warning'
                        });
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
        PaginarStock(){
            var filaInicio = (this.currentPageS - 1) * this.pageSizeS;
            var filaFin = (this.currentPageS * this.pageSizeS) ;

            this.lobeListadoStock = this.lobeListado.filter(x=>x.idProductoBase==0);
            /*
            this.totalrowsS=this.lobeListadoStock.length;
            this.lobeListadoStockFiltrado = this.lobeListadoStock.filter(x=>x.idProductoBase==0).slice(filaInicio,filaFin);
            */
            this.totalrowsS=this.lobeListadoStock.filter(function(item){ 
                return ((
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto2.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.NombreProducto.toString().toUpperCase().indexOf(this.filtrosProducto2.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) &&
                        (item.idProductoBase==0)
                        ));
                }, this).length;

            this.lobeListadoStockFiltrado = this.lobeListadoStock.filter(function(item){ 
                return ((
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto2.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.NombreProducto.toString().toUpperCase().indexOf(this.filtrosProducto2.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) &&
                        (item.idProductoBase==0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        Exportar(){
            let fecha = new Date(Date.now());
            let nameArch = fecha.getFullYear().toString().padStart(4,'0') + 
                            '' + (fecha.getMonth()+1).toString().padStart(2,'0') +
                            '' + fecha.getDate().toString().padStart(2,'0') +
                            '_' + fecha.getHours().toString().padStart(2,'0') +
                            '' + fecha.getMinutes().toString().padStart(2,'0') +
                            '' + fecha.getSeconds().toString().padStart(2,'0');
            if(this.lobeListado.length>0){
                ExcelService.generarExcel(this.getDataExcel(),this.getHeadersExcel(),this.getHeadersWidthExcel(),
                                            this.tittleReporte,nameArch+'.xlsx');
            } else {
                this.$message({
                    showClose: true,
                    message: 'No existen registros a exportar.',
                    type: 'warning'
                });
            }            
        },
        getHeadersExcel(){
            var headersExcel = [];
            for (var i = 0; i < this.loColumns.length; i++) {
                headersExcel.push(this.loColumns[i].header)
            }
            return headersExcel;
        },
        getHeadersWidthExcel(){
            var headersWidthExcel = [];
            for (var i = 0; i < this.loColumns.length; i++) {
                headersWidthExcel.push(this.loColumns[i].width)
            }
            return headersWidthExcel;
        },
        getDataExcel(){
            var indata2=[]
            for(var i = 0; i< this.lobeListadoReporte.length; i++){
                var obj = this.lobeListadoReporte[i];
                var indata=[]
                var result = Object.keys(obj).map(function(key) {
                    indata.push(obj[key]);
                });
                indata2.push(indata);
            }
            return indata2;
        },
    }
};
</script>

<style lang="scss">

</style>
