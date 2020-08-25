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
                                        <el-select v-model="IdTienda" filterable multiple placeholder="Select"
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
                                        <span class="cus-label textAdjust textAlignL">Usuario:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small" id="codigo"
                                            ref="usuariosesion"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Usuario de Sesión" 
                                            v-model="usuariosesion"
                                            show-word-limit
                                            maxlength="20">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Nombres:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="nombre"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Nombres" 
                                            v-model="nombre"
                                            show-word-limit
                                            maxlength="100">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Apellido Paterno:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="apePat"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Apellido Paterno" 
                                            v-model="apePat"
                                            show-word-limit
                                            maxlength="100">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Apellido Materno:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="apeMat"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Apellido Materno" 
                                            v-model="apeMat"
                                            show-word-limit
                                            maxlength="100">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">DNI:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="dni"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="DNI" 
                                            v-model="dni"
                                            show-word-limit
                                            maxlength="8">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Sexo:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-radio-group size="small" v-model="sexo"
                                            ref="sexo">
                                            <el-radio-button label="Femenino"></el-radio-button>
                                            <el-radio-button label="Masculino"></el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Número Celular:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="celular"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Número Celular" 
                                            v-model="celular"
                                            show-word-limit
                                            maxlength="9">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Correo Electrónico:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="email"
                                            size="small"
                                            ref="correo"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Correo Electrónico" 
                                            v-model="correo"
                                            show-word-limit
                                            maxlength="150">
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="!isEdicion">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Contraseña:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input size="small" 
                                                placeholder="Ingrese Contraseña" 
                                                v-model="clave" 
                                                show-password>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Perfil:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-select v-model="IdPerfil" filterable placeholder="Select"
                                            size="small" ref="IdPerfil" class="width100">
                                            <el-option v-for="oPerfil in lobePerfil" 
                                                :key="oPerfil.codigo" 
                                                :label="oPerfil.descripcion"
                                                :value="oPerfil.codigo">
                                            </el-option>                            
                                        </el-select>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(isEdicion && URLFoto!='')">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Foto:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <el-row :gutter="5">
                                        <div>
                                            <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
                                                <el-card :body-style="{ padding: '0px' }">
                                                    <el-image
                                                        class="width100 height100P"
                                                        :src="URLFoto"
                                                        fit="scale-down">
                                                    </el-image>
                                                    <div class="padding10">
                                                        <div class="bottom clearfix">
                                                            <el-button class="width100"
                                                                size="mini" icon="el-icon-delete" type="danger"
                                                                @click="EliminarFoto(URLFoto)"></el-button>
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
                                        <span class="cus-label textAdjust textAlignL">{{labelFoto}}</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div >
                                        <input type="file" id="avatar" :v-model="formFoto.avatar" 
                                            class="custom-file-input-e width100" 
                                            v-on:change="onUploadFoto($event)" />
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
                                <el-table-column prop="UsuarioSesion" 
                                        width="150">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Usuario</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 1?'colorOrderBottom':'']" @click="Ascendente(1)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 1?'colorOrderTop':'']" @click="Descendente(1)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="usuarioTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Nombre" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Nombre</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 2?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 2?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="nombreTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ApePat" 
                                        width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Ape. Paterno</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="apepatTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="ApeMat" 
                                        width="160">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Ape. Materno</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(4)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(4)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="apematTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="DNI" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">DNI</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 5?'colorOrderBottom':'']" @click="Ascendente(5)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 5?'colorOrderTop':'']" @click="Descendente(5)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="dniTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Sexo" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Sexo</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 6?'colorOrderBottom':'']" @click="Ascendente(6)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 6?'colorOrderTop':'']" @click="Descendente(6)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="sexoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Celular" 
                                        width="100">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Celular</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 7?'colorOrderBottom':'']" @click="Ascendente(7)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 7?'colorOrderTop':'']" @click="Descendente(7)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="celularTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="Correo" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Correo</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 8?'colorOrderBottom':'']" @click="Ascendente(8)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 8?'colorOrderTop':'']" @click="Descendente(8)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="correoTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="DesCliente" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Cliente</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 9?'colorOrderBottom':'']" @click="Ascendente(9)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 9?'colorOrderTop':'']" @click="Descendente(9)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="clienteTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="DesPerfil" 
                                        width="200">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Perfil</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 10?'colorOrderBottom':'']" @click="Ascendente(10)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 10?'colorOrderTop':'']" @click="Descendente(10)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="perfilTable"></el-input>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 11?'colorOrderBottom':'']" @click="Ascendente(11)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 11?'colorOrderTop':'']" @click="Descendente(11)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 12?'colorOrderBottom':'']" @click="Ascendente(12)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 12?'colorOrderTop':'']" @click="Descendente(12)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 13?'colorOrderBottom':'']" @click="Ascendente(13)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 13?'colorOrderTop':'']" @click="Descendente(13)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 14?'colorOrderBottom':'']" @click="Ascendente(14)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 14?'colorOrderTop':'']" @click="Descendente(14)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 15?'colorOrderBottom':'']" @click="Ascendente(15)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 15?'colorOrderTop':'']" @click="Descendente(15)"></i>
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
                                    placeholder="Buscar Usuario" 
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
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oListado.UsuarioSesion}}</span>
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
                                            <span class="cus-label textAdjust textAlignL width95P">Nombre:</span>
                                            <el-input class="paddingRight10" v-model="oListado.Nombre" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Ape. Paterno:</span>
                                            <el-input class="paddingRight10" v-model="oListado.ApePat" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Ape. Materno:</span>
                                            <el-input v-model="oListado.ApeMat" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">DNI:</span>
                                            <el-input class="paddingRight10" v-model="oListado.DNI" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Sexo:</span>
                                            <el-input v-model="oListado.Sexo" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Celular:</span>
                                            <el-input class="paddingRight10" v-model="oListado.Celular" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Correo:</span>
                                            <el-input v-model="oListado.Correo" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left">
                                            <span class="cus-label textAdjust textAlignL width95P">Cliente:</span>
                                            <el-input class="paddingRight10" v-model="oListado.DesCliente" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Perfil:</span>
                                            <el-input v-model="oListado.DesPerfil" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width95P">Estado:</span>
                                            <el-tag v-show="oListado.Estado" type="success">Activo</el-tag>
                                            <el-tag v-show="!oListado.Estado" type="danger">Inactivo</el-tag>
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
    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AjusteUsuarioService from '@/services/ajustes/usuario-service'
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
            //-----------------------------------
            tittleModulo:'Usuarios',
            //-----------------------------------
            isNuevo:false,
            isEdicion:false,
            isEditarPerfil:false,
            //-----------------------------------
            lobeListado:[],
            lobeListadoFiltrado:[],
            //-----------------------------------
            Id:0,
            IdCliente:-1,
            lobeCliente:[],
            IdTienda:[],
            lobeTienda:[],
            IdPerfil:-1,
            lobePerfil:[],
            nombre:'',
            apePat:'',
            apeMat:'',
            dni:'',
            sexo:'',
            correo:'',
            activo:'',
            clave:'',
            celular:'',
            usuariosesion:'',
            //-----------------------------------
            formFoto: {
                avatar: []
            },
            labelFoto:'Foto:',
            URLFoto:"",
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            asc: -1,
            desc: -1,
            //-----------------------------------
            idTable:"",
            usuarioTable:"",
            nombreTable:"",
            apepatTable:"",
            apematTable:"",
            dniTable:"",
            sexoTable:"",
            celularTable:"",
            correoTable:"",
            clienteTable:"",
            perfilTable:"",
            estadoTable:"",
            usrCreadorTable:"",
            fchCreacionTable:"",
            usrModificadorTable:"",
            fchModificacionTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'UsuarioSesion', Valor:''},
                {columna:'Nombre', Valor:'',},
                {columna:'ApePat', Valor:'',},
                {columna:'ApeMat', Valor:'',},
                {columna:'DNI', Valor:''},
                {columna:'Sexo', Valor:'',},
                {columna:'Celular', Valor:'',},
                {columna:'Correo', Valor:'',},
                {columna:'DesCliente', Valor:''},
                {columna:'DesPerfil', Valor:'',},
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
        nomBuscar: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        //-----------------------------------
        IdCliente: function(n,o){
            if(n!=-1){
                this.CargarDatosCambioCliente(n);
            } else {
                this.lobePerfil = this.lobePerfil.filter(obe=>obe.codigo==-1);
                this.lobeTienda = this.lobeTienda.filter(obe=>obe.codigo==0);
            }
        },
        //-----------------------------------
        idTable: function(n){
            this.filtros[0].Valor = n;
            this.Paginar();
        },
        usuarioTable: function(n){
            this.filtros[1].Valor = n;
            this.Paginar();
        },
        nombreTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        apepatTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        apematTable: function(n){
            this.filtros[4].Valor = n;
            this.Paginar();
        },
        dniTable: function(n){
            this.filtros[5].Valor = n;
            this.Paginar();
        },
        sexoTable: function(n){
            this.filtros[6].Valor = n;
            this.Paginar();
        },
        celularTable: function(n){
            this.filtros[7].Valor = n;
            this.Paginar();
        },
        correoTable: function(n){
            this.filtros[8].Valor = n;
            this.Paginar();
        },
        clienteTable: function(n){
            this.filtros[9].Valor = n;
            this.Paginar();
        },
        perfilTable: function(n){
            this.filtros[10].Valor = n;
            this.Paginar();
        },
        estadoTable: function(n){
            this.filtros[11].Valor = n;
            this.Paginar();
        },
        usrCreadorTable: function(n){
            this.filtros[12].Valor = n;
            this.Paginar();
        },
        fchCreacionTable: function(n){
            this.filtros[13].Valor = n;
            this.Paginar();
        },
        usrModificadorTable: function(n){
            this.filtros[14].Valor = n;
            this.Paginar();
        },
        fchModificacionTable: function(n){
            this.filtros[15].Valor = n;
            this.Paginar();
        },
    },
    methods: {
        onUploadFoto(event) {
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
                    this.formFoto.avatar.push(item);
                }
            } else {
                this.formFoto.avatar = [];
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
                    if (a.UsuarioSesion < b.UsuarioSesion)
                        return -1;
                    if (a.UsuarioSesion > b.UsuarioSesion)
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
                    if (a.ApePat < b.ApePat)
                        return -1;
                    if (a.ApePat > b.ApePat)
                        return 1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.ApeMat < b.ApeMat)
                        return -1;
                    if (a.ApeMat > b.ApeMat)
                        return 1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DNI < b.DNI)
                        return -1;
                    if (a.DNI > b.DNI)
                        return 1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Sexo < b.Sexo)
                        return -1;
                    if (a.Sexo > b.Sexo)
                        return 1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Celular < b.Celular)
                        return -1;
                    if (a.Celular > b.Celular)
                        return 1;
                    return 0;
                });
            } else if(id==8){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Correo < b.Correo)
                        return -1;
                    if (a.Correo > b.Correo)
                        return 1;
                    return 0;
                });
            } else if(id==9){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesCliente < b.DesCliente)
                        return -1;
                    if (a.DesCliente > b.DesCliente)
                        return 1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesPerfil < b.DesPerfil)
                        return -1;
                    if (a.DesPerfil > b.DesPerfil)
                        return 1;
                    return 0;
                });
            } else if(id==11){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return -1;
                    if (a.Estado > b.Estado)
                        return 1;
                    return 0;
                });
            } else if(id==12){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return -1;
                    if (a.UsrCreador > b.UsrCreador)
                        return 1;
                    return 0;
                });
            } else if(id==13){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return -1;
                    if (a.FchCreacion > b.FchCreacion)
                        return 1;
                    return 0;
                });
            } else if(id==14){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return -1;
                    if (a.UsrModificador > b.UsrModificador)
                        return 1;
                    return 0;
                });
            } else if(id==15){
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
                    if (a.UsuarioSesion < b.UsuarioSesion)
                        return 1;
                    if (a.UsuarioSesion > b.UsuarioSesion)
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
                    if (a.ApePat < b.ApePat)
                        return 1;
                    if (a.ApePat > b.ApePat)
                        return -1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.ApeMat < b.ApeMat)
                        return 1;
                    if (a.ApeMat > b.ApeMat)
                        return -1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DNI < b.DNI)
                        return 1;
                    if (a.DNI > b.DNI)
                        return -1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Sexo < b.Sexo)
                        return 1;
                    if (a.Sexo > b.Sexo)
                        return -1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Celular < b.Celular)
                        return 1;
                    if (a.Celular > b.Celular)
                        return -1;
                    return 0;
                });
            } else if(id==8){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Correo < b.Correo)
                        return 1;
                    if (a.Correo > b.Correo)
                        return -1;
                    return 0;
                });
            } else if(id==9){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesCliente < b.DesCliente)
                        return 1;
                    if (a.DesCliente > b.DesCliente)
                        return -1;
                    return 0;
                });
            } else if(id==10){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.DesPerfil < b.DesPerfil)
                        return 1;
                    if (a.DesPerfil > b.DesPerfil)
                        return -1;
                    return 0;
                });
            } else if(id==11){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return 1;
                    if (a.Estado > b.Estado)
                        return -1;
                    return 0;
                });
            } else if(id==12){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return 1;
                    if (a.UsrCreador > b.UsrCreador)
                        return -1;
                    return 0;
                });
            } else if(id==13){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return 1;
                    if (a.FchCreacion > b.FchCreacion)
                        return -1;
                    return 0;
                });
            } else if(id==14){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return 1;
                    if (a.UsrModificador > b.UsrModificador)
                        return -1;
                    return 0;
                });
            } else if(id==15){
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
        //-----------------------------------
        CargarDatosCambioCliente(idCliente){
          AjusteUsuarioService.CargarDatosCambioCliente(this.usuario.usuarioLogin, idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeTienda = res.result.loTienda;
                    this.lobePerfil = res.result.loPerfil;
                    if(!this.isEditarPerfil){
                        this.IdPerfil = -1;
                        this.IdTienda = [];
                    }
                    this.isEditarPerfil = false;
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
        CargarDatosIniciales(){
          AjusteUsuarioService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeListado = res.result.loListado;
                    this.lobeCliente = res.result.loCliente;
                    this.lobePerfil = res.result.loPerfil;
                    this.IdCliente=this.usuario.idCliente;
                    this.Paginar();
                } else if (res.status==300){

                } else if (res.status==400){

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
            this.btnGuardar = "GUARDAR";
            this.isNuevo=true;
            this.isEdicion=false;
            this.Cancelar(false);
        },
        Cancelar(isAll){
            this.Id=0;
            this.IdCliente=this.usuario.idCliente;
            this.IdPerfil=-1;
            this.nombre='';
            this.apePat='';
            this.apeMat='';
            this.dni='';
            this.sexo='';
            this.correo='';
            this.clave='';
            this.celular='';
            this.activo='SI';
            this.usuariosesion='';
            //--------
            if(isAll){
                this.isNuevo = false;
                this.isEdicion = false;
                this.btnGuardar = "GUARDAR";
            }
            //--------
            this.formFoto.avatar = [];
            $("#avatar").val(null);
        },
        ValidarGuardar(){
            if(this.permisos.isAdministrador && this.IdCliente==-1){
                return 'Debe seleccionar Cliente.';
            }
            if(this.IdTienda.length==0){
                return 'Debe seleccionar Tienda.';
            }
            if(this.nombre==''){
                return 'Debe ingresar Nombre de Usuario.';
            }
            if(this.apellido==''){
                return 'Debe ingresar Apellido de Usuario.';
            }
            if(this.dni==''){
                return 'Debe ingresar DNI de Usuario.';
            }
            if(this.sexo==''){
                return 'Debe seleccionar Sexo de Usuario.';
            }
            if(this.correo==''){
                return 'Debe ingresar Correo Electrónico.';
            }
            if(this.celular==''){
                return 'Debe ingresar Número de Celular.';
            }
            if(this.IdPerfil==-1){
                return 'Debe seleccionar Perfil de Usuario.';
            }
            if(this.usuariosesion==''){
                return 'Debe ingresar Usuario de Sesión.';
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            let lobeFoto = [];
            for(var i=0;i<this.formFoto.avatar.length;i+=1){
                let obeFoto = {
                    NombreCarpeta : (this.IdCliente/*==-1?this.usuario.idCliente:this.IdCliente*/).toString().padStart(12,'0'),//this.usuario.cliente,//this.Id,
                    DatosAdjuntos : this.formFoto.avatar[i].value,
                    DatosAdjuntosName : this.formFoto.avatar[i].filename,
                }
                lobeFoto.push(obeFoto);
            }

            if (tipo==1){
                item.Id = this.Id;
                item.IdCliente = this.IdCliente;//==-1?this.usuario.idCliente:this.IdCliente;
                item.DesCliente = this.lobeCliente.filter(obe=>obe.codigo==item.IdCliente)[0].descripcion;
                item.IdPerfil = this.IdPerfil
                item.DesPerfil = this.lobePerfil.filter(obe=>obe.codigo==item.IdPerfil)[0].descripcion;
                item.Nombre = this.nombre;
                item.ApePat = this.apePat;
                item.ApeMat = this.apeMat;
                item.DNI = this.dni;
                item.Sexo = this.sexo;
                item.Correo = this.correo;
                item.Celular = this.celular;
                item.Clave = this.clave;
                item.Estado = (this.activo=='SI')?1:0;
                item.UsuarioSesion = this.usuariosesion;
                item.UsrCreador = this.usuario.usuarioLogin;
                item.lologo = lobeFoto;

                var cont = this.IdTienda.length;
                var loTienda = [];
                for(var i=0;i<cont;i+=1){
                    var obeTienda = {
                        codigo : this.IdTienda[i]
                    };
                    loTienda.push(obeTienda);
                }
                item.loTienda = loTienda;
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
            AjusteUsuarioService.Guardar(this.CreaObjetoEnvioBD(1,0))
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
            AjusteUsuarioService.Actualizar(this.CreaObjetoEnvioBD(1,0))
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
            this.Id = row.Id;
            this.IdCliente = row.IdCliente;
            this.isEditarPerfil = true;
            this.IdPerfil = row.IdPerfil;

            var cont = row.loTienda.length;
            var loTienda = [];
            for(var i=0;i<cont;i+=1){
                loTienda.push(row.loTienda[i].codigo);
            }
            this.IdTienda = loTienda;
            this.nombre = row.Nombre;
            this.apePat = row.ApePat;
            this.apeMat = row.ApeMat;
            this.dni = row.DNI;
            this.sexo = row.Sexo;
            this.correo = row.Correo;
            this.celular = row.Celular;
            this.activo = row.Estado?'SI':'NO';
            this.usuariosesion = row.UsuarioSesion;
            this.URLFoto = row.URLFoto;
        },
        Eliminar(id, row){
            this.$confirm('Desea eliminar el Usuario seleccionado?', 'Eliminar Usuario', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                AjusteUsuarioService.Eliminar(this.CreaObjetoEnvioBD(2,id))
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
                        (item.UsuarioSesion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsuarioSesion')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ApePat.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ApePat')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ApeMat.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ApeMat')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DNI.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DNI')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Sexo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Sexo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Celular.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Celular')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Correo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Correo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DesPerfil.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesPerfil')[0].Valor.toUpperCase()) >= 0) && 
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
                        (item.UsuarioSesion.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='UsuarioSesion')[0].Valor.toUpperCase()) >= 0) &&
                        (item.Nombre.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Nombre')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ApePat.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ApePat')[0].Valor.toUpperCase()) >= 0) && 
                        (item.ApeMat.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='ApeMat')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DNI.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DNI')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Sexo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Sexo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Celular.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Celular')[0].Valor.toUpperCase()) >= 0) && 
                        (item.Correo.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='Correo')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DesPerfil.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesPerfil')[0].Valor.toUpperCase()) >= 0) && 
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
            this.filtros[2].Valor = this.nomBuscar;
            this.Paginar();
        },
    }
};
</script>

<style lang="scss">

</style>
