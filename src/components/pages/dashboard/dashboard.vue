<template>
  <q-page>
    <div class="q-pa-md paddingBottom0">
      <el-container class="padding0">  
            <el-main class="padding5">
                <el-row :gutter="5" class="paddingTop0">
                    <header-page :tittleModulo="tittleModulo"></header-page>
                </el-row>
                <el-row :gutter="5" type="flex" class="paddingTop10 cus-border">
                    <div class="cus-container-border margin0 width100">
                        <el-main class="padding5">
                            <el-row :gutter="5" type="flex" class="paddingTop0">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <span class="fontsize20Bold">Bienvenido {{usuario.usuarioNombre}} {{usuario.usuarioApePat}} {{usuario.usuarioApeMat}}</span>
                              </el-col>
                            </el-row>
                            <!--<el-row :gutter="5" type="flex" class="paddingTop10">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <span class="fontsize20">{{usuario.cliente}}</span>
                              </el-col>
                            </el-row>-->
                            <!--<el-row :gutter="5" type="flex" class="paddingTop10">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <span class="fontsize20">Estimado </span>
                              </el-col>
                            </el-row>-->
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <span class="fontsize15">
                                  Este es el Menú de Inicio de su Sistema de Punto de Venta en {{ TextoTienda }}.
                                </span>
                              </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <span class="fontsize15">
                                  Usted tiene habilitado los siguientes módulos principales: 
                                </span>
                              </el-col>
                            </el-row>
                            <el-row :gutter="5" type="flex" class="paddingTop10">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <el-button-group>
                                  <el-button v-for="oMenu in loMenu"
                                          :key="oMenu.id" size="mini" type="success" plain
                                          @click="SelectMenu(oMenu.idPadre,oMenu)">
                                          <span class="textAdjust">{{oMenu.description}}</span></el-button>
                                </el-button-group>
                                <!--<el-card shadow="always" class="width105P"
                                          v-for="oMenu in loMenu" :key="oMenu.id" 
                                          @click="SelectMenu(oMenu.idPadre,oMenu)">
                                    <span class="textAdjust">{{oMenu.description}}</span>
                                </el-card>-->
                              </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10">
                                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                    <div class="textAlignC cus-border">
                                      <div class="textAlignC paddingTop0">
                                        <el-tag class="width100" type="info">Ventas del Día</el-tag>
                                      </div>
                                      <div class="textAlignC paddingTop10">
                                          <apexchart type="pie" 
                                          :options="optionsDia"
                                          :series="seriesDia"></apexchart>
                                      </div>
                                    </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                  <div class="textAlignC cus-border">
                                    <div class="textAlignC paddingTop0">
                                      <el-tag class="width100" type="info">Ventas de la Semana</el-tag>
                                    </div>
                                    <div class="textAlignC paddingTop10">
                                        <apexchart type="pie" 
                                        :options="optionsSemana"
                                        :series="seriesSemana"></apexchart>
                                    </div>
                                  </div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                                    <div class="textAlignC cus-border">
                                      <div class="textAlignC paddingTop0">
                                        <el-tag class="width100" type="info">Ventas del Mes</el-tag>
                                      </div>
                                      <div class="textAlignC paddingTop10">
                                          <apexchart type="pie" 
                                          :options="optionsMes"
                                          :series="seriesMes"></apexchart>
                                      </div>
                                    </div>
                                </el-col>
                            </el-row>

                            <el-row :gutter="5" type="flex" class="paddingTop10">
                              <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                <div class="textAlignR">
                                  <span class="fontsize15 fontkursiva">
                                    Para consultas y/o sugerencias. Sirvase comunicarse con nosotros a <b>jevillegas89@gmail.com</b>
                                  </span>
                                </div>
                              </el-col>
                            </el-row>
                        </el-main>
                    </div>
                </el-row>
            </el-main>
        </el-container>
    </div>

    <!--<div class="q-pa-md">
      <div class="row q-gutter-md">
        <div class="col-11 col-lg col-md col-sm col-xs-11">
          <q-card dark class="bg-cyan-8">
            <q-card-section>
              <div class="row justify-center">
                <div class="col-3">
                  <q-icon class="iconDashboard" name="email" color="white" />
                </div>
                <div class="col-8 text-center">
                  <q-item-label class="text-italic text-h6 text-weight-bolder">Total Ventas</q-item-label>
                  <h5 class="marginDashboard" ref="number"></h5>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-11 col-lg col-md col-sm col-xs-11">
          <q-card dark class="bg-cyan-8">
            <q-card-section>
              <div class="row justify-center">
                <div class="col-3">
                  <q-icon class="iconDashboard" name="email" color="white" />
                </div>
                <div class="col-8 text-center">
                  <q-item-label class="text-italic text-h6 text-weight-bolder">Ventas del Dia</q-item-label>
                  <h5 class="marginDashboard" ref="number2"></h5>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-11 col-lg col-md col-sm col-xs-11">
          <q-card dark class="bg-cyan-8">
            <q-card-section>
              <div class="row justify-center">
                <div class="col-3">
                  <q-icon class="iconDashboard" name="email" color="white" />
                </div>
                <div class="col-8 text-center">
                  <q-item-label class="text-italic text-h6 text-weight-bolder">Ventas Semanales</q-item-label>
                  <h5 class="marginDashboard" ref="number3"></h5>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>-->
  </q-page>
</template>

