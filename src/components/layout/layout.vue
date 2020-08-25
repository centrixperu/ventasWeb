
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="transparent height90P" height-hint="90">
      <q-toolbar class="bg-cyan-8 height40P">
        <q-btn flat size="md" @click="fijarPanel()" v-show="!isFijarPanel" color="white" round dense icon="vertical_split" />
        <q-btn flat size="md" @click="desfijarPanel()" v-show="isFijarPanel" color="white" round dense icon="view_headline" />

        <q-btn flat size="md" @click="mostrarPanel()" color="white" round dense icon="swap_horiz" />
        
        <q-avatar v-show="imageHeader!=''">
          <img :src="imageHeader">
        </q-avatar>
        <q-toolbar-title>
          <!--<div class="fontsize15 textAdjust">{{tittleHeader}}</div>-->
          <div class="cus-line1 width90">
            <span class="textAdjust textAlignL fontsize15">{{tittleHeader}}</span>
          </div>
        </q-toolbar-title>
        <!--<q-space />-->
        <div class="q-pa-xs hidden-xs-only hidden-sm-only">
          <q-input dark dense standout v-model="textbuscar" 
              input-class="text-right" class="q-ml-xs">
            <template v-slot:append>
              <q-icon v-if="textbuscar === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="textbuscar = ''" />
            </template>
          </q-input>
        </div>
        <div class="q-pa-xs">
          <q-btn size="sm" icon="fas fa-bell" class="bg-cyan-8 q-ml-md">
            <q-badge color="red" floating>{{lobeNotificacion.length}}</q-badge>
            <q-popup-proxy>
              <q-banner v-for="oNotification in lobeNotificacion" 
                              v-bind:key="oNotification.id">
                <template v-slot:avatar>
                  <q-avatar>
                    <q-icon :name="oNotification.icon" :color="oNotification.iconColor" />
                  </q-avatar>
                  {{oNotification.description}}
                </template>
                <q-btn flat @click="verNotification(oNotification)" round dense icon="fas fa-chevron-circle-right" />
              </q-banner>
            </q-popup-proxy>
          </q-btn>
        </div>
        <div class="q-pa-xs">
            <q-btn size="sm" color="bg-cyan-8" 
                    @click="$q.fullscreen.toggle()"
                    :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
                    :label="$q.fullscreen.isActive ? '' : ''" />
        </div>
        <div class="q-pa-xs">
          <q-btn size="sm" color="red-5" class="hidden-xs-only hidden-sm-only"
                  @click="CerrarSesion()"
                  icon="exit_to_app"
                  label="Salir" />
          <q-btn size="sm" color="red-5" class="hidden-md-only hidden-lg-only hidden-xl-only"
                  @click="CerrarSesion()"
                  icon="exit_to_app"
                  label="" />
        </div>
      </q-toolbar>
      <!--<q-toolbar class="bg-grey-8 height40P">
        <q-btn flat size="md" @click="leftPanel = !leftPanel" round dense icon="menu" />
      </q-toolbar>-->
    </q-header>
    
    <q-drawer
            v-model="leftPanel"
            show-if-above
            :mini="miniStateLeft"
            @mouseover="mostrarMenu(false)"
            @mouseout="mostrarMenu(true)"
            :width="200"
            :breakpoint="500"
            side="left"
            bordered>
      <q-scroll-area 
        v-bind:class="{ 'miniStateMenu': !miniStateLeft , 'fit': miniStateLeft}">
        <q-list padding>
          <q-item v-show="miniStateLeft" 
                  v-for="oUsuario in lobeUsuario"
                  v-bind:key="oUsuario.id"
                  v-ripple>
            <q-item-section avatar>
              <q-avatar v-show="oUsuario.url!=''">
                <img :src="oUsuario.url">
              </q-avatar>
            </q-item-section>
            <q-item-section>
              {{oUsuario.description}}
            </q-item-section>
          </q-item>
          <q-separator />
          <!--<q-item v-for="oMenu in lobeMenu" 
                  v-bind:key="oMenu.id"
                  @click="SelectMenu(oMenu)"
                  clickable v-ripple
                  :active="oMenu.active">
            <q-item-section avatar>
              <q-icon style="font-size: 1.5em" :name="oMenu.icon" v-bind:class="{ 'itemUnSelect':!oMenu.active, 'itemSelect':oMenu.active }" />
            </q-item-section>
            <q-item-section>
              {{oMenu.description}}
            </q-item-section>
          </q-item>-->
          <!--expand-separator v-ripple-->
          <q-expansion-item
              :icon="oMenu.icon"
              :label="oMenu.description"
              v-for="oMenu in lobeMenu" 
              v-bind:key="oMenu.id"
              group="menugroup"
              @click="SelectMenu(oMenu)"
              v-bind:header-class="{ 'minHeight40 itemUnSelect textAdjust':!oMenu.active, 'minHeight40 itemSelect textAdjust':oMenu.active }"
              clickable>
            <q-item v-for="oMenuD in oMenu.detalle" 
                    v-bind:key="oMenuD.id"
                    @click="SelectSubMenu(oMenu,oMenuD)"
                    clickable v-ripple>
              <q-item-section avatar>
                <q-icon style="font-size: 1.5em;margin-left: 20px;" name="fas fa-caret-right" v-bind:class="{ 'itemUnSelect':!oMenuD.active, 'itemSelect':oMenuD.active }" />
              </q-item-section>
              <q-item-section v-bind:class="{ 'minHeight20 itemUnSelect':!oMenuD.active, 'minHeight20 itemSelect':oMenuD.active }">
                <span class="textAdjust">{{oMenuD.description}}</span>
              </q-item-section>
            </q-item>
          </q-expansion-item>
        </q-list>
      </q-scroll-area>
      
      <div :hidden="miniStateLeft" 
            v-for="oUsuario in lobeUsuario"
            v-bind:key="oUsuario.id">
        <q-img class="absolute-top" :src="oUsuario.background" style="height: 150px">
          <div class="absolute-bottom bg-transparent">
            <q-avatar size="56px" class="q-mb-sm" v-show="oUsuario.url!=''">
              <img :src="oUsuario.url">
            </q-avatar>
            <div class="text-weight-bold textAdjust">{{oUsuario.name}}</div>
            <div>{{oUsuario.profile}}</div>
          </div>
        </q-img>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white height40P">
      <q-toolbar>
        <q-toolbar-title class="fontsize13 hidden-xs-only hidden-sm-only">
          {{tittleFooter}}
        </q-toolbar-title>

        <q-item-label class="text-italic fontsize13">{{footer}}</q-item-label>
        
        <q-btn v-for="oFooter in lobeFooter"
              v-bind:key="oFooter.id"
              type="a" :href="oFooter.url" target="_blank"
              flat round dense>
          <i :class="oFooter.icon"></i>
        </q-btn>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>




