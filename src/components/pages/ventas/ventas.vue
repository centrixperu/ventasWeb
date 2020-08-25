<template>
  <q-page class="style"><!--:style="{'background-image':'url(https://vuejs.org/images/logo.png)'}" class="backgroundColorX"-->
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop0">
                    <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                        <div class="cus-container-border margin0 width100">
                            <el-main class="padding5 backgroundColorX">
                                <el-row :gutter="5" type="flex" class="paddingTop0 backgroundColorX" v-show="lobeTienda.length>0">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">Tienda:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-select v-model="IdTienda" filterable placeholder="Select"
                                                size="small" ref="IdTienda" class="width100">
                                                <el-option v-for="oTienda in lobeTienda" 
                                                    :disabled="isVentaActual"
                                                    :key="oTienda.codigo" 
                                                    :label="oTienda.descripcion"
                                                    :value="oTienda.codigo">
                                                </el-option>                            
                                            </el-select>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(lobeTienda.length>0 && IdTienda!=0)">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">Tipo Comprobante:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-select v-model="IdTipoDocumento" filterable placeholder="Select"
                                                size="small" ref="IdTipoDocumento" class="width100">
                                                <el-option v-for="oTipoDoc in lobeTipoDocumento" 
                                                    :disabled="isVentaActual"
                                                    :key="oTipoDoc.codigo" 
                                                    :label="oTipoDoc.descripcion"
                                                    :value="oTipoDoc.codigo">
                                                </el-option>                            
                                            </el-select>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="IdTipoDocumento!=0">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">Tipo Documento:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-radio-group size="small" v-model="tipodoc" :disabled="(codTipoDoc!='0')"
                                                ref="tipodoc"> 
                                                <el-radio-button v-for="oTipoDoc in loTipoDocIdentidad" 
                                                    :key="oTipoDoc.codigo" 
                                                    :label="oTipoDoc.descripcion"
                                                    :value="oTipoDoc.codigo"
                                                    :name="oTipoDoc.codigo"></el-radio-button>
                                                <!--<el-radio-button label="RUC"></el-radio-button>
                                                <el-radio-button label="DNI"></el-radio-button>-->
                                            </el-radio-group>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isDNI">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">DNI Cliente:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-input type="text"
                                                size="small"
                                                ref="dniCliente"
                                                :disabled="isVentaActual"
                                                :autosize="{ minRows: 2, maxRows: 3}" 
                                                placeholder="DNI Cliente" 
                                                @keypress.native="keyUpDNICliente"
                                                v-model="dniCliente"
                                                show-word-limit
                                                maxlength="8">
                                                <el-button slot="append" icon="el-icon-search" :loading="isConsultaDocumento"
                                                        @click="BuscarDNI()"></el-button>
                                            </el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isRUC">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">RUC Cliente:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-input type="text"
                                                size="small"
                                                ref="rucCliente"
                                                :disabled="isVentaActual"
                                                @keypress.native="keyUpRUCCliente"
                                                :autosize="{ minRows: 2, maxRows: 3}" 
                                                placeholder="RUC Cliente" 
                                                v-model="rucCliente"
                                                show-word-limit
                                                maxlength="11">
                                                <el-button slot="append" icon="el-icon-search" :loading="isConsultaDocumento"
                                                        @click="BuscarRUC()"></el-button>
                                            </el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isNombre">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">{{TipoCliente}}</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-input type="text"
                                                size="small"
                                                ref="nombreCliente"
                                                :disabled="isVentaActual"
                                                @keyup.native="KeyUpNombre"
                                                :autosize="{ minRows: 2, maxRows: 3}" 
                                                placeholder="Nombre" 
                                                v-model="nombreCliente"
                                                show-word-limit
                                                maxlength="150">
                                            </el-input>
                                        </div>
                                    </el-col>   
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isDireccion">
                                    <el-col :xs="7" :sm="6" :md="4" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize17Bold">Dirección Cliente:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="18" :md="20" :lg="20" :xl="22">
                                        <div>
                                            <el-input type="text"
                                                size="small"
                                                ref="direccionCliente"
                                                @keyup.native="keyUpDireccionCliente"
                                                :disabled="isVentaActual"
                                                :autosize="{ minRows: 2, maxRows: 3}" 
                                                placeholder="Dirección Cliente" 
                                                v-model="direccionCliente"
                                                show-word-limit
                                                maxlength="150">
                                            </el-input>
                                        </div>
                                    </el-col>   
                                </el-row>

                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="lobeListado.length>0 && !isVentaActual">
                                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                        <el-button @click="Vender()" class="width100" size="small" 
                                                    type="primary" icon="fas fa-save" plain> VENDER
                                        </el-button>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="2">
                                        <el-button @click="LimpiarPreVenta()" class="width100" size="small" 
                                                    type="warning" icon="fas fa-broom" plain> LIMPIAR PRE VENTA
                                        </el-button>
                                    </el-col>
                                    <el-col :xs="12" :sm="8" :md="6" :lg="5" :xl="2">
                                        <el-button @click="VerPreVenta()" class="width100 hidden-md-only hidden-lg-only hidden-xl-only" 
                                                    size="small" type="info" icon="el-icon-view" plain> VER PRE VENTA
                                        </el-button>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isVentaActual">
                                    <el-col :xs="24" :sm="8" :md="6" :lg="5" :xl="1">
                                        <el-button @click="Imprimir()" class="width100" size="small" 
                                                    type="primary" icon="el-icon-printer">IMPRIMIR COMPROBANTE</el-button>
                                    </el-col>
                                    <el-col :xs="24" :sm="8" :md="6" :lg="4" :xl="1">
                                        <el-button @click="ClosePrint()" class="width100" size="small" 
                                                    type="primary" icon="el-icon-printer">NUEVA VENTA</el-button>
                                    </el-col>
                                </el-row>

                                <el-divider class="padding0"></el-divider>

                                <el-row :gutter="5" type="flex" class="paddingTop0" v-show="(IdTienda!=0)">
                                    <el-col :xs="7" :sm="6" :md="5" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize20Bold">Productos:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="17" :sm="16" :md="19" :lg="20" :xl="22">
                                        <div>
                                            <el-input type="text"
                                                size="small"
                                                ref="BProducto"
                                                @keypress.native="keyProdBuscar" 
                                                :autosize="{ minRows: 2, maxRows: 3}" 
                                                :disabled="!isMostrarProducto || isVentaActual"
                                                placeholder="Nombre Producto" 
                                                v-model="BProducto"
                                                show-word-limit
                                                maxlength="50">
                                            </el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(IdTienda!=0)">
                                    <el-col :xs="7" :sm="6" :md="5" :lg="4" :xl="2">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontsize20Bold">Presentación:</span>
                                        </div>
                                    </el-col>
                                    <el-col :xs="10" :sm="12" :md="15" :lg="16" :xl="19">
                                        <div>
                                            <el-input type="text"
                                                size="small"
                                                ref="BPresentacion"
                                                :autosize="{ minRows: 2, maxRows: 3}" 
                                                :disabled="!isMostrarProducto || isVentaActual"
                                                placeholder="Presentación Producto" 
                                                v-model="BPresentacion"
                                                show-word-limit
                                                maxlength="50">
                                            </el-input>
                                        </div>
                                    </el-col>
                                    <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="3">
                                        <div class="cus-label-form-left">
                                            <el-checkbox v-model="BGenerico" size="medium"
                                                :disabled="!isMostrarProducto || isVentaActual"
                                                label="Genérico" border></el-checkbox>
                                        </div>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="5" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <el-tabs type="border-card" v-model="tabProducto">
                                            <el-tab-pane v-for="oTipoProducto in lobeListadoTipoProducto" 
                                                :key="oTipoProducto.Id" :label="oTipoProducto.Nombre">
                                                <el-table ref="listado" :data="lobeListadoProductoFiltrado" class="width100" style="width: 100%" highlight-current-row>
                                                    <el-table-column prop="Nombre" label-class-name="fontsize17Bold" min-width="200" fixed="left" v-if="isVisibleColumn">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">Nombre</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <div class="cus-label-form-left width95">
                                                                <span class="cus-label fontsize17 textAdjustWord textAlignL" v-show="scope.row.RecetaMedica=='SI'">
                                                                    <!--<pre class="fontFamily">-->
                                                                        <el-tag align="right" class="fontbold" type="danger" size="small">C/ Receta</el-tag>
                                                                        <!--<el-tag align="right" class="fontbold" type="warning" size="small" v-show="scope.row.CodProdLaboratorio!=''">{{scope.row.CodProdLaboratorio}}</el-tag>
                                                                        <el-tag align="right" class="fontbold" type="info" size="small" v-show="scope.row.CodProdTipoPresentacion!=''">{{scope.row.CodProdTipoPresentacion}}</el-tag>-->
                                                                        <br>{{scope.row.Nombre}}
                                                                    <!--</pre>-->
                                                                </span>
                                                                <span class="cus-label fontsize17 textAdjustWord textAlignL" v-show="scope.row.RecetaMedica=='NO'">
                                                                    <!--<el-tag align="right" class="fontbold" type="warning" size="small" v-show="scope.row.CodProdLaboratorio!=''">{{scope.row.CodProdLaboratorio}}</el-tag>
                                                                    <el-tag align="right" class="fontbold" type="info" size="small" v-show="scope.row.CodProdTipoPresentacion!=''">{{scope.row.CodProdTipoPresentacion}}</el-tag>
                                                                    <br>-->{{scope.row.Nombre}}
                                                                </span>
                                                                
                                                                <el-tag align="right" class="fontbold" v-show="scope.row.Color!=''" type="success">{{scope.row.Color}}</el-tag>
                                                                <el-tag align="right" class="fontbold" v-show="scope.row.Talla!=''" type="danger">{{scope.row.Talla}}</el-tag>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="DesNombreGenerico" label-class-name="fontsize17Bold" min-width="150" v-if="isNombreGenerico">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">Genérico</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <div class="cus-label-form-left width95">
                                                                <span class="cus-label fontsize12 textAdjustWord textAlignL">{{scope.row.DesNombreGenerico}}</span>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="CodProdLaboratorio" label-class-name="fontsize17Bold" min-width="85" align="center" v-if="isLaboratorio">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">LAB</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <div class="cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.CodProdLaboratorio!=''">
                                                                <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.CodProdLaboratorio}}</span>
                                                            </div>
                                                            <div class="cus-label-form-left cus-border-tag-3 width100 padding5" v-show="scope.row.CodProdLaboratorio==''">
                                                                <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdLaboratorio}}</span>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="CodProdTipoPresentacion" label-class-name="fontsize17Bold" min-width="88" align="center" v-if="isTipoPresentacion">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">PRE</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <div class="cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.CodProdTipoPresentacion!=''">
                                                                <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.CodProdTipoPresentacion}}</span>
                                                            </div>
                                                            <div class="cus-label-form-left cus-border-tag-2 width100 padding5" v-show="scope.row.CodProdTipoPresentacion==''">
                                                                <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdTipoPresentacion}}</span>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="DesProdGrupo" label-class-name="fontsize17Bold" min-width="120" align="center" v-if="isGrupo">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">GRUP</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <div class="cus-label-form-left cus-border-tag-1 width100 padding5" v-show="scope.row.DesProdGrupo!=''">
                                                                <span class="fontsize12 textAdjustWord textAlignC">{{scope.row.DesProdGrupo}}</span>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="FecVencimiento" label-class-name="fontsize17Bold" width="120" align="center" v-if="isFechaVenProd">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">Fec. Venc.</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <el-tag class="fontbold" v-show="!scope.row.isXVencer && scope.row.FecVencimiento!=''" type="success">{{scope.row.FecVencimiento}}</el-tag>
                                                            <el-tag class="fontbold" v-show="scope.row.isXVencer && scope.row.FecVencimiento!=''" type="danger">{{scope.row.FecVencimiento}}</el-tag>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="Cantidad" label-class-name="fontsize17Bold" width="95" fixed="right" align="center" v-if="isVisibleColumn">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">Cantidad</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <el-input v-model="scope.row.Cantidad" size="mini" type="number"
                                                                @keypress.native="keyEnviar" 
                                                                :min="0" :max="scope.row.CantidadTienda"
                                                                @change="CambiarPrecio(scope.row)">
                                                            </el-input>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="Precio" label-class-name="backgroundColorB colorF fontsize20Bold" class-name="backgroundColorB" width="90" fixed="right" v-if="isVisibleColumn" align="center">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">Precio</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <span class="width105P colorF fontsize25Bold">{{scope.row.Precio}}</span>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column prop="CantidadTienda" label-class-name="fontsize17Bold" width="80" fixed="right" v-if="isVisibleColumn" align="center">
                                                        <template slot="header">
                                                            <span class="textAdjustWord">Stock</span>
                                                        </template>
                                                        <template slot-scope="scope">
                                                            <!--<span class="width105P">{{scope.row.CantidadTienda}}</span>-->
                                                            <!--<el-tag v-show="scope.row.StockTotal>40" class="fontbold width100" type="primary">{{scope.row.StockTotal}}</el-tag>-->
                                                            <div class="cus-label-form-left cus-border-tag-Blue width100 padding5" v-show="scope.row.Val1">
                                                                <span class="fontsize17Bold textAdjustWord textAlignC colorB">{{scope.row.CantidadTienda}}</span>
                                                            </div>
                                                            <!--<el-tag v-show="scope.row.StockTotal<=40 && scope.row.StockTotal>20" class="fontbold width100" type="danger">{{scope.row.StockTotal}}</el-tag>-->
                                                            <div class="cus-label-form-left cus-border-tag-Red width100 padding5" v-show="scope.row.Val2">
                                                                <span class="fontsize17Bold textAdjustWord textAlignC colorY">{{scope.row.CantidadTienda}}</span>
                                                            </div>
                                                            <!--<el-tag v-show="scope.row.StockTotal<=20" class="fontsize15Bold width100 backgroundColorB colorY">{{scope.row.StockTotal}}</el-tag>-->
                                                            <div class="cus-label-form-left cus-border-tag-Black width100 padding5" v-show="scope.row.Val3">
                                                                <span class="fontsize17Bold textAdjustWord textAlignC colorY">{{scope.row.CantidadTienda}}</span>
                                                            </div>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column label="+ Stock" label-class-name="fontsize14Bold" width="70" fixed="right" v-if="isColumnAddStock">
                                                        <template slot-scope="scope">
                                                            <el-button-group>
                                                                <el-button v-if="(scope.row.idProductoBase==0 && scope.row.isAddStock)"
                                                                    size="small" type="info" icon="el-icon-plus" 
                                                                    @click="AgregarStock(scope.row.Id, scope.row)"></el-button>
                                                                <!--<el-button v-if="(scope.row.idProductoBase==0 && scope.row.isAddStock)"
                                                                    size="small" type="info" icon="el-icon-minus" 
                                                                    @click="DisminuirStock(scope.row.Id, scope.row)"></el-button>-->
                                                                <el-button v-if="(scope.row.idProductoBase!=0 && scope.row.isAddStock)"
                                                                    size="small" type="info" icon="el-icon-plus" 
                                                                    @click="AgregarStockGrupo(scope.row.Id, scope.row)"></el-button>
                                                                <!--<el-button v-if="(scope.row.idProductoBase!=0 && scope.row.isAddStock)"
                                                                    size="small" type="info" icon="el-icon-minus" 
                                                                    @click="DisminuirStockGrupo(scope.row.Id, scope.row)"></el-button>-->
                                                            </el-button-group>
                                                        </template>
                                                    </el-table-column>
                                                    <el-table-column fixed="right" label="" width="55">
                                                        <template slot-scope="scope">
                                                            <el-button size="small" circle
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
                                            </el-tab-pane>
                                        </el-tabs>
                                    </el-col>
                                </el-row>

                                <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                    <el-main class="padding5">
                                        <el-row :gutter="5" type="flex" class="paddingTop5">
                                            <el-tabs type="border-card" v-model="tabProducto">
                                                <el-tab-pane v-for="oTipoProducto in lobeListadoTipoProducto" 
                                                    :key="oTipoProducto.Id" :label="oTipoProducto.Nombre">
                                            
                                                    <el-row :gutter="5" type="flex" class="paddingTop5"
                                                            v-for="oListado in lobeListadoProductoFiltrado" 
                                                            :key="oListado.Id" :value="oListado.Id">
                                                        <el-main class="padding5 cus-border">
                                                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                                                <el-col :xs="24" :sm="24">
                                                                    <div class="cus-label-form-left">
                                                                        <span class="cus-label textAdjust textAlignL fontbold">{{oListado.Nombre}}</span>
                                                                        
                                                                        <el-tag v-show="oListado.isXVencer" type="danger">{{oListado.FecVencimiento}}</el-tag>
                                                                        <el-tag v-show="!oListado.isXVencer" type="success">{{oListado.FecVencimiento}}</el-tag>
                                                                        <el-tag class="backgroundColorB fontbold" type="warning">Precio: {{oListado.Precio}}</el-tag>
                                                                    </div>
                                                                </el-col>
                                                            </el-row>
                                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                                <el-col :xs="24" :sm="24">
                                                                    <div class="marginLeft10">
                                                                        <el-input placeholder="Genérico" size="mini" v-model="oListado.DesNombreGenerico" readonly>
                                                                            <template slot="prepend">Genérico</template>
                                                                        </el-input>
                                                                    </div>
                                                                </el-col>
                                                            </el-row>
                                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                                <el-col :xs="12" :sm="12">
                                                                    <div class="marginLeft10">
                                                                        <el-input class="colorB" placeholder="Laboratorio" size="mini" v-model="oListado.CodProdLaboratorio" readonly>
                                                                            <template slot="prepend">LAB</template>
                                                                        </el-input>
                                                                    </div>
                                                                    <!--<div class="input-group marginLeft10">
                                                                        <div class="input-group-icon size_mini backgroundColorB colorY">LAB</div>
                                                                        <input class="input-group-area el-input__inner size_mini" type="text" v-model="oListado.CodProdLaboratorio" readonly>
                                                                    </div>-->
                                                                </el-col>
                                                                <el-col :xs="12" :sm="12">
                                                                    <div class="marginLeft10">
                                                                        <el-input class="colorB" placeholder="Presentación" size="mini" v-model="oListado.CodProdTipoPresentacion" readonly>
                                                                            <template slot="prepend">PRES</template>
                                                                        </el-input>
                                                                    </div>
                                                                    <!--<div class="input-group marginLeft10">
                                                                        <div class="input-group-icon size_mini backgroundColorB colorY">PRES</div>
                                                                        <input class="input-group-area el-input__inner size_mini" type="text" v-model="oListado.CodProdTipoPresentacion" readonly>
                                                                    </div>-->
                                                                </el-col>
                                                            </el-row>
                                                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                                                <el-col :xs="12" :sm="12">
                                                                    <div class="marginLeft10">
                                                                        <el-input class="colorB" placeholder="Presentación" size="mini" v-model="oListado.CantidadTienda" readonly>
                                                                            <template slot="prepend">Stock</template>
                                                                        </el-input>
                                                                    </div>
                                                                    <!--<div class="input-group marginLeft10">
                                                                        <div class="input-group-icon size_mini backgroundColorB colorY">Stock</div>
                                                                        <input class="input-group-area el-input__inner size_mini" type="text" v-model="oListado.CantidadTienda" readonly>
                                                                    </div>-->
                                                                </el-col>
                                                                <el-col :xs="12" :sm="12">
                                                                    <div class="input-group marginLeft10">
                                                                        <div class="input-group-icon size_mini backgroundColorB colorY">Cantidad</div>
                                                                        <input class="input-group-area el-input__inner size_mini" type="number" 
                                                                            @change="CambiarPrecio(oListado)" :min="0" @keypress.native="keyEnviar" 
                                                                            :max="oListado.CantidadTienda" v-model="oListado.Cantidad">
                                                                    </div>
                                                                    <!--<div class="marginLeft10">
                                                                        <el-input v-model="oListado.Cantidad" size="mini" type="number"
                                                                            @keypress.native="keyEnviar" 
                                                                            :min="0" :max="oListado.CantidadTienda"
                                                                            @change="CambiarPrecio(oListado)">
                                                                            <template slot="prepend" class="backgroundColorB colorB">Cantidad</template>
                                                                        </el-input>
                                                                    </div>-->
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
                                                </el-tab-pane>
                                            </el-tabs>
                                        </el-row>
                                    </el-main>
                                </el-row>

                            </el-main>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" class="hidden-xs-only hidden-sm-only">
                        <div class="cus-container-border margin0 width100">
                            <el-main class="padding5 backgroundColorX">
                                <el-row :gutter="5" class="paddingTop0">
                                    <el-tag type="success" class="cus-tag-header-panel">PREVENTA</el-tag>
                                </el-row>
                                <el-row :gutter="5" class="paddingTop10" v-show="lobeListado.length==0">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL fontkursiva">No se agregaron Productos .....</span>
                                    </div>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop0" v-show="lobeListado.length>0">
                                    <el-main class="padding5">
                                        <el-row :gutter="5" type="flex" class="paddingTop0">
                                            <el-col :xs="24" :sm="24">
                                                <el-input type="text" ref="nomBuscar"
                                                    size="mini" :autosize="{ minRows: 2, maxRows: 3}" 
                                                    placeholder="Buscar Pre Venta" 
                                                    @keypress.native="keyUpBuscar"
                                                    @change="BuscarListaProducto()"
                                                    v-model="nomBuscar">
                                                    <el-button slot="append" icon="el-icon-search"
                                                            @click="BuscarListaProducto()"></el-button>
                                                </el-input>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="5" type="flex" class="paddingTop5">
                                            <el-col :xs="18" :sm="18">
                                                <div class="cus-label-form-left">
                                                    <span class="cus-label textAdjust textAlignL width95P fontsize11">Dscto : </span>
                                                    <el-input-number v-model="Descuento" size="mini"
                                                            :precision="2" :controls="!isVentaActual"
                                                            controls-position="right"
                                                            @change="CambiarDescuento()"
                                                            class="width100P" :step="0.1" :max="DescuentoMax">
                                                    </el-input-number>
                                                    <!--<span class="cus-label textAdjust textAlignL width95P fontbold fontsize11"> {{SubTotal}}</span>-->
                                                </div>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="5" type="flex" class="paddingTop5">
                                            <el-col :xs="7" :sm="7">
                                                <span v-show="isSubTotal" class="cus-label textAdjust textAlignC width95P fontsize20Bold">SubTotal</span>
                                                <!--<span v-show="isSubTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{SubTotal}}</span>-->
                                            </el-col>
                                            <el-col :xs="7" :sm="7">
                                                <span v-show="isIGV" class="cus-label textAdjust textAlignC width95P fontsize20Bold">IGV</span>
                                                <!--<span v-show="isIGV" class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{IGV}}</span>-->
                                            </el-col>
                                            <el-col :xs="10" :sm="10">
                                                <span v-show="isTotal" class="cus-label textAdjust textAlignC width95P fontsize25Bold backgroundColorB colorY">Total</span>
                                                <!--<span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontsize35Bold backgroundColorB colorY">{{Total}}</span>-->
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="5" type="flex" class="paddingTop5">
                                            <el-col :xs="7" :sm="7">
                                                <!--<span v-show="isSubTotal" class="cus-label textAdjust textAlignL width95P fontsize11">SubTotal :</span>-->
                                                <span v-show="isSubTotal" class="cus-label textAdjust textAlignC width95P fontsize20Bold">{{SubTotal}}</span>
                                            </el-col>
                                            <el-col :xs="7" :sm="7">
                                                <!--<span v-show="isIGV" class="cus-label textAdjust textAlignL width95P fontsize11">IGV :</span>-->
                                                <span v-show="isIGV" class="cus-label textAdjust textAlignC width95P fontsize20Bold">{{IGV}}</span>
                                            </el-col>
                                            <el-col :xs="10" :sm="10">
                                                <!--<span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontsize35Bold backgroundColorB colorY">Total :</span>-->
                                                <span v-show="isTotal" class="cus-label textAdjust textAlignC width105P fontsize25Bold backgroundColorB colorY">S/. {{Total}}</span>
                                            </el-col>
                                        </el-row>
                                        <el-row :gutter="5" type="flex" class="paddingTop5"
                                                v-for="oListado in lobeListadoFiltrado" 
                                                :key="oListado.IdProductoAlmacen" :value="oListado.IdProductoAlmacen">
                                            <el-main class="padding5 cus-border">
                                                <el-row :gutter="5" type="flex" class="paddingTop0">
                                                    <el-col :xs="24" :sm="24">
                                                        <div class="cus-label-form-left">
                                                            <span class="cus-label textAdjust textAlignL fontbold fontsize15 backgroundColorT">{{oListado.Nombre}}</span>
                                                            <el-button circle size="small" type="danger" icon="el-icon-delete"
                                                                @click="EliminarPreventa(oListado.IdProductoAlmacen, oListado)"></el-button>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="5" type="flex" class="paddingTop0">
                                                    <el-col :xs="24" :sm="24">
                                                        <div class="cus-label-form-left">
                                                            <span class="cus-label textAdjust textAlignL widthAuto fontsize17 backgroundColorB colorY">Cantidad:</span>
                                                            <span class="cus-label textAdjust textAlignC width95P fontbold fontsize20 backgroundColorB colorY">{{oListado.Cantidad}}</span>
                                                        <!--</div>
                                                    </el-col>
                                                    <el-col :xs="12" :sm="12">
                                                        <div class="cus-label-form-left">-->
                                                            <span class="cus-label textAdjust textAlignL widthAuto fontsize17 backgroundColorB colorY">Precio:</span>
                                                            <span class="cus-label textAdjust textAlignC width95P fontbold fontsize20 backgroundColorB colorY">{{oListado.Precio}}</span>
                                                        </div>
                                                    </el-col>
                                                </el-row>
                                                <el-row :gutter="5" type="flex" class="paddingTop0">
                                                    <el-col :xs="18" :sm="18">
                                                        <div class="cus-label-form-left">
                                                            <span class="cus-label textAdjust textAlignL width100P fontsize11">Dscto:</span>
                                                            <el-input-number v-model="oListado.Descuento" size="mini"
                                                                    :precision="2" :controls="!isVentaActual"
                                                                    controls-position="right"
                                                                    @change="CambiarSubTotal(oListado.IdProductoAlmacen, oListado)"
                                                                    class="width100P" :step="0.1" :max="oListado.DescuentoMax">
                                                            </el-input-number>
                                                            <!--<el-input v-model="oListado.Descuento" size="mini" type="number"
                                                                :controls="!isVentaActual" :precision="2" class="width110"
                                                                :min="0" :step="0.1" :max="oListado.DescuentoMax"
                                                                @change="CambiarSubTotal(oListado.IdProductoAlmacen, oListado)">
                                                            </el-input>-->
                                                        </div>
                                                    </el-col>
                                                    <!--<el-col :xs="12" :sm="12">
                                                        <div class="cus-label-form-left">
                                                            <span class="cus-label textAdjust textAlignL width95P fontsize11">SubTotal:</span>
                                                            <span class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{oListado.SubTotal}}</span>
                                                        </div>
                                                    </el-col>-->
                                                </el-row>
                                                <el-row :gutter="5" type="flex" class="paddingTop0">
                                                    <el-col :xs="12" :sm="12">
                                                        <div class="cus-label-form-left">
                                                            <span class="cus-label textAdjust textAlignL width95P fontsize11">SubTotal:</span>
                                                            <span class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{oListado.SubTotal}}</span>
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
                        </div>
                    </el-col>

                </el-row>
            </el-main>
        </el-container>
        
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
        
        <el-dialog :title="titleVenta" :visible.sync="isModalVenta" width="30%" center>
            <el-row :gutter="5" type="flex" class="paddingTop0">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-tabs type="border-card" v-model="tabVenta" :stretch="true">
                        <el-tab-pane label="Venta">
                            <el-row :gutter="5" class="paddingTop10">
                                <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="12">
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize15">Total :</span>
                                </el-col>
                                <el-col :xs="12" :sm="12" :md="12" :lg="16" :xl="12">
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize20">{{Total}}</span>
                                </el-col>
                            </el-row>   
                            <el-row :gutter="5" class="paddingTop10">
                                <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="12">
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize15">Efectivo :</span>
                                </el-col>
                                <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="12">
                                    <el-input-number v-model="Efectivo" size="small" :controls="false" 
                                        @change="CalcularVuelto()"
                                        :min="0"
                                        controls-position="right" class="width100" >
                                    </el-input-number>
                                    <!--
                                        @keypress.native="keyUpEfectivo" @keyup.native="keyUpEfectivo"
                                        @keydown.native="keyUpEfectivo" 
                                        @change="CalcularVuelto()"
                                    -->
                                </el-col>
                            </el-row>  
                            <el-row :gutter="5" class="paddingTop10">
                                <el-col :xs="12" :sm="12" :md="12" :lg="8" :xl="12">
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize15">Vuelto :</span>
                                </el-col>
                                <el-col :xs="12" :sm="12" :md="12" :lg="16" :xl="12">
                                    <el-tag type="success" v-show="Vuelto>=0" class="textAlignL width95P fontbold fontsize20">{{Vuelto}}</el-tag>
                                    <el-tag type="danger" v-show="Vuelto<0" class="textAlignL width95P fontbold fontsize20">{{Vuelto}}</el-tag>
                                </el-col>
                            </el-row> 
                        </el-tab-pane>
                        <el-tab-pane label="A Cuenta">
                            <el-row :gutter="5" class="paddingTop10">
                                <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="12">
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize15">Cliente :</span>
                                </el-col>
                                <el-col :xs="12" :sm="12" :md="12" :lg="18" :xl="12">
                                    <span v-show="isTotal && nombreCliente!=''" class="cus-label textAdjust textAlignL fontbold fontsize15">{{nombreCliente}}</span>
                                    <el-tag type="danger" v-show="isTotal && nombreCliente==''" class="textAlignL fontbold fontsize15">Debe ingresar Cliente</el-tag>
                                </el-col>
                            </el-row> 
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <el-row :gutter="5" type="flex" class="paddingTop10">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-tabs type="border-card" v-model="tabReceta" v-show="CargaReceta()" :stretch="true">
                        <el-tab-pane label="Recetas" disabled class="colorTab">
                            <el-row :gutter="5" class="paddingTop10">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Cargar Receta:</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" class="paddingTop10">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <input type="file" id="avatar" :v-model="formArch.avatar" 
                                            class="custom-file-input width100" multiple
                                            v-on:change="onUpload($event)" />
                                </el-col>
                            </el-row>  
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="danger" @click="CancelarVenta()">Cancelar</el-button>
                <el-button type="info" 
                    v-show="tabVenta==0" :disabled="(Efectivo<Total)" 
                    @click="VenderEnviar(0)">Guardar</el-button>
                <el-button type="info" 
                    v-show="tabVenta==1" :disabled="(nombreCliente=='')" 
                    @click="VenderEnviar(1)">Guardar</el-button>
            </span>
        </el-dialog>

        <el-dialog title="LIMPIAR PRE VENTA"
            :visible.sync="clearVenta"
            width="30%"
            :before-close="handleClose">
            <span>¿Desea eliminar Pre Venta?</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="clearVenta = false">Cancelar</el-button>
                <el-button type="primary" @click="Cancelar()">Limpiar</el-button>
            </span>
        </el-dialog>

        <el-drawer title="PRE VENTA"
            :with-header="false"
            :visible.sync="drawer">
            <div class="cus-container-border margin0 width100">
                <el-main class="padding5 backgroundColorX">
                    <el-row :gutter="5" class="paddingTop0" v-show="lobeListado.length==0">
                        <div class="cus-label-form-left">
                            <span class="cus-label textAdjust textAlignL fontkursiva">No se agregaron Productos .....</span>
                        </div>
                    </el-row>
                    <el-row :gutter="5" type="flex" class="paddingTop0" v-show="lobeListado.length>0">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                <el-col :xs="24" :sm="24">
                                    <el-input type="text" ref="nomBuscar"
                                        size="mini" :autosize="{ minRows: 2, maxRows: 3}" 
                                        placeholder="Buscar Pre Venta" 
                                        @keypress.native="keyUpBuscar"
                                        @change="BuscarListaProducto()"
                                        v-model="nomBuscar">
                                        <el-button slot="append" icon="el-icon-search"
                                                @click="BuscarListaProducto()"></el-button>
                                    </el-input>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                <el-col :xs="18" :sm="18">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL width95P fontsize11">Dscto : </span>
                                        <el-input-number v-model="Descuento" size="mini"
                                                :precision="2" :controls="!isVentaActual"
                                                controls-position="right"
                                                @change="CambiarDescuento()"
                                                class="width100P" :step="0.1" :max="DescuentoMax">
                                        </el-input-number>
                                        <!--<span class="cus-label textAdjust textAlignL width95P fontbold fontsize11"> {{SubTotal}}</span>-->
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                <el-col :xs="7" :sm="7">
                                    <span v-show="isSubTotal" class="cus-label textAdjust textAlignC width95P fontsize20Bold">SubTotal</span>
                                    <!--<span v-show="isSubTotal" class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{SubTotal}}</span>-->
                                </el-col>
                                <el-col :xs="7" :sm="7">
                                    <span v-show="isIGV" class="cus-label textAdjust textAlignC width95P fontsize20Bold">IGV</span>
                                    <!--<span v-show="isIGV" class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{IGV}}</span>-->
                                </el-col>
                                <el-col :xs="10" :sm="10">
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignC width95P fontsize25Bold backgroundColorB colorY">Total</span>
                                    <!--<span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontsize35Bold backgroundColorB colorY">{{Total}}</span>-->
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop5">
                                <el-col :xs="7" :sm="7">
                                    <!--<span v-show="isSubTotal" class="cus-label textAdjust textAlignL width95P fontsize11">SubTotal :</span>-->
                                    <span v-show="isSubTotal" class="cus-label textAdjust textAlignC width95P fontsize20Bold">{{SubTotal}}</span>
                                </el-col>
                                <el-col :xs="7" :sm="7">
                                    <!--<span v-show="isIGV" class="cus-label textAdjust textAlignL width95P fontsize11">IGV :</span>-->
                                    <span v-show="isIGV" class="cus-label textAdjust textAlignC width95P fontsize20Bold">{{IGV}}</span>
                                </el-col>
                                <el-col :xs="10" :sm="10">
                                    <!--<span v-show="isTotal" class="cus-label textAdjust textAlignL width95P fontsize35Bold backgroundColorB colorY">Total :</span>-->
                                    <span v-show="isTotal" class="cus-label textAdjust textAlignC width105P fontsize25Bold backgroundColorB colorY">S/. {{Total}}</span>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop5"
                                    v-for="oListado in lobeListadoFiltrado" 
                                    :key="oListado.IdProductoAlmacen" :value="oListado.IdProductoAlmacen">
                                <el-main class="padding5 cus-border">
                                    <el-row :gutter="5" type="flex" class="paddingTop0">
                                        <el-col :xs="24" :sm="24">
                                            <div class="cus-label-form-left">
                                                <span class="cus-label textAdjust textAlignL fontbold fontsize15 backgroundColorT">{{oListado.Nombre}}</span>
                                                <el-button circle size="small" type="danger" icon="el-icon-delete"
                                                    @click="EliminarPreventa(oListado.IdProductoAlmacen, oListado)"></el-button>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="5" type="flex" class="paddingTop0">
                                        <el-col :xs="24" :sm="24">
                                            <div class="cus-label-form-left">
                                                <span class="cus-label textAdjust textAlignL widthAuto fontsize17 backgroundColorB colorY">Cantidad:</span>
                                                <span class="cus-label textAdjust textAlignC width95P fontbold fontsize20 backgroundColorB colorY">{{oListado.Cantidad}}</span>
                                            <!--</div>
                                        </el-col>
                                        <el-col :xs="12" :sm="12">
                                            <div class="cus-label-form-left">-->
                                                <span class="cus-label textAdjust textAlignL widthAuto fontsize17 backgroundColorB colorY">Precio:</span>
                                                <span class="cus-label textAdjust textAlignC width95P fontbold fontsize20 backgroundColorB colorY">{{oListado.Precio}}</span>
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row :gutter="5" type="flex" class="paddingTop0">
                                        <el-col :xs="18" :sm="18">
                                            <div class="cus-label-form-left">
                                                <span class="cus-label textAdjust textAlignL width100P fontsize11">Dscto:</span>
                                                <el-input-number v-model="oListado.Descuento" size="mini"
                                                        :precision="2" :controls="!isVentaActual"
                                                        controls-position="right"
                                                        @change="CambiarSubTotal(oListado.IdProductoAlmacen, oListado)"
                                                        class="width100P" :step="0.1" :max="oListado.DescuentoMax">
                                                </el-input-number>
                                                <!--<el-input v-model="oListado.Descuento" size="mini" type="number"
                                                    :controls="!isVentaActual" :precision="2" class="width110"
                                                    :min="0" :step="0.1" :max="oListado.DescuentoMax"
                                                    @change="CambiarSubTotal(oListado.IdProductoAlmacen, oListado)">
                                                </el-input>-->
                                            </div>
                                        </el-col>
                                        <!--<el-col :xs="12" :sm="12">
                                            <div class="cus-label-form-left">
                                                <span class="cus-label textAdjust textAlignL width95P fontsize11">SubTotal:</span>
                                                <span class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{oListado.SubTotal}}</span>
                                            </div>
                                        </el-col>-->
                                    </el-row>
                                    <el-row :gutter="5" type="flex" class="paddingTop0">
                                        <el-col :xs="12" :sm="12">
                                            <div class="cus-label-form-left">
                                                <span class="cus-label textAdjust textAlignL width95P fontsize11">SubTotal:</span>
                                                <span class="cus-label textAdjust textAlignL width95P fontbold fontsize11">{{oListado.SubTotal}}</span>
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
            </div>
        </el-drawer>

        <!--<modal-ver-productos :isModal="isModal" :idProducto="idProductoImagen" @interface="Cargar">
        </modal-ver-productos>-->

        <!--<modal-lista-productos :isModal="isModalProd" :idTienda="idTiendaProd" 
                                :lobeLista="lobeLista" :lobeListaBkp="lobeListaBkp"
                                @interface="CargarPreVenta">
        </modal-lista-productos>-->
    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import VentaService from '@/services/ventas/venta-service'
