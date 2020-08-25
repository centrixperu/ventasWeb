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
                <el-row :gutter="5" type="flex" class="paddingTop10 margintop10 cus-border" v-show="lobeListado.length>0">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <div>
                                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                                            style="width: 100%"
                                            highlight-current-row>
                                        <el-table-column v-for="column in loColumns" 
                                                        :key="column.field"
                                                        :prop="column.field"
                                                        :label="column.header"
                                                        :width="column.width">
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
                
            </el-main>
        </el-container>

    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import { mapState,mapGetters } from "vuex";
import ReporteClienteTiendaService from '@/services/reportes/reporteClienteTienda-service'
import ExcelService from '@/services/excel/excel-service'

export default {
    name: "app",
    components: { 
      HeaderPage
    },
    data() {
        return {
            tittleModulo:'Ventas de Tienda por Precio',
            tittleReporte:'',
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
            loColumns:[],
            lobeListado:[],
            lobeListadoFiltrado:[],
            //-----------------------------------
            lobeTienda:[],
            IdTienda:0,
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        } else {
            this.CargarDatosIniciales();
        }
    },
    computed: {
        ...mapState(["usuario"]),
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
    },
    methods: {
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
                this.IdTienda=0;
            }
        },
        CargarDatosIniciales(){
            const loading = this.$loading({
                lock: true,
                text: 'Cargando Tiendas...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
          ReporteClienteTiendaService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                loading.close();
                if (res.status==200){
                    this.lobeTienda = res.result.loTienda;
                    if(this.lobeTienda.filter(obe=>obe.codigo!=0).length==1){
                        this.IdTienda = this.lobeTienda.filter(obe=>obe.codigo!=0)[0].codigo;
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
        ValidarGuardar(){
            if(this.IdTienda==0){
                return 'Debe seleccionar Tienda.';
            }
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
            var msj = this.ValidarGuardar();
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
            //----------------------------------
            this.tittleReporte='';
            //----------------------------------
            let fechainicio = "";
            let fechafin = "";
            if (this.isDia){
                this.tittleReporte="REPORTE DE VENTAS DE TIENDA POR PRECIO - POR DIA";
                fechainicio = this.fechaDia.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaDia.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaDia.getDate().toString().padStart(2,'0');
            } else if (this.isMes){
                this.tittleReporte="REPORTE DE VENTAS DE TIENDA POR PRECIO - POR MES";
                fechainicio = this.fechaMes.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaMes.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaMes.getDate().toString().padStart(2,'0');
            } else if (this.isAnio){
                this.tittleReporte="REPORTE DE VENTAS DE TIENDA POR PRECIO - POR AÑO";
                fechainicio = this.fechaAnio.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaAnio.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaAnio.getDate().toString().padStart(2,'0');
            } else if (this.isRango){
                this.tittleReporte="REPORTE DE VENTAS DE TIENDA POR PRECIO - POR RANGO";
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

            let desTienda = this.lobeTienda.filter(obe=>obe.codigo==this.IdTienda)[0].descripcion;
            ReporteClienteTiendaService.ReporteGuia(this.usuario.usuarioLogin, this.usuario.idCliente, this.isDia,
                                        this.isMes, this.isAnio, this.isRango, fechainicio, fechafin, 
                                        this.IdTienda, desTienda)
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        this.loColumns = res.result.loColumns;
                        this.lobeListado = res.result.listado;
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
        
    }
};
</script>

<style lang="scss">

</style>
