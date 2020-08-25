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
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="7" :sm="6" :md="4" :lg="3" :xl="1">
                                    <div class="cus-label-form-left">
                                        <span class="cus-label textAdjust textAlignL">Cliente:</span>
                                    </div>
                                </el-col>
                                <el-col :xs="17" :sm="18" :md="20" :lg="19" :xl="20">
                                    <div>
                                        <el-input type="text"
                                            size="small"
                                            ref="nombreCliente"
                                            @keyup.native="KeyUpNombreCliente"
                                            @keypress.native="keyPressCliente"
                                            :autosize="{ minRows: 2, maxRows: 3}" 
                                            placeholder="Cliente" 
                                            v-model="nombreCliente"
                                            show-word-limit
                                            maxlength="150">
                                            <el-button slot="append" icon="el-icon-search" :loading="isConsultaCliente"
                                                    @click="BuscarCliente()"></el-button>
                                        </el-input>
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                    <el-button @click="BuscarBD()" class="width100" size="small" 
                                                type="primary" icon="fas fa-save" plain> BUSCAR
                                    </el-button>
                                </el-col>
                                <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                                    <el-button @click="Limpiar()" class="width100" size="small" 
                                                :disabled="!(codigoCliente!='')"
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
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Total>0">
                        <el-checkbox v-model="chkCosto" label="Ver Costos" border size="small"></el-checkbox>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Costo>0 && chkCosto">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="info" effect="plain">Costo: {{Costo}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Ganancia>0 && chkCosto">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="success" effect="plain">Ganancias: {{Ganancia}}</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1" v-show="Ganancia==0 && chkCosto">
                        <div class="width100">
                            <el-tag class="width100 fontsize15Bold" type="danger" effect="plain">Sin Ganancia</el-tag>
                        </div>
                    </el-col>
                    <el-col :xs="12" :sm="6" :md="4" :lg="3" :xl="1">
                        <el-button @click="exportarLista()" class="width100" size="small" 
                                    :disabled="!(codigoCliente!='')"
                                    type="warning" icon="fas fa-download" plain> EXPORTAR
                        </el-button>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10" v-show="multipleSelection.length>=1">
                    <el-col :xs="6" :sm="3" :md="3" :lg="3" :xl="1">
                        <div class="width100">
                            <el-button icon="el-icon-money" plain 
                                    type="info" size="medium" @click="Pagar(0,0)">Pagar</el-button>
                        </div>
                    </el-col>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 margintop10 cus-border hidden-xs-only hidden-sm-only" v-show="lobeListado.length>0">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <div>
                                    <el-collapse v-model="activeName" accordion>
                                        <el-collapse-item v-for="column in loTiendas" 
                                                            :key="column.IdTienda"
                                                            :title="column.NombreTienda" 
                                                            :name="column.IdTienda">
                                            <el-table ref="listado" :data="lobeListadoFiltrado" 
                                                    style="width: 100%" height="600"
                                                    show-summary :summary-method="getSummaries"
                                                    @selection-change="handleSelectionChange"
                                                    row-key="IdDetalle" default-expand-all
                                                    highlight-current-row>
                                                <el-table-column type="selection" width="55" fixed="left">
                                                </el-table-column>
                                                <el-table-column v-for="column in loColumns" 
                                                                :key="column.field"
                                                                :prop="column.field"
                                                                :label="column.header"
                                                                :width="column.width"
                                                                :fixed="(column.field=='PrecioCosto' || column.field=='Precio' || column.field=='FechaInicioReporte' || column.field=='isPagar')?'right':false">
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
                                                        <el-button v-show="column.field=='isPagar'" :disabled="!scope.row.isPagar" icon="el-icon-money"
                                                                type="info" round size="small" @click="Pagar(scope.row.IdDetalle,0)">Pagar</el-button>
                                                        <span class="fontsize12" v-show="!(column.field=='PrecioCosto' || column.field=='Precio' || column.field=='isPagar')">{{scope.row[column.field]}}</span>
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
                                        </el-collapse-item>
                                    </el-collapse>

                                    
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

        <el-dialog :title="titleDet" center :visible.sync="isModalVer" append-to-body
                    :showClose="mostrarCloseDet" :before-close="closeModalDet">
            <el-row :gutter="5" type="flex" class="paddingTop0">
                <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <el-row :gutter="5" type="flex" class="paddingTop10" v-show="(lobeTipoDocumento.length>0)">
                        <el-col :xs="12" :sm="10" :md="8" :lg="6" :xl="3">
                            <div class="cus-label-form-left">
                                <span class="cus-label textAdjust textAlignL">Tipo Comprobante:</span>
                            </div>
                        </el-col>
                        <el-col :xs="12" :sm="14" :md="16" :lg="18" :xl="21">
                            <div>
                                <el-select v-model="IdTipoDocumento" filterable placeholder="Select"
                                    size="small" ref="IdTipoDocumento" class="width100">
                                    <el-option v-for="oTipoDoc in lobeTipoDocumento" 
                                        :disabled="isVentaActual"
                                        :key="oTipoDoc.codigo" 
                                        :label="oTipoDoc.descripcion"
                                        :value="oTipoDoc.codigo">
                                    </el-option>                            
                                </el-select>
                            </div>
                        </el-col>
                    </el-row> 
                </el-col>
            </el-row>
            <el-row :gutter="5" type="flex" class="paddingTop10">
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-button @click="Pagar(0,IdTipoDocumento)" class="width100" size="small" 
                                :disabled="IdTipoDocumento==0"
                                type="success" icon="el-icon-money" plain> PAGAR
                    </el-button>
                </el-col>
                <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
                    <el-button @click="CancelarDet()" class="width100" size="small" 
                                type="danger" icon="fas fa-ban" plain> SALIR
                    </el-button>
                </el-col>
            </el-row>
        </el-dialog>

        <modal-cliente-venta :isModal="isModal" @interface="Cargar" :loClientes="lobeClientes">
        </modal-cliente-venta>

    </div>
  </q-page>
