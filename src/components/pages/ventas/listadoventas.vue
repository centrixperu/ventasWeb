<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>

                <el-row :gutter="5" type="flex" class="paddingTop0 cus-border">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0">
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
                                                            (isRango && fechaRango!=''))"
                                                type="primary" icon="fas fa-save" plain> BUSCAR
                                    </el-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                    <el-button @click="Limpiar(true)" class="width100" size="small" 
                                                :disabled="!(isDia || isMes || isAnio || isRango)"
                                                type="danger" icon="fas fa-ban" plain> LIMPIAR FILTRO
                                    </el-button>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>

                <el-row :gutter="5" class="paddingTop10">
                    <el-tag type="success" class="cus-tag-header-panel">{{tittleReporte}}</el-tag>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="lobeListado.length>0">
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Total>0">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="primary" effect="plain">Total: {{Total}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Costo>0">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="info" effect="plain">Costo: {{Costo}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Ganancia>0">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="success" effect="plain">Ganancias: {{Ganancia}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Ganancia==0">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="danger" effect="plain">Sin Ganancia</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <el-button @click="exportarLista()" class="width100" size="small" 
                                    :disabled="!((isDia && fechaDia!='') || 
                                                (isMes && fechaMes!='') || 
                                                (isAnio && fechaAnio!='') || 
                                                (isRango && fechaRango!=''))"
                                    type="warning" icon="fas fa-download" plain> EXPORTAR
                        </el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 margintop10 cus-border hidden-xs-only hidden-sm-only" v-show="lobeListado.length>0">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <div>
                                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                                            style="width: 100%" 
                                            show-summary :summary-method="getSummaries"
                                            highlight-current-row>
                                        <el-table-column v-for="column in loColumns" 
                                                        :key="column.field"
                                                        :prop="column.field"
                                                        :label="column.header"
                                                        :width="column.width"
                                                        :fixed="(column.field=='PrecioCosto' || column.field=='Precio')?'right':false">
                                            <template slot="header" slot-scope="scope">
                                                <span class="fontsize13Bold textAdjustWord">{{column.header}}</span>
                                            </template>
                                            <template slot-scope="scope">
                                                <el-tag v-show="column.field=='PrecioCosto'"
                                                    type="primary" class="fontsize13Bold"
                                                    disable-transitions>{{scope.row.PrecioCosto}}</el-tag>
                                                <el-tag v-show="column.field=='Precio'"
                                                    type="success" class="fontsize13Bold"
                                                    disable-transitions>{{scope.row.Precio}}</el-tag>
                                                <span class="fontsize12" v-show="!(column.field=='PrecioCosto' || column.field=='Precio')">{{scope.row[column.field]}}</span>
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
                <el-row :gutter="5" type="flex" class="paddingTop10 margintop10 hidden-md-only hidden-lg-only hidden-xl-only">
                    <el-main class="padding5">
                        <el-row :gutter="5" type="flex" class="paddingTop5">
                            <el-col :xs="24" :sm="24">
                                <el-input type="text" ref="nomBuscar"
                                    size="small" :autosize="{ minRows: 2, maxRows: 3}" 
                                    placeholder="Buscar Documento" 
                                    @keypress.native="keyUpBuscar"
                                    v-model="nomBuscar">
                                    <el-button slot="append" icon="el-icon-search"
                                            @click="BuscarDocumento()"></el-button>
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
                                            <span class="cus-label textAdjust textAlignL width95P">Tienda :</span>
                                            <el-input v-model="oListado.DesTienda" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width95P">Nota de Venta:</span>
                                            <el-input v-model="oListado.NotaVenta" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5" v-show="(oListado.BoletaVenta!='' || oListado.FacturaVenta!='')">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span v-show="oListado.BoletaVenta!=''" class="cus-label textAdjust textAlignL width95P">Boleta:</span>
                                            <el-input v-show="oListado.BoletaVenta!=''" class="paddingRight10" v-model="oListado.BoletaVenta" size="mini" readonly></el-input>
                                            <span v-show="oListado.FacturaVenta!=''" class="cus-label textAdjust textAlignL width95P">Factura:</span>
                                            <el-input v-show="oListado.FacturaVenta!=''" v-model="oListado.FacturaVenta" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5" v-show="(oListado.NotaCreditoVenta!='' || oListado.NotaDebitoVenta!='')">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span v-show="oListado.NotaCreditoVenta!=''" class="cus-label textAdjust textAlignL width95P">Nota de Crédito:</span>
                                            <el-input v-show="oListado.NotaCreditoVenta!=''" class="paddingRight10" v-model="oListado.NotaCreditoVenta" size="mini" readonly></el-input>
                                            <span v-show="oListado.NotaDebitoVenta!=''" class="cus-label textAdjust textAlignL width95P">Nota de Débito:</span>
                                            <el-input v-show="oListado.NotaDebitoVenta!=''" v-model="oListado.NotaDebitoVenta" size="mini" readonly></el-input>
                                        </div>
                                    </el-col>
                                </el-row>
                                <el-row :gutter="5" type="flex" class="paddingTop5">
                                    <el-col :xs="24" :sm="24">
                                        <div class="cus-label-form-left width90">
                                            <span class="cus-label textAdjust textAlignL width95P">Total sin IGV:</span>
                                            <el-input class="paddingRight10" v-model="oListado.TotalSinIGV" size="mini" readonly></el-input>
                                            <span class="cus-label textAdjust textAlignL width95P">Total:</span>
                                            <el-input v-model="oListado.TotalVenta" size="mini" readonly></el-input>
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
import { mapState,mapGetters } from "vuex";
import VentaService from '@/services/ventas/venta-service'
import ExcelService from '@/services/excel/excel-service'

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            isAnular:false,
            isDetalle:false,
            nomBuscar:"",
            nomBuscarDetalle:"",
            id:0,
            row:{},
            //-----------------------------------
            tittleModulo:'Listado de Ventas',
            tittleReporte:'',
            Ganancia:0,
            Total:0,
            Costo:0,
            isCargaInicial:false,
            //-----------------------------------
            tipoFiltro:'',
            fechaDia:'',
            fechaMes:'',
            fechaAnio:'',
            fechaRango:'',
            isDia:false,
            isMes:false,
            isAnio:false,
            isRango:false,
            //-----------------------------------
            currentPage: 1,
            pageSize: 5,
            totalrows: 0,
            asc: -1,
            desc: -1,
            //-----------------------------------
            currentPageDet: 1,
            pageSizeDet: 5,
            totalrowsDet: 0,
            ascD: -1,
            descD: -1,
            //-----------------------------------
            loColumns:[],
            lobeListado:[],
            lobeListadoFiltrado:[],
            //-----------------------------------
            lobeListadoDetalle:[],
            lobeListadoDetalleFiltrado:[],
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        } else {
            this.isCargaInicial = true;
            this.tipoFiltro = "Día";
            this.isDia = true;
            this.tittleReporte="REGISTRO DE VENTA POR DIA";
            this.fechaDia = new Date();
            this.BuscarBD();
        }
    },
    computed: {
        ...mapState(["usuario"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        isAnular: function(n){
            if(!n){
                this.id = 0;
                this.row = {};
                console.log(this.id,this.row);
            }
        },
        nomBuscar: function(n){
            this.BuscarDocumento();
        },
        nomBuscarDetalle: function(n){
            this.BuscarDocumentoDetalle();
        },
        tipoFiltro: function(n){
            if(this.isCargaInicial){
                this.isCargaInicial = false;
            } else {
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
            }            
        },
    },
    methods: {
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'Venta Total';
                    return;
                }

                if (column.property=="PrecioCosto" || column.property=="Precio"){
                    const values = data.map(item => Number(item[column.property]));
                    if (!values.every(value => isNaN(value))) {
                        sums[index] = ' ' + values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                    } else {
                        sums[index] = '';
                    }
                } else {
                    sums[index] = '';
                }
            });

            return sums;
        },
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
            //------------------------
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
            //----------------------------------
            this.tittleReporte='';
            //----------------------------------
            if(isAll){
                this.tipoFiltro='';
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
        BuscarBD(){
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
            let fechainicio = "";
            let fechafin = "";
            if (this.isDia){
                this.tittleReporte="REGISTRO DE VENTA POR DIA";
                fechainicio = this.fechaDia.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaDia.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaDia.getDate().toString().padStart(2,'0');
            } else if (this.isMes){
                this.tittleReporte="REGISTRO DE VENTA POR MES";
                fechainicio = this.fechaMes.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaMes.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaMes.getDate().toString().padStart(2,'0');
            } else if (this.isAnio){
                this.tittleReporte="REGISTRO DE VENTA POR AÑO";
                fechainicio = this.fechaAnio.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaAnio.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaAnio.getDate().toString().padStart(2,'0');
            } else if (this.isRango){
                this.tittleReporte="REGISTRO DE VENTA POR RANGO";
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
            VentaService.ListadoVentas(this.usuario.usuarioLogin, this.usuario.idCliente, this.isDia,
                                        this.isMes, this.isAnio, this.isRango, fechainicio, fechafin)
                .then(res => {
                    loading.close();
                    if (res.status==200){                      
                        this.lobeListado = res.result.listado;
                        this.lobeListadoXLS = res.result.listadoExcel;
                        this.loColumns = res.result.loColumns;
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
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;
            this.lobeListadoFiltrado = this.lobeListado;
            this.totalrows=this.lobeListadoFiltrado.length;
            if(this.totalrows>0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.slice(filaInicio,filaFin);
            }

            let cantidad = this.lobeListado.length;
            this.Ganancia = 0;
            this.Total = 0;
            this.Costo = 0;
            let utilidad = 0;
            let total = 0;
            let costo = 0;
            for(var i=0;i<cantidad;i+=1){
                total += Math.round(this.lobeListado[i].Precio*100)/100;
                costo += Math.round(this.lobeListado[i].PrecioCosto*100)/100;
                utilidad += this.lobeListado[i].Precio - this.lobeListado[i].PrecioCosto;
            }
            this.Ganancia = Math.round(utilidad*100)/100;
            this.Total = Math.round(total*100)/100;
            this.Costo = Math.round(costo*100)/100;
        },
        PaginarDetalle(){
            var filaInicio = (this.currentPageDet - 1) * this.pageSizeDet;
            var filaFin = (this.currentPageDet * this.pageSizeDet) ;
            this.lobeListadoDetalleFiltrado = this.lobeListadoDetalle;
            this.totalrowsDet=this.lobeListadoDetalleFiltrado.length;
            if(this.totalrowsDet>0){
                this.lobeListadoDetalleFiltrado = this.lobeListadoDetalleFiltrado.slice(filaInicio,filaFin);
            }
        },
        BuscarDocumento(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;

            this.lobeListadoFiltrado = this.lobeListado;

            this.totalrows=this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.NotaVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) || 
                        (item.BoletaVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) ||
                        (item.FacturaVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) || 
                        (item.NotaCreditoVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) ||
                        (item.NotaDebitoVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                return ((
                        (item.NotaVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) || 
                        (item.BoletaVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) ||
                        (item.FacturaVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) || 
                        (item.NotaCreditoVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0) ||
                        (item.NotaDebitoVenta.toString().toUpperCase().indexOf(this.nomBuscar.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        keyUpBuscar(a){
            if(a.key == "Enter" && this.nomBuscar.length>0)
            {
                this.BuscarDocumento();
                a.returnValue = true;
            }
        },
        BuscarDocumentoDetalle(){
            var filaInicio = (this.currentPageDet - 1) * this.pageSizeDet;
            var filaFin = (this.currentPageDet * this.pageSizeDet) ;

            this.lobeListadoDetalleFiltrado = this.lobeListadoDetalle;

            this.totalrowsDet=this.lobeListadoDetalleFiltrado.filter(function(item){ 
                return ((
                        (item.DesProducto.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) || 
                        (item.NotaVenta.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) ||
                        (item.NroDocumento.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) || 
                        (item.SubTotal.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) ||
                        (item.Total.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0)
                        ));
                }, this).length;

            this.lobeListadoDetalleFiltrado = this.lobeListadoDetalleFiltrado.filter(function(item){ 
                return ((
                        (item.DesProducto.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) || 
                        (item.NotaVenta.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) ||
                        (item.NroDocumento.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) || 
                        (item.SubTotal.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0) ||
                        (item.Total.toString().toUpperCase().indexOf(this.nomBuscarDetalle.toUpperCase()) >= 0)
                        ));
                }, this).slice(filaInicio,filaFin);
        },
        keyUpBuscarDetalle(a){
            if(a.key == "Enter" && this.nomBuscarDetalle.length>0)
            {
                this.BuscarDocumentoDetalle();
                a.returnValue = true;
            }
        },
        exportarLista(){
            let fecha = new Date(Date.now());
            let nameArch = fecha.getFullYear().toString().padStart(4,'0') + 
                            '' + (fecha.getMonth()+1).toString().padStart(2,'0') +
                            '' + fecha.getDate().toString().padStart(2,'0') +
                            '_' + fecha.getHours().toString().padStart(2,'0') +
                            '' + fecha.getMinutes().toString().padStart(2,'0') +
                            '' + fecha.getSeconds().toString().padStart(2,'0');
            if(this.lobeListadoXLS.length>0){
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
            for(var i = 0; i< this.lobeListadoXLS.length; i++){
                var obj = this.lobeListadoXLS[i];
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
    .el-table__footer>.has-gutter {
        font-size: 15px !important;
        font-weight: bold !important;
    }
</style>
