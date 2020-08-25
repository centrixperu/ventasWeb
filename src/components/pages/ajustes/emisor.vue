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
                        <el-button @click="Nuevo()" class="width100" size="small" 
                                    type="primary" icon="fas fa-plus" plain> NUEVO
                        </el-button>
                    </el-col>
                </el-row>

                <el-row :gutter="5" type="flex" class="paddingTop0" v-show="(isNuevo || isEdicion)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0" v-show="permisos.isAdministrador">
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
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Código Surcursal:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="codigo"
                                            size="small"
                                            ref="codSurcursal"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Código Surcursal" 
                                            v-model="codSurcursal"
                                            show-word-limit
                                            maxlength="5">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--<el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Serie Boleta:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text"
                                            size="small"
                                            ref="serieBoleta"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Serie Boleta" 
                                            v-model="serieBoleta"
                                            show-word-limit
                                            maxlength="5">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Serie Factura:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text"
                                            size="small"
                                            ref="serieFactura"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Serie Factura" 
                                            v-model="serieFactura"
                                            show-word-limit
                                            maxlength="5">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>-->
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Nombre Comercial:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" readonly
                                            size="small"
                                            ref="nomComercial"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombre Comercial" 
                                            v-model="nomComercial"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Nombre Legal:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" readonly
                                            size="small"
                                            ref="nomLegal"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombre Legal" 
                                            v-model="nomLegal"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--<el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">RUC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text"
                                            size="small"
                                            ref="ruc"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="RUC" 
                                            v-model="ruc"
                                            show-word-limit
                                            maxlength="11">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>-->
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Dirección:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" readonly
                                            size="small"
                                            ref="direccion"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Dirección" 
                                            v-model="direccion"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Urbanización:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" readonly
                                            size="small"
                                            ref="urbanizacion"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Urbanización" 
                                            v-model="urbanizacion"
                                            show-word-limit
                                            maxlength="150">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Departamento:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdDepartamento" filterable placeholder="Select"
                                            size="small" ref="IdDepartamento" class="width100">
                                            <el-option v-for="oDepartamento in lobeDepartamento" 
                                                :key="oDepartamento.codigo" 
                                                :label="oDepartamento.descripcion"
                                                :value="oDepartamento.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Provincia:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdProvincia" filterable placeholder="Select"
                                            size="small" ref="IdProvincia" class="width100">
                                            <el-option v-for="oProvincia in lobeProvincia" 
                                                :key="oProvincia.codigo" 
                                                :label="oProvincia.descripcion"
                                                :value="oProvincia.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Distrito:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdDistrito" filterable placeholder="Select"
                                            size="small" ref="IdDistrito" class="width100">
                                            <el-option v-for="oDistrito in lobeDistrito" 
                                                :key="oDistrito.codigo" 
                                                :label="oDistrito.descripcion"
                                                :value="oDistrito.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Ubigeo:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" readonly
                                            size="small" 
                                            ref="ubigeo"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Ubigeo" 
                                            v-model="ubigeo"
                                            show-word-limit>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <!--<el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Certificado Digital:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <input type="file" id="avatar" :v-model="formArch.avatar" 
                                            class="custom-file-input-e width100" 
                                            v-on:change="onUpload($event)" />
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Clave Digital:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="password"
                                            size="small"
                                            ref="claveDigital"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Clave Digital" 
                                            v-model="claveDigital"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Usuario SOL:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text"
                                            size="small"
                                            ref="usuarioSOL"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Usuario SOL" 
                                            v-model="usuarioSOL"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Clave SOL:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="password"
                                            size="small"
                                            ref="claveSOL"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Clave SOL" 
                                            v-model="claveSOL"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>-->
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Detracción:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input-number ref="detraccion" 
                                            size="small" v-model="detraccion" :precision="2" :step="0.01"></el-input-number> %
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">IGV:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input-number ref="igv" 
                                            size="small" v-model="igv" :precision="2" :step="0.01"></el-input-number> %
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">ISC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input-number ref="isc" 
                                            size="small" v-model="isc" :precision="2" :step="0.01"></el-input-number> %
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Activo:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="activo"
                                            ref="activo">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>   
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Impresión:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="impresion"
                                            ref="impresion">
                                            <el-radio-button label="A4"></el-radio-button>
                                            <el-radio-button label="Ticket"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>   
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isNuevo || isEdicion)">
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
                    <el-tag type="success" class="cus-tag-header-panel">LISTADO</el-tag>
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
                                <el-table-column prop="desCliente" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Cliente</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 22?'colorOrderBottom':'']" @click="Ascendente(22)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 22?'colorOrderTop':'']" @click="Descendente(22)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="desClienteTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desTienda" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Tienda</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(1)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(1)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="desTiendaTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="codSurcursal" 
                                        width="140">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Cod. Surcursal</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 2?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 2?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="codSurcursalTable"></el-input>
                                    </template>
                                </el-table-column>
                                <!--<el-table-column prop="serieBoleta" 
                                        width="130">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Serie Boleta</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="serieBoletaTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="serieFactura" 
                                        width="130">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Serie Factura</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(4)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(4)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="serieFacturaTable"></el-input>
                                    </template>
                                </el-table-column>-->
                                <el-table-column prop="nomComercial" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Nombre Comercial</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 5?'colorOrderBottom':'']" @click="Ascendente(5)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 5?'colorOrderTop':'']" @click="Descendente(5)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nomComercialTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="nomLegal" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Nombre Legal</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 6?'colorOrderBottom':'']" @click="Ascendente(6)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 6?'colorOrderTop':'']" @click="Descendente(6)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nomLegalTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ruc" 
                                        width="120">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">RUC</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 7?'colorOrderBottom':'']" @click="Ascendente(7)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 7?'colorOrderTop':'']" @click="Descendente(7)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="rucTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="direccion" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Dirección</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 8?'colorOrderBottom':'']" @click="Ascendente(8)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 8?'colorOrderTop':'']" @click="Descendente(8)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="direccionTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="urbanizacion" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Urbanización</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 9?'colorOrderBottom':'']" @click="Ascendente(9)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 9?'colorOrderTop':'']" @click="Descendente(9)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="urbanizacionTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desDepartamento" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Departamento</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 10?'colorOrderBottom':'']" @click="Ascendente(10)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 10?'colorOrderTop':'']" @click="Descendente(10)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="desDepartamentoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desProvincia" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Provincia</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 11?'colorOrderBottom':'']" @click="Ascendente(11)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 11?'colorOrderTop':'']" @click="Descendente(11)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="desProvinciaTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="desDistrito" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Distrito</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 12?'colorOrderBottom':'']" @click="Ascendente(12)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 12?'colorOrderTop':'']" @click="Descendente(12)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="desDistritoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ubigeo" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Ubigeo</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 13?'colorOrderBottom':'']" @click="Ascendente(13)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 13?'colorOrderTop':'']" @click="Descendente(13)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="ubigeoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="detraccion" 
                                        width="120">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Detracción</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 14?'colorOrderBottom':'']" @click="Ascendente(14)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 14?'colorOrderTop':'']" @click="Descendente(14)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="detraccionTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="igv" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">IGV</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 15?'colorOrderBottom':'']" @click="Ascendente(15)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 15?'colorOrderTop':'']" @click="Descendente(15)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="igvTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="isc" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">ISC</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 16?'colorOrderBottom':'']" @click="Ascendente(16)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 16?'colorOrderTop':'']" @click="Descendente(16)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="iscTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-tag v-show="scope.row.activo" type="success">Activo</el-tag>
                                        <el-tag v-show="!scope.row.activo" type="danger">Inactivo</el-tag>
                                    </template>
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Estado</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 17?'colorOrderBottom':'']" @click="Ascendente(17)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 17?'colorOrderTop':'']" @click="Descendente(17)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="estadoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                    fixed="right"
                                    label="Operaciones"
                                    width="120">
                                    <template slot-scope="scope">
                                        <el-button
                                        size="mini" icon="el-icon-edit"
                                        @click="Editar(scope.row.Id, scope.row)"></el-button>
                                        <el-button
                                        size="mini"
                                        type="danger" icon="el-icon-delete"
                                        @click="Eliminar(scope.row.Id, scope.row)"></el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="UsrCreador" 
                                        width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Usuario Creación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 18?'colorOrderBottom':'']" @click="Ascendente(18)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 18?'colorOrderTop':'']" @click="Descendente(18)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="usrCreadorTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="FchCreacion" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Fecha Creación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 19?'colorOrderBottom':'']" @click="Ascendente(19)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 19?'colorOrderTop':'']" @click="Descendente(19)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="fchCreacionTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="UsrModificador" 
                                        width="180">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Usuario Modificación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 20?'colorOrderBottom':'']" @click="Ascendente(20)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 20?'colorOrderTop':'']" @click="Descendente(20)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="usrModificadorTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="FchModificacion" 
                                        width="170">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Fecha Modificación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 21?'colorOrderBottom':'']" @click="Ascendente(21)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 21?'colorOrderTop':'']" @click="Descendente(21)"></i>
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
                                    placeholder="Buscar Tienda Emisor" 
                                    @keypress.native="keyUpBuscar"
                                    v-model="nomBuscar">
                                    <el-button slot="append" icon="el-icon-search"
                                            @click="Buscar()"></el-button>
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
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oListado.desTienda}}</span>
                                            <el-button-group>
                                                <el-button
                                                    size="mini" icon="el-icon-edit"
                                                    @click="Editar(oListado.Id, oListado)"></el-button>
                                                <el-button
                                                    size="mini" type="danger" icon="el-icon-delete"
                                                    @click="Eliminar(oListado.Id, oListado)"></el-button>
                                            </el-button-group> 
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width105P">Cliente:</span>
                                            <el-input class="paddingRight10" v-model="oListado.desCliente" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Nombre Comercial:</span>
                                            <el-input class="paddingRight10" v-model="oListado.nomComercial" size="mini" readonly></el-input>
                                            <!--<span class="cus-label textAdjust textAlignL width105P">Nombre Legal:</span>
                                            <el-input class="paddingRight10" v-model="oListado.nomLegal" size="mini" readonly></el-input>-->
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Nombre Legal:</span>
                                            <el-input class="paddingRight10" v-model="oListado.nomLegal" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Dirección:</span>
                                            <el-input class="paddingRight10" v-model="oListado.direccion" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Urbanización:</span>
                                            <el-input class="paddingRight10" v-model="oListado.urbanizacion" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Departamento:</span>
                                            <el-input class="paddingRight10" v-model="oListado.desDepartamento" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width75P">Provincia:</span>
                                            <el-input class="paddingRight10" v-model="oListado.desProvincia" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width60P">Distrito:</span>
                                            <el-input class="paddingRight10" v-model="oListado.desDistrito" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <!--<el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Provincia:</span>
                                            <el-input class="paddingRight10" v-model="oListado.desProvincia" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Distrito:</span>
                                            <el-input class="paddingRight10" v-model="oListado.desDistrito" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>-->
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width105P">Detracción:</span>
                                            <el-input class="paddingRight10 width75P" v-model="oListado.detraccion" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width60P">IGV:</span>
                                            <el-input class="paddingRight10 width75P" v-model="oListado.igv" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width60P">ISC:</span>
                                            <el-input class="paddingRight10 width75P" v-model="oListado.isc" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Estado:</span>
                                            <el-tag v-show="oListado.activo" type="success">Activo</el-tag>
                                            <el-tag v-show="!oListado.activo" type="danger">Inactivo</el-tag>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width105P">Usuario Creación:</span>
                                            <el-input class="paddingRight10" v-model="oListado.UsrCreador" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width105P">Fecha Creación:</span>
                                            <el-input v-model="oListado.FchCreacion" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width105P">Usuario Modificación:</span>
                                            <el-input class="paddingRight10" v-model="oListado.UsrModificador" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width105P">Fecha Modificación:</span>
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
    </div>

  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AjusteEmisorService from '@/services/ajustes/emisor-service'