</template>

<script>
import HeaderPage from '@/components/layout/header.vue'
import { mapState,mapGetters } from "vuex";
import VentaService from '@/services/ventas/venta-service'
import ExcelService from '@/services/excel/excel-service'
import MaestroService from '@/services/maestros/consultaCliente-service'
//MODAL
import ModalClienteVenta from '@/components/pages/ventas/modals/mdlClienteVenta'

export default {
    name: "app",
    components: { 
      HeaderPage, ModalClienteVenta
    },
    data() {
        return {
            tittleModulo:'Listado de Ventas a Cuenta',
            ///==============================================================
            nombreCliente:'',
            isConsultaCliente:false,
            codigoCliente:'',
            descripcionCliente:'',
            ///==============================================================
            tittleReporte:'',
            ///==============================================================
            loTiendas:[],
            activeName:'',
            ///==============================================================
            lobeListado:[],
            lobeListadoFiltrado:[],
            lobeListadoXLS:[],
            loColumns:[],
            Ganancia:0,
            Total:0,
            Costo:0,
            ///==============================================================
            currentPage: 1,
            pageSize: 100,
            totalrows: 0,
            ///==============================================================
            nomBuscar:"",
            ///==============================================================
            isModal:false,
            lobeClientes:[],
            ///==============================================================
            multipleSelection: [],
            ///==============================================================
            titleDet:'Seleccione Tipo de Documento de Venta',
            isModalVer:false,
            mostrarCloseDet: true,
            IdTipoDocumento:0,
            lobeTipoDocumento:[],
            ///==============================================================
            chkCosto:false,
            ///==============================================================
            id:0,
            row:{},
            //-----------------------------------
            isVentaActual:false,
            //-----------------------------------
            //-----------------------------------
            //-----------------------------------
            //-----------------------------------
            //-----------------------------------
            //-----------------------------------
        };
    },
    mounted() {
        
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        } else {
            //this.BuscarBD();
        }
    },
    computed: {
        ...mapState(["usuario"]),
        ...mapGetters(["existUsuario"])
    },
    watch: {
        nomBuscar: function(n){
            this.BuscarDocumento();
        },
        activeName: function(n,o){
            if(n!=''){
                this.toggleSelection();
                this.CargarComprobantes(n);
            }
        },
    },
    methods: {
        ///==============================================================
        KeyUpNombreCliente(){
            this.nombreCliente = this.nombreCliente.toUpperCase();
            if(this.nombreCliente.length < this.codigoCliente.length){
                this.nombreCliente = '';
                this.codigoCliente = '';
                this.descripcionCliente = '';
            }
        },
        keyPressCliente(a){
            if(a.key == "Enter" && this.nombreCliente.length>0)
            {
                this.BuscarCliente();
                a.returnValue = true;
            }
        },
        ValidarCliente(){
            if(this.nombreCliente==""){
                return 'Debe ingresar Nombre de Cliente.';
            }
            return '';
        },
        BuscarCliente(){
            this.lobeClientes = [];
            var msj = this.ValidarCliente();
            if(msj!=''){
                this.$message({
                    showClose: true,
                    message: msj,
                    type: 'warning'
                });
            } else {
                this.isConsultaCliente = true;
                MaestroService.ConsultarCliente(this.usuario.usuarioLogin, this.usuario.idCliente, this.nombreCliente)
                    .then(res => {
                        this.isConsultaCliente = false;
                        if (res.status==200){
                            if(res.result.length>1){
                                this.MostrarCliente(res.result);
                            } else {
                                this.nombreCliente = res.result[0].codigo + ' - ' + res.result[0].descripcion;
                                this.codigoCliente = res.result[0].codigo;
                                this.descripcionCliente = res.result[0].descripcion;
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
                        this.isConsultaCliente = false;
                        console.error(err);
                        this.$message({
                            showClose: true,
                            message: err,
                            type: 'error'
                        });
                    });
            }
        },
        MostrarCliente(data){
            this.lobeClientes = data;
            this.isModal=true;
        },
        Cargar(val, data){
            this.isModal=val;
            if(data!=null){
                this.nombreCliente = data.codigo + ' - ' + data.descripcion;
                this.codigoCliente = data.codigo;
                this.descripcionCliente = data.descripcion;
            } else {
                this.nombreCliente = "";
                this.codigoCliente = "";
                this.descripcionCliente = "";
            }
        },
        ///==============================================================
        BuscarBD(){
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
            if(this.codigoCliente==''){
                this.tittleReporte="REGISTRO DE VENTAS A CUENTA - CLIENTES TODOS";
            } else {
                this.tittleReporte="REGISTRO DE VENTAS A CUENTA - " + this.descripcionCliente;
            }
            
            const loading = this.$loading({
                lock: true,
                text: 'Buscando...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            VentaService.ListadoVentasACuenta(this.usuario.usuarioLogin, this.usuario.idCliente, this.codigoCliente)
                .then(res => {
                    loading.close();
                    if (res.status==200){                      
                        this.lobeListado = res.result.listado;
                        this.ProcesarColumnas();
                        this.lobeListadoXLS = res.result.listadoExcel;
                        this.loColumns = res.result.loColumns;
                        //this.Paginar();
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
        ProcesarColumnas(){
            this.loTiendas = [];
            let lobe = [];
            let cant = this.lobeListado.length;
            for(var i=0;i<cant;i++){
                let idTienda = this.lobeListado[i].IdTienda;
                let index = lobe.findIndex(x=>x.IdTienda==idTienda);
                let item = {};
                if(index!=-1){
                } else {
                    item.IdTienda = this.lobeListado[i].IdTienda;
                    item.NombreTienda = this.lobeListado[i].NombreTienda;
                    lobe.push(item);
                }
            }
            this.loTiendas = lobe;
            if(this.loTiendas.length>0){
                this.activeName = this.loTiendas[0].IdTienda;
                this.Paginar(this.loTiendas[0].IdTienda);
            }
        },
        Paginar(idTienda){
            var filaInicio = (this.currentPage - 1) * this.pageSize;
            var filaFin = (this.currentPage * this.pageSize) ;
            this.lobeListadoFiltrado = this.lobeListado;
            this.totalrows=this.lobeListadoFiltrado.length;
            if(this.totalrows>0){
                this.lobeListadoFiltrado = this.lobeListadoFiltrado.filter(function(item){ 
                    return (item.IdTienda == (idTienda==''?0:idTienda));
                }, this).slice(filaInicio,filaFin);
                //this.lobeListadoFiltrado = this.lobeListadoFiltrado.slice(filaInicio,filaFin);
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
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.listado.toggleRowSelection(row);
                });
            } else {
                if(this.multipleSelection.length>0){
                    this.$refs.listado[0].clearSelection();
                }
            }
        },
        ///==============================================================
        Limpiar(){
            //-----------------------------------
            this.lobeListado = [];
            this.lobeListadoFiltrado = [];
            //----------------------------------
            this.tittleReporte='';
            this.nombreCliente='';
            this.codigoCliente='';
            this.descripcionCliente='';
            //----------------------------------
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
        ///==============================================================
        ///==============================================================
        handleSelectionChange(val) {
            this.multipleSelection = val;
            if(val.length>=1){
                let cant = this.lobeListado.length;
                for(var i=0; i<cant; i++){
                    /*let index = val.findIndex(x=>x.IdDetalle==this.lobeListado[i].IdDetalle);
                    if(index!=-1){
                        this.lobeListado[i].isPagar = true;
                    } else {
                        this.lobeListado[i].isPagar = false;
                    }*/
                    this.lobeListado[i].isPagar = false;
                }
            } else {
                let cant = this.lobeListado.length;
                for(var i=0; i<cant; i++){
                    this.lobeListado[i].isPagar = true;
                }
            }
        },
        ///==============================================================
        ///==============================================================
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
                if (index === 1) {
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
        ///==============================================================
        Pagar(id,IdTipoDocumento){
            if(id==0){
                if(this.multipleSelection.length>0){
                    //console.log("Id Detalle M:",this.multipleSelection, this.lobeTipoDocumento);
                    let idTienda = this.multipleSelection[0].IdTienda;
                    if(idTienda!=0){
                        if(this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00').length==0){
                            console.log("No existe Comprobantes configurados");
                        } else if (this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00').length>1) {
                            if(IdTipoDocumento==0){
                                this.isModalVer=true;
                            } else {
                                var lobeDetalle = [];
                                for(var i=0;i<this.multipleSelection.length;i+=1){
                                    let row = this.multipleSelection[i];
                                    var itemDetalle = {};
                                    itemDetalle.n_id_detalle = row.IdDetalle;
                                    itemDetalle.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigo==IdTipoDocumento)[0].codigoSUNAT;
                                    itemDetalle.c_emisor_nombre_legal = '';
                                    itemDetalle.c_emisor_numero_documento = '';
                                    lobeDetalle.push(itemDetalle);
                                }
                                let item = {}
                                item.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigo==IdTipoDocumento)[0].codigoSUNAT;
                                item.IdTienda = idTienda;
                                item.c_id_tienda = idTienda;
                                item.IdCliente = this.usuario.idCliente;
                                item.UsrCreador = this.usuario.usuarioLogin;
                                item.lodetalle = lobeDetalle;
                                this.VentaACuenta(item);
                            }
                        }
                        else {
                            var lobeDetalle = [];
                            for(var i=0;i<this.multipleSelection.length;i+=1){
                                let row = this.multipleSelection[i];
                                var itemDetalle = {};
                                itemDetalle.n_id_detalle = row.IdDetalle;
                                itemDetalle.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00')[0].codigoSUNAT;
                                itemDetalle.c_emisor_nombre_legal = '';
                                itemDetalle.c_emisor_numero_documento = '';
                                lobeDetalle.push(itemDetalle);
                            }
                            let item = {}
                            item.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00')[0].codigoSUNAT;
                            item.IdTienda = idTienda;
                            item.c_id_tienda = idTienda;
                            item.IdCliente = this.usuario.idCliente;
                            item.UsrCreador = this.usuario.usuarioLogin;
                            item.lodetalle = lobeDetalle;
                            this.VentaACuenta(item);
                        }
                    } else {
                        console.log("Código de Tienda = 0");
                    }
                } else {
                    console.log("Sin Detalle");
                }
            } else {
                let idTienda = this.lobeListado.filter(x=>x.IdDetalle==id)[0].IdTienda;
                if(idTienda!=0){
                    if(this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00').length==0){
                            console.log("No existe Comprobantes configurados");
                    } else if(this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00').length>1){
                        if(IdTipoDocumento==0){
                            this.isModalVer=true;
                        } else {
                            var lobeDetalle = [];
                            for(var i=0;i<this.multipleSelection.length;i+=1){
                                let row = this.multipleSelection[i];
                                var itemDetalle = {};
                                itemDetalle.n_id_detalle = row.IdDetalle;
                                itemDetalle.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigo==IdTipoDocumento)[0].codigoSUNAT;
                                itemDetalle.c_emisor_nombre_legal = '';
                                itemDetalle.c_emisor_numero_documento = '';
                                lobeDetalle.push(itemDetalle);
                            }
                            let item = {}
                            item.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigo==IdTipoDocumento)[0].codigoSUNAT;
                            item.IdTienda = idTienda;
                            item.c_id_tienda = idTienda;
                            item.IdCliente = this.usuario.idCliente;
                            item.UsrCreador = this.usuario.usuarioLogin;
                            item.lodetalle = lobeDetalle;
                            this.VentaACuenta(item);
                        }
                    } else {
                        var lobeDetalle = [];
                        var itemDetalle = {};
                        itemDetalle.n_id_detalle = id;
                        itemDetalle.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00')[0].codigoSUNAT;
                        itemDetalle.c_emisor_nombre_legal = '';
                        itemDetalle.c_emisor_numero_documento = '';
                        lobeDetalle.push(itemDetalle);

                        let item = {}
                        item.c_tipo_documento = this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00')[0].codigoSUNAT;
                        item.IdTienda = idTienda;
                        item.c_id_tienda = idTienda;
                        item.IdCliente = this.usuario.idCliente;
                        item.UsrCreador = this.usuario.usuarioLogin;
                        item.lodetalle = lobeDetalle;
                        this.VentaACuenta(item);
                    }
                } else {
                    console.log("Código de Tienda = 0");
                }
            }
        },
        CargarComprobantes(idTienda){
          this.IdTipoDocumento =0;
          this.lobeTipoDocumento=[];
          VentaService.CargarComprobantes(this.usuario.usuarioLogin, this.usuario.idCliente, idTienda)
            .then(res => {
                if (res.status==200){
                    this.lobeTipoDocumento = res.result.loComprobante;
                    if(this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00').length==1){
                        this.IdTipoDocumento = this.lobeTipoDocumento.filter(obe=>obe.codigoSUNAT!='00')[0].codigo;
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
                console.error(err);
                this.$message({
                    showClose: true,
                    message: err,
                    type: 'error'
                });
            });
        },
        VentaACuenta(item){
            const loading = this.$loading({
                lock: true,
                text: 'Realizando Venta...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            VentaService.VentaACuenta(item)
                .then(res => {
                    loading.close();
                    if (res.status==200){
                        if(res.mensaje!=""){
                            this.$message({
                                showClose: true,
                                message: res.result,
                                type: 'success'
                            });
                            this.isVentaActual = true;
                            this.src = res.mensaje;
                        } else {
                            this.$message({
                                showClose: true,
                                message: res.result,
                                type: 'warning'
                            });
                            this.ClosePrint();
                        }
                    } else if (res.status==210){
                        this.CargarDatosIniciales();
                        this.CargarProductos();
                        this.$message({
                            showClose: true,
                            message: res.result,
                            type: 'success'
                        });
                        this.Cancelar();
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
        CancelarDet(){
            this.isModalVer=false;
        },
        closeModalDet: function (){
            this.isModalVer = false;
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
