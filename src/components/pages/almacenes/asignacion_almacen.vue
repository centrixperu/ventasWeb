<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop0">
                    <el-col :xs="18" :sm="6" :md="4" :lg="4" :xl="1">
                        <el-button @click="Nuevo()" class="width100" size="small" 
                                    type="primary" icon="fas fa-plus" plain> ASIGNAR PRODUCTOS
                        </el-button>
                    </el-col>
                    <!--<el-col :xs="18" :sm="6" :md="4" :lg="3" :xl="1" class ="hidden-xs-only">
                        <el-button @click="CargaMasiva()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain :disabled="(isNuevo)"> CARGA MASIVA
                        </el-button>
                    </el-col>-->
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop5">
                    <!--<el-col :xs="18" :sm="6" :md="4" :lg="3" :xl="1" 
                        class ="hidden-sm-only hidden-md-only hidden-lg-only hidden-xl-only">
                        <el-button @click="CargaMasiva()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain :disabled="(isNuevo)"> CARGA MASIVA
                        </el-button>
                    </el-col>-->
                </el-row>

                <el-row :gutter="5" type="flex" class="paddingTop0" v-show="(isNuevo)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <!--<el-row :gutter="5" type="flex" class="paddingTop0" v-show="usuario.isAdministrador">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Cliente:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdCliente" filterable placeholder="Select"
                                            size="small" ref="IdCliente" class="width100">
                                            <el-option v-for="oCliente in lobeCliente" 
                                                :key="oCliente.codigo" 
                                                :label="oCliente.descripcion"
                                                :value="oCliente.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>-->
                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Almacén:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
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
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="lobeListadoProductoFiltrado.length>0">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Productos:</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only" v-show="lobeListadoProductoFiltrado.length>0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="cus-border q-px-md q-pb-md">
                                        <el-table ref="listado" :data="lobeListadoProductoFiltrado" 
                                                style="width: 100%"
                                                highlight-current-row>
                                            <el-table-column
                                                fixed="left"
                                                label=""
                                                width="75">
                                                <template slot-scope="scope">
                                                    <el-checkbox v-model="scope.row.Selec" 
                                                                @change="SeleccionarProducto(scope.row.Id, scope.row)" label="" border>
                                                    </el-checkbox>
                                                </template>
                                            </el-table-column>
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
                                            </el-table-column>
                                            <el-table-column prop="Tipo" width="150" align="center" v-if="isTipoProducto">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust textcenter">Tipo</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-select v-model="scope.row.idTipo" filterable placeholder="Select"
                                                        size="small" ref="scope.row.idTipo" class="width100"
                                                        v-show="scope.row.idTipo!=-1"
                                                        @change="SeleccionarTipo(scope.row.Id, scope.row)">
                                                        <el-option v-for="oTipo in scope.row.loTipoProducto" 
                                                            :disabled="true"
                                                            :key="oTipo.codigo" 
                                                            :label="oTipo.descripcion"
                                                            :value="oTipo.codigo">
                                                        </el-option>                            
                                                    </el-select>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="Cantidad" width="155" align="center">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Cantidad</span>
                                                </template>
                                                <template slot-scope="scope"><!--controls-position="right"-->
                                                    <el-input-number v-model="scope.row.Cantidad" size="mini"
                                                            :precision="0"
                                                            class="width130P"
                                                            :disabled="!scope.row.Selec" :step="1" :min="0"></el-input-number>
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
                                                            :disabled="(!scope.row.Selec)" :step="1" :min="0"></el-input-number>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="PrecioCosto" width="155" align="center" v-if="isCostoProduccion">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust textcenter">Precio Compra Total</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-input-number v-model="scope.row.PrecioCosto" size="mini"
                                                            controls-position="right" :precision="2"
                                                            class="width130P" :disabled="(!scope.row.Selec )" 
                                                            :step="0.01" :min="0.00"></el-input-number>
                                                </template>
                                            </el-table-column>
                                            <el-table-column prop="FecVencimiento" width="150" align="center" v-if="isFechaVenProd">
                                                <template slot="header" slot-scope="scope">
                                                    <span class="textAdjust">Fec. Venc.</span>
                                                </template>
                                                <template slot-scope="scope">
                                                    <el-date-picker size="mini" class="width130P"
                                                        :disabled="(!scope.row.Selec )"
                                                        v-model="scope.row.FecVencimiento"
                                                        type="date"
                                                        placeholder="Fec. Venc.">
                                                    </el-date-picker>
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
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isNuevo)">
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                    <el-button @click="Guardar()" class="width100" size="small" 
                                                type="primary" icon="fas fa-save" plain> {{btnGuardar}}
                                    </el-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                    <el-button @click="Cancelar(true)" class="width100" size="small" 
                                                type="danger" icon="fas fa-ban" plain> CANCELAR
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" class="paddingTop10">
                    <el-tag type="success" class="cus-tag-header-panel">LISTADO DE STOCK</el-tag>
                </el-row>
                <el-row :gutter="5" class="paddingTop10 hidden-xs-only hidden-sm-only">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-table ref="listado" :data="lobeListadoFiltrado" 
                                    style="width: 100%"
                                    highlight-current-row>
                                <!--<el-table-column prop="Id"
                                        width="70">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Id</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 0?'colorOrderBottom':'']" @click="Ascendente(0)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 0?'colorOrderTop':'']" @click="Descendente(0)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="idTable"></el-input>
                                    </template>
                                </el-table-column>-->
                                <!--<el-table-column prop="DesCliente" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Cliente</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(1)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(1)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="clienteTable"></el-input>
                                    </template>
                                </el-table-column>-->
                                <el-table-column prop="Nombre">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Almacén</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 2?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 2?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nombreTable"></el-input>
                                    </template>
                                </el-table-column>
                                <!--<el-table-column
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-tag v-show="scope.row.Estado" type="success">Activo</el-tag>
                                        <el-tag v-show="!scope.row.Estado" type="danger">Inactivo</el-tag>
                                    </template>
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Estado</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="estadoTable"></el-input>
                                    </template>
                                </el-table-column>-->
                                <el-table-column
                                    fixed="right"
                                    label="Operaciones"
                                    width="120">
                                    <template slot-scope="scope">
                                            <el-button
                                                size="mini"
                                                type="success" icon="el-icon-arrow-right"
                                                @click="AsignarATienda(scope.row.Id, scope.row)">A Tienda</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="UsrCreador" width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Usuario Creación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(4)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(4)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="usrCreadorTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="FchCreacion" width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Fecha Creación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 5?'colorOrderBottom':'']" @click="Ascendente(5)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 5?'colorOrderTop':'']" @click="Descendente(5)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="fchCreacionTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="UsrModificador" width="180">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Usuario Modificación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 6?'colorOrderBottom':'']" @click="Ascendente(6)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 6?'colorOrderTop':'']" @click="Descendente(6)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="usrModificadorTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="FchModificacion" width="170">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Fecha Modificación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 7?'colorOrderBottom':'']" @click="Ascendente(7)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 7?'colorOrderTop':'']" @click="Descendente(7)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="fchModificacionTable"></el-input>
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
                                <el-input type="text" ref="nomBuscar"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Buscar Almacén" 
                                    @keypress.native="keyUpBuscar"
                                    v-model="nomBuscar">
                                    <el-button slot="append" icon="el-icon-search"
                                            @click="BuscarListaProducto()"></el-button>
                                </el-input>
                            </el-col>
                        </el-row>
                        <el-row :gutter="5" type="flex" class="paddingTop5"
                                v-for="oListado in lobeListadoFiltrado" 
                                :key="oListado.Id" :value="oListado.Id">
                            <el-main class="padding5 cus-border">
                                <el-row :gutter="5" type="flex" class="paddingTop0">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oListado.Nombre}}</span>
                                            <el-button-group>
                                                <el-button size="mini"
                                                    type="success" icon="el-icon-arrow-right"
                                                    @click="AsignarATienda(oListado.Id, oListado)">A Tienda</el-button>
                                            </el-button-group>                                            
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Usuario Creación:</span>
                                            <el-input class="paddingRight10" v-model="oListado.UsrCreador" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Fecha Creación:</span>
                                            <el-input v-model="oListado.FchCreacion" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Usuario Modificación:</span>
                                            <el-input class="paddingRight10" v-model="oListado.UsrModificador" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Fecha Modificación:</span>
                                            <el-input v-model="oListado.FchModificacion" size="mini" readonly></el-input>
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

        <modal-asignar-tienda :isModal="isModal" :idAlmacen="idAlmacenMdl" :desAlmacen="desAlmacenMdl" 
                                :id="idLista" @interface="Cargar"> <!--:loProducto="loProductoMdl"-->
        </modal-asignar-tienda>
    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AsignarAlmacenService from '@/services/almacen/almacen-service'