import { mapState,mapGetters } from "vuex";
// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            btnGuardar:'GUARDAR',
            nomBuscar:"",
            //-----------------------------------
            tittleModulo:'Emisor Electrónico',
            //-----------------------------------
            formArch: {
                avatar: []
            }, 
            //-----------------------------------
            Id:0,
            IdTienda:0,
            lobeTienda:[],
            codSurcursal:"",
            serieBoleta:"",
            serieFactura:"",
            nomComercial:"",
            nomLegal:"",
            ruc:"",
            direccion:"",
            urbanizacion:"",
            IdDepartamento:"0",
            lobeDepartamento:[],
            IdProvincia:"0",
            lobeProvincia:[],
            IdDistrito:"0",
            lobeDistrito:[],
            ubigeo:"",
            claveDigital:"",
            usuarioSOL:"",
            claveSOL:"",
            detraccion:0,
            igv:0,
            isc:0,
            activo:"SI",
            impresion:"A4",
            //-----------------------------------
            IdCliente:-1,
            lobeCliente:[],
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
            isNuevo:false,
            isEdicion:false,
            isEdicionDep :false,
            isEdicionProv :false,
            //-----------------------------------
            idTable:"",
            desTiendaTable:"",
            codSurcursalTable:"",
            serieBoletaTable:"",
            serieFacturaTable:"",
            nomComercialTable:"",
            nomLegalTable:"",
            rucTable:"",
            direccionTable:"",
            urbanizacionTable:"",
            desDepartamentoTable:"",
            desProvinciaTable:"",
            desDistritoTable:"",
            ubigeoTable:"",
            detraccionTable:"",
            igvTable:"",
            iscTable:"",
            estadoTable:"",
            usrCreadorTable:"",
            fchCreacionTable:"",
            usrModificadorTable:"",
            fchModificacionTable:"",
            desClienteTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'desTienda', Valor:''},
                {columna:'codSurcursal', Valor:'',},
                {columna:'serieBoleta', Valor:'',},
                {columna:'serieFactura', Valor:'',},
                {columna:'nomComercial', Valor:'',},
                {columna:'nomLegal', Valor:'',},
                {columna:'ruc', Valor:'',},
                {columna:'direccion', Valor:'',},
                {columna:'urbanizacion', Valor:'',},
                {columna:'desDepartamento', Valor:'',},
                {columna:'desProvincia', Valor:'',},
                {columna:'desDistrito', Valor:'',},
                {columna:'ubigeo', Valor:'',},
                {columna:'detraccion', Valor:'',},
                {columna:'igv', Valor:'',},
                {columna:'isc', Valor:'',},
                {columna:'activo', Valor:'',},
                {columna:'UsrCreador', Valor:'',},
                {columna:'FchCreacion', Valor:'',},
                {columna:'UsrModificador', Valor:'',},
                {columna:'FchModificacion', Valor:'',},
                {columna:'desCliente', Valor:'',}
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
        /*IdCliente: function(n){
            this.CambiarDatosCliente(n);
        },*/
        nomBuscar: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        //------ FILTROS
        idTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        desTiendaTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        codSurcursalTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        serieBoletaTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        serieFacturaTable: function(n){
            this.filtros[4].Valor = n;
            this.Paginar();
        },
        nomComercialTable: function(n){
            this.filtros[5].Valor = n;
            this.Paginar();
        },
        nomLegalTable: function(n){
            this.filtros[6].Valor = n;
            this.Paginar();
        },
        rucTable: function(n){
            this.filtros[7].Valor = n;
            this.Paginar();
        },
        direccionTable: function(n){
            this.filtros[8].Valor = n;
            this.Paginar();
        },
        urbanizacionTable: function(n){
            this.filtros[9].Valor = n;
            this.Paginar();
        },
        desDepartamentoTable: function(n){
            this.filtros[10].Valor = n;
            this.Paginar();
        },
        desProvinciaTable: function(n){
            this.filtros[11].Valor = n;
            this.Paginar();
        },
        desDistritoTable: function(n){
            this.filtros[12].Valor = n;
            this.Paginar();
        },
        ubigeoTable: function(n){
            this.filtros[13].Valor = n;
            this.Paginar();
        },
        detraccionTable: function(n){
            this.filtros[14].Valor = n;
            this.Paginar();
        },
        igvTable: function(n){
            this.filtros[15].Valor = n;
            this.Paginar();
        },
        iscTable: function(n){
            this.filtros[16].Valor = n;
            this.Paginar();
        },
        estadoTable: function(n){
            this.filtros[17].Valor = n;
            this.Paginar();
        },
        usrCreadorTable: function(n){
            this.filtros[18].Valor = n;
            this.Paginar();
        },
        fchCreacionTable: function(n){
            this.filtros[19].Valor = n;
            this.Paginar();
        },
        usrModificadorTable: function(n){
            this.filtros[20].Valor = n;
            this.Paginar();
        },
        fchModificacionTable: function(n){
            this.filtros[21].Valor = n;
            this.Paginar();
        },
        desClienteTable: function(n){
            this.filtros[22].Valor = n;
            this.Paginar();
        },
        //----------
        IdTienda: function(n){
            if(n!=0){
                var index = this.lobeTienda.findIndex(tda=>tda.codigo==n);
                if (index!=-1){
                    this.direccion = this.lobeTienda[index].direccion;
                    this.urbanizacion = this.lobeTienda[index].urbanizacion;
                    this.nomComercial = this.lobeTienda[index].NombreComercial;
                    this.nomLegal = this.lobeTienda[index].NombreLegal;
                }
            }else{
                this.direccion = "";
                this.urbanizacion = "";
            }
        },
        //------ 
        IdDepartamento: function(n){
            if(!this.isEdicionDep){
                this.IdProvincia = "0";
                this.IdDistrito="0";
            }
            this.isEdicionDep = false;
            if(n!="0"){
                this.CargarProvincia(n);
            }else{
                this.lobeProvincia = this.lobeProvincia.filter(prov => prov.codigo == "0");
                this.lobeDistrito = this.lobeDistrito.filter(dis => dis.codigo == "0");
            }
        },
        IdProvincia: function(n){
            if(!this.isEdicionProv){
                this.IdDistrito="0";
            }
            this.isEdicionProv = false;
            if(n!="0"){
                this.CargarDistrito(n);
            }else{
                this.lobeDistrito = this.lobeDistrito.filter(dis => dis.codigo == "0");
            }
        },
        IdDistrito: function(n){
            if(n!="0"){
                this.ubigeo = this.IdDepartamento + this.IdProvincia + n;
            }else{
                this.ubigeo = "";
            }
        },
    },
    methods: {
        onUpload(event) {
            let reader = new FileReader();
            if(event.target.files && event.target.files.length > 0) {
                let file = event.target.files[0];
                reader.readAsDataURL(file);
                let valueFile;
                reader.onload =  evt => {
                    valueFile = evt.target.result;

                    let item = {
                        filename : file.name,
                        filetype : file.type,
                        filesize : file.size,
                        value : valueFile.split(',')[1] //reader.result.split(',')[1]
                    }
                    this.formArch.avatar.push(item);
                }
            } else {
                this.formArch.avatar = [];
            }
        },
        ///===================
        CargarProvincia(cod){
          AjusteEmisorService.ListarProvincia(this.usuario.usuarioLogin, cod)
            .then(res => {
                if (res.status==200){
                    this.lobeProvincia = res.result;
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
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        CargarDistrito(cod){
          AjusteEmisorService.ListarDistrito(this.usuario.usuarioLogin, this.IdDepartamento, cod)
            .then(res => {
                if (res.status==200){
                    this.lobeDistrito = res.result;
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
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
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
                    if (a.desTienda < b.desTienda)
                        return -1;
                    if (a.desTienda > b.desTienda)
                        return 1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.codSurcursal < b.codSurcursal)
                        return -1;
                    if (a.codSurcursal > b.codSurcursal)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.serieBoleta < b.serieBoleta)
                        return -1;
                    if (a.serieBoleta > b.serieBoleta)
                        return 1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.serieFactura < b.serieFactura)
                        return -1;
                    if (a.serieFactura > b.serieFactura)
                        return 1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.nomComercial < b.nomComercial)
                        return -1;
                    if (a.nomComercial > b.nomComercial)
                        return 1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.nomLegal < b.nomLegal)
                        return -1;
                    if (a.nomLegal > b.nomLegal)
                        return 1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.ruc < b.ruc)
                        return -1;
                    if (a.ruc > b.ruc)
                        return 1;
                    return 0;
                });
            } else if(id==8){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.direccion < b.direccion)
                        return -1;
                    if (a.direccion > b.direccion)
                        return 1;
                    return 0;
                });
            } else if(id==9){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.urbanizacion < b.urbanizacion)
                        return -1;
                    if (a.urbanizacion > b.urbanizacion)
                        return 1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desDepartamento < b.desDepartamento)
                        return -1;
                    if (a.desDepartamento > b.desDepartamento)
                        return 1;
                    return 0;
                });
            } else if(id==11){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desProvincia < b.desProvincia)
                        return -1;
                    if (a.desProvincia > b.desProvincia)
                        return 1;
                    return 0;
                });
            } else if(id==12){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desDistrito < b.desDistrito)
                        return -1;
                    if (a.desDistrito > b.desDistrito)
                        return 1;
                    return 0;
                });
            } else if(id==13){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.ubigeo < b.ubigeo)
                        return -1;
                    if (a.ubigeo > b.ubigeo)
                        return 1;
                    return 0;
                });
            } else if(id==14){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.detraccion < b.detraccion)
                        return -1;
                    if (a.detraccion > b.detraccion)
                        return 1;
                    return 0;
                });
            } else if(id==15){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.igv < b.igv)
                        return -1;
                    if (a.igv > b.igv)
                        return 1;
                    return 0;
                });
            } else if(id==16){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.isc < b.isc)
                        return -1;
                    if (a.isc > b.isc)
                        return 1;
                    return 0;
                });
            } else if(id==17){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.activo < b.activo)
                        return -1;
                    if (a.activo > b.activo)
                        return 1;
                    return 0;
                });
            } else if(id==18){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return -1;
                    if (a.UsrCreador > b.UsrCreador)
                        return 1;
                    return 0;
                });
            } else if(id==19){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return -1;
                    if (a.FchCreacion > b.FchCreacion)
                        return 1;
                    return 0;
                });
            } else if(id==20){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return -1;
                    if (a.UsrModificador > b.UsrModificador)
                        return 1;
                    return 0;
                });
            } else if(id==21){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchModificacion < b.FchModificacion)
                        return -1;
                    if (a.FchModificacion > b.FchModificacion)
                        return 1;
                    return 0;
                });
            } else if(id==22){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desCliente < b.desCliente)
                        return -1;
                    if (a.desCliente > b.desCliente)
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
                    if (a.desTienda < b.desTienda)
                        return 1;
                    if (a.desTienda > b.desTienda)
                        return -1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.codSurcursal < b.codSurcursal)
                        return 1;
                    if (a.codSurcursal > b.codSurcursal)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.serieBoleta < b.serieBoleta)
                        return 1;
                    if (a.serieBoleta > b.serieBoleta)
                        return -1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.serieFactura < b.serieFactura)
                        return 1;
                    if (a.serieFactura > b.serieFactura)
                        return -1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.nomComercial < b.nomComercial)
                        return 1;
                    if (a.nomComercial > b.nomComercial)
                        return -1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.nomLegal < b.nomLegal)
                        return 1;
                    if (a.nomLegal > b.nomLegal)
                        return -1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.ruc < b.ruc)
                        return 1;
                    if (a.ruc > b.ruc)
                        return -1;
                    return 0;
                });
            } else if(id==8){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.direccion < b.direccion)
                        return 1;
                    if (a.direccion > b.direccion)
                        return -1;
                    return 0;
                });
            } else if(id==9){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.urbanizacion < b.urbanizacion)
                        return 1;
                    if (a.urbanizacion > b.urbanizacion)
                        return -1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desDepartamento < b.desDepartamento)
                        return 1;
                    if (a.desDepartamento > b.desDepartamento)
                        return -1;
                    return 0;
                });
            } else if(id==11){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desProvincia < b.desProvincia)
                        return 1;
                    if (a.desProvincia > b.desProvincia)
                        return -1;
                    return 0;
                });
            } else if(id==12){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desDistrito < b.desDistrito)
                        return 1;
                    if (a.desDistrito > b.desDistrito)
                        return -1;
                    return 0;
                });
            } else if(id==13){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.ubigeo < b.ubigeo)
                        return 1;
                    if (a.ubigeo > b.ubigeo)
                        return -1;
                    return 0;
                });
            } else if(id==14){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.detraccion < b.detraccion)
                        return 1;
                    if (a.detraccion > b.detraccion)
                        return -1;
                    return 0;
                });
            } else if(id==15){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.igv < b.igv)
                        return 1;
                    if (a.igv > b.igv)
                        return -1;
                    return 0;
                });
            } else if(id==16){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.isc < b.isc)
                        return 1;
                    if (a.isc > b.isc)
                        return -1;
                    return 0;
                });
            } else if(id==17){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.activo < b.activo)
                        return 1;
                    if (a.activo > b.activo)
                        return -1;
                    return 0;
                });
            } else if(id==18){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return 1;
                    if (a.UsrCreador > b.UsrCreador)
                        return -1;
                    return 0;
                });
            } else if(id==19){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return 1;
                    if (a.FchCreacion > b.FchCreacion)
                        return -1;
                    return 0;
                });
            } else if(id==20){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return 1;
                    if (a.UsrModificador > b.UsrModificador)
                        return -1;
                    return 0;
                });
            } else if(id==21){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchModificacion < b.FchModificacion)
                        return 1;
                    if (a.FchModificacion > b.FchModificacion)
                        return -1;
                    return 0;
                });
            } else if(id==22){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.desCliente < b.desCliente)
                        return 1;
                    if (a.desCliente > b.desCliente)
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
        /*CambiarDatosCliente(idCliente){
          AjusteEmisorService.CargarDatosIniciales(this.usuario.usuarioLogin, idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeListado = res.result.loListado;
                    this.lobeTienda = res.result.loTienda;
                    this.lobeDepartamento = res.result.loDepartamento;
                    this.lobeProvincia = res.result.loProvincia;
                    this.lobeDistrito = res.result.loDistrito;
                    this.lobeCliente = res.result.loCliente;
                    //this.IdCliente = this.usuario.idCliente;
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
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },*/
        CargarDatosIniciales(){
          AjusteEmisorService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeListado = res.result.loListado;
                    this.lobeTienda = res.result.loTienda;
                    this.lobeDepartamento = res.result.loDepartamento;
                    this.lobeProvincia = res.result.loProvincia;
                    this.lobeDistrito = res.result.loDistrito;
                    this.lobeCliente = res.result.loCliente;
                    this.IdCliente = this.usuario.idCliente;
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
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        Nuevo(){
            this.isNuevo=true;
            this.isEdicion=false;
            this.btnGuardar = "GUARDAR";
            this.Cancelar(false);
        },
        Cancelar(isAll){
            this.Id=0;
            this.IdCliente = this.usuario.idCliente;
            this.IdTienda=0;
            this.codSurcursal="";
            this.serieBoleta="";
            this.serieFactura="";
            this.nomComercial="";
            this.nomLegal="";
            this.ruc="";
            this.direccion="";
            this.urbanizacion="";
            this.IdDepartamento="0";
            this.IdProvincia="0";
            this.IdDistrito="0";
            this.ubigeo="";
            this.usuarioSOL="";
            this.claveSOL="";
            this.detraccion=0;
            this.igv=0;
            this.isc=0;
            this.activo="SI";
            this.impresion="A4";
            //--------
            if(isAll){
                this.isNuevo = false;
                this.isEdicion = false;
                this.btnGuardar = "GUARDAR";
            }
            //--------
        },
        ValidarGuardar(){
            if(this.IdTienda==0){
                return 'Debe seleccionar Tienda.';
            }
            /*if(this.serieBoleta==''){
                return 'Debe ingresar Serie Boleta.';
            }
            if(this.serieFactura==''){
                return 'Debe ingresar Serie Factura.';
            }*/
            if(this.nomComercial==''){
                return 'Debe ingresar Nombre Comercial.';
            }
            if(this.nomLegal==''){
                return 'Debe ingresar Nombre Legal.';
            }
            /*if(this.ruc==''){
                return 'Debe ingresar RUC.';
            }*/
            if(this.IdDepartamento==0){
                return 'Debe seleccionar Departamento.';
            }
            if(this.IdProvincia==0){
                return 'Debe seleccionar Provincia.';
            }
            if(this.IdDistrito==0){
                return 'Debe seleccionar Distrito.';
            }
            if(this.detraccion==0){
                return 'Debe ingresar Detracción.';
            }
            if(this.igv==0){
                return 'Debe ingresar IGV.';
            }
            if(this.isc==0){
                return 'Debe ingresar ISC.';
            }
            if(this.permisos.isAdministrador && this.IdCliente==-1){
                return 'Debe seleccionar Cliente';
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            if (tipo==1){
                item.Id = this.Id;
                item.IdTienda=this.IdTienda;
                item.desTienda = this.lobeTienda.filter(obe=>obe.codigo==this.IdTienda)[0].descripcion;
                item.IdCliente = this.IdCliente;//==-1?this.usuario.idCliente:this.IdCliente;//this.usuario.idCliente;
                item.desCliente = this.lobeCliente.filter(obe=>obe.codigo==item.IdCliente)[0].descripcion;//this.usuario.cliente;
                item.codSurcursal = this.codSurcursal;
                item.serieBoleta = this.serieBoleta;
                item.serieFactura = this.serieFactura;
                item.nomComercial = this.nomComercial;
                item.nomLegal = this.nomLegal;
                item.ruc = this.ruc;
                item.direccion = this.direccion;
                item.urbanizacion = this.urbanizacion;
                item.IdDepartamento = this.IdDepartamento;
                item.desDepartamento = this.lobeDepartamento.filter(obe=>obe.codigo==this.IdDepartamento)[0].descripcion;
                item.IdProvincia = this.IdProvincia;
                item.desProvincia = this.lobeProvincia.filter(obe=>obe.codigo==this.IdProvincia)[0].descripcion;
                item.IdDistrito = this.IdDistrito;
                item.desDistrito = this.lobeDistrito.filter(obe=>obe.codigo==this.IdDistrito)[0].descripcion;
                item.ubigeo = this.ubigeo;
                item.usuarioSOL = this.usuarioSOL;
                item.claveSOL = this.claveSOL;
                item.detraccion = this.detraccion;
                item.igv = this.igv;
                item.isc = this.isc;
                item.activo = (this.activo=='SI')?1:0;
                item.impresion = this.impresion;
                item.UsrCreador = this.usuario.usuarioLogin;
            } else if (tipo==2){
                item.Id = id;
                item.IdCliente = this.IdCliente;
                item.UsrModificador = this.usuario.usuarioLogin;
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
                if(this.isEdicion){
                    this.ActualizarBD();
                } else {
                    this.GuardarBD();
                }
            }
        },
        GuardarBD(){
            AjusteEmisorService.Guardar(this.CreaObjetoEnvioBD(1,0))
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
        ActualizarBD(){
            AjusteEmisorService.Actualizar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    if (res.status==200){
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: 'Se actualizó correctamente.',
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
        Editar(id, row){
            $("#codigo").focus();
            this.isNuevo=false;
            this.isEdicion=true;
            this.btnGuardar = "ACTUALIZAR";
            //-----------------
            this.Id = row.Id;
            this.IdCliente = row.IdCliente;
            this.IdTienda = row.IdTienda;
            this.codSurcursal = row.codSurcursal;
            this.serieBoleta = row.serieBoleta;
            this.serieFactura = row.serieFactura;
            this.nomComercial = row.nomComercial;
            this.nomLegal = row.nomLegal;
            this.ruc = row.ruc;
            this.direccion = row.direccion;
            this.urbanizacion = row.urbanizacion;
            //-----------------
            this.isEdicionDep = true;
            this.isEdicionProv = true;
            //-----------------
            this.IdDepartamento = row.IdDepartamento;
            this.IdProvincia = row.IdProvincia;
            this.IdDistrito = row.IdDistrito;
            this.ubigeo = row.ubigeo;
            this.usuarioSOL = row.usuarioSOL;
            this.claveSOL = row.claveSOL;
            this.detraccion = row.detraccion;
            this.igv = row.igv;
            this.isc = row.isc;
            this.activo = row.activo?'SI':'NO';
            this.impresion = row.impresion;
        },
        Eliminar(id, row){
            this.$confirm('Desea eliminar Emisor Electrónico seleccionado?', 'Eliminar Emisor Electrónico', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                AjusteEmisorService.Eliminar(this.CreaObjetoEnvioBD(2,id))
                    .then(res => {
                        if (res.status==200){
                            var index = this.lobeListado.findIndex(dat=>dat.Id==id);
                            this.lobeListado.splice(index, 1);
                            this.$message({
                                showClose: true,
                                message: 'Se eliminó correctamente.',
                                type: 'success'
                            });
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
                        console.log("Error",err);
                        this.$message({
                            showClose: true,
                            message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                            type: 'error'
                        });
                    });
            }).catch(() => {
                console.log("");
            });
        },
        CargaMasiva(){

        },
        Exportar(){

        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.desTienda.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desTienda')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.codSurcursal.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='codSurcursal')[0].Valor.toUpperCase()) >= 0) && 
                        (item.serieBoleta.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='serieBoleta')[0].Valor.toUpperCase()) >= 0) && 
                        (item.serieFactura.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='serieFactura')[0].Valor.toUpperCase()) >= 0) && 
                        (item.nomComercial.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='nomComercial')[0].Valor.toUpperCase()) >= 0) && 
                        (item.nomLegal.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='nomLegal')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ruc.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ruc')[0].Valor.toUpperCase()) >= 0) && 
                        (item.direccion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='direccion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.urbanizacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='urbanizacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desDepartamento.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desDepartamento')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desProvincia.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desProvincia')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desDistrito.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desDistrito')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ubigeo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ubigeo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.detraccion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='detraccion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.igv.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='igv')[0].Valor.toUpperCase()) >= 0) && 
                        (item.isc.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='isc')[0].Valor.toUpperCase()) >= 0) && 
                        ((item.activo?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='activo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrCreador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrCreador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchCreacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchCreacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrModificador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrModificador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchModificacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchModificacion')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.desTienda.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desTienda')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.codSurcursal.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='codSurcursal')[0].Valor.toUpperCase()) >= 0) && 
                        (item.serieBoleta.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='serieBoleta')[0].Valor.toUpperCase()) >= 0) && 
                        (item.serieFactura.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='serieFactura')[0].Valor.toUpperCase()) >= 0) && 
                        (item.nomComercial.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='nomComercial')[0].Valor.toUpperCase()) >= 0) && 
                        (item.nomLegal.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='nomLegal')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ruc.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ruc')[0].Valor.toUpperCase()) >= 0) && 
                        (item.direccion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='direccion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.urbanizacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='urbanizacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desDepartamento.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desDepartamento')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desProvincia.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desProvincia')[0].Valor.toUpperCase()) >= 0) && 
                        (item.desDistrito.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='desDistrito')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ubigeo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ubigeo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.detraccion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='detraccion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.igv.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='igv')[0].Valor.toUpperCase()) >= 0) && 
                        (item.isc.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='isc')[0].Valor.toUpperCase()) >= 0) && 
                        ((item.activo?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='activo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrCreador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrCreador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchCreacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchCreacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrModificador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrModificador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchModificacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchModificacion')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        keyUpBuscar(a){
            if(a.key == "Enter" && this.nomBuscar.length>0)
            {
                this.Buscar();
                a.returnValue = true;
            }
        },
        Buscar(){
            this.filtros[1].Valor = this.nomBuscar;
            this.Paginar();
        },
    }
};
</script>

<style lang="scss">
    /*.custom-file-input-e::-webkit-file-upload-button {
        visibility: hidden;
        //padding-right: 40px;
    }
    .custom-file-input-e::before {
        content: 'Seleccionar Archivo';
        display: inline-block;
        background: linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #999;
        border-radius: 3px;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 1px 1px #fff;
        font-weight: 700;
        font-size: 10pt;
    }
    .custom-file-input-e:hover::before {
        border-color: black;
    }
    .custom-file-input-e:active::before {
        background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
    }*/
</style>

