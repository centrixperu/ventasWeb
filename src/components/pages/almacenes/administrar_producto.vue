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
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" v-show="lobeListado.length>0" 
                        class ="hidden-xs-only">
                        <el-button @click="exportarLista()" class="width100" size="small" type="warning"
                                    icon="fas fa-download" plain :disabled="(isNuevo || isEdicion)"> EXPORTAR
                        </el-button>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="1">
                        <el-button @click="IrAlmacen()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain> ASIGNAR A ALMACÉN
                        </el-button>
                    </el-col>
                    <el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="1">
                        <el-button @click="IrTienda()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain> ASIGNAR A TIENDA
                        </el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop5">
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" v-show="lobeListado.length>0"
                        class="hidden-sm-only hidden-md-only hidden-lg-only hidden-xl-only">
                        <el-button @click="exportarLista()" class="width100" size="small" type="warning"
                                    icon="fas fa-download" plain :disabled="(isNuevo || isEdicion)"> EXPORTAR
                        </el-button>
                    </el-col>
                </el-row>

                <el-row :gutter="5" type="flex" class="paddingTop0" v-show="(isNuevo || isEdicion)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Código de Producto:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="codPro"
                                            size="small"
                                            ref="codigo"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Código de Producto (Opcional)" 
                                            v-model="codigo"
                                            show-word-limit
                                            maxlength="50">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Nombre de Producto:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text"
                                            size="small"
                                            ref="nombre"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombre de Producto" 
                                            v-model="nombre"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Descripción:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="textarea"
                                            size="small"
                                            ref="descripcion"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Descripción" 
                                            v-model="descripcion"
                                            show-word-limit
                                            maxlength="500">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isContraIndicaciones">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Indicaciones:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="indicaciones"
                                            size="small"
                                            ref="indicaciones"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Indicaciones" 
                                            v-model="indicaciones"
                                            show-word-limit
                                            maxlength="800">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isContraIndicaciones">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Contra Indicaciones:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="contraindicaciones"
                                            size="small"
                                            ref="contraindicaciones"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Contra Indicaciones" 
                                            v-model="contraindicaciones"
                                            show-word-limit
                                            maxlength="800">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Talla:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="5" :sm="6" :md="8" :lg="5" :xl="2">
                                    <div>
                                        <el-select v-model="IdTalla" filterable placeholder="Select"
                                            size="small" ref="IdTalla">
                                            <el-option v-for="oTalla in lobeTalla" 
                                                :key="oTalla.codigo" 
                                                :label="oTalla.descripcion"
                                                :value="oTalla.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :xs="7" :sm="6" :md="4" :lg="2" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Color:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="5" :sm="6" :md="8" :lg="4" :xl="2">
                                    <div>
                                        <el-select v-model="IdColor" filterable placeholder="Select"
                                            size="small" ref="IdColor">
                                            <el-option v-for="oColor in lobeColor" 
                                                :key="oColor.codigo" 
                                                :label="oColor.descripcion"
                                                :value="oColor.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isTipoProducto">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="2">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Empaque Producto:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="5" :sm="6" :md="6" :lg="4" :xl="3">
                                    <div>
                                        <el-select v-model="IdTipo" filterable placeholder="Select"
                                            size="small" ref="IdTipo">
                                            <el-option v-for="oTipo in lobeTipo" 
                                                :key="oTipo.codigo" 
                                                :label="oTipo.descripcion"
                                                :value="oTipo.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                                <el-col :xs="7" :sm="6" :md="3" :lg="3" :xl="2" v-show="isTipoParent!=0"
                                    class ="hidden-xs-only hidden-sm-only">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Producto Base:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="5" :sm="6" :md="11" :lg="12" :xl="14" v-show="isTipoParent!=0"
                                    class ="hidden-xs-only hidden-sm-only">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="desProductoB"
                                            @keypress.native="keyUpProducto"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Producto Base" 
                                            v-model="desProductoB"
                                            show-word-limit
                                            maxlength="250">
                                            <el-button slot="append" icon="el-icon-search"
                                                    @click="BuscarProducto()"></el-button>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isTipoProducto">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="2" v-show="isTipoParent!=0"
                                    class ="hidden-md-only hidden-lg-only hidden-xl-only">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Producto Base:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="8" :lg="13" :xl="16" v-show="isTipoParent!=0"
                                    class ="hidden-md-only hidden-lg-only hidden-xl-only">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="desProductoB"
                                            @keypress.native="keyUpProducto"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Producto Base" 
                                            v-model="desProductoB"
                                            show-word-limit
                                            maxlength="250">
                                            <el-button slot="append" icon="el-icon-search"
                                                    @click="BuscarProducto()"></el-button>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <!-- RUBRO MEDICO -->
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isLaboratorio">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Laboratorio:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdLaboratorio" filterable placeholder="Select"
                                            size="small" ref="IdLaboratorio" class="width100">
                                            <el-option v-for="oLaboratorio in lobeLaboratorio" 
                                                :key="oLaboratorio.codigo" 
                                                :label="oLaboratorio.descripcion"
                                                :value="oLaboratorio.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isNombreGenerico">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Genérico:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="generico"
                                            size="small"
                                            ref="generico"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Producto Genérico" 
                                            v-model="generico"
                                            show-word-limit
                                            maxlength="300">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Es Genérico?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isGenerico"
                                            ref="isGenerico">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>   
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isGrupoMedico">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Grupo:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdGrupo" filterable placeholder="Select"
                                            size="small" ref="IdGrupo" class="width100">
                                            <el-option v-for="oGrupo in lobeGrupo" 
                                                :key="oGrupo.codigo" 
                                                :label="oGrupo.descripcion"
                                                :value="oGrupo.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isTipoMedico">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Tipo de Producto:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="tipoProd"
                                            size="small"
                                            ref="tipoProd"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Tipo de Producto" 
                                            v-model="tipoProd"
                                            show-word-limit
                                            maxlength="150">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isTipoPresentacion">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Presentación:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdPresentacion" filterable placeholder="Select"
                                            size="small" ref="IdPresentacion" class="width100">
                                            <el-option v-for="obe in lobePresentacion" 
                                                :key="obe.codigo" 
                                                :label="obe.descripcion"
                                                :value="obe.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isComposicion">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Composición:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="composicion"
                                            size="small"
                                            ref="composicion"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Composición de Producto" 
                                            v-model="composicion"
                                            show-word-limit
                                            maxlength="800">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-if="isLaboratorio">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Reg. Sanitario:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" id="RegSanitario"
                                            size="small"
                                            ref="RegSanitario"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Registro Sanitario" 
                                            v-model="RegSanitario"
                                            show-word-limit
                                            maxlength="50">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">c/ Receta:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="RecetaMedica"
                                            ref="RecetaMedica">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>   
                            </el-row>
                            <!--<el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="2">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Tiene Fecha Venc.?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="8" :lg="13" :xl="16">
                                    <div>
                                        <el-radio-group size="small" v-model="isFechaVencimiento"
                                            ref="isFechaVencimiento">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                            </el-row>-->
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Unidad:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdUnidad" filterable placeholder="Select"
                                            size="small" ref="IdUnidad" class="width100">
                                            <el-option v-for="oUnidad in lobeUnidad" 
                                                :key="oUnidad.codigo" 
                                                :label="oUnidad.descripcion"
                                                :value="oUnidad.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Segmento UNSPSC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdSegmento" filterable placeholder="Select"
                                            size="small" ref="IdSegmento" class="width100">
                                            <el-option v-for="oSegmento in lobeSegmento" 
                                                :key="oSegmento.codigo" 
                                                :label="oSegmento.descripcion"
                                                :value="oSegmento.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Familia UNSPSC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdFamilia" filterable placeholder="Select"
                                            size="small" ref="IdFamilia" class="width100">
                                            <el-option v-for="oFamilia in lobeFamilia" 
                                                :key="oFamilia.codigo" 
                                                :label="oFamilia.descripcion"
                                                :value="oFamilia.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Clase UNSPSC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdClase" filterable placeholder="Select"
                                            size="small" ref="IdClase" class="width100">
                                            <el-option v-for="oClase in lobeClase" 
                                                :key="oClase.codigo" 
                                                :label="oClase.descripcion"
                                                :value="oClase.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Producto UNSPSC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdProducto" filterable placeholder="Select"
                                            size="small" ref="IdProducto" class="width100">
                                            <el-option v-for="oProducto in lobeProducto" 
                                                :key="oProducto.codigo" 
                                                :label="oProducto.descripcion"
                                                :value="oProducto.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Código UNSPSC:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text" readonly
                                            size="small"
                                            ref="codigoUNSPSC"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Código UNSPSC" 
                                            v-model="codigoUNSPSC"
                                            maxlength="250">
                                        </el-input>
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
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isEdicion && loarchivos.length>0)">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Imágenes:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <el-row :gutter="5">
                                        <div v-for="oArchivo in loarchivos" :key="oArchivo.Id">
                                            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
                                                <el-card :body-style="{ padding: '0px' }">
                                                    <el-image
                                                        class="width100 height100P"
                                                        :src="oArchivo.URL"
                                                        fit="scale-down">
                                                    </el-image>
                                                    <div class="padding10">
                                                        <div class="bottom clearfix">
                                                            <el-button class="width100"
                                                                size="mini" icon="el-icon-delete" type="danger"
                                                                @click="EliminarAdjunto(oArchivo.Id, oArchivo.URL)"></el-button>
                                                        </div>
                                                    </div>
                                                </el-card>
                                            </el-col>
                                        </div>
                                    </el-row>                                      
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isNuevo || isEdicion)">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">{{labelImagen}}</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <input type="file" id="avatar" :v-model="formArch.avatar" 
                                            class="custom-file-input width100" multiple
                                            v-on:change="onUpload($event)" />
                                    <!--<label class="file">
                                        <input type="file" id="file" aria-label="File browser example">
                                        <span class="file-custom"></span>
                                    </label>-->
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
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
                <el-row :gutter="5" class="paddingTop10">
                    <el-tag type="success" class="cus-tag-header-panel">{{tittleReporte}}</el-tag>
                </el-row>
                <el-row :gutter="5" class="paddingTop10 hidden-xs-only hidden-sm-only">
                    <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <div>
                            <el-table ref="listado" :data="lobeListadoFiltrado" 
                                    style="width: 100%"
                                    highlight-current-row>
                                <el-table-column prop="CodProducto" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Código</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(1)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(1)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0"
                                                v-model="codigoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="CodUNSPSC" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Cod. UNSPSC</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 2?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 2?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="codUNSPSCTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="NombreProducto" 
                                        width="200" >
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Nombre</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nombreTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Descripcion" 
                                        width="250" >
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Descripción</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(4)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(4)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="descripcionTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="RegSanitario" 
                                        width="250" >
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Reg. Sanitario</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(11)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(11)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="RegSanitarioTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="IdUnidad" 
                                        width="120">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Unidad</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 5?'colorOrderBottom':'']" @click="Ascendente(5)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 5?'colorOrderTop':'']" @click="Descendente(5)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="unidadTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-tag v-show="scope.row.Estatus" type="success">Activo</el-tag>
                                        <el-tag v-show="!scope.row.Estatus" type="danger">Inactivo</el-tag>
                                    </template>
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Estado</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 6?'colorOrderBottom':'']" @click="Ascendente(6)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 6?'colorOrderTop':'']" @click="Descendente(6)"></i>
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
                                <!--<el-table-column prop="UsrCreador" 
                                        width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Usuario Creación</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 7?'colorOrderBottom':'']" @click="Ascendente(7)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 7?'colorOrderTop':'']" @click="Descendente(7)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 8?'colorOrderBottom':'']" @click="Ascendente(8)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 8?'colorOrderTop':'']" @click="Descendente(8)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 9?'colorOrderBottom':'']" @click="Ascendente(9)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 9?'colorOrderTop':'']" @click="Descendente(9)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 10?'colorOrderBottom':'']" @click="Ascendente(10)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 10?'colorOrderTop':'']" @click="Descendente(10)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="fchModificacionTable"></el-input>
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
                                <el-input type="text" ref="nomBuscar"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Buscar Producto" 
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
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oListado.NombreProducto}}</span>
                                            <el-button-group>
                                                <el-button class="marginRight10"
                                                    size="mini" icon="el-icon-edit"
                                                    @click="Editar(oListado.Id, oListado)"></el-button>
                                                <el-button class="marginRight10"
                                                    size="mini" type="danger" icon="el-icon-delete"
                                                    @click="Eliminar(oListado.Id, oListado)"></el-button>
                                            </el-button-group>                                            
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Código :</span>
                                            <el-input v-model="oListado.CodProducto" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width95P">Descripción:</span>
                                            <el-input v-model="oListado.Descripcion" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width95P">Estado:</span>
                                            <el-tag v-show="oListado.Estatus" type="success">Activo</el-tag>
                                            <el-tag v-show="!oListado.Estatus" type="danger">Inactivo</el-tag>
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

        <modal-productos :isModal="isModal" @interface="Cargar" :busqueda="desProductoB">
        </modal-productos>
        
        <modal-asignar-almacen :isModal="isModalAlmacen" @interface="CargarAlmacen"> <!--:loProducto="loProductoMdl"-->
        </modal-asignar-almacen>

        <modal-asignar-tienda :isModal="isModalTienda" @interface="CargarTienda"> <!--:loProducto="loProductoMdl"-->
        </modal-asignar-tienda>

    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AdministrarProductoService from '@/services/almacen/producto-service'
