<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
      
                <el-row :gutter="5" type="flex" class="paddingTop10">
                    <el-col>
                        <el-collapse v-model="activeName" accordion>
                            <el-collapse-item title="Filtros de Búsqueda" name="0">
                                <el-row :gutter="5" type="flex" class="paddingTop0 cus-border marginLeft0 marginRight0">
                                    <div class="cus-container-border margin0 width100">
                                        <el-main class="padding5">
                                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Tienda:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <div>
                                                        <el-select v-model="IdTienda" filterable placeholder="Select"
                                                            size="small" ref="IdTienda" class="width100">
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
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Tipo de Filtro:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-radio-group v-model="tipoFiltro">
                                                        <el-radio-button label="Día"></el-radio-button>
                                                        <el-radio-button label="Mes"></el-radio-button>
                                                        <el-radio-button label="Año"></el-radio-button>
                                                        <el-radio-button label="Rango de Fechas"></el-radio-button>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isDia">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Día:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-date-picker
                                                        v-model="fechaDia"
                                                        type="date"
                                                        format="dd-MM-yyyy"
                                                        placeholder="Seleccione Día">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isMes">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Mes:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-date-picker
                                                        v-model="fechaMes"
                                                        type="month"
                                                        format="MM-yyyy"
                                                        placeholder="Seleccione Mes">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isAnio">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Año:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-date-picker
                                                        v-model="fechaAnio"
                                                        type="year"
                                                        format="yyyy"
                                                        placeholder="Seleccione Año">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="isRango">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Rango:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-date-picker
                                                        v-model="fechaRango"
                                                        type="daterange"
                                                        format="dd-MM-yyyy"
                                                        range-separator="A"
                                                        start-placeholder="Fecha Inicial"
                                                        end-placeholder="Fecha Final">
                                                    </el-date-picker>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <el-button @click="Buscar()" class="width100" size="small" 
                                                                :disabled="!((isDia && fechaDia!='') || 
                                                                            (isMes && fechaMes!='') || 
                                                                            (isAnio && fechaAnio!='') || 
                                                                            (isRango && fechaRango!='') || 
                                                                            (IdTienda == 0))"
                                                                type="primary" icon="fas fa-save" plain> BUSCAR
                                                    </el-button>
                                                </el-col>
                                                <el-col :xs="12" :sm="6" :md="6" :lg="4" :xl="1">
                                                    <el-button @click="Limpiar(true)" class="width100" size="small" 
                                                                :disabled="!(isDia || isMes || isAnio || isRango)"
                                                                type="danger" icon="fas fa-ban" plain> LIMPIAR FILTRO
                                                    </el-button>
                                                </el-col>
                                            </el-row>
                                        </el-main>
                                    </div>
                                </el-row>
                            </el-collapse-item>
                            <el-collapse-item title="Ingresos" name="1">
                                <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <div class="cus-border">
                                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Seleccione Tipo de Ingreso:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-radio-group v-model="tipoEgreso">
                                                        <el-radio-button label="Producto"></el-radio-button>
                                                        <el-radio-button label="Otro"></el-radio-button>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Tienda:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <div>
                                                        <el-select v-model="IdTienda" filterable placeholder="Select"
                                                            size="small" ref="IdTienda" class="width100">
                                                            <el-option v-for="oTienda in lobeTienda" 
                                                                :key="oTienda.codigo" 
                                                                :label="oTienda.descripcion"
                                                                :value="oTienda.codigo">
                                                            </el-option>                            
                                                        </el-select>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                                <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Producto:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="18">
                                                    <div>
                                                        <el-input type="text"
                                                            size="small"
                                                            ref="desProductoB"
                                                            @keypress.native="keyPressProducto"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Producto" 
                                                            v-model="desProductoB"
                                                            show-word-limit
                                                            maxlength="250">
                                                            <el-button slot="append" icon="el-icon-search"
                                                                    @click="BuscarProducto()"></el-button>
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                                    <div>
                                                        <el-input-number v-model="cantidadP" size="small"
                                                                :precision="0" :step="1" :min="1" :max="cantidadM">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Producto:</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="16" :sm="16" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input type="text"
                                                            size="small"
                                                            ref="desProductoB"
                                                            @keypress.native="keyPressProducto"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Producto" 
                                                            v-model="desProductoB"
                                                            show-word-limit
                                                            maxlength="250">
                                                            <el-button slot="append" icon="el-icon-search"
                                                                    @click="BuscarProducto()"></el-button>
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input-number v-model="cantidadP" size="small"
                                                                :precision="0" :step="1" :min="1" :max="cantidadM">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10">
                                                <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="21">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Ingreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isOtro" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                                <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="18">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Ingreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                                    <div>
                                                        <el-input-number v-model="montoI" size="small"
                                                                :precision="2" :step="1">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isOtro" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isOtro" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="16" :sm="16" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Ingreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input-number v-model="montoI" size="small"
                                                                :precision="2" :step="1">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="padding10">
                                                <el-col :xs="12" :sm="6" :md="5" :lg="4" :xl="1">
                                                    <el-button @click="AgregarCaja('I')" class="width100" size="small" 
                                                                :disabled="!((cantidadP>0 && idProductoB!=0) || (montoI>0 && descripcion!=''))"
                                                                type="primary" icon="fas fa-save" plain> AGREGAR INGRESO
                                                    </el-button>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <div class="textAlignC cus-border">
                                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Tienda:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <div>
                                                        <el-select v-model="IdTienda" filterable placeholder="Select"
                                                            size="small" ref="IdTienda" class="width100">
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
                                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" class="paddingleft10">
                                                <el-col :xs="16" :sm="16" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Ingreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input-number v-model="montoI" size="small"
                                                                :precision="2" :step="1">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row class="padding10">
                                                <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="1">
                                                    <el-button @click="AgregarCaja('I')" class="width100" size="small" 
                                                                :disabled="!((cantidadP>0 && idProductoB!=0) || (montoI>0 && descripcion!=''))"
                                                                type="primary" icon="fas fa-save" plain> AGREGAR INGRESO
                                                    </el-button>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                            <el-collapse-item title="Egresos" name="2">
                                <el-row :gutter="5" type="flex" class="paddingTop10">
                                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                        <div class="cus-border">
                                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Seleccione Tipo de Egreso:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <el-radio-group v-model="tipoEgreso">
                                                        <el-radio-button label="Producto"></el-radio-button>
                                                        <el-radio-button label="Otro"></el-radio-button>
                                                    </el-radio-group>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex">
                                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Tienda:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                                    <div>
                                                        <el-select v-model="IdTienda" filterable placeholder="Select"
                                                            size="small" ref="IdTienda" class="width100">
                                                            <el-option v-for="oTienda in lobeTienda" 
                                                                :key="oTienda.codigo" 
                                                                :label="oTienda.descripcion"
                                                                :value="oTienda.codigo">
                                                            </el-option>                            
                                                        </el-select>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                                <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Producto:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="18">
                                                    <div>
                                                        <el-input type="text"
                                                            size="small"
                                                            ref="desProductoB"
                                                            @keypress.native="keyPressProducto"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Producto" 
                                                            v-model="desProductoB"
                                                            show-word-limit
                                                            maxlength="250">
                                                            <el-button slot="append" icon="el-icon-search"
                                                                    @click="BuscarProducto()"></el-button>
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                                    <div>
                                                        <el-input-number v-model="cantidadP" size="small"
                                                                :precision="0" :step="1" :min="1" :max="cantidadM">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Producto:</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="16" :sm="16" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input type="text"
                                                            size="small"
                                                            ref="desProductoB"
                                                            @keypress.native="keyPressProducto"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Producto" 
                                                            v-model="desProductoB"
                                                            show-word-limit
                                                            maxlength="250">
                                                            <el-button slot="append" icon="el-icon-search"
                                                                    @click="BuscarProducto()"></el-button>
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input-number v-model="cantidadP" size="small"
                                                                :precision="0" :step="1" :min="1" :max="cantidadM">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isProducto" class="paddingTop10">
                                                <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="18" :lg="19" :xl="21">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Ingreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isOtro" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                                <el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="1">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="15" :lg="16" :xl="18">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Egreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                                                    <div>
                                                        <el-input-number v-model="montoI" size="small"
                                                                :precision="2" :step="1">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isOtro" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                                    <div class="cus-label-form-left">
                                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row :gutter="5" type="flex" v-show="isOtro" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                                <el-col :xs="16" :sm="16" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input type="text" class="width100"
                                                            size="small"
                                                            ref="descripcion"
                                                            @keyup.native="KeyUpDescripcion"
                                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                                            placeholder="Descripción Egreso" 
                                                            v-model="descripcion"
                                                            show-word-limit
                                                            maxlength="250">
                                                        </el-input>
                                                    </div>
                                                </el-col>
                                                <el-col :xs="8" :sm="8" :md="24" :lg="24" :xl="24">
                                                    <div>
                                                        <el-input-number v-model="montoI" size="small"
                                                                :precision="2" :step="1">
                                                        </el-input-number>
                                                    </div>
                                                </el-col>
                                            </el-row>
                                            <el-row v-show="(isProducto || isOtro)" class="padding10">
                                                <el-col :xs="12" :sm="8" :md="5" :lg="4" :xl="1">
                                                    <el-button @click="AgregarCaja('E')" class="width100" size="small" 
                                                                :disabled="!((cantidadP>0 && idProductoB!=0) || (montoI>0 && descripcion!=''))"
                                                                type="primary" icon="fas fa-save" plain> AGREGAR EGRESO
                                                    </el-button>
                                                </el-col>
                                            </el-row>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-collapse-item>
                        </el-collapse>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="tittleReporte==''">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="seriesIngreso.length>0">
                        <div class="textAlignC cus-border">
                            <div class="textAlignC paddingTop0">
                                <el-tag class="width100 fontsize15Bold" type="info">Ingresos del Día</el-tag>
                            </div>
                            <div class="textAlignC paddingTop10">
                                <apexchart type="pie" 
                                :options="optionsIngreso"
                                :series="seriesIngreso"></apexchart>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="seriesEgreso.length>0">
                        <div class="textAlignC cus-border">
                            <div class="textAlignC paddingTop0">
                                <el-tag class="width100 fontsize15Bold" type="info">Egresos del Día</el-tag>
                            </div>
                            <div class="textAlignC paddingTop10">
                                <apexchart type="pie" 
                                :options="optionsEgreso"
                                :series="seriesEgreso"></apexchart>
                            </div>
                        </div>
                    </el-col>
                </el-row>

                <el-row :gutter="5" class="paddingTop10" v-show="tittleReporte!=''">
                    <el-tag type="success" class="cus-tag-header-panel">{{tittleReporte}}</el-tag>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10">
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Caja!=0 && tittleReporte!=''">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="info" effect="dark" v-show="Caja>=0">Caja Inicio: {{Caja}}</el-tag>
                            <el-tag class="width100 fontsize15Bold" type="danger" effect="dark" v-show="Caja<0">Caja Inicio: {{Caja}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="lobeListado.length>0">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="success" effect="dark">Ingresos: {{Ingresos}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="lobeListado.length>0">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="danger" effect="dark">Egresos: {{Egresos}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Caja>=0 && tittleReporte!=''">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="info" effect="dark">Total: {{Total}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" v-show="lobeListado.length>0">
                        <el-button @click="exportarLista()" class="width100" size="small" 
                                    :disabled="!((isDia && fechaDia!='') || 
                                                (isMes && fechaMes!='') || 
                                                (isAnio && fechaAnio!='') || 
                                                (isRango && fechaRango!=''))"
                                    type="warning" icon="fas fa-download" plain> EXPORTAR
                        </el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 margintop10 cus-border" v-show="lobeListado.length>0">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <div>
                                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                                            style="width: 100%" height="300"
                                            highlight-current-row>
                                        <el-table-column v-for="column in loColumns" 
                                                        :key="column.field"
                                                        :prop="column.field"
                                                        :label="column.header"
                                                        :width="column.width"
                                                        :fixed="(column.field=='Precio')?'right':false">
                                            <template slot="header" slot-scope="scope">
                                                <span class="fontsize13Bold textAdjustWord">{{column.header}}</span>
                                            </template>
                                            <template slot-scope="scope">
                                                <el-tag v-show="column.field=='Precio' && scope.row['Tipo']=='Egreso' && scope.row['Precio']!=0"
                                                    type="danger" class="fontsize13Bold"
                                                    disable-transitions>{{scope.row.Precio}}</el-tag>
                                                <el-tag v-show="column.field=='Precio' && scope.row['Tipo']=='Ingreso' && scope.row['Precio']!=0"
                                                    type="success" class="fontsize13Bold"
                                                    disable-transitions>{{scope.row.Precio}}</el-tag>
                                                <span class="fontsize12" v-show="!(column.field=='Precio')">{{scope.row[column.field]}}</span>
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
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="tittleReporte!=''">
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="seriesIngreso.length>0">
                        <div class="textAlignC cus-border">
                            <div class="textAlignC paddingTop0">
                                <el-tag class="width100 fontsize15Bold" type="info">Ingresos
                                </el-tag>  
                            </div>
                            <div class="textAlignC paddingTop10">
                                <apexchart type="pie" 
                                :options="optionsIngreso"
                                :series="seriesIngreso"></apexchart>
                            </div>
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" v-show="seriesEgreso.length>0">
                        <div class="textAlignC cus-border">
                            <div class="textAlignC paddingTop0">
                                <el-tag class="width100 fontsize15Bold" type="info">Egresos</el-tag>
                            </div>
                            <div class="textAlignC paddingTop10">
                                <apexchart type="pie" 
                                :options="optionsEgreso"
                                :series="seriesEgreso"></apexchart>
                            </div>
                        </div>
                    </el-col>
                </el-row>
                
            </el-main>
        </el-container>
        <modal-productos :isModal="isModal" @interface="Cargar" :busqueda="desProductoB" :idTienda="IdTienda">
        </modal-productos>
    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import DevolverService from '@/services/devolver/devolver-service'
import { mapState,mapGetters } from "vuex";
//MODAL
import ModalProductos from '@/components/pages/caja/modals/mdlProductoEI'
//SERVICIO
import CajaService from '@/services/caja/caja-service'
import ExcelService from '@/services/excel/excel-service'

export default {
    name: "app",
    components: { 
      HeaderPage, ModalProductos
    },
    data() {
        return {
            tittleModulo:'Control de Caja',
            ///==============================================================
            activeName:'',
            ///==============================================================
            IdTienda:0,
            lobeTienda:[],
            ///==============================================================
            tipoFiltro:'',
            ///==============================================================
            isDia:false,
            fechaDia:'',
            isMes:false,
            fechaMes:'',
            isAnio:false,
            fechaAnio:'',
            isRango:false,
            fechaRango:'',
            ///==============================================================
            tipoEgreso:'Otro',
            ///==============================================================
            isProducto:false,
            desProductoB:'',
            cantidadP:0,
            descripcion:'',
            isOtro:false,
            montoI:0,
            ///==============================================================
            tittleReporte:'',
            seriesIngreso: [],
            optionsIngreso : {},
            seriesEgreso: [],
            optionsEgreso : {},
            ///==============================================================
            lobeListado:[],
            lobeListadoFiltrado:[],
            loColumns:[],
            currentPage: 1,
            pageSize: 100,
            totalrows: 0,
            ///==============================================================
            isModal:false,
            ///==============================================================
            isCargaProd:false,
            idProductoB:0,
            ///==============================================================
            Ingresos:0,
            Egresos:0,
            Caja:0,
            Total:0,
            ///==============================================================
            //ingreso:'',
            cantidadM:0,
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
            this.lobeTienda = this.loTienda;
            let cant = this.loTienda.filter(obe=>obe.codigo!=0).length;
            if(cant==1){
                this.IdTienda = this.loTienda.filter(obe=>obe.codigo!=0)[0].codigo;
            } else {
                this.IdTienda = 0;
            }
        }
    },
    computed: {
        ...mapState(["usuario","loTienda","permisos"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        tipoFiltro: function(n){
            this.Limpiar(false);
            if (n=="Día"){
                this.isDia=true;
            } else if (n=="Mes"){
                this.isMes=true;
            } else if (n=="Año"){
                this.isAnio=true;
            } else if (n=="Rango de Fechas"){
                this.isRango=true;
            }
        },
        tipoEgreso: function(n){
            this.LimpiarEgreso();
            if (n=="Producto"){
                this.isProducto=true;
                this.isOtro=false;
            } else if (n=="Otro"){
                this.isProducto=false;
                this.isOtro=true;
            }
        },
        desProductoB: function(n,o){
            if(n!=o && this.isCargaProd){
                this.isCargaProd=false;
            } else {
                this.idProductoB = 0;
            }
        },
        activeName: function(n,o){
            if(n!=o){
                this.LimpiarEgreso();
                if(n =="1" || n =="2"){
                    this.tipoEgreso = "Otro";
                    this.isOtro=true;
                }
            }
        },
        tittleReporte: function(n){
            if(n==''){
                this.CargarDatosIniciales();
            }
        },
    },
    methods: {
        ///==============================================================
        Buscar(){
            var msj = this.ValidarBuscar();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.BuscarBD();                
            }            
        },
        ValidarBuscar(){
            if(this.isDia && this.fechaDia==''){
                return 'Debe seleccionar Día.';
            }
            if(this.isMes && this.fechaMes==''){
                return 'Debe seleccionar Mes .';
            }
            if(this.isAnio && this.fechaAnio==''){
                return 'Debe seleccionar Año.';
            }
            if(this.isRango && this.fechaRango==''){
                return 'Debe seleccionar Rango de Fechas.';
            }          
            return '';
        },
        BuscarBD(){
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
            //----------------------------------
            this.tittleReporte='';
            this.Ingresos = 0;
            this.Egresos = 0;
            this.Caja = 0;
            this.Total = 0;
            //----------------------------------
            let fechainicio = "";
            let fechafin = "";
            if (this.isDia){
                this.tittleReporte="FLUJO DE CAJA POR DIA";
                fechainicio = this.fechaDia.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaDia.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaDia.getDate().toString().padStart(2,'0');
            } else if (this.isMes){
                this.tittleReporte="FLUJO DE CAJA POR MES";
                fechainicio = this.fechaMes.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaMes.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaMes.getDate().toString().padStart(2,'0');
            } else if (this.isAnio){
                this.tittleReporte="FLUJO DE CAJA POR AÑO";
                fechainicio = this.fechaAnio.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaAnio.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaAnio.getDate().toString().padStart(2,'0');
            } else if (this.isRango){
                this.tittleReporte="FLUJO DE CAJA POR RANGO";
                fechainicio = this.fechaRango[0].getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaRango[0].getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaRango[0].getDate().toString().padStart(2,'0');
                fechafin = this.fechaRango[1].getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaRango[1].getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaRango[1].getDate().toString().padStart(2,'0');
            }
            
            const loading = this.$loading({
                lock: true,
                text: 'Buscando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            
            CajaService.CargarReporteCaja(this.usuario.usuarioLogin, this.usuario.idCliente, this.isDia,
                                        this.isMes, this.isAnio, this.isRango, fechainicio, fechafin)
                .then(res => {
                    loading.close();
                    if (res.status==200){                      
                        this.loColumns = res.result.loColumns;
                        this.lobeListado = res.result.listado;
                        if(this.lobeListado.length>0){
                            let ingreso = 0;
                            let egreso = 0;
                            for(var i=0;i<this.lobeListado.length;i+=1){
                                if(this.lobeListado[i].Tipo=='Egreso'){
                                    egreso += this.lobeListado[i].Precio;
                                } else if(this.lobeListado[i].Tipo=='Ingreso'){
                                    ingreso += this.lobeListado[i].Precio;
                                }
                            }
                            this.Ingresos = Math.round(ingreso*100)/100;
                            this.Egresos = Math.round(egreso*100)/100;
                        }
                        this.lobeGraficoIngreso = res.result.loGraficoIngreso;
                        this.lobeGraficoEgreso = res.result.loGraficoEgreso;
                        this.Caja = Math.round(res.result.CajaAnterior*100)/100;
                        this.Total = Math.round((this.Caja + this.Ingresos  -this.Egresos)*100)/100;
                        this.CargarGraficos(this.lobeGraficoIngreso, this.lobeGraficoEgreso);
                        this.Paginar();
                    } else if (res.status==300){
                        this.Caja = Number(res.mensaje);
                        this.Total = Math.round((this.Caja + this.Ingresos  -this.Egresos)*100)/100;
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'warning'
                        });
                        this.CargarGraficos([], []);
                    } else if (res.status==400){
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'error'
                        });
                        this.CargarGraficos([], []);
                    }
                })
                .catch((err) => {
                    loading.close();
                    this.$message({
                        showClose: true,
                        message: err,
                        type: 'error'
                    });
                });
        },
        CargarGraficos(loIngreso, loEgreso){
            if(loIngreso.length>0){
                this.seriesIngreso = loIngreso[0].serie;
                this.optionsIngreso = {
                    chart: {
                        type: 'pie',
                    },
                    labels: loIngreso[0].label,
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        type: 'gradient',
                    },
                    legend: {
                        position: 'bottom',
                        formatter: function(val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }]
                };
            } else {
                this.seriesIngreso = [];
                this.optionsIngreso = {};
            }
            if(loEgreso.length>0){
                this.seriesEgreso = loEgreso[0].serie;
                this.optionsEgreso = {
                    chart: {
                        type: 'pie',
                    },
                    labels: loEgreso[0].label,
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        type: 'gradient',
                    },
                    legend: {
                        horizontalAlign: 'center',
                        width: 350,
                        position: 'bottom',
                        formatter: function(val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }]
                };
            } else {
                this.seriesEgreso = [];
                this.optionsEgreso = {};
            }
        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;
            this.lobeListadoFiltrado = this.lobeListado;
            this.totalrows=this.lobeListadoFiltrado.length;
            if(this.totalrows>0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.slice(filaInicio,filaFin);
            }
        },
        ///==============================================================
        Limpiar(isAll){
            this.isDia=false;
            this.isMes=false;
            this.isAnio=false;
            this.isRango=false;
            //-----------------------------------
            this.fechaDia='';
            this.fechaMes='';
            this.fechaAnio='';
            this.fechaRango='';
            //----------------------------------
            //----------------------------------
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
            //----------------------------------
            this.tittleReporte='';
            //----------------------------------
            if(isAll){
                this.tipoFiltro='';
            }
        },
        ///==============================================================
        AgregarCaja(tipo){
            if(tipo=='I' || tipo=='E'){
                var msj = this.ValidarIngresoEgreso();
                if(msj!=''){
                    this.$message({
                        showClose: true,
                        message: msj,
                        type: 'warning'
                    });
                } else {
                    this.AgregarCajaBD(tipo);                
                }   
            }
        },
        ValidarIngresoEgreso(){
            if(this.IdTienda==0){
                return 'Debe seleccionar Tienda.';
            }
            if(this.isProducto && this.idProductoB==0){
                return 'Debe buscar Producto.';
            }
            if(this.isProducto && this.cantidadP==0){
                return 'Debe ingresar Cantidad de Producto.';
            }
            if(this.isOtro && this.descripcion==""){
                return 'Debe ingresar detalle de Ingreso / Egreso.';
            }
            if(this.isOtro && this.montoI==0){
                return 'Debe ingresar Precio de Ingreso / Egreso.';
            }
            return '';
        },
        AgregarCajaBD(tipo){
            const loading = this.$loading({
                lock: true,
                text: 'Ingresando Información...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            CajaService.Guardar(this.CreaObjetoEnvioBD(tipo))
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.LimpiarEgreso();
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'success'
                        });
                    } else if (res.status==210){
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
        CreaObjetoEnvioBD : function(tipo){
            var item = {};
            /*if (tipo=='I'){
                item.Usuario = this.usuario.usuarioLogin;
                item.IdTienda = this.IdTienda;
                item.IdCliente = this.usuario.idCliente;
                item.Descripcion = this.isOtro?this.descripcion:"";
                item.Precio = this.isOtro?this.montoI:0;
                item.Cantidad = this.isProducto?this.cantidadP:1;
                item.CodProducto = this.isProducto?this.idProductoB:0;
                item.Tipo = tipo;
            } else if (tipo=='E'){*/
                item.Usuario = this.usuario.usuarioLogin;
                item.IdTienda = this.IdTienda;
                item.IdCliente = this.usuario.idCliente;
                item.Descripcion = this.descripcion;
                item.Precio = this.isOtro?this.montoI:0;
                item.Cantidad = this.isProducto?this.cantidadP:1;
                item.CodProducto = this.isProducto?this.idProductoB:0;
                item.Tipo = tipo;
            //}
            return item;
        },
        ///==============================================================
        BuscarProducto(){
            this.isModal=true;
        },
        ///==============================================================
        exportarLista(){
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
        getDataExcel(){
            var indata2=[]
            for(var i = 0; i< this.lobeListado.length; i++){
                var obj = this.lobeListado[i];
                var indata=[]
                var result = Object.keys(obj).map(function(key) {
                    indata.push(obj[key]);
                });
                indata2.push(indata);
            }
            return indata2;
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
        ///==============================================================
        Cargar(val, data){
            this.isModal=val;
            if(data!=null){
                this.isCargaProd = true;
                this.idProductoB = data.Id;
                this.desProductoB = data.Nombre;
                this.cantidadM = data.Stock;
            } else {
                this.idProductoB = 0;
                this.desProductoB = "";
                this.cantidadM = 0;
            }
        },
        ///==============================================================
        LimpiarEgreso(val){
            //-----------------------------------
            this.Limpiar(true);
            //----------------------------------
            //this.isProducto=false;
            //this.isOtro=false;
            //----------------------------------
            this.isCargaProd=false;
            this.idProductoB = 0;
            this.desProductoB = "";
            this.descripcion = "";
            this.montoI = 0;
            this.cantidadP = 0;
            //----------------------------------
            /*if(val){
                this.tipoEgreso="";
            }*/
        },
        ///==============================================================
        CargarDatosIniciales(){
            let obe = {
                Usuario: this.usuario.usuarioLogin,
                IdCliente: this.usuario.idCliente,
                loTienda: this.loTienda.filter(obe=>obe.codigo!=0)
            }
            CajaService.CargarDatosIniciales(obe)
                .then(res => {
                    if (res.status==200){
                        this.lobeGraficoIngreso = res.result.loGraficoIngreso;
                        this.lobeGraficoEgreso = res.result.loGraficoEgreso;
                        this.CargarGraficosIniciales(this.lobeGraficoIngreso, this.lobeGraficoEgreso);
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
        CargarGraficosIniciales(loIngreso, loEgreso){
            if(loIngreso.length>0){
                this.seriesIngreso = loIngreso[0].serie;
                this.optionsIngreso = {
                    chart: {
                        type: 'pie',
                    },
                    labels: loIngreso[0].label,
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        type: 'gradient',
                    },
                    legend: {
                        position: 'bottom',
                        formatter: function(val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }]
                };
            } else {
                this.seriesIngreso = [];
                this.optionsIngreso = {};
            }
            if(loEgreso.length>0){
                this.seriesEgreso = loEgreso[0].serie;
                this.optionsEgreso = {
                    chart: {
                        type: 'pie',
                    },
                    labels: loEgreso[0].label,
                    dataLabels: {
                        enabled: false
                    },
                    fill: {
                        type: 'gradient',
                    },
                    legend: {
                        horizontalAlign: 'center',
                        width: 350,
                        position: 'bottom',
                        formatter: function(val, opts) {
                        return val + " - " + opts.w.globals.series[opts.seriesIndex]
                        }
                    },
                    responsive: [{
                        breakpoint: 480,
                        options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                        }
                    }]
                };
            } else {
                this.seriesEgreso = [];
                this.optionsEgreso = {};
            }
        },
        ///==============================================================
        KeyUpDescripcion(){
            this.descripcion = this.descripcion.toUpperCase();
        },
        keyPressProducto(a){
            if(a.key == "Enter" && this.desProductoB.length>0)
            {
                this.BuscarProducto();
                a.returnValue = true;
            }
        },
    }
};
</script>

<style lang="scss">
    .el-collapse-item__header{
        font-size: 15px !important;
        font-weight: bold !important;
    }
    .el-table__body tr.current-row > td {
        background-color: lightblue ;
    }
    .current-row {
        background-color: lightblue ;
    }
    .el-table--enable-row-hover .el-table__body tr:hover>td{
        background-color: lightblue ;
    }
</style>