<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    //HelloWorld
  },
  mounted () {
    
  },
  created(){
    if(!this.existUsuario){
        this.$router.push({ name: 'login'})
    }else{
        this.lobeMenu = this.Menu;
        this.lobeUsuario = this.UsuarioDatos;
        this.tittleHeader = this.TittleHeader;
        this.imageHeader = this.ImageHeader;
        this.tittleFooter = this.TittleFooter;
        this.footer = this.Footer;
        this.lobeNotificacion = this.loNotificacion;
        this.lobeFooter = this.loFooter;
    }
  },
  computed: {
    ...mapGetters(['existUsuario','Menu','UsuarioDatos','ImageHeader','TittleHeader','TittleFooter',
                    'Footer','loFooter','loNotificacion'])
  },
  data () {
    return {
      isFijarPanel:false,
      tittleHeader: '',//'Comercial "Chelita"',
      tittleFooter: '',//'Sistema Ventas',
      imageHeader: '',
      footer: '',//"Copyright © SofVentas. Todos los Derechos Reservados. 2019",
      leftPanel: false,
      miniStateLeft: true, 
      leftDrawerOpen: this.$q.platform.is.desktop,
      lobeUsuario: [],
      lobeMenu: [],
      lobeNotificacion:[],
      lobeFooter:[],
      textbuscar: '',
      lobeMensajes:[],
    }
  },

  methods: {
    mostrarMenu(state){
      if(this.isFijarPanel){
        this.miniStateLeft = false;
      } else {
        this.miniStateLeft = state;
      }
    },
    mostrarPanel(){
      this.leftPanel = !this.leftPanel;
    },
    fijarPanel(){
      this.isFijarPanel = true;
      this.miniStateLeft = false;
    },
    desfijarPanel(){
      this.isFijarPanel = false;
      this.miniStateLeft = true;
    },
    CerrarSesion(){
        this.$confirm('Desea Cerrar Sesión?', 'Aviso', {
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar',
            type: 'warning'
        }).then(() => {
            this.LimpiarSesionIrLogin();
        }).catch(() => {
                    
        });
    },
    LimpiarSesionIrLogin(){
        //var usuarioWindows = this.usuario.usuarioWindows;
        //var usuarioIdSesion = this.usuario.usuarioIdSesion;

        this.$store.commit('setUsuario', {});
        this.$store.commit('setUsuarioDatos', []);
        this.$store.commit('setTittleHeader', "");
        this.$store.commit('setTittleFooter', "");
        this.$store.commit('setFooter', "");
        this.$store.commit('setMenu', []);
        this.$router.push({ name: 'login'});

        if (typeof(Storage) !== "undefined") {
            localStorage.removeItem("usrValSistVentas");
        }
        /*loginService.cerrarSesion(usuarioWindows,usuarioIdSesion)
        .then(res => {
            this.$message({
                showClose: true,
                message: res,
                type: 'success'
            });
            this.$router.push({ name: 'login'})
        })
        .catch((err) => {
            console.error(err);
            this.$message({
                showClose: true,
                message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                type: 'error'
            });
            this.$router.push({ name: 'login'})
        });*/
    },
    verNotification(oNotification){
      console.log('hello world',oNotification);
    },
    SelectMenu(oMenu){
      if(oMenu.detalle.length==0){
        var cant = this.lobeMenu.length;
        for(var i = 0; i < cant; i++){
          this.lobeMenu[i].active = false;
          if (this.lobeMenu[i].id == oMenu.id){
            this.lobeMenu[i].active = true;
          }

          var cantD = this.lobeMenu[i].detalle.length;
          for(var j = 0; j < cantD; j++){
            var rowD = this.lobeMenu[i].detalle[j];
            rowD.active = false;
          }
        }
        this.$router.push({ path: oMenu.url })
      }
    },
    SelectSubMenu(oMenu,oMenuD){
      var index = this.lobeMenu.findIndex(obe=>obe.id==oMenu.id);

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
    }


  }
}
</script>

<style>
.textAdjust {
    white-space: normal;
    /*word-break: break-word;*/
}
.textAdjustWord {
    word-break: break-word;
}
.textcenter {
    text-align: center !important;
}
.miniStateMenu {
  height: calc(100% - 150px); 
  margin-top: 145px; 
  border-right: 1px solid #ddd;
}
.pageC{
  height: calc(100% - 150px) !important;
}
.itemUnSelect{
  color: black;
}
.itemSelect{
  color:orange;
}

.minHeight20{
  min-height: 20px !important;
}

.minHeight40{
  min-height: 40px !important;
}

.q-expansion-item__toggle-icon{
  visibility: hidden !important;
}
</style>