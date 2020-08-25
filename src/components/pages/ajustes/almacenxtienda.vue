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
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <el-button @click="NuevoAlmacen()" class="width100" size="small" 
                                    type="primary" icon="fas fa-plus" plain> NUEVO ALMACÉN
                        </el-button>
                    </el-col>
                    <!--<el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" class ="hidden-xs-only">
                        <el-button @click="CargaMasiva()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain :disabled="(isNuevo || isEdicion)"> CARGA MASIVA
                        </el-button>
                    </el-col>-->
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" v-show="lobeListado.length>0"
                        class ="hidden-xs-only">
                        <el-button @click="exportarLista()" class="width100" size="small" type="warning"
                                    icon="fas fa-download" plain :disabled="(isNuevo || isEdicion)"> EXPORTAR
                        </el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop5">
                    <!--<el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1" 
                        class ="hidden-sm-only hidden-md-only hidden-lg-only hidden-xl-only">
                        <el-button @click="CargaMasiva()" class="width100" size="small" type="success"
                                    icon="fas fa-file-import" plain :disabled="(isNuevo || isEdicion)"> CARGA MASIVA
                        </el-button>
                    </el-col>-->
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
                    <el-tag type="success" class="cus-tag-header-panel">{{tittleReporte}}</el-tag>
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
                                <el-table-column prop="DesTienda" 
                                        width="350">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Tienda</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 2?'colorOrderBottom':'']" @click="Ascendente(2)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 2?'colorOrderTop':'']" @click="Descendente(2)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="tiendaTable"></el-input>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="NomAlmacen" 
                                        width="350">
                                    <template slot="header" slot-scope="scope">
                                        <span class="textAdjust textcenter">Almacen</span>
                                        <span class="caret-wrapper">
                                            <i class="sort-caret ascending" v-bind:class="[asc == 3?'colorOrderBottom':'']" @click="Ascendente(3)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 3?'colorOrderTop':'']" @click="Descendente(3)"></i>
                                        </span>
                                        <el-input size="mini" class="padding0" 
                                                v-model="almacenTable"></el-input>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 4?'colorOrderBottom':'']" @click="Ascendente(4)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 4?'colorOrderTop':'']" @click="Descendente(4)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 5?'colorOrderBottom':'']" @click="Ascendente(5)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 5?'colorOrderTop':'']" @click="Descendente(5)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 6?'colorOrderBottom':'']" @click="Ascendente(6)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 6?'colorOrderTop':'']" @click="Descendente(6)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 7?'colorOrderBottom':'']" @click="Ascendente(7)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 7?'colorOrderTop':'']" @click="Descendente(7)"></i>
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
                                            <i class="sort-caret ascending" v-bind:class="[asc == 8?'colorOrderBottom':'']" @click="Ascendente(8)"></i>
                                            <i class="sort-caret descending" v-bind:class="[desc == 8?'colorOrderTop':'']" @click="Descendente(8)"></i>
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
                                    placeholder="Buscar Almacen" 
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
                                            <span class="cus-label textAdjust textAlignL fontbold">{{oListado.NomAlmacen}}</span>
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
                                            <span class="cus-label textAdjust textAlignL width105P">Cliente:</span>
                                            <el-input class="paddingRight10" v-model="oListado.DesCliente" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width105P">Tienda:</span>
                                            <el-input class="paddingRight10" v-model="oListado.DesTienda" size="mini" readonly></el-input>
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

        <modal-almacen :isModal="isModal" @interface="CargarAlmacen">
        </modal-almacen>

    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import AjusteAlmacenXTiendaService from '@/services/ajustes/almacenxtienda-service'
import ExcelService from '@/services/excel/excel-service'
import { mapState,mapGetters } from "vuex";
//MODALES
import ModalAlmacen from '@/components/pages/ajustes/modals/mdlAlmacen'
// Importamos JQuery
const $ = require('jquery')
// Lo declaramos globalmente
window.$ = $