import ExcelService from '@/services/excel/excel-service'
import { mapState,mapGetters } from "vuex";
import { WSASYSNOTREADY } from 'constants';
//MODALES
import ModalProductos from '@/components/pages/almacenes/modals/mdlProducto'
import ModalAsignarAlmacen from '@/components/pages/almacenes/modals/mdlAsignarAlmacen'
import ModalAsignarTienda from '@/components/pages/almacenes/modals/mdlAsignarTienda'
// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
    name: "app",
    components: { 
      HeaderPage, ModalProductos, ModalAsignarAlmacen, ModalAsignarTienda
    },
    data() {
        return {
            isModal:false,
            isModalTienda:false,
            isModalAlmacen:false,
            nomBuscar:"",
            //isFechaVencimiento:"NO",
            isTipoProducto:true,
            isFechaVenProd:true,
            isCostoProduccion:true,
            //-------- RUBRO MEDICO --------- 
            isLaboratorio: true,
            isNombreGenerico: true,
            isGrupoMedico: true,
            isTipoMedico: true,
            isTipoPresentacion: true,
            isComposicion: true,
            isContraIndicaciones: true,
            //------
            lobeLaboratorio:[],
            IdLaboratorio: -1,
            generico:'',
            lobeGrupo:[],
            IdGrupo:-1,
            tipoProd:'',
            lobePresentacion:[],
            IdPresentacion:-1,
            composicion:'',
            indicaciones:'',
            contraindicaciones:'',
            RegSanitario:'',
            //-----------------------------------
            isCargaProd:false,
            idProductoB:0,
            desProductoB:'',
            //-----------------------------------
            labelImagen:'Imágenes:',
            btnGuardar:'GUARDAR',
            //-----------------------------------
            formArch: {
                avatar: []
            },            
            tittleModulo:'Administrar Productos',
            tittleReporte:'LISTADO',
            //-----------------------------------
            Id:0,
            codigo:'',
            nombre:'',
            descripcion:'',
            IdTipo:-1,
            lobeTipo:[],
            isTipoParent:0,
            IdTalla:-1,
            lobeTalla:[],
            IdColor:-1,
            lobeColor:[],
            IdUnidad:'0',
            lobeUnidad:[],
            IdSegmento:'0',
            lobeSegmento:[],
            IdFamilia:'0',
            lobeFamilia:[],
            IdClase:'0',
            lobeClase:[],
            IdProducto:'0',
            lobeProducto:[],
            codigoUNSPSC:'',
            activo:'SI',
            ListImagen:[],
            loarchivos:[],
            //-----------------------------------
            isNuevo:false,
            isEdicion:false,
            isEdicionSeg1 :false,
            isEdicionFam1 :false,
            isEdicionCla1 :false,
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
            idTable:"",
            codigoTable:"",
            codUNSPSCTable:"",
            nombreTable:"",
            descripcionTable:"",
            unidadTable:"",
            estadoTable:"",
            usrCreadorTable:"",
            fchCreacionTable:"",
            usrModificadorTable:"",
            fchModificacionTable:"",
            RegSanitarioTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'CodProducto', Valor:''},
                {columna:'CodUNSPSC', Valor:'',},
                {columna:'NombreProducto', Valor:'',},
                {columna:'Descripcion', Valor:'',},
                {columna:'IdUnidad', Valor:'',},
                {columna:'Estatus', Valor:'',},
                {columna:'UsrCreador', Valor:'',},
                {columna:'FchCreacion', Valor:'',},
                {columna:'UsrModificador', Valor:'',},
                {columna:'FchModificacion', Valor:'',},
                {columna:'RegSanitario', Valor:'',}
            ],
            //-----------------------------------
            loColumns:[],
            loExport:[],
            RecetaMedica:'NO',
            isGenerico:'NO',
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
        ...mapGetters(["existUsuario",'Menu'])
    },
    watch: {
        nomBuscar: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        //-------------------
        IdTipo: function(n){
            if(!this.isCargaProd){
                this.idProductoB = 0;
                this.desProductoB = "";
            }
            if(n!=0){
                let index = this.lobeTipo.findIndex(obe=>obe.codigo==n);
                if(index!=-1){
                    this.isTipoParent = this.lobeTipo[index].isTipoParent;
                } else {
                    this.isTipoParent = 0;
                }
            } else {
                this.isTipoParent = 0;
            }
        },
        desProductoB: function(n,o){
            if(n!=o && this.isCargaProd){
                this.isCargaProd=false;
            } else {
                this.idProductoB = 0;
                //this.desProductoB = "";
            }
        },
        //------ FILTROS
        idTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        codigoTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        codUNSPSCTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        nombreTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        descripcionTable: function(n){
            this.filtros[4].Valor = n;
            this.Paginar();
        },
        unidadTable: function(n){
            this.filtros[5].Valor = n;
            this.Paginar();
        },
        estadoTable: function(n){
            this.filtros[6].Valor = n;
            this.Paginar();
        },
        usrCreadorTable: function(n){
            this.filtros[7].Valor = n;
            this.Paginar();
        },
        fchCreacionTable: function(n){
            this.filtros[8].Valor = n;
            this.Paginar();
        },
        usrModificadorTable: function(n){
            this.filtros[9].Valor = n;
            this.Paginar();
        },
        fchModificacionTable: function(n){
            this.filtros[10].Valor = n;
            this.Paginar();
        },
        RegSanitarioTable: function(n){
            this.filtros[11].Valor = n;
            this.Paginar();
        },
        //------ UNSPSC
        IdSegmento: function(n){
            if(!this.isEdicionSeg1){
                this.IdFamilia = "0";
                this.IdClase="0";
                this.IdProducto="0";
            }
            this.isEdicionSeg1 = false;
            if(n!='0'){
                this.CargarFamilia(n);
            }else{
                this.lobeFamilia = this.lobeFamilia.filter(fam => fam.codigo == "0");
                this.lobeClase = this.lobeClase.filter(clase => clase.codigo == "0");
                this.lobeProducto = this.lobeProducto.filter(prod => prod.codigo == "0");
            }
        },
        IdFamilia: function(n){
            if(!this.isEdicionFam1){
                this.IdClase="0";
                this.IdProducto="0";
            }
            this.isEdicionFam1 = false;
            if(n!='0'){
                this.CargarClase(n);
            }else{
                this.lobeClase = this.lobeClase.filter(clase => clase.codigo == "0");
                this.lobeProducto = this.lobeProducto.filter(prod => prod.codigo == "0");
            }
        },
        IdClase: function(n){
            if(!this.isEdicionCla1){
                this.IdProducto="0";
            }
            this.isEdicionCla1 = false;
            if(n!='0'){
                this.CargarProducto(n);
            }else{
                this.lobeProducto = this.lobeProducto.filter(prod => prod.codigo == "0");
            }
        },
        IdProducto: function(n){
            if(n!='0'){
                this.codigoUNSPSC = this.IdSegmento + this.IdFamilia + this.IdClase + n;
            }else{
                this.codigoUNSPSC = "";
            }
        },
    },
    methods: {
        Cargar(val, data){
            this.isModal=val;
            if(data!=null){
                this.isCargaProd = true;
                this.idProductoB = data.Id;
                this.desProductoB = data.Nombre;
            } else {
                this.idProductoB = 0;
                this.desProductoB = "";
            }
        },
        ///===================
        BuscarProducto(){
            this.isModal=true;
        },
        ///===================
        onUpload(event) {
            this.formArch.avatar = [];
            //let reader = new FileReader();
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
                            value : valueFile.split(',')[1] //reader.result.split(',')[1]
                        }
                        this.formArch.avatar.push(item);
                    }
                }
            } else {
                this.formArch.avatar = [];
            }
        },
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
                    if (a.CodProducto < b.CodProducto)
                        return -1;
                    if (a.CodProducto > b.CodProducto)
                        return 1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.CodUNSPSC < b.CodUNSPSC)
                        return -1;
                    if (a.CodUNSPSC > b.CodUNSPSC)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.NombreProducto < b.NombreProducto)
                        return -1;
                    if (a.NombreProducto > b.NombreProducto)
                        return 1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Descripcion < b.Descripcion)
                        return -1;
                    if (a.Descripcion > b.Descripcion)
                        return 1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.IdUnidad < b.IdUnidad)
                        return -1;
                    if (a.IdUnidad > b.IdUnidad)
                        return 1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estatus < b.Estatus)
                        return -1;
                    if (a.Estatus > b.Estatus)
                        return 1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return -1;
                    if (a.UsrCreador > b.UsrCreador)
                        return 1;
                    return 0;
                });
            } else if(id==8){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return -1;
                    if (a.FchCreacion > b.FchCreacion)
                        return 1;
                    return 0;
                });
            } else if(id==9){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return -1;
                    if (a.UsrModificador > b.UsrModificador)
                        return 1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchModificacion < b.FchModificacion)
                        return -1;
                    if (a.FchModificacion > b.FchModificacion)
                        return 1;
                    return 0;
                });
            } else if(id==11){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.RegSanitario < b.RegSanitario)
                        return -1;
                    if (a.RegSanitario > b.RegSanitario)
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
                    if (a.CodProducto < b.CodProducto)
                        return 1;
                    if (a.CodProducto > b.CodProducto)
                        return -1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.CodUNSPSC < b.CodUNSPSC)
                        return 1;
                    if (a.CodUNSPSC > b.CodUNSPSC)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.NombreProducto < b.NombreProducto)
                        return 1;
                    if (a.NombreProducto > b.NombreProducto)
                        return -1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Descripcion < b.Descripcion)
                        return 1;
                    if (a.Descripcion > b.Descripcion)
                        return -1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.IdUnidad < b.IdUnidad)
                        return 1;
                    if (a.IdUnidad > b.IdUnidad)
                        return -1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estatus < b.Estatus)
                        return 1;
                    if (a.Estatus > b.Estatus)
                        return -1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return 1;
                    if (a.UsrCreador > b.UsrCreador)
                        return -1;
                    return 0;
                });
            } else if(id==8){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return 1;
                    if (a.FchCreacion > b.FchCreacion)
                        return -1;
                    return 0;
                });
            } else if(id==9){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return 1;
                    if (a.UsrModificador > b.UsrModificador)
                        return -1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchModificacion < b.FchModificacion)
                        return 1;
                    if (a.FchModificacion > b.FchModificacion)
                        return -1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.RegSanitario < b.RegSanitario)
                        return 1;
                    if (a.RegSanitario > b.RegSanitario)
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
        CargarFamilia(cod){
          AdministrarProductoService.ListarFamilia(this.usuario.usuarioLogin, cod)
            .then(res => {
                if (res.status==200){
                    this.lobeFamilia = res.result;
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
        CargarClase(cod){
          AdministrarProductoService.ListarClase(this.usuario.usuarioLogin, this.IdSegmento, cod)
            .then(res => {
                if (res.status==200){
                    this.lobeClase = res.result;
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
        CargarProducto(cod){
          AdministrarProductoService.ListarProducto(this.usuario.usuarioLogin, this.IdSegmento, this.IdFamilia, cod)
            .then(res => {
                if (res.status==200){
                    this.lobeProducto = res.result;
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
        Nuevo(){
            this.isNuevo=true;
            this.isEdicion=false;
            this.btnGuardar = "GUARDAR";
            this.labelImagen = "Imágenes:";
            this.formArch.avatar = [];
            $("#avatar").val(null);
            this.Cancelar(false);
        },
        IrAlmacen(){
            this.isModalAlmacen=true;
            /*
            var cant = this.Menu.length;
            for(var i = 0; i < cant; i++){
                this.Menu[i].active = false;
                
                var cantD = this.Menu[i].detalle.length;
                for(var j = 0; j < cantD; j++){
                    var rowD = this.Menu[i].detalle[j];
                    rowD.active = false;
                    if(rowD.url == "/inicio/almacenes/asig_almacen"){
                        this.Menu[i].active = true;
                        rowD.active = true;
                    }
                }
            }
            this.$router.push({ path: "/inicio/almacenes/asig_almacen"});
            */
        },
        CargarAlmacen(val, data){
            this.isModalAlmacen=val;
            /*if(data!=null){
                this.isCargaProd = true;
                this.idProductoB = data.Id;
                this.desProductoB = data.Nombre;
            } else {
                this.idProductoB = 0;
                this.desProductoB = "";
            }*/
        },
        IrTienda(){
            this.isModalTienda=true;
        },
        CargarTienda(val, data){
            this.isModalTienda=val;
            /*if(data!=null){
                this.isCargaProd = true;
                this.idProductoB = data.Id;
                this.desProductoB = data.Nombre;
            } else {
                this.idProductoB = 0;
                this.desProductoB = "";
            }*/
        },
        CargaMasiva(){

        },
        ValidarGuardar(){
            /*if(this.codigo==''){
                return 'Debe ingresar Código de Producto.';
            }*/
            if(this.nombre==''){
                return 'Debe ingresar Nombre de Producto.';
            }
            if(this.descripcion==''){
                return 'Debe ingresar Descripción.';
            }
            if(this.IdTipo==0){
                return 'Debe seleccionar Tipo de Producto.';
            }
            if(this.IdTipo>0 && this.isTipoParent!=0 && this.idProductoB==0){
                return 'Debe ingresar Producto Base.';
            }
            if(this.IdTalla==0){
                return 'Debe seleccionar Talla.';
            }
            if(this.IdColor==0){
                return 'Debe seleccionar Color.';
            }
            if(this.IdUnidad=='0'){
                return 'Debe seleccionar Unidad.';
            }
            if(this.IdSegmento=='0'){
                return 'Debe seleccionar Segmento UNSPSC.';
            }
            if(this.IdFamilia=='0'){
                return 'Debe seleccionar Familia UNSPSC.';
            }
            if(this.IdClase=='0'){
                return 'Debe seleccionar Clase UNSPSC.';
            }
            if(this.IdProducto=='0'){
                return 'Debe seleccionar Producto UNSPSC.';
            }
            if(this.isLaboratorio && this.IdLaboratorio==0){
                return 'Debe seleccionar Laboratorio de Producto.';
            }
            if(this.isNombreGenerico && this.generico==''){
                return 'Debe ingresar Nombre Genérico de Producto.';
            }
            if(this.isGrupoMedico && this.IdGrupo==0){
                return 'Debe seleccionar Grupo de Producto.';
            }
            if(this.isTipoMedico && this.tipoProd==''){
                return 'Debe ingresar Tipo de Producto.';
            }
            if(this.isTipoPresentacion && this.IdPresentacion==0){
                return 'Debe seleccionar Tipo Presentación de Producto.';
            }
            if(this.isComposicion && this.composicion==''){
                return 'Debe ingresar Composición de Producto.';
            }
            /*if(this.formArch.avatar==[]){
                return 'Debe ingresar Imagen de Producto.';
            }*/
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            let lobe = [];
            for(var i=0;i<this.formArch.avatar.length;i+=1){
                let obe = {
                    NombreCarpeta : this.usuario.idCliente.toString(),//.padStart(12,'0'),//this.Id,
                    DatosAdjuntos : this.formArch.avatar[i].value,
                    DatosAdjuntosName : this.formArch.avatar[i].filename,
                }
                lobe.push(obe);
            }
            
            let item = {}
            if (tipo==1){
                item.Id = this.Id;
                item.CodProducto=this.codigo;
                item.NombreProducto = this.nombre;
                item.Descripcion = this.descripcion;
                item.IdTipo = this.IdTipo;
                item.DesTipo = this.lobeTipo.filter(t => t.codigo==this.IdTipo)[0].descripcion;
                item.IdProductoBase = this.idProductoB;
                //item.isFechaVencimiento = (this.isFechaVencimiento=='SI')?1:0;
                item.IdTalla = this.IdTalla;
                item.DesTalla = this.lobeTalla.filter(t => t.codigo==this.IdTalla)[0].descripcion;
                item.IdColor = this.IdColor;
                item.DesColor = this.lobeColor.filter(c => c.codigo==this.IdColor)[0].descripcion;
                item.IdUnidad = this.IdUnidad;
                item.DesUnidad = this.lobeUnidad.filter(u => u.codigo==this.IdUnidad)[0].descripcion;
                item.IdSegmento = this.IdSegmento;
                item.DesSegmento = this.lobeSegmento.filter(s => s.codigo==this.IdSegmento)[0].descripcion;
                item.IdFamilia = this.IdFamilia;
                item.DesFamilia = this.lobeFamilia.filter(f => f.codigo==this.IdFamilia)[0].descripcion;
                item.IdClase = this.IdClase;
                item.DesClase = this.lobeClase.filter(c => c.codigo==this.IdClase)[0].descripcion;
                item.IdProducto = this.IdProducto;
                item.DesProducto = this.lobeProducto.filter(p => p.codigo==this.IdProducto)[0].descripcion;
                item.CodUNSPSC = this.codigoUNSPSC;
                item.Estatus = (this.activo=='SI')?1:0;
                item.UsrCreador = this.usuario.usuarioLogin;
                item.loarchivos = lobe;
                item.IdCliente = this.usuario.idCliente;
                //RUBRO MEDICO 
                item.IdProdLaboratorio = this.IdLaboratorio;
                item.CodProdLaboratorio = this.lobeLaboratorio.filter(c => c.codigo==this.IdLaboratorio)[0].codcorto;
                item.DesProdLaboratorio = this.lobeLaboratorio.filter(c => c.codigo==this.IdLaboratorio)[0].descripcion;
                item.IdProdGrupo = this.IdGrupo;
                item.DesProdGrupo = this.lobeGrupo.filter(c => c.codigo==this.IdGrupo)[0].descripcion;
                item.IdProdTipoPresentacion = this.IdPresentacion;
                item.CodProdTipoPresentacion = this.lobePresentacion.filter(c => c.codigo==this.IdPresentacion)[0].codcorto;
                item.DesProdTipoPresentacion = this.lobePresentacion.filter(c => c.codigo==this.IdPresentacion)[0].descripcion;
                item.DesNombreGenerico = this.generico;
                item.DesTipoProducto = this.tipoProd;
                item.DesComposicion = this.composicion;
                item.DesIndicaciones = this.indicaciones;
                item.DesContraIndicaciones = this.contraindicaciones;
                item.RecetaMedica = this.RecetaMedica;//=='SI')?1:0;
                item.isGenerico = this.isGenerico;
                item.RegSanitario = this.RegSanitario;
            } else if (tipo==2){
                item.Id = id
                item.UsrModificador = this.usuario.usuarioLogin;
                item.IdCliente = this.usuario.idCliente;
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
            const loading = this.$loading({
                lock: true,
                text: 'Guardando Producto',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            AdministrarProductoService.Guardar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: 'Se Guardó Correctamente.',
                            type: 'success'
                        });
                        this.Cancelar(true);
                    } else if (res.status==210){
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'warning'
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
        ActualizarBD(){
            const loading = this.$loading({
                lock: true,
                text: 'Actualizando Producto',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            AdministrarProductoService.Actualizar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    loading.close();
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
                    loading.close();
                    console.log("Error",err);
                    this.$message({
                        showClose: true,
                        message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                        type: 'error'
                    });
                });
        },
        Cancelar(isAll){
            this.codigo="";
            this.nombre="";
            this.descripcion="";
            this.IdTipo = -1;
            this.idProductoB=0;
            this.IdTalla= -1;
            this.IdColor= -1;
            this.IdUnidad= '0';
            this.IdSegmento='0';
            this.IdFamilia='0';
            this.IdClase='0';
            this.IdProducto='0';
            this.codigoUNSPSC='';
            this.activo='SI';
            this.desProductoB = "";
            //--------
            this.IdLaboratorio=0;
            this.generico='';
            this.IdGrupo=0;
            this.tipoProd='';
            this.IdPresentacion=0;
            this.composicion='';
            this.indicaciones='';
            this.contraindicaciones='';
            this.RecetaMedica='NO';
            this.isGenerico = 'NO';
            //--------
            if(isAll){
                this.isNuevo = false;
                this.isEdicion = false;
                this.btnGuardar = "GUARDAR";
                this.labelImagen = "Imágenes:";
            }
            //--------
            this.formArch.avatar = [];
            $("#avatar").val(null);
        },
        Editar(id, row){
            $("#codPro").focus();
            this.formArch.avatar = [];
            $("#avatar").val(null);
            this.isNuevo=false;
            this.isEdicion=true;
            this.btnGuardar = "ACTUALIZAR";
            //-----------------
            this.Id = row.Id;
            this.codigo = row.CodProducto;
            this.nombre = row.NombreProducto;
            this.descripcion = row.Descripcion;
            this.IdTipo = row.IdTipo;
            this.IdTalla = row.IdTalla;
            this.IdColor = row.IdColor;
            this.IdUnidad = row.IdUnidad;
            //-----------------
            this.isEdicionSeg1 = true,
            this.isEdicionFam1 = true,
            this.isEdicionCla1 = true,
            //-----------------
            this.IdSegmento = row.IdSegmento;
            this.IdFamilia = row.IdFamilia;
            this.IdClase = row.IdClase;
            this.IdProducto = row.IdProducto;
            this.codigoUNSPSC = row.CodUNSPSC;
            this.activo = row.Estatus?'SI':'NO';
            this.loarchivos = row.loarchivos;
            this.labelImagen = "Agregar Imágenes:";
            this.isCargaProd = true;
            this.idProductoB = row.IdProductoBase;
            this.desProductoB = row.NombreProductoBase;
            //this.isFechaVencimiento = row.isFechaVencimiento?'SI':'NO';
            //RUBRO MEDICO
            this.IdLaboratorio = row.IdProdLaboratorio;
            this.IdGrupo = row.IdProdGrupo;
            this.IdPresentacion = row.IdProdTipoPresentacion;
            this.generico = row.DesNombreGenerico;
            this.tipoProd = row.DesTipoProducto;
            this.composicion = row.DesComposicion;
            this.indicaciones = row.DesIndicaciones;
            this.contraindicaciones = row.DesContraIndicaciones;
            this.RecetaMedica = row.RecetaMedica;//?'SI':'NO';
            this.isGenerico = row.isGenerico;
            this.RegSanitario = row.RegSanitario;
        },
        Eliminar(id, row){
            this.$confirm('Desea eliminar el producto seleccionado?', 'Eliminar Producto', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                this.Cancelar(true);
                AdministrarProductoService.Eliminar(this.CreaObjetoEnvioBD(2,id))
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
        EliminarAdjunto(id, url){
            this.$confirm('Desea eliminar imagen seleccionada del Producto?', 'Eliminar Imagen de Producto', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                AdministrarProductoService.EliminarAdjunto(id, url, this.Id, this.usuario.usuarioLogin, this.usuario.idCliente)
                    .then(res => {
                        if (res.status==200){
                            var index = this.lobeListado.findIndex(dat=>dat.Id==this.Id);
                            var indexD = this.lobeListado[index].loarchivos.findIndex(dat=>dat.Id==id);
                            this.lobeListado[index].loarchivos.splice(indexD, 1);
                            this.$message({
                                showClose: true,
                                message: 'Se eliminó archivo correctamente.',
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
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Productos...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          AdministrarProductoService.CargarDatosIniciales(this.usuario.usuarioLogin,this.usuario.idCliente)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeUnidad = res.result.loUnidadMedida;
                    this.lobeSegmento = res.result.loSegmentos;
                    this.lobeFamilia = res.result.loFamilia;
                    this.lobeClase = res.result.loClase;
                    this.lobeProducto = res.result.loProducto;
                    this.lobeTalla = res.result.loTalla;
                    this.lobeColor = res.result.loColor;
                    this.lobeTipo = res.result.loTipoProducto;
                    this.lobeListado = res.result.loLista;
                    //
                    this.loExport = res.result.loExport;
                    this.loColumns = res.result.loColumns;
                    // RUBRO MEDICO
                    this.lobeLaboratorio = res.result.loProdLaboratorio;
                    this.lobeGrupo = res.result.loProdGrupo;
                    this.lobePresentacion = res.result.loProdTipoPresentacion;
                    //
                    this.MostrarColumnas();
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
            //RUBRO MEDICO
            this.isLaboratorio = this.permisos.isLaboratorio;
            this.isNombreGenerico = this.permisos.isNombreGenerico;
            this.isGrupoMedico = this.permisos.isGrupoMedico;
            this.isTipoMedico = this.permisos.isTipoMedico;
            this.isTipoPresentacion = this.permisos.isTipoPresentacion;
            this.isComposicion = this.permisos.isComposicion;
            this.isContraIndicaciones = this.permisos.isContraIndicaciones;
        },
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='CodProducto')[0].Valor.toUpperCase()) >= 0) && 
                        (item.CodUNSPSC.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='CodUNSPSC')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NombreProducto.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NombreProducto')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Descripcion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Descripcion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.IdUnidad.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='IdUnidad')[0].Valor.toUpperCase()) >= 0) && 
                        ((item.Estatus?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Estatus')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrCreador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrCreador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchCreacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchCreacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrModificador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrModificador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchModificacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchModificacion')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.CodProducto.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='CodProducto')[0].Valor.toUpperCase()) >= 0) &&
                        (item.CodUNSPSC.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='CodUNSPSC')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NombreProducto.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NombreProducto')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Descripcion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Descripcion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.IdUnidad.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='IdUnidad')[0].Valor.toUpperCase()) >= 0) && 
                        ((item.Estatus?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Estatus')[0].Valor.toUpperCase()) >= 0) && 
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
                this.BuscarListaProducto();
                a.returnValue = true;
            }
        },
        BuscarListaProducto(){
            this.filtros[3].Valor = this.nomBuscar;
            this.Paginar();
        },
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
                                            this.tittleReporte,this.tittleModulo+'_'+nameArch+'.xlsx');
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
            for(var i = 0; i< this.loExport.length; i++){
                var obj = this.loExport[i];
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
    .custom-file-input::-webkit-file-upload-button {
        visibility: hidden;
        padding-right: 40px;
    }
    .custom-file-input::before {
        content: 'Seleccionar Archivo';
        display: inline-block;
        background: #ecf5ff;
        //background: linear-gradient(top, #b3d8ff,#b3d8ff); //#f4f4f5,#f4f4f5);//linear-gradient(top, #f9f9f9, #e3e3e3);
        border: 1px solid #b3d8ff;//#999;
        border-radius: 3px;
        padding: 5px 8px;
        outline: none;
        white-space: nowrap;
        -webkit-user-select: none;
        cursor: pointer;
        text-shadow: 0px 0px #fff;
        font-weight: 700;
        font-size: 10pt;
        color: #409EFF; //black; //#909399;
    }
    .custom-file-input:hover::before {
        //border-color: black;
        border-color: #409EFF;
        background: #409EFF;
        text-shadow: 0px 0px #ecf5ff;
        color: #ecf5ff;
    }
    .custom-file-input:active::before {
        //background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
        background: #b3d8ff;
    }
</style>