<script type="text/javascript">
  import HeaderPage from '@/components/layout/header.vue'
  import DasBoardService from '@/services/dashboard/dashboard-service'
  import { mapState,mapGetters } from "vuex";
  import CountUp from 'countup.js'
  // Importamos JQuery
  const $ = require('jquery')
  // Lo declaramos globalmente
  window.$ = $

  export default {
    name: 'DashBoard',
    components: { 
      HeaderPage
    },
    data () {
      return {
        totalPosts: 0,
        totalComments: 0,
        totalTodos: 0,
        options: {
          separator: '.'
        },
        options2: {
          separator: '.'
        },
        options3: {
          separator: '.'
        },
        total: 100,
        total2: 150,
        total3: 150,
        tittleModulo: 'DashBoard',
        seriesDia: [],
        optionsDia : {},
        seriesSemana: [],
        optionsSemana : {},
        seriesMes: [],
        optionsMes : {},
        TextoTienda:'',
        lobeMenu:[],
        loMenu: [],
      }
    },
    mounted () {
      this.countUp.start();
      this.countUp2.start();
      this.countUp3.start();
    },
    created () {
        if(!this.existUsuario){
            this.$router.push({ name: 'login'})
        }else{
          this.CargarCabecera();
          this.CargarDatosIniciales();
        }
    },
    computed: {
      ...mapState(["usuario","loTienda"]),
      ...mapGetters(["existUsuario","Menu"]),

      countUp () {
        return new CountUp(this.$refs.number, 0, this.total, 0, 2.5, this.options)
      },
      countUp2 () {
        return new CountUp(this.$refs.number2, 0, this.total2, 0, 2.5, this.options2)
      },
      countUp3 () {
        return new CountUp(this.$refs.number3, 0, this.total3, 0, 2.5, this.options3)
      },
      dataForGraph () {
        return {
          posts: this.totalPosts,
          todos: this.totalTodos,
          comments: this.totalComments
        }
      }
    },
    watch: {
      total() {
        this.countUp.start()
      },
      total2() {
        this.countUp2.start()
      },
      total3() {
        this.countUp3.start()
      },
    },
    methods: {
      CargarCabecera(){
          //Cabecera
          this.tittleModulo = "DashBoard - " + this.usuario.cliente;
          this.lobeMenu = this.Menu;
          if(this.lobeMenu){
            let lobe = [];
            let cantidad = this.lobeMenu.length;
            for(var i=0;i<cantidad;i+=1){
              let canD = this.lobeMenu[i].detalle.length;
              if(this.lobeMenu[i].id==2 || this.lobeMenu[i].id==5 || this.lobeMenu[i].id==9 || this.lobeMenu[i].id==17){
                for(var j=0;j<canD;j+=1){
                  let item = {};
                  item.id = this.lobeMenu[i].detalle[j].id;
                  item.description = this.lobeMenu[i].detalle[j].description;
                  item.idPadre = this.lobeMenu[i].id;
                  item.url = this.lobeMenu[i].detalle[j].url;
                  lobe.push(item);
                }
              }              
            }
            this.loMenu = lobe;
          }
          //Texto Tienda
          let txtTienda = "";
          this.TextoTienda = "";
          this.TextoTienda = this.loTienda.length>2?"las tiendas: ":"la tienda ";
          for(var i=0;i<this.loTienda.length;i+=1){
            if(this.loTienda[i].codigo!=0){
              if(txtTienda==""){
                txtTienda += '"' + this.loTienda[i].descripcion + '"';
              } else {
                txtTienda += ' - "' + this.loTienda[i].descripcion + '"';
              }
            }
          }
          this.TextoTienda += txtTienda;
      },
      CargarDatosIniciales(){
        DasBoardService.CargarDatosIniciales(this.usuario.usuarioLogin, this.usuario.idCliente)
            .then(res => {
                if (res.status==200){
                    this.lobeGraficoDia = res.result.loGraficoDia;
                    this.lobeGraficoSemana = res.result.loGraficoSemana;
                    this.lobeGraficoMes = res.result.loGraficoMes;
                    this.CargarGraficos(this.lobeGraficoDia, this.lobeGraficoSemana, this.lobeGraficoMes);
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
      CargarGraficos(loDia, loSemana, loMes){
          this.seriesDia = loDia[0].serie;
          this.optionsDia = {
              chart: {
                //width: 380,
                type: 'pie',
              },
              labels: loDia[0].label,//['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
          this.seriesSemana = loSemana[0].serie;
          this.optionsSemana = {
              chart: {
                //width: 380,
                type: 'pie',
              },
              labels: loSemana[0].label,//['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
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
          this.seriesMes = loMes[0].serie;
          this.optionsMes = {
              chart: {
                //width: 380,
                type: 'pie',
              },
              labels: loMes[0].label,//['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
              dataLabels: {
                enabled: false
              },
              fill: {
                type: 'gradient',
              },
              legend: {
                horizontalAlign: 'center',
                width: 250,
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
      },
      SelectMenu(idMenu,oMenuD){
        var index = this.lobeMenu.findIndex(obe=>obe.id==idMenu);
        var cant = this.lobeMenu.length;
        for(var i = 0; i < cant; i++){
          this.lobeMenu[i].active = false;
          
          var cantD = this.lobeMenu[i].detalle.length;
          for(var j = 0; j < cantD; j++){
            var rowD = this.lobeMenu[i].detalle[j];
            rowD.active = false;
            if(i==index && rowD.id == oMenuD.id){
              this.lobeMenu[i].active = true;
              rowD.active = true;
            }
          }
        }
        this.$router.push({ path: oMenuD.url })
      },

    }
  }
</script>
<style lang="scss">
.padding-page{
  padding: 15px;
}

.iconDashboard {
    font-size: 54px;
  }

.marginDashboard{
  margin: 10px;
}
</style>


