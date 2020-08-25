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
                <!--<el-row :gutter="5" type="flex" class="paddingTop10 cus-border" v-show="(isDia && fechaDia!='' && seriesD.length>0)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsD"
                                            :series="seriesD"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 cus-border" v-show="(isMes && fechaMes!='' && (seriesGEM.length>0 || seriesGSM.length>0))">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="seriesGEM.length>0 && seriesGSM.length>0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGEM"
                                            :series="seriesGEM"></apexchart>
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGSM"
                                            :series="seriesGSM"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="seriesGEM.length>0 && seriesGSM.length==0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGEM"
                                            :series="seriesGEM"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="seriesGEM.length==0 && seriesGSM.length>0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGSM"
                                            :series="seriesGSM"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 cus-border" v-show="(isAnio && fechaAnio!='' && (seriesGEA.length>0 || seriesGSA.length>0))">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="seriesGEA.length>0 && seriesGSA.length>0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGEA"
                                            :series="seriesGEA"></apexchart>
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGSA"
                                            :series="seriesGSA"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="seriesGEA.length>0 && seriesGSA.length==0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGEA"
                                            :series="seriesGEA"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10" v-show="seriesGEA.length==0 && seriesGSA.length>0">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div class="textAlignC">
                                        <apexchart type="bar" height="350" class="width95"
                                            :options="chartOptionsGSA"
                                            :series="seriesGSA"></apexchart>
                                    </div>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 cus-border" v-show="(isRango && fechaRango!='' && isGER && !isGSR)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                    <div id="chart-line5" class="textAlignC">
                                        <apexchart type="line" height="230" class="width95" :options="chartOptionsGER" :series="seriesGER"></apexchart>
                                    </div>
                                    <div id="chart-line4" class="textAlignC">
                                    </div>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 cus-border" v-show="(isRango && fechaRango!='' && isGER && isGSR)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <div id="chart-line1" class="textAlignC">
                                        <apexchart type="line" height="230" class="width95" :options="chartOptionsGER" :series="seriesGER"></apexchart>
                                    </div>
                                    <div id="chart-line0" class="textAlignC">
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                                    <div id="chart-line3" class="textAlignC">
                                        <apexchart type="line" height="230" class="width95" :options="chartOptionsGSR" :series="seriesGSR"></apexchart>
                                    </div>
                                    <div id="chart-line2" class="textAlignC">
                                    </div>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 cus-border" v-show="(isRango && fechaRango!='' && !isGER && isGSR)">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                     <div id="chart-line7" class="textAlignC">
                                        <apexchart type="line" height="230" class="width95" :options="chartOptionsGSR" :series="seriesGSR"></apexchart>
                                    </div>
                                    <div id="chart-line6" class="textAlignC">
                                    </div>
                                </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>-->

                <el-row :gutter="5" type="flex" class="paddingTop10 margintop10 cus-border" v-show="lobeListado.length>0">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <div>
                                    <el-table ref="listado" :data="lobeListadoFiltrado" 
                                            style="width: 100%"
                                            highlight-current-row>
                                        <el-table-column fixed="left" label="" width="66">
                                            <template slot-scope="scope">
                                                <el-button
                                                    size="mini" type="info" icon="el-icon-plus"
                                                    @click="VerDetalle(scope.row, scope.row.NroGuiaSalida, scope.row.NroGuiaEntrada)"></el-button>
                                            </template>
                                        </el-table-column>
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

        <modal-guia-detalle :isModal="isModal" :title="isTitleModal" :listado="lobeModal" :subtitle="isSubTitleModal" @interface="Cargar">
        </modal-guia-detalle>

    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import { mapState,mapGetters } from "vuex";
import ReporteClienteService from '@/services/reportes/reporteCliente-service'
import ExcelService from '@/services/excel/excel-service'
//MODALES
import ModalGuiaDetalle from '@/components/pages/reportes/modals/mdlGuiaDetalle'