import MaestroService from '@/services/maestros/consultaDocumento-service'
import { mapState,mapGetters } from "vuex";
//MODALES
//import ModalVerProductos from '@/components/pages/ventas/modals/mdlVerProducto'
//import ModalListaProductos from '@/components/pages/ventas/modals/mdlListaProducto'
//PDF
import print from 'print-js'

export default {
    name: "app",
    components: { 
      HeaderPage//, ModalListaProductos
    },
    data() {
        return {
            tittleModulo:'Ventas',
            ///==============================================================
            lobeTienda:[],
            IdTienda:0,
            ///==============================================================
            isVentaActual:false,
            ///==============================================================
            IdTipoDocumento:0,
            lobeTipoDocumento:[],
            ///==============================================================
            tipodoc:'',
            codTipoDoc:"0",
            loTipoDocIdentidad:[],
            ///==============================================================
            isDNI:false,
            dniCliente:'',
            isConsultaDocumento:false,
            ///==============================================================
            isRUC:false,
            rucCliente:'',
            ///==============================================================
            isNombre:false,
            TipoCliente:'',
            nombreCliente:'',
            ///==============================================================
            isDireccion:false,
            direccionCliente:'',
            ///==============================================================
            BProducto:'',
            BPresentacion:'',
            BGenerico: false,
            ///==============================================================
            isVisibleColumn:true,
            ///==============================================================
            isNombreGenerico:true,
            isLaboratorio:true,
            isTipoPresentacion:true,
            isGrupo:true,
            isFechaVenProd:true,
            isColumnAddStock:true,
            ///==============================================================
            currentPageProducto: 1,
            pageSizeProducto: 5,
            totalrowsProducto: 0,
            ///==============================================================
            IdTipoPrecio:0,
            ///==============================================================
            filtrosProducto:[
                {columna:'Id', Valor:''},
                {columna:'Nombre', Valor:''},
                {columna:'Tipo', Valor: 0 },
                {columna:'Pres', Valor: ''},
                {columna:'Gen', Valor: false}
            ],
            ///==============================================================
            isMostrarProducto:false,
            lobeListadoProducto:[],
            lobeListadoProductoFiltrado:[],
            lobeEmisorAll:[],
            lobeEmisor:[],
            ///==============================================================
            lobeListadoTipoProducto:[],
            ///==============================================================
            tabProducto:0,
            ///==============================================================
            titleDet:'Detalle de Producto',
            isModalVer:false,
            mostrarCloseDet: true,
            loarchivos:[],
            loarchivosDatos:[],
            ///==============================================================
            lobeListado:[],
            lobeListadoFiltrado:[],
            ///==============================================================
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            ///==============================================================
            isCostoProduccion:true,
            ///==============================================================
            nombreTable:"",
            cantidadTable:"",
            precioTable:"",
            subtotalTable:"",
            filtros:[
                {columna:'Nombre', Valor:'',},
                {columna:'Cantidad', Valor:''},
                {columna:'Precio', Valor:''},
                {columna:'SubTotal', Valor:''}
            ],
            asc: -1,
            desc: -1,
            ///==============================================================
            nomBuscar:"",
            ///==============================================================
            SubTotal:0,
            IGV:0,
            Total:0,
            isSubTotal:false,
            isIGV:false,
            isTotal:false,
            Descuento:0,
            DescuentoMax:0,
            ///==============================================================
            src: "",
            ///==============================================================
            isModalVenta:false,
            titleVenta: 'Guardar Venta',
            Efectivo:0,
            Vuelto:0,
            TipoVenta:'',
            tabVenta:'',
            ///==============================================================
            tabReceta:'',
            formArch: {
                avatar: []
            },
            ///==============================================================
            drawer:false,
            clearVenta:false,
            ///==============================================================
            //-----------------------------------
            //-----------------------------------
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
        ...mapState(["usuario","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        /*BProducto: function(n,o){
            if(n.length<o.length){
                this.filtrosProducto[1].Valor = n;
                this.PaginarProducto();
            }            
        },*/
        BPresentacion: function(n){
            this.filtrosProducto[3].Valor = n;
            this.PaginarProducto();
        },
        BGenerico: function(n){
            this.filtrosProducto[4].Valor = n;
            this.PaginarProducto();
        },
        ///==============================================================
        IdTienda: function(n){
            this.isMostrarProducto = false;
            if(n!=0){
                this.lobeListadoProducto = [];
                this.lobeListadoProductoFiltrado=[];
               
                let index = this.lobeEmisorAll.findIndex(obe=>obe.IdTienda==n);
                this.lobeEmisor.push(this.lobeEmisorAll[index]);
                
                this.IdTipoPrecio = this.lobeTienda.filter(obe=>obe.codigo==n)[0].isTipoPrecio;
                this.CargarComprobantes();
                this.CargarProductos();
            } else {
                this.limpiarCamposDependientes(true);
                this.IdTipoDocumento=0;
                this.lobeTipoDocumento=[];
            }
        },
        ///==============================================================
        ///==============================================================
        IdTipoDocumento: function(n,o){
            this.codTipoDoc="0";
            if(n!=o && n!=0){
                this.codTipoDoc = this.lobeTipoDocumento.filter(obe=>obe.codigo==n)[0].isTipoDocDefecto;
                this.tipodoc = this.codTipoDoc=="-1"?"":this.loTipoDocIdentidad.filter(obe=>obe.codigo==this.codTipoDoc)[0].descripcion;
                this.dniCliente = "";
                this.nombreCliente = "";
                this.rucCliente = "";
                this.direccionCliente = "";
                //this.CalcularTotales();
                if(this.IdTipoPrecio==1){
                    this.isSubTotal = false;
                    this.isIGV = false;
                    this.isTotal = false;
                    if(this.tipodoc=='RUC' || this.tipodoc=='DNI'){
                        this.isSubTotal = true;
                        this.isIGV = true;
                        this.isTotal = true;
                    } else if (this.tipodoc=='No Aplica'){
                        this.isTotal = true;
                    }
                } else if (this.IdTipoPrecio==2){
                    this.isSubTotal = true;
                    this.isIGV = true;
                    this.isTotal = true;
                }
            }
            if(n==0){
                let cantidad = this.lobeListado.length;
                for(var i=0;i<cantidad;i+=1){
                    for(var j=0;j<this.lobeListado.length;j+=1){
                        let id = this.lobeListado[j].Id;
                        let row = this.lobeListado[j];
                        this.EliminarPreventa(id,row);
                    }                    
                }
            }
        },
        ///==============================================================
        tipodoc: function(n){
            this.limpiarCamposDependientes(false);
            let index = this.loTipoDocIdentidad.findIndex(obe=>obe.descripcion==n);
            if(n!=""){
                //this.CalcularTotales();
                if(this.IdTipoPrecio==1){
                    this.isSubTotal = false;
                    this.isIGV = false;
                    this.isTotal = false;
                    if(this.tipodoc=='RUC' || this.tipodoc=='DNI'){
                        this.isSubTotal = true;
                        this.isIGV = true;
                        this.isTotal = true;
                    } else if (this.tipodoc=='No Aplica'){
                        this.isTotal = true;
                    }
                } else if (this.IdTipoPrecio==2){
                    this.isSubTotal = true;
                    this.isIGV = true;
                    this.isTotal = true;
                }
            }
            if(index!=-1){
                this.isDNI=this.loTipoDocIdentidad[index].isDNI;
                this.isRUC=this.loTipoDocIdentidad[index].isRUC;
                this.isNombre=this.loTipoDocIdentidad[index].isNombre;
                this.isDireccion=this.loTipoDocIdentidad[index].isDireccion;
                this.TipoCliente = this.isDNI?'Nombre:':'Razón Social';
            }
        },
        ///==============================================================
        tabProducto: function(n){
            if(this.lobeListadoTipoProducto.length>0 && n>=0){
                console.log(n,this.lobeListadoTipoProducto[n].Id);
                this.filtrosProducto[2].Valor = this.lobeListadoTipoProducto[n].Id;
                this.currentPageProducto = 1;
                this.PaginarProducto();
            }
        },
        ///==============================================================
        nombreTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        cantidadTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        precioTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        subtotalTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        ///==============================================================
        nomBuscar: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        ///==============================================================
        dniCliente: function(n){
            if(n.length!=8){
                this.nombreCliente = "";
            }
        },
        rucCliente: function(n){
            if(n.length!=11){
                this.nombreCliente = "";
                this.direccionCliente="";
            }
        },
        ///==============================================================
        tabVenta: function(n){
            this.Efectivo = 0;
            this.Vuelto = 0;
        },
        ///==============================================================
        Efectivo: function(n){
            if (!isNaN(Number(n))){
                this.Vuelto = Math.round((n-this.Total) * 100)/100;
            }
        },
        ///==============================================================
        ///==============================================================
    },
    methods: {
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Permisos de Venta...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            VentaService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.loTipoDocIdentidad = res.result.loTipoDocIdentidad;
                        if(this.loTipoDocIdentidad.length>0){
                            this.loTipoDocIdentidad = this.loTipoDocIdentidad.filter(obe=>obe.codigo!=-1);
                        }
                        this.lobeTienda = res.result.loTienda;
                        this.lobeEmisorAll = res.result.loEmisor;
                        if(this.lobeTienda.filter(obe=>obe.codigo!=0).length==1){
                            this.IdTienda = this.lobeTienda.filter(obe=>obe.codigo!=0)[0].codigo;
                            this.IdTipoPrecio = this.lobeTienda.filter(obe=>obe.codigo!=0)[0].isTipoPrecio;
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
        ///==============================================================
        CargarComprobantes(){
          this.limpiarCamposDependientes(true);
          this.IdTipoDocumento =0;
          this.lobeTipoDocumento=[];
          VentaService.CargarComprobantes(this.usuario.usuarioLogin, this.usuario.idCliente, this.IdTienda)
            .then(res => {
                if (res.status==200){
                    this.lobeTipoDocumento = res.result.loComprobante;
                    if(this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT=='NV').length==1){
                        this.IdTipoDocumento = this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT=='NV')[0].codigo;
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
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        ///==============================================================
        CargarProductos(){
          this.lobeListadoProducto=[];
          this.lobeListadoProductoFiltrado=[];
          this.isMostrarProducto = false;

          var item = {};
          item.UsrCreador = this.usuario.usuarioLogin;
          item.IdCliente = this.usuario.idCliente;
          item.IdTienda = this.IdTienda;

          VentaService.CargarProductos(item)
            .then(res => {
                if (res.status==200){
                    this.lobeListadoProducto = res.result.loProducto;
                    this.lobeListadoTipoProducto = res.result.loTipoProducto;
                    console.log(this.lobeListadoTipoProducto);
                    if(this.lobeListadoProducto.length>0){
                        this.isMostrarProducto = true;
                    }
                    //this.tabProducto = 0;
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
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        ///==============================================================
        PaginarProducto(){
            var filaInicio = (this.currentPageProducto - 1) * this.pageSizeProducto;
            var filaFin = (this.currentPageProducto * this.pageSizeProducto) ;

            this.lobeListadoProductoFiltrado = this.lobeListadoProducto;
            
            this.totalrowsProducto=this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.idTipo == (this.filtrosProducto.filter(f => f.columna=='Tipo')[0].Valor==0?1:this.filtrosProducto.filter(f => f.columna=='Tipo')[0].Valor)) && 
                        (item.DesProdTipoPresentacion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Pres')[0].Valor.toUpperCase()) >= 0)&& 
                        (item.isGenerico == (this.filtrosProducto.filter(f => f.columna=='Gen')[0].Valor?'SI':item.isGenerico)) &&
                        (
                        //(item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesNombreGenerico.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesProdGrupo.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesTipoProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesComposicion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesIndicaciones.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesContraIndicaciones.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) 
                        )
                        ));
                }, this).length;

            this.lobeListadoProductoFiltrado = this.lobeListadoProductoFiltrado.filter(function(item){ 
                return ((
                        (item.idTipo == (this.filtrosProducto.filter(f => f.columna=='Tipo')[0].Valor==0?1:this.filtrosProducto.filter(f => f.columna=='Tipo')[0].Valor)) && 
                        (item.DesProdTipoPresentacion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Pres')[0].Valor.toUpperCase()) >= 0)&& 
                        (item.isGenerico == (this.filtrosProducto.filter(f => f.columna=='Gen')[0].Valor?'SI':item.isGenerico)) &&
                        (
                        //(item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesNombreGenerico.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesProdGrupo.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesTipoProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesComposicion.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesIndicaciones.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.DesContraIndicaciones.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) || 
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtrosProducto.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) 
                        )
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        ///==============================================================
        MostrarColumnasProducto(){
            this.isNombreGenerico = this.permisos.isNombreGenerico;
            this.isLaboratorio = this.permisos.isLaboratorio;
            this.isTipoPresentacion = this.permisos.isTipoPresentacion;
            this.isGrupo = this.permisos.isGrupo;
            this.isFechaVenProd = this.permisos.isFechaVenProd;

            //this.isTipoProducto = this.permisos.isTipoProducto; 
            //this.isCostoProduccion = this.permisos.isCostoProduccion;
            let cantidad = this.lobeListadoProducto.length;
            let add = 0;
            for(var i=0; i<cantidad; i+=1){
                if(this.lobeListadoProducto[i].isAddStock){
                    add += 1;
                }
            }
            this.isColumnAddStock = add>0?true:false;
        },
        ///==============================================================
        limpiarCamposDependientes(isAll){
            this.isDNI=false;
            this.isRUC=false;
            this.isNombre=false;
            this.isDireccion=false;
            this.dniCliente = "";
            this.rucCliente = "";
            this.nombreCliente = "";
            this.direccionCliente="";
            if(isAll){
                this.codTipoDoc="0";
                this.tipodoc="";
            }
        },
        ///==============================================================
        VerProducto(id,row){
            this.CargarDetalleProducto(id)
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
        },
        closeModalDet: function (){
            this.isModalVer = false;
        },
        ///==============================================================
        CambiarPrecio(row){
            if(row.Cantidad>row.CantidadTienda){
                row.Cantidad=row.CantidadTienda;
            }
            row.Precio = Math.round(row.OldPrecio * (row.Cantidad==0?1:row.Cantidad) * 100)/100;
            if(row.Cantidad==0){
                let index = this.lobeListado.findIndex(obe=>obe.Id==row.Id);
                if(index!=-1){
                    this.lobeListado.splice(index, 1);
                    this.Paginar();
                    this.CalcularTotales();
                }
            }
            this.CargarPreVenta(this.lobeListadoProducto.filter(obe=>obe.Cantidad>0));
            //this.CargarPreVenta(row);
        },
        keyEnviar(a){
            if(a.key == "Enter")
            {
                //this.CargarPreVenta(this.lobeListadoProducto.filter(obe=>obe.isCambio==true || obe.Cantidad>0));
            } else {
                a.returnValue = true;
            }
        },
        CargarPreVenta(det){
            /*if(det.length>0){
                this.lobeListado = [];
            }*/
            for(var i=0;i<det.length;i+=1){
                //if(det[i].Cantidad>0){
                this.AgregarPreVenta(det[i].Id,det[i]);
                //} 
                let index = this.lobeListadoProducto.findIndex(obe=> obe.Id==det[i].Id);
                if(index!=-1){
                    this.lobeListadoProducto[index].CantidadTienda = det[i].CantidadTienda;
                    this.lobeListadoProducto[index].Stock = det[i].CantidadTienda;
                }
            }
            this.lobeLista = [];
        },
        AgregarPreVenta(id,row){
            let index = this.lobeListado.findIndex(obe=>obe.Id==id);
            if(index!=-1){
                this.lobeListado[index].Cantidad = row.Cantidad;
                this.lobeListado[index].Stock = row.CantidadTienda;
                this.lobeListado[index].SubTotal = row.Precio - this.lobeListado[index].Descuento;
                this.lobeListado[index].DescuentoMax = Math.round((row.OldPrecio-row.PrecioCosto)*row.Cantidad*100)/100;
            } else {
                let item = {
                    Id: row.Id,
                    Nombre: row.Nombre,
                    Cantidad: row.Cantidad,
                    Precio: row.OldPrecio, 
                    PrecioCosto: row.PrecioCosto, 
                    Stock: row.CantidadTienda,
                    Unidad: row.idUnidad,
                    CodUNSPSC: row.codUNSPSC,
                    Descuento: 0,
                    DescuentoMax: Math.round((row.OldPrecio-row.PrecioCosto)*row.Cantidad*100)/100,
                    SubTotal: Math.round(row.Cantidad*row.OldPrecio*100)/100, 
                    IdProductoAlmacen: row.IdProductoAlmacen,
                    RecetaMedica: row.RecetaMedica
                }
                //this.lobeListado.push(item);
                this.lobeListado.splice(0,0,item);
            }
            this.Paginar();
            this.CalcularTotales();
        },
        EliminarPreventa(id,row){
            var index = this.lobeListado.findIndex(dat=>dat.Id==row.Id);//ProductoAlmacen==id);
            if(index!=-1){
                let cantidad = this.lobeListado[index].Cantidad;
                let id = this.lobeListado[index].Id;
                let indexC = this.lobeListadoProducto.findIndex(obe=>obe.Id==id);
                if(indexC!=-1){
                    this.lobeListadoProducto[indexC].Cantidad = 0;
                    this.lobeListadoProducto[indexC].Precio = this.lobeListadoProducto[indexC].OldPrecio;
                }
                this.lobeListado.splice(index, 1);
            }
            this.Paginar();
            this.CalcularTotales();
        },
        CambiarCantidad(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.IdProductoAlmacen==id);
            if(index!=-1){
                row.SubTotal = Math.round(row.Cantidad*row.Precio*100)/100;
                row.DescuentoMax = Math.round((row.Precio-row.PrecioCosto)*row.Cantidad*100)/100;
                this.CalcularTotales();
            }   
        },
        CambiarSubTotal(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.IdProductoAlmacen==id);
            if(index!=-1){
                this.lobeListadoProducto[index].SubTotal = row.SubTotal - row.Descuento;
                row.SubTotal = Math.round((row.Cantidad*row.Precio - row.Descuento)*100)/100;
                this.CalcularTotales();
            }   
        },
        CalcularTotales(){
            let cantidad = this.lobeListado.length;
            this.SubTotal = 0.00;
            this.IGV = 0.00;
            this.Total = 0.00;
            this.Descuento = 0.00;
            this.DescuentoMax = 0;
            for(var i=0;i<cantidad;i+=1){
                this.SubTotal += this.lobeListado[i].SubTotal;
                this.Descuento += this.lobeListado[i].Descuento;
                this.DescuentoMax += this.lobeListado[i].DescuentoMax;
            }
            if(this.IdTipoPrecio==1){
                this.Total = Math.round(this.SubTotal*100)/100;// - Math.round(this.Descuento*100)/100;
                this.IGV = Math.round(this.SubTotal / 1.18 * 0.18 * 100)/100; //Math.round(this.SubTotal * 0.18 * 100)/100;// - Math.round(this.Descuento * 0.18 * 100)/100;
                this.SubTotal = Math.round(this.SubTotal / 1.18 * 100)/100;//(this.Total - Math.round(this.IGV*100)/100)*100/100;
                this.isSubTotal = false;
                this.isIGV = false;
                this.isTotal = false;
                if(this.tipodoc=='RUC' || this.tipodoc=='DNI'){
                    this.isSubTotal = true;
                    this.isIGV = true;
                    this.isTotal = true;
                } else if (this.tipodoc=='No Aplica'){
                    this.isTotal = true;
                }
            } else if (this.IdTipoPrecio==2){
                this.Total = Math.round(this.SubTotal * 1.18 * 100)/100;// - Math.round(this.Descuento*100)/100;
                this.IGV = Math.round(this.SubTotal * 0.18 * 100)/100; //Math.round(this.SubTotal * 0.18 * 100)/100;// - Math.round(this.Descuento * 0.18 * 100)/100;
                this.SubTotal = Math.round(this.SubTotal*100)/100;//(this.Total - Math.round(this.IGV*100)/100)*100/100;
                this.isSubTotal = true;
                this.isIGV = true;
                this.isTotal = true;
            }
            ///=====
            /*if(this.tipodoc=='RUC' || this.tipodoc=='DNI'){
                this.Total = Math.round(this.SubTotal*100)/100;// - Math.round(this.Descuento*100)/100;
                this.IGV = Math.round(this.SubTotal / 1.18 * 0.18 * 100)/100; //Math.round(this.SubTotal * 0.18 * 100)/100;// - Math.round(this.Descuento * 0.18 * 100)/100;
                this.SubTotal = Math.round(this.SubTotal / 1.18 * 100)/100;//(this.Total - Math.round(this.IGV*100)/100)*100/100;
                this.isSubTotal = true;
                this.isIGV = true;
                this.isTotal = true;
            } else if (this.tipodoc=='No Aplica'){
                this.Total = Math.round(this.SubTotal*100)/100;// - Math.round(this.Descuento*100)/100;
                this.IGV = Math.round(this.SubTotal / 1.18 * 0.18 * 100)/100; //Math.round(this.SubTotal * 0.18 * 100)/100;// - Math.round(this.Descuento * 0.18 * 100)/100;
                this.SubTotal = Math.round(this.SubTotal / 1.18 * 100)/100;//(this.Total - Math.round(this.IGV*100)/100)*100/100;
                this.isSubTotal = false;
                this.isIGV = false;
                this.isTotal = true;
            } else {
                this.SubTotal = 0;
                this.IGV = 0;
                this.Total = 0;
                this.isSubTotal = false;
                this.isIGV = false;
                this.isTotal = false;
            }*/
            ///=====
        },
        CambiarDescuento(){
            let cantidad = this.lobeListado.length;
            this.SubTotal = 0;
            this.IGV = 0;
            this.Total = 0;
            this.DescuentoMax = 0;
            for(var i=0;i<cantidad;i+=1){
                this.lobeListado[i].Descuento = 0;
                this.lobeListado[i].SubTotal = Math.round((this.lobeListado[i].Cantidad*this.lobeListado[i].Precio)*100)/100;
                this.DescuentoMax += this.lobeListado[i].DescuentoMax;
                this.SubTotal += this.lobeListado[i].SubTotal;
            }
            
            let Subt = Math.round(this.SubTotal*100 - this.Descuento*100)/100;
            if(this.IdTipoPrecio==1){
                this.Total = Math.round(Subt/*this.SubTotal*/*100)/100;
                this.IGV = Math.round(Subt/*this.SubTotal*/ / 1.18 * 0.18 * 100)/100; 
                this.SubTotal = Math.round(Subt/*this.SubTotal*/ / 1.18 * 100)/100;
                this.isSubTotal = false;
                this.isIGV = false;
                this.isTotal = false;
                if(this.tipodoc=='RUC' || this.tipodoc=='DNI'){
                    this.isSubTotal = true;
                    this.isIGV = true;
                    this.isTotal = true;
                } else if (this.tipodoc=='No Aplica'){
                    this.isTotal = true;
                } 
            } else if (this.IdTipoPrecio==2){
                this.Total = Math.round(Subt/*this.SubTotal*/ * 1.18 * 100)/100;
                this.IGV = Math.round(Subt/*this.SubTotal*/ * 0.18 * 100)/100;
                this.SubTotal = Math.round(Subt/*this.SubTotal*/*100)/100;
                this.isSubTotal = true;
                this.isIGV = true;
                this.isTotal = true;
            }
        },
        ///==============================================================
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;
            
            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        //(item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) &&
                        (item.Cantidad == (this.filtros.filter(f => f.columna=='Cantidad')[0].Valor==''?item.Cantidad:this.filtros.filter(f => f.columna=='Cantidad')[0].Valor)) && 
                        (item.Precio == (this.filtros.filter(f => f.columna=='Precio')[0].Valor==''?item.Precio:this.filtros.filter(f => f.columna=='Precio')[0].Valor)) && 
                        (item.SubTotal == (this.filtros.filter(f => f.columna=='SubTotal')[0].Valor==''?item.SubTotal:this.filtros.filter(f => f.columna=='SubTotal')[0].Valor)) 
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        //(item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) &&
                        (item.Cantidad == (this.filtros.filter(f => f.columna=='Cantidad')[0].Valor==''?item.Cantidad:this.filtros.filter(f => f.columna=='Cantidad')[0].Valor)) && 
                        (item.Precio == (this.filtros.filter(f => f.columna=='Precio')[0].Valor==''?item.Precio:this.filtros.filter(f => f.columna=='Precio')[0].Valor)) && 
                        (item.SubTotal == (this.filtros.filter(f => f.columna=='SubTotal')[0].Valor==''?item.SubTotal:this.filtros.filter(f => f.columna=='SubTotal')[0].Valor)) 
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        ///==============================================================
        filtrarAscendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Nombre < b.Nombre)
                        return -1;
                    if (a.Nombre > b.Nombre)
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
                    if (a.Precio < b.Precio)
                        return -1;
                    if (a.Precio > b.Precio)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.SubTotal < b.SubTotal)
                        return -1;
                    if (a.SubTotal > b.SubTotal)
                        return 1;
                    return 0;
                });
            } 
        },
        filtrarDescendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Nombre < b.Nombre)
                        return 1;
                    if (a.Nombre > b.Nombre)
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
                    if (a.Precio < b.Precio)
                        return 1;
                    if (a.Precio > b.Precio)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.SubTotal < b.SubTotal)
                        return 1;
                    if (a.SubTotal > b.SubTotal)
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
        ///==============================================================
        keyUpBuscar(a){
            if(a.key == "Enter" && this.nomBuscar.length>0)
            {
                this.BuscarListaProducto();
                a.returnValue = true;
            }
        },
        BuscarListaProducto(){
            this.filtros[0].Valor = this.nomBuscar;
            this.Paginar();
        },
        ///==============================================================
        keyUpDNICliente(a){
            if(a.key == "Enter" && this.dniCliente.length==8)
            {
                this.BuscarDNI();
                a.returnValue = true;
            }
            else if (a.key == "Backspace"){
                a.returnValue = true;
            }
            else if(a.key == "1" || a.key == "2" || a.key == "3" || a.key == "4" || a.key == "5" ||
                a.key == "6" || a.key == "7" || a.key == "8" || a.key == "9" || a.key == "0"){
                a.returnValue = true;
            } else {
                a.returnValue = false;
            }
        },
        ValidarDNI(){
            if(this.isDNI && this.dniCliente==""){
                return 'Debe ingresar DNI Cliente.';
            }
            return '';
        },
        BuscarDNI(){
            var msj = this.ValidarDNI();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.isConsultaDocumento = true;
                MaestroService.ConsultarDNIRUC(this.usuario.usuarioLogin, this.usuario.idCliente, this.dniCliente, "DNI")
                    .then(res => {
                        this.isConsultaDocumento = false;
                        if (res.status==200){
                            this.nombreCliente=res.result.nombre_o_razon_social;
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
                        this.isConsultaDocumento = false;
                        console.error(err);
                        this.$message({
                            showClose: true,
                            message: err,
                            type: 'error'
                        });
                    });
            }
        },
        keyUpRUCCliente(a){
            if(a.key == "Enter" && this.rucCliente.length==11)
            {
                this.BuscarRUC();
                a.returnValue = true;
            }
            else if (a.key == "Backspace"){
                a.returnValue = true;
            }
            else if(a.key == "1" || a.key == "2" || a.key == "3" || a.key == "4" || a.key == "5" ||
                a.key == "6" || a.key == "7" || a.key == "8" || a.key == "9" || a.key == "0"){
                a.returnValue = true;
            } else {
                a.returnValue = false;
            }
        },
        ValidarRUC(){
            if(this.isRUC && this.rucCliente==""){
                return 'Debe ingresar RUC Cliente.';
            }
            return '';
        },
        BuscarRUC(){
            var msj = this.ValidarRUC();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.isConsultaDocumento = true;
                MaestroService.ConsultarDNIRUC(this.usuario.usuarioLogin, this.usuario.idCliente, this.rucCliente, "RUC")
                    .then(res => {
                        this.isConsultaDocumento = false;
                        if (res.status==200){
                            this.nombreCliente=res.result.nombre_o_razon_social;
                            this.direccionCliente=res.result.direccion_completa;
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
                        this.isConsultaDocumento = false;
                        console.error(err);
                        this.$message({
                            showClose: true,
                            message: err,
                            type: 'error'
                        });
                    });
            }
        },
        ///==============================================================
        ValidarVenta(){
            if(this.IdTipoDocumento==0){
                return 'Debe seleccionar Tipo Documento.';
            }
            if(this.IdTienda==''){
                return 'Debe seleccionar Tienda.';
            }
            if(this.tipodoc==''){
                return 'Debe seleccionar RUC | DNI | No Aplica.';
            }
            if(this.isDNI && this.dniCliente==""){
                return 'Debe ingresar DNI Cliente.';
            }
            if(this.isRUC && this.rucCliente==""){
                return 'Debe ingresar RUC Cliente.';
            }
            if(this.isNombre && this.nombreCliente==""){
                return 'Debe ingresar Nombre Cliente.';
            }
            if(this.isDireccion && this.direccionCliente==""){
                return 'Debe ingresar Dirección Cliente.';
            }
            if(this.lobeListado.length==0){
                return 'Debe ingresar Productos de Venta.';
            }
            return '';
        },
        Vender(){
            this.isModalVenta = true;
        },
        CreaObjetoEnvioBD : function(tipo,id,tab){
            var item = {};
            var lobeDetalle = [];

            let lobeArch = [];
            for(var i=0;i<this.formArch.avatar.length;i+=1){
                let obe = {
                    NombreCarpeta : this.usuario.idCliente.toString(),//.padStart(12,'0'),//this.Id,
                    DatosAdjuntos : this.formArch.avatar[i].value,
                    DatosAdjuntosName : this.formArch.avatar[i].filename,
                }
                lobeArch.push(obe);
            }

            if (tipo==1){
                let desc = 0;
                for(var i=0;i<this.lobeListado.length;i+=1){
                    let row = this.lobeListado[i];
                    desc = desc + row.Descuento;
                }
                if (this.Descuento!=desc){
                    desc = this.Descuento / this.lobeListado.length;
                } else {
                    desc = 0;
                }
                for(var i=0;i<this.lobeListado.length;i+=1){
                    let row = this.lobeListado[i];
                    var itemDetalle = {};
                    itemDetalle.n_id_detalle = i+1;
                    itemDetalle.n_id_cabecera = 1;
                    itemDetalle.c_codigo_item = row.CodUNSPSC;
                    itemDetalle.c_decripcion = row.Nombre;
                    itemDetalle.c_tipo_precio = "01";//incluye IGV //02 gratuito
                    itemDetalle.n_precio_referencial = row.Precio - (row.Descuento/row.Cantidad) - desc;
                    itemDetalle.n_precio_unitario = row.Precio - (row.Descuento/row.Cantidad) - desc;
                    itemDetalle.n_descuento = 0;
                    itemDetalle.n_cantidad = row.Cantidad;
                    itemDetalle.n_unidad_medida = row.Unidad;
                    itemDetalle.n_tipo_impuesto = "10";
                    itemDetalle.n_impuesto = Math.round((row.Precio - (row.Descuento/row.Cantidad) - desc)*row.Cantidad / 1.18 * 0.18 * 100)/100; //this.lobeTipoDocumento.filter(obe=>obe.codigo==this.IdTipoDocumento)[0].codigoSUNAT=="01"?(row.Precio - (row.Descuento/row.Cantidad))*row.Cantidad*0.18:0;
                    itemDetalle.n_impuesto_selectivo = "";
                    itemDetalle.n_otro_impuesto = 0;
                    itemDetalle.n_total_venta = this.SubTotal; //(row.Precio - (row.Descuento/row.Cantidad))*row.Cantidad;
                    itemDetalle.n_suma = this.SubTotal; //0;
                    itemDetalle.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigo==this.IdTipoDocumento)[0].codigoSUNAT;
                    itemDetalle.c_id_documento = "";
                    itemDetalle.c_emisor_nombre_legal = this.lobeEmisor[0].nomLegal;
                    itemDetalle.c_emisor_numero_documento = this.lobeEmisor[0].ruc;
                    itemDetalle.c_id_producto = row.Id;
                    itemDetalle.c_id_tienda = this.IdTienda;
                    itemDetalle.c_id_productoAlmacen = row.IdProductoAlmacen;

                    lobeDetalle.push(itemDetalle);
                }
                item.n_id_cabecera = 1;
                item.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigo==this.IdTipoDocumento)[0].codigoSUNAT;
                item.c_tipo_documento_nombre = this.lobeTipoDocumento.filter(obe=>obe.codigo==this.IdTipoDocumento)[0].descripcion;
                item.n_id_documento_parent = 0;
                item.c_tipo_operacion = "0101";
                item.n_exoneradas = 0;
                item.n_gratuitas = 0;
                item.n_gravadas = this.SubTotal;
                item.n_inafectas = 0;
                item.c_fecha_emision = "";
                item.c_id_documento = "";
                item.c_moneda = "PEN";
                item.n_monto_detraccion = 0;
                item.n_monto_percepcion = 0;
                item.n_monto_letras = "";
                item.n_total_igv = this.IGV;
                item.n_total_isc = 0;
                item.n_total_otros_tributos = 0;
                item.n_total_venta = this.Total;
                item.c_receptor_nombre_comercial = "";
                item.c_receptor_nombre_legal = this.nombreCliente;
                item.c_receptor_direccion = this.direccionCliente;
                item.c_receptor_tipo_documento = this.loTipoDocIdentidad.filter(obe=>obe.descripcion==this.tipodoc)[0].codigo; ////1:DNI -- 6:RUC
                item.c_receptor_numero_documento = this.isDNI?this.dniCliente:this.rucCliente;
                item.c_emisor_departamento = this.lobeEmisor[0].IdDepartamento + " " + this.lobeEmisor[0].desDepartamento;
                item.c_emisor_provincia = this.lobeEmisor[0].IdProvincia + " " + this.lobeEmisor[0].desProvincia;
                item.c_emisor_distrito = this.lobeEmisor[0].IdDistrito + " " + this.lobeEmisor[0].desDistrito;
                item.c_emisor_direccion = this.lobeEmisor[0].direccion;
                item.c_emisor_urbanizacion = this.lobeEmisor[0].urbanizacion;
                item.c_emisor_ubigeo = this.lobeEmisor[0].ubigeo;
                item.c_emisor_nombre_comercial = this.lobeEmisor[0].nomComercial;
                item.c_emisor_nombre_legal = this.lobeEmisor[0].nomLegal;
                item.c_emisor_tipo_documento = this.lobeEmisor[0].tipodoc;//this.lobeTipoDocumento.filter(obe=>obe.codigo==this.IdTipoDocumento)[0].codigoSUNAT;
                item.c_emisor_numero_documento = this.lobeEmisor[0].ruc;
                item.c_codigo_anexo = this.lobeEmisor[0].codSurcursal;
                item.n_calculo_detraccion = this.lobeEmisor[0].detraccion;
                item.n_calculo_igv = this.lobeEmisor[0].igv;
                item.n_calculo_isc = this.lobeEmisor[0].isc;
                item.lodetalle = lobeDetalle;
                item.UsrCreador = this.usuario.usuarioLogin;
                item.IdCliente = this.usuario.idCliente;
                item.IdTienda = this.IdTienda;
                item.Acuenta = tab==0?false:true;
                item.loarchivos = lobeArch;
            } else if (tipo==2){
                item.Id = id
                item.UsrModificador = this.usuario.usuarioLogin;
            }
            return item;
        },
        VenderEnviar(tab){
            var msj = this.ValidarVenta();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.isModalVenta = false;
                this.VenderBD(tab);
            }
        },
        VenderBD(tab){
            const loading = this.$loading({
                lock: true,
                text: 'Realizando Venta...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            VentaService.Guardar(this.CreaObjetoEnvioBD(1,0,tab))
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        if(res.mensaje!=""){
                            this.$message({
                                showClose: true,
                                message: res.result,
                                type: 'success'
                            });
                            this.isVentaActual = true;
                            this.src = res.mensaje;
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.result,
                                type: 'warning'
                            });
                            this.ClosePrint();
                        }
                    } else if (res.status==210){
                        this.CargarDatosIniciales();
                        this.CargarProductos();
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
        VerPreVenta(){
            this.drawer=true;
        },
        LimpiarPreVenta(){
            this.clearVenta =true;
        },
        Cancelar(){
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];

            let cantidad = this.lobeListadoProducto.length;
            for(var i=0;i<cantidad;i+=1){
                this.lobeListadoProducto[i].Cantidad = 0;
            }
            ///===================
            this.limpiarCamposDependientes(false);
            this.tipodoc="No Aplica";

            this.dniCliente='';
            this.nombreCliente='';
            this.rucCliente='';
            this.direccionCliente='';
            this.TipoCliente='';
            ///===================
            this.SubTotal = 0;
            this.IGV = 0;
            this.Total = 0;
            this.isSubTotal = false;
            this.isIGV = false;
            this.isTotal = false;
            ///===================
            ///===================
            this.formArch.avatar = [];
            $("#avatar").val(null);
        },
        Imprimir(){
            printJS({
                printable: this.src, 
                type: 'pdf', 
                base64: true, 
                onPrintDialogClose: this.ClosePrint, 
                showModal: true
                });
        },
        ClosePrint: function(){
            this.CargarDatosIniciales();
            this.Cancelar();
            this.isVentaActual = false;
            this.CargarProductos();
        },
        keyUpEfectivo(a){
            this.CalcularVuelto();
            a.returnValue = true;
        },
        CalcularVuelto(){
            this.Efectivo==''?0:this.Efectivo;
            this.Vuelto = Math.round((this.Efectivo-this.Total) * 100)/100;
        },
        CancelarVenta(){
            this.isModalVenta = false;
            this.formArch.avatar = [];
            $("#avatar").val(null);
        },
        ///==============================================================
        AgregarStock(id,row){
            let index = this.lobeListadoProducto.findIndex(obe=>obe.idProductoBase==id);
            let indexC = this.lobeListado.findIndex(obe=>obe.Id==id);
            let indexCB = this.lobeListado.findIndex(obe=>obe.Id==this.lobeListadoProducto[index].Id);
            if(index!=-1){
                if(this.lobeListadoProducto[index].CantidadTienda > 0){
                    this.lobeListadoProducto[index].CantidadTienda -=1;
                    row.CantidadTienda += this.lobeListadoProducto[index].CantidadCaja;
                    if(indexC!=-1){
                        this.lobeListado[indexC].Stock = this.lobeListado[indexC].Cantidad + row.CantidadTienda;
                    }
                    if(indexCB!=-1){
                        this.lobeListado[indexCB].Stock = this.lobeListado[indexCB].Cantidad - 1;
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
            let indexC = this.lobeListado.findIndex(obe=>obe.Id==id);
            let indexCB = this.lobeListado.findIndex(obe=>obe.Id==row.idProductoBase);
            if(index!=-1){
                if(this.lobeListadoProducto[index].CantidadTienda >= row.CantidadCaja){
                    this.lobeListadoProducto[index].CantidadTienda -= row.CantidadCaja;
                    row.CantidadTienda += 1;
                    if(indexC!=-1){
                        this.lobeListado[indexC].Stock = this.lobeListado[indexC].Cantidad + 1;
                    }
                    if(indexCB!=-1){
                        this.lobeListado[indexCB].Stock = this.lobeListado[indexCB].Cantidad - row.CantidadCaja;
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
        ///==============================================================
        CargaReceta(){
            var cantidad = this.lobeListado.filter(x=>x.RecetaMedica=='SI').length;
            if (cantidad>0){
                return true;
            } else {
                return false;
            }
        },
        ///==============================================================
        onUpload(event) {
            this.formArch.avatar = [];
            if(event.target.files && event.target.files.length > 0) {
                for(var i=0;i<event.target.files.length;i+=1){
                    let reader = new FileReader();
                    let file = event.target.files[i];
                    reader.readAsDataURL(file);
                    let valueFile;
                    reader.onload =  evt => {
                        valueFile = evt.target.result;

                        let item = {
                            filename : file.name,
                            filetype : file.type,
                            filesize : file.size,
                            value : valueFile.split(',')[1] 
                        }
                        this.formArch.avatar.push(item);
                    }
                }
            } else {
                this.formArch.avatar = [];
            }
        },
        ///==============================================================
        KeyUpNombre(){
            this.nombreCliente = this.nombreCliente.toUpperCase();
        },
        keyUpDireccionCliente(){
            this.direccionCliente = this.direccionCliente.toUpperCase();
        },
        ///==============================================================
        keyProdBuscar(a){
            if(a.key == "Enter")
            {
                this.filtrosProducto[1].Valor = this.BProducto;
                this.PaginarProducto();
                //a.returnValue = true;
            }
        },

    }
};
</script>

<style lang="scss">
    .el-table td {
        padding-top: 5px !important;
        padding-bottom: 5px !important;
    }
    .colorTab {
        color: black;
        border-color: #d5d8df;
    }
    .el-table th.is-center, .el-table td.is-center {
        text-align: center;
    }

    .input-group{
        display: table;
        //width:100%;
    }
    .input-group > div{
        display: table-cell;
        vertical-align: middle;  /* needed for Safari */
    }
    .size_mini{
        height: 28px !important;
    }
    .input-group-icon{
        background-color: #F5F7FA;
        //color: #909399;
        vertical-align: middle;
        display: table-cell;
        position: relative;
        //border: 1px solid #DCDFE6;
        border-top-left-radius: 4px;
        border-top-right-radius: 0px;
        border-bottom-right-radius: 0px;
        border-bottom-left-radius: 4px;
        padding: 0 20px;
        //width: 1px;
        white-space: nowrap;
    }
    .input-group-area{
        //margin-right: 5px !important;
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
    }
    .input-group input{
        display: block;
        //width: 100%;
        padding: 8px;
    }

    .el-drawer__header{
        margin-bottom: 2px !important;
    }
    .el-drawer__body {
		height: 100%;
		box-sizing: border-box;
		overflow-y: auto;
	}
</style>