import { mapState,mapGetters } from "vuex";
//MODALES
import ModalAsignarTienda from '@/components/pages/almacenes/modals/mdlAsignarTienda'

export default {
    name: "app",
    components: { 
      HeaderPage, ModalAsignarTienda
    },
    data() {
        return {
            isModal:false,
            //-----------------------------------
            isTipoProducto:true,
            isFechaVenProd:true,
            isCostoProduccion:true,
            //-----------------------------------
            idAlmacenMdl:'',
            desAlmacenMdl:'',
            idLista:0,
            loProductoMdl:[],
            //-----------------------------------
            btnGuardar:'GUARDAR',
            //-----------------------------------
            tittleModulo:'Asignación de Productos a Almacén / Tienda',
            nomBuscar:"",
            nomProdBuscar:"",
            //-----------------------------------
            //IdCliente:-1,
            //lobeCliente:[],
            IdAlmacen:0,
            lobeAlmacen:[],
            //-----------------------------------
            isNuevo:false,
            //-----------------------------------
            lobeListado:[],
            lobeListadoFiltrado:[],
            lobeListadoProducto:[],
            lobeListadoProductoFiltrado:[],
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            asc: -1,
            desc: -1,
            //-----------------------------------
            currentPageProducto: 1,
            pageSizeProducto: 5,
            totalrowsProducto: 0,
            ascP: -1,
            descP: -1,
            //-----------------------------------
            idTable:"",
            //clienteTable:"",
            nombreTable:"",
            //estadoTable:"",
            usrCreadorTable:"",
            fchCreacionTable:"",
            usrModificadorTable:"",
            fchModificacionTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'DesCliente', Valor:''},
                {columna:'Nombre', Valor:'',},
                {columna:'Estado', Valor:'',},
                {columna:'UsrCreador', Valor:'',},
                {columna:'FchCreacion', Valor:'',},
                {columna:'UsrModificador', Valor:'',},
                {columna:'FchModificacion', Valor:'',}
            ],
            //-----------------------------------
            idTableProducto:"",
            nombreTableProducto:"",
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
        ...mapState(["usuario","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        nomProdBuscar: function(n){
            this.filtrosProducto[1].Valor = n;
            this.PaginarProducto();
        },
        nomBuscar: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        //--------------------------
        IdAlmacen: function(n){
            if(n!=0){
                this.CargarProductos(n);
                //this.LimpiarListadoProducto();
                //this.PaginarProducto();
            } else {
                this.lobeListadoProducto = [];
                this.lobeListadoProductoFiltrado=[];
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
        //------ FILTROS
        idTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        /*clienteTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },*/
        nombreTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        /*estadoTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },*/
        usrCreadorTable: function(n){
            this.filtros[4].Valor = n;
            this.Paginar();
        },
        fchCreacionTable: function(n){
            this.filtros[5].Valor = n;
            this.Paginar();
        },
        usrModificadorTable: function(n){
            this.filtros[6].Valor = n;
            this.Paginar();
        },
        fchModificacionTable: function(n){
            this.filtros[7].Valor = n;
            this.Paginar();
        },
    },
    methods: {
        Cargar(val){
            this.isModal=val;
            this.idLista=0;
            this.idAlmacenMdl=0;
            this.desAlmacenMdl="";
            this.loProductoMdl=[];
            this.CargarDatosIniciales();
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
        filtrarAscendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Id < b.Id)
                        return -1;
                    if (a.Id > b.Id)
                        return 1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesCliente < b.DesCliente)
                        return -1;
                    if (a.DesCliente > b.DesCliente)
                        return 1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Nombre < b.Nombre)
                        return -1;
                    if (a.Nombre > b.Nombre)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return -1;
                    if (a.Estado > b.Estado)
                        return 1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return -1;
                    if (a.UsrCreador > b.UsrCreador)
                        return 1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return -1;
                    if (a.FchCreacion > b.FchCreacion)
                        return 1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return -1;
                    if (a.UsrModificador > b.UsrModificador)
                        return 1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchModificacion < b.FchModificacion)
                        return -1;
                    if (a.FchModificacion > b.FchModificacion)
                        return 1;
                    return 0;
                });
            }
        },
        filtrarDescendente(id){
            if(id==0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Id < b.Id)
                        return 1;
                    if (a.Id > b.Id)
                        return -1;
                    return 0;
                });
            } else if(id==1){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesCliente < b.DesCliente)
                        return 1;
                    if (a.DesCliente > b.DesCliente)
                        return -1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Nombre < b.Nombre)
                        return 1;
                    if (a.Nombre > b.Nombre)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return 1;
                    if (a.Estado > b.Estado)
                        return -1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return 1;
                    if (a.UsrCreador > b.UsrCreador)
                        return -1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return 1;
                    if (a.FchCreacion > b.FchCreacion)
                        return -1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return 1;
                    if (a.UsrModificador > b.UsrModificador)
                        return -1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchModificacion < b.FchModificacion)
                        return 1;
                    if (a.FchModificacion > b.FchModificacion)
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
                    //this.lobeListado = res.result.loListado;
                    //this.lobeAlmacen = res.result.loAlmacen;
                    //this.IdAlmacen = this.lobeAlmacen.length==2?this.lobeAlmacen[1].codigo:0;
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
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Almacén...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          AsignarAlmacenService.CargarDatosIniciales(this.usuario.usuarioLogin,this.usuario.idCliente)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeListado = res.result.loListado;
                    this.lobeAlmacen = res.result.loAlmacen;
                    //this.IdAlmacen = this.lobeAlmacen.length==2?this.lobeAlmacen[1].codigo:0;
                    //this.lobeListadoProducto = res.result.loProducto;
                    //this.MostrarColumnas();
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
        MostrarColumnas(){
            this.isTipoProducto = this.permisos.isTipoProducto; 
            this.isFechaVenProd = this.permisos.isCostoProduccion; 
            this.isCostoProduccion = this.permisos.isFechaVenProd; 
        },
        LimpiarListadoProducto(){
            let count = this.lobeListadoProducto.length;
            this.lobeListadoProductoFiltrado = [];
            for(var i = 0; i < count; i+=1){
                this.lobeListadoProducto[i].Selec = false;
                this.lobeListadoProducto[i].Cantidad = 0;
                this.lobeListadoProducto[i].CantidadCaja = 0;
                this.lobeListadoProducto[i].PrecioCosto = 0;
            }
            this.PaginarProducto();
        },
        SeleccionarProducto(id,row){
            if (!row.Selec){
                row.Cantidad=0;
                row.CantidadCaja=0;
                row.PrecioCosto=0;
            }
        },
        SeleccionarTipo(id,row){
            row.Cantidad=0;
            row.CantidadCaja=0;
            row.PrecioCosto=0;
        },
        Nuevo(){
            this.isNuevo=true;
            this.btnGuardar = "GUARDAR";
            this.Cancelar(false);
        },
        Cancelar(isAll){
            this.IdCliente=this.usuario.idCliente;
            this.IdAlmacen = 0;
            this.lobeListadoProducto = [];
            this.lobeListadoProductoFiltrado=[];
            //--------
            if(isAll){
                this.isNuevo = false;
                this.btnGuardar = "GUARDAR";
            }
            //--------
        },
        ValidarGuardar(){
            /*if(this.IdCliente==-1){
                return "Debe seleccionar Cliente.";
            }*/
            if(this.IdAlmacen==0){
                return "Debe seleccionar Almacen.";
            }
            let cantreg = this.lobeListadoProducto.filter(obe=>obe.Selec==true).length;
            if(cantreg==0){
                return "Debe seleccionar Productos.";
            }
            if(cantreg>0){
                let lobe = this.lobeListadoProducto.filter(obe=>obe.Selec==true);
                for(var i=0;i<lobe.length;i+=1){
                    let idTipo = lobe[i].idTipo;
                    let isTipoBase = lobe[i].isTipoBase;

                    if(idTipo==-1 || !isTipoBase){
                        if(lobe[i].Cantidad==0){
                            return "Debe ingresar Cantidad de Producto de: " + lobe[i].Nombre;
                            //break;
                        } else if(lobe[i].PrecioCosto==0 && this.isCostoProduccion){
                            return "Debe ingresar Precio Compra del Producto: " + lobe[i].Nombre;
                            //break;
                        } else if(lobe[i].FecVencimiento=="" && this.isFechaVenProd){
                            return "Debe ingresar Fecha de Vencimiento del Producto: " + lobe[i].Nombre;
                            //break;
                        }
                    } else if (idTipo==0){
                        return "No se ingreso Tipo de Producto para: " + lobe[i].Nombre;
                        //break;
                    } else {
                        if(lobe[i].Cantidad==0){
                            return "Debe ingresar Cantidad del Producto: " + lobe[i].Nombre;
                            //break;
                        } else if(lobe[i].CantidadCaja==0 && this.isTipoProducto){
                            return "Debe ingresar Unidades/Caja del Producto: " + lobe[i].Nombre;
                            //break;
                        } else if(lobe[i].PrecioCosto==0 && this.isCostoProduccion){
                            return "Debe ingresar Precio Compra del Producto: " + lobe[i].Nombre;
                            //break;
                        } else if(lobe[i].FecVencimiento=="" && this.isFechaVenProd){
                            return "Debe ingresar Fecha de Vencimiento del Producto: " + lobe[i].Nombre;
                            //break;
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
                item.loProducto = this.CrearObjetoProducto(this.lobeListadoProducto.filter(obe=>obe.Selec==true));
                item.UsrCreador = this.usuario.usuarioLogin;
            } else if (tipo==2){
                item.Id = id
                item.UsrModificador = this.usuario.usuarioLogin;
                item.IdCliente = this.usuario.idCliente;
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
            AsignarAlmacenService.Guardar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    if (res.status==200){
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: 'Se Guardó Correctamente.',
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
                    console.log("Error",err);
                    this.$message({
                        showClose: true,
                        message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                        type: 'error'
                    });
                });
        },
        AsignarATienda(id, row){
            this.isModal=true;
            this.idLista = row.Id;
            this.idAlmacenMdl=row.IdAlmacen;
            this.desAlmacenMdl=row.Nombre;
        },
        CargaMasiva(){

        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        //(item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) && 
                        //((item.Estado?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Estado')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrCreador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrCreador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchCreacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchCreacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrModificador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrModificador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchModificacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchModificacion')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        //(item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) &&
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) && 
                        //((item.Estado?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Estado')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrCreador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrCreador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchCreacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchCreacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrModificador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrModificador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchModificacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchModificacion')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        PaginarProducto(){
            var filaInicio = (this.currentPageProducto - 1) * this.pageSizeProducto;
            var filaFin = (this.currentPageProducto * this.pageSizeProducto) ;

            this.lobeListadoProductoFiltrado = this.lobeListadoProducto;

            this.totalrowsProducto=this.lobeListadoProductoFiltrado.filter(function(item){ 
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
        keyUpBuscar(a){
            if(a.key == "Enter" && this.nomBuscar.length>0)
            {
                this.BuscarListaProducto();
                a.returnValue = true;
            }
        },
        BuscarListaProducto(){
            this.filtros[2].Valor = this.nomBuscar;
            this.Paginar();
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