export default {
    name: "app",
    components: { 
      HeaderPage, ModalGuiaDetalle
    },
    data() {
        return {
            isModal:false,
            isTitleModal:'',
            isSubTitleModal:'',
            lobeModal:[],
            tittleModulo:'Ver Guías',
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
            lobeListadoDetalle:[],
            loColumnsDetalle:[],
            //-----------------------------------
            /*seriesD:[],
            chartOptionsD:{},
            //-----------------------------------
            seriesGEM:[],
            chartOptionsGEM:{},
            seriesGSM:[],
            chartOptionsGSM:{},
            //-----------------------------------
            seriesGEA:[],
            chartOptionsGEA:{},
            seriesGSA:[],
            chartOptionsGSA:{},
            //-----------------------------------
            es: {
                "name": "es",
                "options": {
                    "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
                    "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
                    "days": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
                    "shortDays": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                    "toolbar": {
                        "exportToSVG": "Download SVG",
                        "exportToPNG": "Download PNG",
                        "menu": "Menu",
                        "selection": "Selection",
                        "selectionZoom": "Selection Zoom",
                        "zoomIn": "Zoom In",
                        "zoomOut": "Zoom Out",
                        "pan": "Panning",
                        "reset": "Reset Zoom"
                    }
                }
            },
            //-----------------------------------
            seriesGER:[],
            chartOptionsGER: {
                chart: {
                    id: "chart2",
                    type: "line",
                    locales:[{
                        "name": "es",
                        "options": {
                            "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
                            "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
                            "days": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
                            "shortDays": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                            "toolbar": {
                                "exportToSVG": "Download SVG",
                                "exportToPNG": "Download PNG",
                                "menu": "Menu",
                                "selection": "Selection",
                                "selectionZoom": "Selection Zoom",
                                "zoomIn": "Zoom In",
                                "zoomOut": "Zoom Out",
                                "pan": "Panning",
                                "reset": "Reset Zoom"
                            }
                        }
                    }],
                    defaultLocale: 'es',
                    height: 230,
                    foreColor: "#ccc",
                    toolbar: {
                        autoSelected: "pan",
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: false,
                        },
                    }
                },
                series: [{ name:"Guías", data: undefined }],
                stroke: {
                    width: 3,
                    //curve: 'smooth',
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    opacity: 1,
                },
                markers: {
                    size: 0,
                },
                xaxis: {
                    type: "datetime",
                },
            },*/
            /*chartOptionsLineGER: {
                chart: {
                    id: "chart1",
                    height: 130,
                    type: "line",
                    foreColor: "#ccc",
                    brush: {
                        target: "chart2",
                        enabled: true
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: undefined,
                            max: undefined
                        }
                    },
                },
                series: [{ name:"Guías", data: undefined }],
                stroke: {
                    width: 3,
                    //curve: 'smooth',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.91,
                        opacityTo: 0.1,
                    }
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    type: "datetime",
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    tickAmount: 2
                }
            },*/
            /*seriesGSR:[],
            chartOptionsGSR: {
                chart: {
                    id: "chart2",
                    type: "line",
                    locales:[{
                        "name": "es",
                        "options": {
                            "months": ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"],
                            "shortMonths": ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
                            "days": ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"],
                            "shortDays": ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                            "toolbar": {
                                "exportToSVG": "Download SVG",
                                "exportToPNG": "Download PNG",
                                "menu": "Menu",
                                "selection": "Selection",
                                "selectionZoom": "Selection Zoom",
                                "zoomIn": "Zoom In",
                                "zoomOut": "Zoom Out",
                                "pan": "Panning",
                                "reset": "Reset Zoom"
                            }
                        }
                    }],
                    defaultLocale: 'es',
                    height: 230,
                    foreColor: "#ccc",
                    toolbar: {
                        autoSelected: "pan",
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: false,
                        },
                    }
                },
                series: [{ name:"Guías", data: undefined }],
                stroke: {
                    width: 3,
                    //curve: 'smooth',
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    opacity: 1,
                },
                markers: {
                    size: 0,
                },
                xaxis: {
                    type: "datetime"
                },
            },*/
            /*chartOptionsLineGSR: {
                chart: {
                    id: "chart1",
                    height: 130,
                    type: "line",
                    foreColor: "#ccc",
                    brush: {
                        target: "chart2",
                        enabled: true
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: undefined,
                            max: undefined
                        }
                    },
                },
                series: [{ name:"Guías", data: undefined }],
                stroke: {
                    width: 3,
                    //curve: 'smooth',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.91,
                        opacityTo: 0.1,
                    }
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    type: "datetime",
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    tickAmount: 2
                }
            },*/
            /*isGER:false,
            isGSR:false,
            //-----------------------------------
            seriesDia: [
                { name: "", data: undefined },
                { name: "", data: undefined }
            ],
            chartOptionsDia: {
                annotations: {
                    points: [{
                        x: 'Bananas',
                        seriesIndex: 0,
                        label: {
                            borderColor: '#775DD0',
                            offsetY: 0,
                            style: {
                                color: '#fff',
                                background: '#775DD0',
                            },
                            text: 'Bananas are good',
                        }
                    }]
                },
                chart: {
                    height: 350,
                    type: 'bar',
                },
                plotOptions: {
                    bar: {
                        //columnWidth: '50%',
                        //endingShape: 'rounded',
                        horizontal: true
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2
                },
                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: undefined, 
                },
                yaxis: {
                    title: {
                        text: '', //'Guia',
                    },
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                }
            },
            //-----------------------------------
            chartOptionsMesGE: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: undefined, 
                    title: {
                        text: '',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            cssClass: 'fontbold',
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + ""
                        },
                    }
                }
            },
            chartOptionsMesGS: {
                chart: {
                    type: 'bar',
                    height: 350
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: undefined, 
                    title: {
                        text: '',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            cssClass: 'fontbold',
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + ""
                        },
                    }
                }
            },
            //-----------------------------------
            chartOptionsAnioGE: {
                chart: {
                    type: 'bar',
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: undefined, 
                    title: {
                        text: '',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            cssClass: 'fontbold',
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + ""
                        },
                    }
                }
            },
            chartOptionsAnioGS: {
                chart: {
                    type: 'bar',
                    height: 350,
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },
                xaxis: {
                    categories: undefined, 
                    title: {
                        text: '',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            cssClass: 'fontbold',
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + ""
                        },
                    }
                }
            },
            //-----------------------------------
            chartOptionsRangoGE: {
                chart: {
                    height: 350,
                    type: 'bar',
                    zoom: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                xaxis: {
                    categories: undefined, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    title: {
                        text: '',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            cssClass: 'fontbold',
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + ""
                        },
                    }
                }
            },
            chartOptionsRangoGS: {
                chart: {
                    height: 350,
                    type: 'bar',
                    zoom: {
                        enabled: true
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: undefined, //['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
                    title: {
                        text: '',
                        style: {
                            color: undefined,
                            fontSize: '14px',
                            cssClass: 'fontbold',
                        },
                    }
                },
                yaxis: {
                    title: {
                        text: ''
                    }
                },
                fill: {
                    opacity: 1
                },
                tooltip: {
                    y: {
                        formatter: function (val) {
                            return "" + val + ""
                        },
                    }
                }
            },
            //-----------------------------------
            chartOptionsLine: {
                chart: {
                    id: "chart1",
                    height: 130,
                    type: "line",
                    foreColor: "#ccc",
                    brush: {
                        target: "chart2",
                        enabled: true
                    },
                    selection: {
                        enabled: true,
                        xaxis: {
                            min: undefined,//this.calcularFecha(1),
                            max: undefined//this.calcularFecha(2)
                        }
                    },
                },
                //colors: ["#008FFB"],
                series: [{ name:"Guías", data: undefined }],
                stroke: {
                    width: 3,
                    //curve: 'smooth',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        opacityFrom: 0.91,
                        opacityTo: 0.1,
                    }
                },
                legend: {
                    show: false,
                },
                xaxis: {
                    type: "datetime",
                    tooltip: {
                        enabled: false
                    }
                },
                yaxis: {
                    tickAmount: 2
                }
            },*/
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
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
        Cargar(val){
            this.isTitleModal="";
            this.isSubTitleModal="";
            this.isModal=val;
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
                //this.LimpiarGraficos();
            }
        },
        LimpiarGraficos(){
            this.seriesD=[];
            this.chartOptionsD={};

            this.seriesGEM=[];
            this.chartOptionsGEM={};
            this.seriesGSM=[];
            this.chartOptionsGSM={};

            this.seriesGEA=[];
            this.chartOptionsGEA={};
            this.seriesGSA=[];
            this.chartOptionsGSA={};

            this.seriesGER=[];
            this.chartOptionsLineGER.series = [];
            this.chartOptionsLineGER.chart.selection.xaxis.min = undefined;
            this.chartOptionsLineGER.chart.selection.xaxis.max = undefined;

            this.seriesGSR=[];
            this.chartOptionsLineGSR.series = [];
            this.chartOptionsLineGSR.chart.selection.xaxis.min = undefined;
            this.chartOptionsLineGSR.chart.selection.xaxis.max = undefined;

            this.isGER=false;
            this.isGSR=false;
            //------------------------
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
        },
        ValidarGuardar(){
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
                //this.LimpiarGraficos();
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
                this.tittleReporte="REPORTE DE GUIA POR DIA";
                fechainicio = this.fechaDia.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaDia.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaDia.getDate().toString().padStart(2,'0');
            } else if (this.isMes){
                this.tittleReporte="REPORTE DE GUIA POR MES";
                fechainicio = this.fechaMes.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaMes.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaMes.getDate().toString().padStart(2,'0');
            } else if (this.isAnio){
                this.tittleReporte="REPORTE DE GUIA POR AÑO";
                fechainicio = this.fechaAnio.getFullYear().toString().padStart(4,'0') + 
                            '-' + (this.fechaAnio.getMonth()+1).toString().padStart(2,'0') +
                            '-' + this.fechaAnio.getDate().toString().padStart(2,'0');
            } else if (this.isRango){
                this.tittleReporte="REPORTE DE GUIA POR RANGO";
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

            ReporteClienteService.ReporteGuia(this.usuario.usuarioLogin, this.usuario.idCliente, this.isDia,
                                        this.isMes, this.isAnio, this.isRango, fechainicio, fechafin)
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        /*if(res.result.listadoData.length>0){
                            this.CargarDatosGrafico(res);
                        }*/                        
                        this.loColumns = res.result.loColumns;
                        this.lobeListado = res.result.listado;
                        this.lobeListadoDetalle = res.result.listadoDetalle;
                        this.loColumnsDetalle = res.result.loColumnsDetalle;
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
        CargarDatosGrafico(res){
            let data1 = [];
            let data2 = [];
            let lobe = res.result.listadoData;
            //------
            let loD1 = [];
            let loD2 = [];
            let item1 = {};
            let item2 = {};
            let loOption = [];
            /*
            if(this.isDia){
                for(var i=0; i<lobe.length; i+=1){
                    if(data1.length==0){
                        let itemD1 = Number(lobe[i].GuiaEntrada);
                        loD1.push(itemD1);
                        item1.name = lobe[i].NombreGuiaEntrada;
                        item1.data = loD1;
                    } else {
                        let itemD1 = Number(lobe[i].GuiaEntrada);
                        loD1.push(itemD1);
                        item1.data = loD1;
                    }
                    if(data2.length==0){
                        let itemD2 = Number(lobe[i].GuiaSalida);
                        loD2.push(itemD2);
                        item2.name = lobe[i].NombreGuiaSalida;
                        item2.data = loD2;
                    } else {
                        let itemD2 = Number(lobe[i].GuiaSalida);
                        loD2.push(itemD2);
                        item2.data = loD2;
                    }
                    loOption.push(lobe[i].DesTienda);
                }

                this.seriesDia[0] = item1;
                this.seriesDia[1] = item2;
                this.chartOptionsDia.xaxis.categories = loOption;

                this.seriesD = this.seriesDia;
                this.chartOptionsD = this.chartOptionsDia;
            }
            else if (this.isMes){
                const resFecha = [];
                const map = new Map();
                for (const item of lobe) {
                    if(!map.has(item.Fecha)){
                        map.set(item.Fecha, true);
                        resFecha.push({
                            Fecha: item.Fecha
                        });
                    }
                }

                const resTienda = [];
                const mapR = new Map();
                for (const item of lobe) {
                    if(!mapR.has(item.IdTienda)){
                        mapR.set(item.IdTienda, true);
                        resTienda.push({
                            IdTienda: item.IdTienda
                        });
                    }
                }

                for(var x=0; x<resFecha.length; x+=1){
                    for(var i=0; i<resTienda.length; i+=1){
                        let itemGE = {};
                        let itemGS = {};
                        let index = lobe.findIndex(obe=>obe.IdTienda==resTienda[i].IdTienda && obe.Fecha==resFecha[x].Fecha);
                        if(index!=-1){
                            itemGE.name = lobe[index].DesTienda;
                            itemGE.data = [];
                            itemGE.data.push(lobe[index].GuiaEntrada);
                            let indEn = data1.findIndex(obe=>obe.name==itemGE.name);
                            if(indEn!=-1){
                                data1[indEn].data.push(lobe[index].GuiaEntrada);
                            } else {
                                data1.push(itemGE);
                            }

                            itemGS.name = lobe[index].DesTienda;
                            itemGS.data = [];
                            itemGS.data.push(lobe[index].GuiaSalida);
                            let indSa = data2.findIndex(obe=>obe.name==itemGS.name);
                            if(indSa!=-1){
                                data2[indSa].data.push(lobe[index].GuiaSalida);
                            } else {
                                data2.push(itemGS);
                            }
                        } else {
                            let desTienda = lobe.filter(obe=>obe.IdTienda==resTienda[i].IdTienda)[0].DesTienda;
                            let indE = data1.findIndex(obe=>obe.name==desTienda);
                            let indS = data2.findIndex(obe=>obe.name==desTienda);
                            if(indE!=-1){
                                data1[indE].data.push(0);
                            } else {
                                itemGE.name = desTienda;
                                itemGE.data = [];
                                itemGE.data.push(0);
                                data1.push(itemGE);
                            }
                            if(indS!=-1){
                                data2[indS].data.push(0);
                            } else {
                                itemGS.name = desTienda;
                                itemGS.data = [];
                                itemGS.data.push(0);
                                data2.push(itemGS);
                            }
                        }
                    }
                    loOption.push(resFecha[x].Fecha);
                }

                let d1 = 0;
                for(var x=0;x<data1.length;x+=1){
                    for(var z=0;z<data1[x].data.length;z+=1){
                        if(data1[x].data[z]>0){
                            d1 = 1
                        }
                    }
                }
                let d2 = 0;
                for(var x=0;x<data2.length;x+=1){
                    for(var z=0;z<data2[x].data.length;z+=1){
                        if(data2[x].data[z]>0){
                            d2 = 1
                        }
                    }
                }

                this.chartOptionsMesGE.xaxis.categories = loOption;
                this.chartOptionsMesGS.xaxis.categories = loOption;
                this.seriesGEM = d1==0?[]:data1;
                this.seriesGSM = d2==0?[]:data2;

                let chartGEM = this.chartOptionsMesGE;
                let chartGSM = this.chartOptionsMesGS;

                chartGEM.xaxis.title.text = "Guías de Entrada";
                this.chartOptionsGEM = chartGEM;
                chartGSM.xaxis.title.text = "Guías de Salida";
                this.chartOptionsGSM = chartGSM;
            } 
            else if (this.isAnio){
                const resFecha = [];
                const map = new Map();
                for (const item of lobe) {
                    if(!map.has(item.Fecha)){
                        map.set(item.Fecha, true);
                        resFecha.push({
                            Fecha: item.Fecha
                        });
                    }
                }

                const resTienda = [];
                const mapR = new Map();
                for (const item of lobe) {
                    if(!mapR.has(item.IdTienda)){
                        mapR.set(item.IdTienda, true);
                        resTienda.push({
                            IdTienda: item.IdTienda
                        });
                    }
                }

                for(var x=0; x<resFecha.length; x+=1){
                    for(var i=0; i<resTienda.length; i+=1){
                        let itemGE = {};
                        let itemGS = {};
                        let index = lobe.findIndex(obe=>obe.IdTienda==resTienda[i].IdTienda && obe.Fecha==resFecha[x].Fecha);
                        if(index!=-1){
                            itemGE.name = lobe[index].DesTienda;
                            itemGE.data = [];
                            itemGE.data.push(lobe[index].GuiaEntrada);
                            let indEn = data1.findIndex(obe=>obe.name==itemGE.name);
                            if(indEn!=-1){
                                data1[indEn].data.push(lobe[index].GuiaEntrada);
                            } else {
                                data1.push(itemGE);
                            }

                            itemGS.name = lobe[index].DesTienda;
                            itemGS.data = [];
                            itemGS.data.push(lobe[index].GuiaSalida);
                            let indSa = data2.findIndex(obe=>obe.name==itemGS.name);
                            if(indSa!=-1){
                                data2[indSa].data.push(lobe[index].GuiaSalida);
                            } else {
                                data2.push(itemGS);
                            }
                        } else {
                            let desTienda = lobe.filter(obe=>obe.IdTienda==resTienda[i].IdTienda)[0].DesTienda;
                            let indE = data1.findIndex(obe=>obe.name==desTienda);
                            let indS = data2.findIndex(obe=>obe.name==desTienda);
                            if(indE!=-1){
                                data1[indE].data.push(0);
                            } else {
                                itemGE.name = desTienda;
                                itemGE.data = [];
                                itemGE.data.push(0);
                                data1.push(itemGE);
                            }
                            if(indS!=-1){
                                data2[indS].data.push(0);
                            } else {
                                itemGS.name = desTienda;
                                itemGS.data = [];
                                itemGS.data.push(0);
                                data2.push(itemGS);
                            }
                        }
                    }
                    loOption.push(resFecha[x].Fecha);
                }

                let d1 = 0;
                for(var x=0;x<data1.length;x+=1){
                    for(var z=0;z<data1[x].data.length;z+=1){
                        if(data1[x].data[z]>0){
                            d1 = 1
                        }
                    }
                }
                let d2 = 0;
                for(var x=0;x<data2.length;x+=1){
                    for(var z=0;z<data2[x].data.length;z+=1){
                        if(data2[x].data[z]>0){
                            d2 = 1
                        }
                    }
                }

                this.chartOptionsAnioGE.xaxis.categories = loOption;
                this.chartOptionsAnioGS.xaxis.categories = loOption;
                this.seriesGEA = d1==0?[]:data1;
                this.seriesGSA = d2==0?[]:data2;

                let chartGEA = this.chartOptionsAnioGE;
                let chartGSA = this.chartOptionsAnioGS;

                chartGEA.xaxis.title.text = "Guías de Entrada";
                this.chartOptionsGEA = chartGEA;
                chartGSA.xaxis.title.text = "Guías de Salida";
                this.chartOptionsGSA = chartGSA;
            }
            else if (this.isRango){
                const resFecha = [];
                const map = new Map();
                for (const item of lobe) {
                    if(!map.has(item.Fecha)){
                        map.set(item.Fecha, true);
                        resFecha.push({
                            Fecha: item.Fecha
                        });
                    }
                }

                const resTienda = [];
                const mapR = new Map();
                for (const item of lobe) {
                    if(!mapR.has(item.IdTienda)){
                        mapR.set(item.IdTienda, true);
                        resTienda.push({
                            IdTienda: item.IdTienda,
                            DesTienda: item.DesTienda,
                        });
                    }
                }

                let item = [];
                for(var i=0; i<resTienda.length; i+=1){
                    let itemN = {};
                    itemN.name = resTienda[i].DesTienda;
                    itemN.data = [];
                    for(var x=0; x<resFecha.length; x+=1){
                        let det = [];
                        let index = lobe.findIndex(obe=>obe.IdTienda==resTienda[i].IdTienda && obe.Fecha==resFecha[x].Fecha);
                        if (index!=-1){
                            det.push(new Date(lobe[index].Fecha).getTime());
                            det.push(lobe[index].GuiaEntrada);
                        } else {
                            det.push(new Date(resFecha[x].Fecha).getTime());
                            det.push(0);
                        }
                        itemN.data.push(det);
                    }
                    item.push(itemN);
                }

                let itemGS = [];
                for(var i=0; i<resTienda.length; i+=1){
                    let itemGSN = {};
                    itemGSN.name = resTienda[i].DesTienda;
                    itemGSN.data = [];
                    for(var x=0; x<resFecha.length; x+=1){
                        let det = [];
                        let index = lobe.findIndex(obe=>obe.IdTienda==resTienda[i].IdTienda && obe.Fecha==resFecha[x].Fecha);
                        if (index!=-1){
                            det.push(new Date(lobe[index].Fecha).getTime());
                            det.push(lobe[index].GuiaSalida);
                        } else {
                            det.push(new Date(resFecha[x].Fecha).getTime());
                            det.push(0);
                        }
                        itemGSN.data.push(det);
                    }
                    itemGS.push(itemGSN);
                }

                let FRI = this.fechaRango[0];
                let FRF = this.fechaRango[1];
                let DFecha = Math.round((FRF - FRI)/(1000*60*60*24));

                let datos = this.generateDayWiseTimeSeries(new Date(FRI).getTime(), DFecha+1, {min: 30, max: 90});

                let itemCount = 0;
                for(var a=0; a<item.length; a+=1){
                    let row = item[a];
                    for(var b=0; b<row.data.length; b+=1){
                        let rowD = item[a].data[b];
                        if(rowD[1]>0){
                            itemCount=1;
                            break;
                        }
                    }
                }
                let itemCountGS = 0;
                for(var a=0; a<itemGS.length; a+=1){
                    let row = itemGS[a];
                    for(var b=0; b<row.data.length; b+=1){
                        let rowD = itemGS[a].data[b];
                        if(rowD[1]>0){
                            itemCountGS=1;
                            break;
                        }
                    }
                }
                this.chartOptionsGER.series = item;
                this.seriesGER = itemCount==0?[]:item;

                this.chartOptionsGSR.series = itemGS;
                this.seriesGSR = itemCountGS==0?[]:itemGS;

                this.isGER = itemCount>0;
                this.isGSR = itemCountGS>0;
                //if(this.seriesGER.length>0 && this.seriesGSR.length>0){
                if(itemCount>0 && itemCountGS>0){
                    this.chartOptionsGER.series = item;
                    this.seriesGER = item;
                    this.chartOptionsLineGER.chart.selection.xaxis.min = new Date(FRI).getTime();
                    this.chartOptionsLineGER.chart.selection.xaxis.max = new Date(lobe[0].FechaLimite).getTime();
                    this.chartOptionsLineGER.series = item;
                    //var chart0 = new ApexCharts(document.querySelector("#chart-line0"), this.chartOptionsLineGER);
                    //chart0.render();
                    //chart0.updateOptions(this.chartOptionsLineGER); 

                    this.chartOptionsGSR.series = itemGS;
                    this.seriesGSR = itemGS;
                    this.chartOptionsLineGSR.chart.selection.xaxis.min = new Date(FRI).getTime();
                    this.chartOptionsLineGSR.chart.selection.xaxis.max = new Date(lobe[0].FechaLimite).getTime();
                    this.chartOptionsLineGSR.series = itemGS;
                    //var chart2 = new ApexCharts(document.querySelector("#chart-line2"), this.chartOptionsLineGSR);
                    //chart2.render();
                    //chart2.updateOptions(this.chartOptionsLineGSR); 
                    
                //} else if(this.seriesGER.length>0 && this.seriesGSR.length==0){
                } else if(itemCount>0 && itemCountGS==0){
                    this.chartOptionsGER.series = item;
                    this.seriesGER = item;
                    this.chartOptionsLineGER.chart.selection.xaxis.min = new Date(FRI).getTime();
                    this.chartOptionsLineGER.chart.selection.xaxis.max = new Date(lobe[0].FechaLimite).getTime();
                    this.chartOptionsLineGER.series = item;
                    //var chart4 = new ApexCharts(document.querySelector("#chart-line4"), this.chartOptionsLineGER);
                    //chart4.render();
                    //chart4.updateOptions(this.chartOptionsLineGER);

                //} else if (this.seriesGER.length==0 && this.seriesGSR.length>0){
                } else if (itemCount==0 && itemCountGS>0){
                    this.chartOptionsGSR.series = itemGS;
                    this.seriesGSR = itemGS;
                    this.chartOptionsLineGSR.chart.selection.xaxis.min = new Date(FRI).getTime();
                    this.chartOptionsLineGSR.chart.selection.xaxis.max = new Date(lobe[0].FechaLimite).getTime();
                    this.chartOptionsLineGSR.series = itemGS;
                    //var chart6 = new ApexCharts(document.querySelector("#chart-line6"), this.chartOptionsLineGSR);
                    //chart6.render();
                    //chart6.updateOptions(this.chartOptionsLineGSR); 
                    
                }
            }*/
        },
        /*generateDayWiseTimeSeries(baseval, count, yrange) {
            var i = 0;
            var series = [];
            while (i < count) {
                var x = baseval;
                var y =
                Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

                series.push([x, y]);
                baseval += 86400000;
                i++;
            }
            return series;
        },*/
        Paginar(){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;
            this.lobeListadoFiltrado = this.lobeListado;
            this.totalrows=this.lobeListadoFiltrado.length;
            if(this.totalrows>0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.slice(filaInicio,filaFin);
            }
        },
        VerDetalle(row, NroGuiaSalida, NroGuiaEntrada){
            if(NroGuiaSalida!=""){
                this.isTitleModal= row.DesTienda;
                this.isSubTitleModal = "Guía Salida: " + NroGuiaSalida;
                this.lobeModal = this.lobeListadoDetalle.filter(obe=>obe.NroGuia==NroGuiaSalida);
            } else {
                this.isTitleModal= row.DesTienda;
                this.isSubTitleModal = "Guía Entrada: " + NroGuiaEntrada;
                this.lobeModal = this.lobeListadoDetalle.filter(obe=>obe.NroGuia==NroGuiaEntrada);
            }
            this.isModal=true;
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
