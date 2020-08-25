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
        <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isCostoProduccion">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">N° Boleta / Factura de Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="4" :lg="5" :xl="5">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="boletaCompra"
                        @keyup.native="KeyUpBoletaCompra"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="Boleta / Factura de Compra" 
                        v-model="boletaCompra"
                        show-word-limit
                        maxlength="15">
                    </el-input>
                </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="hidden-xs-only hidden-sm-only">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">Razón Social de Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="4" :lg="5" :xl="5" class="hidden-xs-only hidden-sm-only">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="razonCompra"
                        @keyup.native="KeyUpRazonCompra"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="Razón Social de Compra" 
                        v-model="razonCompra"
                        show-word-limit
                        maxlength="150">
                    </el-input>
                </div>
            </el-col>
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1" class="hidden-xs-only hidden-sm-only">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">RUC de Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="4" :lg="3" :xl="3" class="hidden-xs-only hidden-sm-only">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="rucCompra"
                        @keyup.native="KeyUpRucCompra"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="RUC de Compra" 
                        v-model="rucCompra"
                        show-word-limit
                        maxlength="11">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" v-show="isCostoProduccion" 
            class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">Razón Social de Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="4" :lg="5" :xl="5">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="razonCompra"
                        @keyup.native="KeyUpRazonCompra"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="Razón Social de Compra" 
                        v-model="razonCompra"
                        show-word-limit
                        maxlength="150">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" v-show="isCostoProduccion"
            class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">RUC de Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="4" :lg="3" :xl="3">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="rucCompra"
                        @keyup.native="KeyUpRucCompra"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="RUC de Compra" 
                        v-model="rucCompra"
                        show-word-limit
                        maxlength="11">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isCostoProduccion">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">Dirección de Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="20" :lg="19" :xl="21">
                <div>
                    <el-input type="text"
                        size="small"
                        ref="direccionCompra"
                        @keyup.native="KeyUpDireccionCompra"
                        :autosize="{ minRows: 2, maxRows: 3}" 
                        placeholder="Dirección de Compra" 
                        v-model="direccionCompra"
                        show-word-limit
                        maxlength="250">
                    </el-input>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10">
            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjustWord textAlignL">Total Compra:</span>
                </div>
            </el-col>
            <el-col :xs="16" :sm="18" :md="4" :lg="5" :xl="5">
                <div>
                    <input type="text" mozactionhint="next" v-model="totalCompra" readonly
                        class="colorF el-input__inner el-input el-input--small backgroundColorB fontsize20Bold">
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="5" type="flex" class="paddingTop10" v-show="lobeListadoProducto.length>0">
            <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                <div class="cus-label-form-left">
                    <span class="cus-label textAdjust textAlignL">Productos:</span>
                </div>
            </el-col>
        </el-row>
        <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only" v-show="lobeListadoProducto.length>0">
            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                <div class="cus-border q-px-md q-pb-md">
                    <el-table ref="listado" :data="lobeListadoProductoFiltrado" 
                            style="width: 100%"
                            highlight-current-row>
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
                        <el-table-column prop="Nombre" min-width="300" fixed="left">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Nombre</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(1)"></i>
                                    <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(1)"></i>
                                </span>
                                <el-input size="mini" class="padding0" 
                                        v-model="nombreTableProducto"></el-input>
                            </template>
                            <template slot-scope="scope">
                                <span class="fontsize12 width95P">{{scope.row.Nombre}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="DesProdLaboratorio" width="70" fixed="left" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Lab.</span>
                            </template>
                            <template slot-scope="scope">
                                <el-tag class="fontsize12 width60P" effect="plain" size="mini">{{scope.row.DesProdLaboratorio}}</el-tag>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Stock" width="100" fixed="left" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Stock</span>
                                <span class="caret-wrapper">
                                    <i class="sort-caret ascending" v-bind:class="[ascP == 1?'colorOrderBottom':'']" @click="AscendenteProducto(2)"></i>
                                    <i class="sort-caret descending" v-bind:class="[descP == 1?'colorOrderTop':'']" @click="DescendenteProducto(2)"></i>
                                </span>
                            </template>
                            <template slot-scope="scope">
                                <span class="fontsize12 width95P">{{scope.row.Stock}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Tipo" width="100" align="center" v-if="isTipoProducto">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Tipo</span>
                            </template>
                            <template slot-scope="scope">
                                <span class="fontsize12 width95P">{{scope.row.loTipoProducto.filter(obe=>obe.codigo==scope.row.idTipo)[0].descripcion}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Cantidad" width="155" align="center">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Cantidad</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.Cantidad" size="mini"
                                        :precision="0" class="width130P"
                                        :step="1" :min="0"></el-input-number><!--:disabled="!scope.row.Selec" -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="CantidadCaja" width="155" align="center" v-if="isTipoProducto">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Unidades/Caja</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.CantidadCaja" size="mini"
                                        controls-position="right" :precision="0"
                                        class="width130P" v-show="scope.row.idTipo!=-1 && scope.row.isTipoBase"
                                        :step="1" :min="0"></el-input-number><!--:disabled="!scope.row.Selec" -->
                            </template>
                        </el-table-column>
                        <el-table-column prop="PrecioCosto" width="155" align="center" v-if="isCostoProduccion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust textcenter">Precio Compra Total</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input-number v-model="scope.row.PrecioCosto" size="mini"
                                        controls-position="right" :precision="2"
                                        @change="CalculoTotal()"
                                        class="width130P" :step="0.01" :min="0.00">
                                </el-input-number><!--:disabled="!scope.row.Selec" -->
                            </template>
                        </el-table-column>
                        <!--<el-table-column prop="DireccionCosto" width="155" align="center" v-if="isCostoProduccion">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Dirección Compra</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input type="text"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Dirección Compra" 
                                    v-model="scope.row.DireccionCosto">
                                </el-input>
                            </template>
                        </el-table-column>-->
                        <el-table-column prop="FecVencimiento" width="150" align="center" v-if="isFechaVenProd">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Fec. Venc.</span>
                            </template>
                            <template slot-scope="scope">
                                <el-date-picker size="mini" class="width130P"
                                    v-model="scope.row.FecVencimiento"
                                    type="month"
                                    format="MM-yyyy"
                                    placeholder="Fec. Venc.">
                                </el-date-picker>
                            </template>
                        </el-table-column>
                        <el-table-column prop="Lote" width="130" align="center" v-if="isLote">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">Lote</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input type="text" class="fontsize12"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Lote" 
                                    v-model="scope.row.Lote">
                                </el-input>
                            </template>
                        </el-table-column>
                        <el-table-column prop="RegistroSanitario" width="110" align="center" v-if="isLote">
                            <template slot="header" slot-scope="scope">
                                <span class="textAdjust">R.S.</span>
                            </template>
                            <template slot-scope="scope">
                                <el-input type="text" class="fontsize12"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="R.S." readonly
                                    v-model="scope.row.RegistroSanitario">
                                </el-input>
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
        <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only" v-show="lobeListadoProductoFiltrado.length>0">
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
                                    <!--<el-tag type="success">{{oListado.FecVencimiento}}</el-tag>-->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="isTipoProducto && oListado.idTipo!=-1"><!--v-show="oListado.idTipo!=-1"-->
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
                                    <el-input-number v-model="oListado.Cantidad" size="mini"
                                        :precision="0" class="width130P"
                                        :disabled="!oListado.Selec" :step="1" :min="0"></el-input-number>
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="isTipoProducto && oListado.idTipo!=-1 && oListado.isTipoBase">
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Unidades/Caja :</span>
                                    <el-input-number v-model="oListado.CantidadCaja" size="mini"
                                        controls-position="right" :precision="0"
                                        class="width130P" 
                                        :disabled="(!oListado.Selec)" :step="1" :min="0"></el-input-number><!--|| oListado.idTipo==0-->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="isCostoProduccion"><!--v-show="oListado.idTipo!=-1"-->
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Precio Compra Total :</span>
                                    <el-input-number v-model="oListado.PrecioCosto" size="mini"
                                        controls-position="right" :precision="2"
                                        class="width130P" :disabled="(!oListado.Selec)" 
                                        :step="0.01" :min="0.00"></el-input-number><!--|| oListado.idTipo==0-->
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5" v-show="isFechaVenProd"><!--v-show="oListado.idTipo!=-1"-->
                            <el-col :xs="24" :sm="24">
                                <div class="cus-label-form-left">
                                    <span class="cus-label textAdjust textAlignL width105P">Fec. Venc. :</span>
                                    <el-date-picker size="mini" class="width130P"
                                        :disabled="(!oListado.Selec)"
                                        v-model="oListado.FecVencimiento"
                                        type="date"
                                        placeholder="Fec. Venc.">
                                    </el-date-picker>
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
            boletaCompra:'',
            razonCompra:'',
            rucCompra:'',
            direccionCompra:'',
            //-----------------------------------
            title:'Asignación de Productos a Almacén',
            nomProdBuscar:"",
            //-----------------------------------
            isTipoProducto:true,
            isFechaVenProd:true,
            isCostoProduccion:true,
            isUbicacion:true,
            isLote:true,
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
            totalCompra:0,
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
        CargarProductos(idAlmacen){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Productos de Almacén...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            AsignarAlmacenService.CargarProductosAlmacen(this.usuario.usuarioLogin,this.usuario.idCliente,idAlmacen)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeListadoProducto = res.result;
                    this.MostrarColumnas();
                    this.PaginarProducto();
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
            this.isUbicacion = this.permisos.isUbicacion;
            this.isLote = this.permisos.isLote;
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
            this.precio='NO';
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado = [];

            this.boletaCompra="";
            this.razonCompra="";
            this.rucCompra="";
            this.direccionCompra="";

            this.$emit('interface', !this.isModal, []);
        },
        LimpiarCampos(){
            this.IdAlmacen=0;
            this.precio='NO';
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado = [];

            this.boletaCompra="";
            this.razonCompra="";
            this.rucCompra="";
            this.direccionCompra="";
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
            /*if(this.IdCliente==-1){
                return "Debe seleccionar Cliente.";
            }*/
            if(this.IdAlmacen==0){
                return "Debe seleccionar Almacen.";
            }
            if(this.boletaCompra=="" && this.isCostoProduccion){
                return "Debe ingresar N° Boleta / Factura de Compra.";
            }
            if(this.razonCompra=="" && this.isCostoProduccion){
                return "Debe ingresar Razón Social de Compra.";
            }
            if(this.rucCompra=="" && this.isCostoProduccion){
                return "Debe ingresar RUC de Compra.";
            }
            if(this.direccionCompra=="" && this.isCostoProduccion){
                return "Debe ingresar Dirección de Compra.";
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
                        /*} else if(lobe[i].DireccionCosto==0 && this.isCostoProduccion){
                            return "Debe ingresar Dirección Compra del Producto: " + lobe[i].Nombre;*/
                        } else if(lobe[i].Lote==0 && this.isLote){
                            return "Debe ingresar Lote del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].FecVencimiento=="" && this.isFechaVenProd){
                            return "Debe ingresar Fecha de Vencimiento del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].RegistroSanitario==0 && this.isLote){
                            return "Debe ingresar Registro Sanitario del Producto: " + lobe[i].Nombre;
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
                        /*} else if(lobe[i].DireccionCosto==0 && this.isCostoProduccion){
                            return "Debe ingresar Dirección Compra del Producto: " + lobe[i].Nombre;*/
                        } else if(lobe[i].Lote==0 && this.isLote){
                            return "Debe ingresar Lote del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].FecVencimiento=="" && this.isFechaVenProd){
                            return "Debe ingresar Fecha de Vencimiento del Producto: " + lobe[i].Nombre;
                        } else if(lobe[i].RegistroSanitario==0 && this.isLote){
                            return "Debe ingresar Registro Sanitario del Producto: " + lobe[i].Nombre;
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
                item.BoletaCompra = this.isCostoProduccion?this.boletaCompra:"";
                item.RazonCompra = this.isCostoProduccion?this.razonCompra:"";
                item.RucCompra = this.isCostoProduccion?this.rucCompra:"";
                item.DireccionCompra = this.isCostoProduccion?this.direccionCompra:"";
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
        KeyUpBoletaCompra(){
            this.boletaCompra = this.boletaCompra.toUpperCase();
        },
        KeyUpRazonCompra(){
            this.razonCompra = this.razonCompra.toUpperCase();
        },
        KeyUpRucCompra(){
            this.rucCompra = this.rucCompra.toUpperCase();
        },
        KeyUpDireccionCompra(){
            this.direccionCompra = this.direccionCompra.toUpperCase();
        },
        ///======================
        CalculoTotal(){
            this.totalCompra = 0;
            for(var i = 0;i<this.lobeListadoProducto.length; i++){
                if(this.lobeListadoProducto[i].PrecioCosto>0){
                    this.totalCompra += this.lobeListadoProducto[i].PrecioCosto;
                }
            }
        },
    }
};
</script>

<style lang="scss">
</style>
