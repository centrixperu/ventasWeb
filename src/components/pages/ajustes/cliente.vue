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
                    <!--<el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" class ="hidden-xs-only">
                        <el-button @click="CargaMasiva()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain :disabled="(isNuevo || isEdicion)"> CARGA MASIVA
                        </el-button>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" class ="hidden-xs-only">
                        <el-button @click="Exportar()" class="width100" size="small" type="warning"
                                    icon="fas fa-download" plain :disabled="(isNuevo || isEdicion)"> EXPORTAR
                        </el-button>
                    </el-col>-->
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop5">
                    <!--<el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" 
                        class ="hidden-sm-only hidden-md-only hidden-lg-only hidden-xl-only">
                        <el-button @click="CargaMasiva()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain :disabled="(isNuevo || isEdicion)"> CARGA MASIVA
                        </el-button>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" 
                        class="hidden-sm-only hidden-md-only hidden-lg-only hidden-xl-only">
                        <el-button @click="Exportar()" class="width100" size="small" type="warning"
                                    icon="fas fa-download" plain :disabled="(isNuevo || isEdicion)"> EXPORTAR
                        </el-button>
                    </el-col>-->
                </el-row>

                <el-row :gutter="5" type="flex" class="paddingTop0" v-show="(isNuevo || isEdicion)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-tag type="info" class="cus-tag-header-panel">Datos del Cliente</el-tag>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Nombre:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text" id="codigo"
                                            size="small"
                                            ref="nombre"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombre de Cliente" 
                                            v-model="nombre"
                                            show-word-limit
                                            maxlength="100">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div>
                                        <el-radio-group size="small" v-model="tipodoc"
                                            ref="tipodoc"> 
                                            <el-radio-button v-for="oTipoDoc in loTipoDocIdentidad" 
                                                :key="oTipoDoc.codigo" 
                                                :label="oTipoDoc.descripcion"
                                                :value="oTipoDoc.codigo"
                                                :name="oTipoDoc.codigo"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                    <!--<div>
                                        <el-radio-group size="small" v-model="tipodoc"
                                            ref="tipodoc">
                                            <el-radio-button label="RUC"></el-radio-button>
                                            <el-radio-button label="DNI"></el-radio-button>
                                        </el-radio-group>
                                    </div>-->
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text" v-show="tipodoc=='RUC'"
                                            size="small"
                                            ref="RUC"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="RUC" 
                                            v-model="RUC"
                                            show-word-limit
                                            maxlength="11">
                                        </el-input>
                                        <el-input type="text" v-show="tipodoc=='DNI'"
                                            size="small"
                                            ref="DNI"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="DNI" 
                                            v-model="DNI"
                                            show-word-limit
                                            maxlength="8">
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
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="nombreLegal"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombre Legal" 
                                            v-model="nombreLegal"
                                            show-word-limit
                                            maxlength="50">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Nombre Comercial:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <el-input type="text"
                                            size="small"
                                            ref="nombreComercial"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombre Comercial" 
                                            v-model="nombreComercial"
                                            show-word-limit
                                            maxlength="250">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isEdicion && URLLogo!='')">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Logo:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <el-row :gutter="5">
                                        <div>
                                            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
                                                <el-card :body-style="{ padding: '0px' }">
                                                    <el-image
                                                        class="width100 height100P"
                                                        :src="URLLogo"
                                                        fit="scale-down">
                                                    </el-image>
                                                    <div class="padding10">
                                                        <div class="bottom clearfix">
                                                            <el-button class="width100"
                                                                size="mini" icon="el-icon-delete" type="danger"
                                                                @click="EliminarLogo(URLLogo)"></el-button>
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
                                        <span class="cus-label textAdjust textAlignL">{{labelLogo}}</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <input type="file" id="avatarLogo" :v-model="formLogo.avatarLogo" 
                                            class="custom-file-input-e width100" 
                                            v-on:change="onUploadLogo($event)" />
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
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isNuevo || isEdicion)">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">{{labelCertificado}}</span>
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
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-tag type="info" class="cus-tag-header-panel">Facturación Electrónica</el-tag>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Facturación Electrónica Online?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isFactOnline"
                                            ref="isFactOnline">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10 hidden-xs-only hidden-sm-only">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1" v-show="isFactOnline=='NO'">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Facturación Programada?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="4" :lg="4" :xl="20" v-show="isFactOnline=='NO'">
                                    <div>
                                        <el-radio-group size="small" v-model="isFactProg"
                                            ref="isFactProg">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                                <el-col :xs="7" :sm="6" :md="6" :lg="3" :xl="1" v-show="isFactProg=='SI'">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Hora Programación:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="4" :lg="4" :xl="20" v-show="isFactProg=='SI'">
                                    <div>
                                        <el-time-select
                                            v-model="isFactProgHour"
                                            :picker-options="{
                                                start: '00:00',
                                                step: '00:15',
                                                end: '23:45'
                                            }"
                                            placeholder="Seleccione Hora">
                                        </el-time-select>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1" v-show="isFactOnline=='NO'">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Facturación Programada?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="4" :lg="4" :xl="20" v-show="isFactOnline=='NO'">
                                    <div>
                                        <el-radio-group size="small" v-model="isFactProg"
                                            ref="isFactProg">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10 hidden-md-only hidden-lg-only hidden-xl-only">
                                <el-col :xs="7" :sm="6" :md="6" :lg="3" :xl="1" v-show="isFactProg=='SI'">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Hora Programación:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="4" :lg="4" :xl="20" v-show="isFactProg=='SI'">
                                    <div>
                                        <el-time-select
                                            v-model="isFactProgHour"
                                            :picker-options="{
                                                start: '00:00',
                                                step: '00:15',
                                                end: '23:45'
                                            }"
                                            placeholder="Seleccione Hora">
                                        </el-time-select>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-tag type="info" class="cus-tag-header-panel">Configuraciones Generales</el-tag>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Precio Productos contiene IGV?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isPrecioConIGV"
                                            ref="isPrecioConIGV">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Si Precio de Productos están con IGV incluido.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Posee Tipos de Productos?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isTipoProducto"
                                            ref="isTipoProducto">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Ejm.: Unidad, Caja.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Tiene Costo de Producción?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isCostoProduccion"
                                            ref="isCostoProduccion">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con Precio de Compra.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Fecha Venc.?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isFechaVenProd"
                                            ref="isFechaVenProd">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con Fecha de Vencimiento.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos posee Ubicación?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isUbicacion"
                                            ref="isUbicacion">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos que tienen Ubicación Física.</span>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-tag type="info" class="cus-tag-header-panel">Configuraciones Rubro Médico</el-tag>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos posee Lote Fabricación?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isLote"
                                            ref="isLote">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos que tienen Lote de Fabricación.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos posee Indicaciones / ContraIndicaciones?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isContraIndicaciones"
                                            ref="isContraIndicaciones">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos que tienen ContraIndicaciones.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos posee Laboratorio?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isLaboratorio"
                                            ref="isLaboratorio">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos provenientes de un Laboratorio.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Nombre Genérico?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isNombreGenerico"
                                            ref="isNombreGenerico">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con Nombres Genéricos.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Grupo Médico?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isGrupoMedico"
                                            ref="isGrupoMedico">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con Grupo Médico (Respiratorio, etc).</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Tipo Médico?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isTipoMedico"
                                            ref="isTipoMedico">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con Tipo Médico (Alergias,etc).</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Tipo de Presentación?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isTipoPresentacion"
                                            ref="isTipoPresentacion">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con Tipo de Presentación (Tableta, etc).</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Composición?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isComposicion"
                                            ref="isComposicion">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos con composición médica.</span>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">¿Productos con Receta Médica?:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="isRecetaMedica"
                                            ref="isRecetaMedica">
                                            <el-radio-button label="NO"></el-radio-button>
                                            <el-radio-button label="SI"></el-radio-button>
                                        </el-radio-group>
                                        <span class="fontkursiva"> Aplica para productos cuya venta se realiza con receta médica.</span>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop20" v-show="(isNuevo || isEdicion)">
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
                                <el-table-column prop="DesCliente" 
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
                                </el-table-column>
                                <el-table-column prop="RUC" 
                                        width="120">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">RUC</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 2?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 2?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="rucTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="DNI" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">DNI</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="dniTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="NombreLegal" 
                                        width="300">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Nombre Legal</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(4)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(4)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nomLegalTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="NombreComercial" 
                                        width="300">
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
                                <el-table-column
                                        width="100">
                                    <template slot-scope="scope">
                                        <el-tag v-show="scope.row.Estado" type="success">Activo</el-tag>
                                        <el-tag v-show="!scope.row.Estado" type="danger">Inactivo</el-tag>
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
                                <el-table-column prop="UsrCreador" 
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
                                    placeholder="Buscar Cliente" 
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
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oListado.DesCliente}}</span>
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
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Nombre Legal:</span>
                                            <el-input class="paddingRight10" v-model="oListado.NombreLegal" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Nombre Comercial:</span>
                                            <el-input class="paddingRight10" v-model="oListado.NombreComercial" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width105P">RUC:</span>
                                            <el-input class="paddingRight10" v-model="oListado.RUC" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width105P">DNI:</span>
                                            <el-input v-model="oListado.DNI" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Estado:</span>
                                            <el-tag v-show="oListado.Estado" type="success">Activo</el-tag>
                                            <el-tag v-show="!oListado.Estado" type="danger">Inactivo</el-tag>
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
import AjusteClienteService from '@/services/ajustes/cliente-service'
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
            tittleModulo:'Clientes',
            //-----------------------------------
            Id:0,
            nombre:'',
            tipodoc:'RUC',
            nombreLegal:'',
            nombreComercial:'',
            RUC:'',
            DNI:'',
            activo:'SI',
            isFactOnline:'NO',
            isEditFact1:false,
            isFactProg:'NO',
            isEditFact2:false,
            isFactProgHour:'',
            isTipoProducto:'NO',
            isCostoProduccion:'NO',
            isFechaVenProd:'NO',
            isPrecioConIGV:'SI',
            //----------------------------------
            // -- RUBRO MEDICO
            isLaboratorio: 'NO',
            isNombreGenerico: 'NO',
            isGrupoMedico: 'NO',
            isTipoMedico: 'NO',
            isTipoPresentacion: 'NO',
            isComposicion: 'NO',
            isContraIndicaciones:'NO',
            isUbicacion: 'NO',
            isLote: 'NO',
            isRecetaMedica: 'NO',
            //-----------------------------------
            claveDigital:"",
            usuarioSOL:"",
            claveSOL:"",
            formArch: {
                avatar: []
            },
            URLCertificado:"",
            labelCertificado:'Certificado Digital:',
            //-----------------------------------
            formLogo: {
                avatarLogo: []
            },
            labelLogo:'Logo:',
            URLLogo:"",
            //-----------------------------------
            isNuevo:false,
            isEdicion:false,
            isEdicionNew:false,
            //-----------------------------------
            lobeListado:[],
            lobeListadoFiltrado:[],
            //-----------------------------------
            IdTipoDocIdentidad:0,
            loTipoDocIdentidad:[],
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            asc: -1,
            desc: -1,
            //-----------------------------------
            idTable:"",
            clienteTable:"",
            rucTable:"",
            dniTable:"",
            nomLegalTable:"",
            nomComercialTable:"",
            estadoTable:"",
            usrCreadorTable:"",
            fchCreacionTable:"",
            usrModificadorTable:"",
            fchModificacionTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'DesCliente', Valor:''},
                {columna:'RUC', Valor:'',},
                {columna:'DNI', Valor:'',},
                {columna:'NombreLegal', Valor:'',},
                {columna:'NombreComercial', Valor:'',},
                {columna:'Estado', Valor:'',},
                {columna:'UsrCreador', Valor:'',},
                {columna:'FchCreacion', Valor:'',},
                {columna:'UsrModificador', Valor:'',},
                {columna:'FchModificacion', Valor:'',}
            ],
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'});
        }else{
            this.CargarDatosIniciales();
        }
    },
    computed: {
        ...mapState(["usuario"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        isFactOnline: function(n){
            if(this.isEditFact1){
                this.isEditFact1=false;
            } else {
                this.isFactProg= "NO";
                this.isFactProgHour="";
            }
        },
        isFactProg: function(n){
            if(this.isEditFact2){
                this.isEditFact2=false;
            } else {
                this.isFactProgHour="";
            }
        },
        //--------------------
        nomBuscar: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        //--------------------
        tipodoc: function(n,o){
            if(this.isEdicionNew){
                this.isEdicionNew=false;
            } else if(n!=o){
                this.RUC="";
                this.DNI="";
            }
        },
        //------ FILTROS
        idTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        clienteTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        rucTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        dniTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        nomLegalTable: function(n){
            this.filtros[4].Valor = n;
            this.Paginar();
        },
        nomComercialTable: function(n){
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
                        value : file.size==0?"0000":valueFile.split(',')[1] //reader.result.split(',')[1]
                    }
                    this.formArch.avatar.push(item);
                }
            } else {
                this.formArch.avatar = [];
            }
        },
        onUploadLogo(event) {
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
                        value : file.size==0?"0000":valueFile.split(',')[1] //reader.result.split(',')[1]
                    }
                    this.formLogo.avatarLogo.push(item);
                }
            } else {
                this.formLogo.avatarLogo = [];
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
                    if (a.RUC < b.RUC)
                        return -1;
                    if (a.RUC > b.RUC)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DNI < b.DNI)
                        return -1;
                    if (a.DNI > b.DNI)
                        return 1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.NombreLegal < b.NombreLegal)
                        return -1;
                    if (a.NombreLegal > b.NombreLegal)
                        return 1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.NombreComercial < b.NombreComercial)
                        return -1;
                    if (a.NombreComercial > b.NombreComercial)
                        return 1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return -1;
                    if (a.Estado > b.Estado)
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
                    if (a.RUC < b.RUC)
                        return 1;
                    if (a.RUC > b.RUC)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DNI < b.DNI)
                        return 1;
                    if (a.DNI > b.DNI)
                        return -1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.NombreLegal < b.NombreLegal)
                        return 1;
                    if (a.NombreLegal > b.NombreLegal)
                        return -1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.NombreComercial < b.NombreComercial)
                        return 1;
                    if (a.NombreComercial > b.NombreComercial)
                        return -1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return 1;
                    if (a.Estado > b.Estado)
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
        CargarDatosIniciales(){
          AjusteClienteService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                if (res.status==200){
                    this.loTipoDocIdentidad = res.result.loTipoDocIdentidad;
                    if(this.loTipoDocIdentidad.length>0){
                        this.loTipoDocIdentidad = this.loTipoDocIdentidad.filter(obe=>obe.codigo!=-1 && obe.codigo!=0);
                    }
                    this.lobeListado = res.result.loListado;
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
            this.labelCertificado = "Certificado Digital:";
            this.labelLogo = "Logo:";
            this.Cancelar(false);
        },
        Cancelar(isAll){
            this.Id = 0;
            this.nombre="";
            this.tipodoc="RUC";
            this.RUC="";
            this.DNI="";
            this.nombreLegal="";
            this.nombreComercial="";
            this.activo='SI';
            this.isFactOnline="NO";
            this.isFactProg= "NO";
            this.isFactProgHour="";
            this.isTipoProducto='NO';
            this.isCostoProduccion='NO';
            this.isFechaVenProd='NO';
            this.usuarioSOL = "";
            this.claveSOL = "";
            this.claveDigital = "";
            this.URLCertificado = "";
            //--------
            if(isAll){
                this.isNuevo = false;
                this.isEdicion = false;
                this.btnGuardar = "GUARDAR";
                this.labelCertificado = "Certificado Digital:";
                this.labelLogo = "Logo:";
            }
            //--------
            this.formArch.avatar = [];
            $("#avatar").val(null);

            this.formLogo.avatarLogo = [];
            $("#avatarLogo").val(null);
        },
        ValidarGuardar(){
            if(this.nombre==""){
                return 'Debe ingresar Nombre de Cliente.';
            }
            if(this.tipodoc=="RUC" && this.RUC==""){
                return 'Debe ingresar RUC de Cliente.';
            }
            if(this.tipodoc=="DNI" && this.DNI==""){
                return 'Debe ingresar DNI de Cliente.';
            }
            if(this.nombreLegal==''){
                return 'Debe ingresar Nombre Legal de Cliente.';
            }
            if(this.nombreComercial==''){
                return 'Debe ingresar Nombre Comercial de Cliente.';
            }
            if(this.isFactOnline=="NO" && this.isFactProg=="SI" && this.isFactProgHour==""){
                return 'Debe seleccionar Hora Programación Facturación Electrónica.';
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            let lobe = [];
            for(var i=0;i<this.formArch.avatar.length;i+=1){
                let obe = {
                    NombreCarpeta : this.Id.toString().padStart(12,'0'),//this.usuario.cliente,//this.Id,
                    DatosAdjuntos : this.formArch.avatar[i].value,
                    DatosAdjuntosName : this.formArch.avatar[i].filename,
                }
                lobe.push(obe);
            }
            let lobeLogo = [];
            for(var i=0;i<this.formLogo.avatarLogo.length;i+=1){
                let obeLogo = {
                    NombreCarpeta : this.Id.toString().padStart(12,'0'),//this.usuario.cliente,//this.Id,
                    DatosAdjuntos : this.formLogo.avatarLogo[i].value,
                    DatosAdjuntosName : this.formLogo.avatarLogo[i].filename,
                }
                lobeLogo.push(obeLogo);
            }
            if (tipo==1){
                item.Id = this.Id;
                item.DesCliente=this.nombre;
                item.TipoDoc = this.loTipoDocIdentidad.filter(obe=>obe.descripcion==this.tipodoc)[0].codigo;
                item.RUC = (this.tipodoc=="RUC")?this.RUC:"";
                item.DNI = (this.tipodoc=="DNI")?this.DNI:"";
                item.NombreLegal = this.nombreLegal;
                item.NombreComercial = this.nombreComercial;
                item.Estado = (this.activo=="SI")?1:0;
                item.isFactOnline = (this.isFactOnline=="SI")?1:0;
                item.isFactProg = (this.isFactProg=="SI")?1:0;
                item.isFactProgHour = this.isFactProgHour;
                item.isTipoProducto = (this.isTipoProducto=="SI")?1:0;
                item.isCostoProduccion = (this.isCostoProduccion=="SI")?1:0;
                item.isFechaVenProd = (this.isFechaVenProd=="SI")?1:0;
                item.isPrecioConIGV = (this.isPrecioConIGV=='SI')?1:2;
                item.UsrCreador = this.usuario.usuarioLogin;
                item.UsuarioSOL = this.usuarioSOL;
                item.ClaveSOL = this.claveSOL;
                item.ClaveDigital = this.claveDigital;
                item.URLCertificado = this.URLCertificado;
                item.loarchivos = lobe;
                item.lologo = lobeLogo;
                //-- RUBRO MEDICO
                item.isLaboratorio = (this.isLaboratorio=="SI")?1:0;
                item.isNombreGenerico = (this.isNombreGenerico=="SI")?1:0;
                item.isGrupoMedico = (this.isGrupoMedico=="SI")?1:0;
                item.isTipoMedico = (this.isTipoMedico=="SI")?1:0;
                item.isTipoPresentacion = (this.isTipoPresentacion=="SI")?1:0;
                item.isComposicion = (this.isComposicion=="SI")?1:0;
                item.isRecetaMedica = (this.isRecetaMedica=="SI")?1:0;
                item.isContraIndicaciones = (this.isContraIndicaciones=="SI")?1:0;
                item.isUbicacion = (this.isUbicacion=="SI")?1:0;
                item.isLote = (this.isLote=="SI")?1:0;
                //----
            } else if (tipo==2){
                item.Id = id
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
            AjusteClienteService.Guardar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
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
                    console.log("Error",err);
                    this.$message({
                        showClose: true,
                        message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                        type: 'error'
                    });
                });
        },
        ActualizarBD(){
            AjusteClienteService.Actualizar(this.CreaObjetoEnvioBD(1,0))
                .then(res => {
                    if (res.status==200){
                        this.CargarDatosIniciales();
                        this.$message({
                            showClose: true,
                            message: 'Se actualizó correctamente.',
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
            this.isEdicionNew=true;
            //-----------------
            this.Id = row.Id;
            this.nombre = row.DesCliente;
            this.tipodoc = (row.RUC=="")?"DNI":"RUC";
            this.RUC = row.RUC;
            this.DNI = row.DNI;
            this.nombreLegal = row.NombreLegal;
            this.nombreComercial = row.NombreComercial;
            this.activo = row.Estado?'SI':'NO';
            //
            this.isEditFact1 = true;
            this.isFactOnline = row.isFactOnline?'SI':'NO';
            this.isEditFact2 = true;
            this.isFactProg = row.isFactProg?'SI':'NO';
            this.isFactProgHour = row.isFactProgHour;
            this.isTipoProducto = row.isTipoProducto?'SI':'NO';
            this.isCostoProduccion = row.isCostoProduccion?'SI':'NO';
            this.isFechaVenProd = row.isFechaVenProd?'SI':'NO';
            this.isPrecioConIGV = row.isPrecioConIGV==1?'SI':'NO';
            this.usuarioSOL = row.UsuarioSOL;
            this.claveSOL = row.ClaveSOL;
            this.claveDigital = row.ClaveDigital;
            this.URLCertificado = row.URLCertificado;
            this.labelCertificado = "Actualizar Certificado:";
            
            this.URLLogo = row.URLLogo;
            this.labelLogo = (this.URLLogo!=""?"Actualizar Logo:":"Logo:");
            // -- RUBRO MEDICO
            this.isLaboratorio = row.isLaboratorio?'SI':'NO';
            this.isNombreGenerico = row.isNombreGenerico?'SI':'NO';
            this.isGrupoMedico = row.isGrupoMedico?'SI':'NO';
            this.isTipoMedico = row.isTipoMedico?'SI':'NO';
            this.isTipoPresentacion = row.isTipoPresentacion?'SI':'NO';
            this.isComposicion = row.isComposicion?'SI':'NO';
            this.isRecetaMedica = row.isRecetaMedica?'SI':'NO';
            this.isContraIndicaciones = row.isContraIndicaciones?'SI':'NO';
            this.isUbicacion = row.isUbicacion?'SI':'NO';
            this.isLote = row.isLote?'SI':'NO';
        },
        Eliminar(id, row){
            this.$confirm('Desea eliminar el Cliente seleccionado?', 'Eliminar Cliente', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                AjusteClienteService.Eliminar(this.CreaObjetoEnvioBD(2,id))
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
        EliminarLogo(url){
            this.$confirm('Desea eliminar logo del Cliente?', 'Eliminar Logo de Cliente', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                AjusteClienteService.EliminarLogo(url, this.Id, this.usuario.usuarioLogin)
                    .then(res => {
                        if (res.status==200){
                            var index = this.lobeListado.findIndex(dat=>dat.Id==this.Id);
                            this.lobeListado[index].URLLogo = "";
                            //
                            this.URLLogo = "";
                            this.$message({
                                showClose: true,
                                message: 'Se eliminó logo correctamente.',
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
                        (item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.RUC.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='RUC')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DNI.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DNI')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NombreLegal.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NombreLegal')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NombreComercial.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NombreComercial')[0].Valor.toUpperCase()) >= 0) && 
                        ((item.Estado?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Estado')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrCreador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrCreador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchCreacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchCreacion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.UsrModificador.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsrModificador')[0].Valor.toUpperCase()) >= 0) && 
                        (item.FchModificacion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='FchModificacion')[0].Valor.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) &&
                        (item.RUC.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='RUC')[0].Valor.toUpperCase()) >= 0) &&
                        (item.DNI.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DNI')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NombreLegal.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NombreLegal')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NombreComercial.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NombreComercial')[0].Valor.toUpperCase()) >= 0) && 
                        ((item.Estado?'Activo':'Inactivo').toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Estado')[0].Valor.toUpperCase()) >= 0) && 
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
    .custom-file-input-e::-webkit-file-upload-button {
        visibility: hidden;
        padding-right: 40px;
    }
    .custom-file-input-e::before {
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
    .custom-file-input-e:hover::before {
        //border-color: black;
        border-color: #409EFF;
        background: #409EFF;
        text-shadow: 0px 0px #ecf5ff;
        color: #ecf5ff;
    }
    .custom-file-input-e:active::before {
        //background: -webkit-linear-gradient(top, #e3e3e3, #f9f9f9);
        background: #b3d8ff;
    }
</style>