export default {
    name: "app",
    components: { 
      HeaderPage, ModalAlmacen
    },
    data() {
        return {
            btnGuardar:'GUARDAR',
            nomBuscar:"",
            //-----------------------------------
            isModal:false,
            //-----------------------------------
            tittleModulo:'Almacén por Tienda',
            tittleReporte:'LISTADO',
            //-----------------------------------
            Id:0,
            IdCliente:-1,
            lobeCliente:[],
            IdTienda:0,
            lobeTienda:[],
            IdAlmacen:0,
            lobeAlmacen:[],
            activo:'SI',
            //-----------------------------------
            isNuevo:false,
            isEdicion:false,
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
            clienteTable:"",
            tiendaTable:"",
            almacenTable:"",
            estadoTable:"",
            usrCreadorTable:"",
            fchCreacionTable:"",
            usrModificadorTable:"",
            fchModificacionTable:"",
            filtros:[
                {columna:'Id', Valor:'',},
                {columna:'DesCliente', Valor:''},
                {columna:'DesTienda', Valor:'',},
                {columna:'NomAlmacen', Valor:'',},
                {columna:'Estado', Valor:'',},
                {columna:'UsrCreador', Valor:'',},
                {columna:'FchCreacion', Valor:'',},
                {columna:'UsrModificador', Valor:'',},
                {columna:'FchModificacion', Valor:'',}
            ],
            //-----------------------------------
            loColumns:[],
            loExport:[],
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
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        //--------------------
        IdCliente: function(n,o){
            if(n!=-1){
                this.CargarDatosCambioCliente(n);
            } else {
                this.lobeTienda = this.lobeTienda.filter(obe=>obe.codigo==0);
                this.lobeAlmacen = this.lobeAlmacen.filter(obe=>obe.codigo==0);
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
        tiendaTable: function(n){
            this.filtros[2].Valor = n;
            this.Paginar();
        },
        almacenTable: function(n){
            this.filtros[3].Valor = n;
            this.Paginar();
        },
        estadoTable: function(n){
            this.filtros[4].Valor = n;
            this.Paginar();
        },
        usrCreadorTable: function(n){
            this.filtros[5].Valor = n;
            this.Paginar();
        },
        fchCreacionTable: function(n){
            this.filtros[6].Valor = n;
            this.Paginar();
        },
        usrModificadorTable: function(n){
            this.filtros[7].Valor = n;
            this.Paginar();
        },
        fchModificacionTable: function(n){
            this.filtros[8].Valor = n;
            this.Paginar();
        },
    },
    methods: {
        CargarAlmacen(val){
            this.isModal=val;
            this.CargarDatosCambioCliente(this.IdCliente);
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
                    if (a.Cliente < b.Cliente)
                        return -1;
                    if (a.Cliente > b.Cliente)
                        return 1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Tienda < b.Tienda)
                        return -1;
                    if (a.Tienda > b.Tienda)
                        return 1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Almacen < b.Almacen)
                        return -1;
                    if (a.Almacen > b.Almacen)
                        return 1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return -1;
                    if (a.Estado > b.Estado)
                        return 1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return -1;
                    if (a.UsrCreador > b.UsrCreador)
                        return 1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return -1;
                    if (a.FchCreacion > b.FchCreacion)
                        return 1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return -1;
                    if (a.UsrModificador > b.UsrModificador)
                        return 1;
                    return 0;
                });
            } else if(id==8){
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
                    if (a.Cliente < b.Cliente)
                        return 1;
                    if (a.Cliente > b.Cliente)
                        return -1;
                    return 0;
                });
            } else if(id==2){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Tienda < b.Tienda)
                        return 1;
                    if (a.Tienda > b.Tienda)
                        return -1;
                    return 0;
                });
            } else if(id==3){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Almacen < b.Almacen)
                        return 1;
                    if (a.Almacen > b.Almacen)
                        return -1;
                    return 0;
                });
            } else if(id==4){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.Estado < b.Estado)
                        return 1;
                    if (a.Estado > b.Estado)
                        return -1;
                    return 0;
                });
            } else if(id==5){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrCreador < b.UsrCreador)
                        return 1;
                    if (a.UsrCreador > b.UsrCreador)
                        return -1;
                    return 0;
                });
            } else if(id==6){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.FchCreacion < b.FchCreacion)
                        return 1;
                    if (a.FchCreacion > b.FchCreacion)
                        return -1;
                    return 0;
                });
            } else if(id==7){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.sort(function(a, b) {
                    if (a.UsrModificador < b.UsrModificador)
                        return 1;
                    if (a.UsrModificador > b.UsrModificador)
                        return -1;
                    return 0;
                });
            } else if(id==8){
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
        CargarDatosCambioCliente(idCliente){
          AjusteAlmacenXTiendaService.CargarDatosCambioCliente(this.usuario.usuarioLogin, idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeTienda = res.result.loTienda;
                    this.lobeAlmacen = res.result.loAlmacen;
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
          AjusteAlmacenXTiendaService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeListado = res.result.loListado;
                    this.lobeCliente = res.result.loCliente;
                    this.lobeTienda = res.result.loTienda;
                    this.lobeAlmacen = res.result.loAlmacen;
                    this.IdCliente = this.usuario.idCliente;
                    //
                    this.loExport = res.result.loExport;
                    this.loColumns = res.result.loColumns;
                    //
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
        NuevoAlmacen(){
            this.isModal=true;
        },
        Cancelar(isAll){
            this.Id = 0;
            this.IdCliente=this.usuario.idCliente;
            this.IdTienda=0;
            this.IdAlmacen=0;
            this.activo='SI';
            //--------
            if(isAll){
                this.isNuevo = false;
                this.isEdicion = false;
                this.btnGuardar = "GUARDAR";
            }
            //--------
        },
        ValidarGuardar(){
            if(this.permisos.isAdministrador && this.IdCliente==-1){
                return 'Debe seleccionar Cliente.';
            }
            if(this.IdTienda==0){
                return 'Debe seleccionar Tienda.';
            }
            if(this.IdAlmacen==0){
                return 'Debe seleccionar Almacén.';
            }
            return '';
        },
        CreaObjetoEnvioBD : function(tipo,id){
            var item = {};
            if (tipo==1){
                item.Id = this.Id;
                item.IdTienda = this.IdTienda;
                item.DesTienda = this.lobeTienda.filter(obe=>obe.codigo==item.IdTienda)[0].descripcion;
                item.IdAlmacen = this.IdAlmacen;
                item.NomAlmacen = this.lobeAlmacen.filter(obe=>obe.codigo==item.IdAlmacen)[0].descripcion;
                item.Estado = (this.activo=='SI')?1:0;
                item.IdCliente = this.IdCliente;//==-1?this.usuario.idCliente:this.IdCliente;
                item.DesCliente = this.lobeCliente.filter(obe=>obe.codigo==item.IdCliente)[0].descripcion;
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
            AjusteAlmacenXTiendaService.Guardar(this.CreaObjetoEnvioBD(1,0))
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
            AjusteAlmacenXTiendaService.Actualizar(this.CreaObjetoEnvioBD(1,0))
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
            this.isNuevo=false;
            this.isEdicion=true;
            this.btnGuardar = "ACTUALIZAR";
            //-----------------
            this.Id = row.Id;
            this.IdTienda = row.IdTienda;
            this.IdAlmacen = row.IdAlmacen;
            this.IdCliente = row.IdCliente;
            this.activo = row.Estado?'SI':'NO';
        },
        Eliminar(id, row){
            this.$confirm('Desea eliminar Tienda asignada a Almacén seleccionado?', 'Eliminar Almacén', {
                confirmButtonText: 'SI',
                cancelButtonText: 'NO',
                type: 'warning'
            }).then(() => {
                AjusteAlmacenXTiendaService.Eliminar(this.CreaObjetoEnvioBD(2,id))
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
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.Id == (this.filtros.filter(f => f.columna=='Id')[0].Valor==''?item.Id:this.filtros.filter(f => f.columna=='Id')[0].Valor)) && 
                        (item.DesCliente.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesCliente')[0].Valor.toUpperCase()) >= 0) && 
                        (item.DesTienda.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesTienda')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NomAlmacen.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NomAlmacen')[0].Valor.toUpperCase()) >= 0) && 
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
                        (item.DesTienda.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='DesTienda')[0].Valor.toUpperCase()) >= 0) && 
                        (item.NomAlmacen.toString().toUpperCase().indexOf(this.filtros.filter(f => f.columna=='NomAlmacen')[0].Valor.toUpperCase()) >= 0) && 
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

</style>
