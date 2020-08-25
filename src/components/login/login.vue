<template>
  <div class="n-box-card-centered flex justify-center full-height" :class="heightSize">
    <div class="card text-white  width-3of4 bg-width-2of5 gt-bg-width-1of4 sm-auto " id="login">
      <div class="card-title text-center" :class="finalBgColor">
        <svg id="logo" viewBox="0 0 483 460"
             style="enable-background:new 0 0 460 460;"
             xml:space="preserve" width="128px" height="140px"
             v-html="logoMethod">
        </svg>
      </div>
      <div class="card-content bg-white text-center">
        <div class="stacked-label">
          <q-input type="text" v-model="user" v-on:keyup.enter="login" label="Usuario" />
        </div>
        <div class="stacked-label">
          <q-input type="password" v-model="password" v-on:keyup.enter="login" label="Contraseña" />
        </div>
      </div>
      <div class="card-actions inline-block vertical-middle">
        <q-toggle class="q-mt-md text-left colorText1" v-model="saveSession" color="blue" label="Mantener Sesión" left-label />
        <q-btn class="full-width q-mt-md text-center" color="secondary" v-on:click="login()" label="Iniciar Sesión" />
        <div class="text-center">
          <!--<q-circular-progress show-value font-size="12px" :value="value" size="50px" :thickness="0.22" color="teal"
                            v-if="isLogin" :min="0" :max="100" track-color="grey-3" class="q-ma-md colorText1">
                            <h5 class="q-ma-md colorText1" ref="value"></h5>%
          </q-circular-progress>-->
           <q-circular-progress indeterminate size="sm" :thickness="0.22" color="teal" track-color="grey-3"
                            v-if="isLogin" class="q-ma-md colorText1" />
        </div>
        <!--<q-btn class="full-width q-mt-md" color="red" v-on:click="login()" label="Login Google" />
        <q-btn class="full-width q-mt-md" color="primary" v-on:click="login()" label="Login Facebook" />{{ value }}%-->
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  /* eslint-disable */
  import {mapMutations} from 'vuex'
  import Vivus from 'vivus'
  import logoData from './logoData'
  import { Platform } from 'quasar'
  import LoginService from '@/services/login/login-service'
  export default {
    mounted () {
      this.GetUserLocalStorage();
      this.setLayoutNeeded(false);
      this.setIsLoginPage(true);
      this.startAnimation();
    },
    beforeDestroy () {
      this.setLayoutNeeded(true)
      this.setIsLoginPage(false)
    },
    computed: {
      heightSize(){
        if (Platform.is.desktop) {
          return 'items-center'
        }
        return ''
      },
      finalBgColor() {
        return `bg-${this.bgColor}-${this.toneColor}`
      },
      logoMethod() {
        return logoData[this.logo]
      },
    },
    data () {
      return {
        logos: Object.keys(logoData),
        logo: 'Digitalizer',
        user: '',
        password: '',
        bgColor: 'blue',
        toneColor: 10,
        colors: ['purple', 'blue', 'red', 'green', 'amber'],
        colorTones: ['2', '4', '6', '8', '10'],
        buttonClasses: ['normal','outline', 'clear', 'push', 'bordered', 'round'],
        buttonClass: 'normal',
        vivus: '',
        saveSession:false,
        isLogin:false,
      }
    },
    watch: {

    },
    methods: {
      ...mapMutations(['setLayoutNeeded', 'setIsLoginPage']),

      login(){
        this.setLayoutNeeded(true)
        this.setIsLoginPage(false)
        
        this.msjValidacion = this.validateLogin();
        if (this.msjValidacion == '') {
          this.isLogin=true;
          LoginService.LoginUser(this.user, this.password)
              .then(res => {
                  this.isLogin=false;
                  if (res.status==200){
                      let usuarioLogueado = {
                        usuarioId: res.result.usuarioId,
                        usuarioLogin: res.result.usuarioLogin,
                        usuarioNombre: res.result.usuarioNombre,
                        usuarioApePat: res.result.usuarioApePat,
                        usuarioApeMat: res.result.usuarioApeMat,
                        usuarioDNI: res.result.usuarioDNI,
                        email: res.result.email,
                        idCliente: res.result.idCliente,
                        cliente: res.result.cliente,
                        //isTipoProducto: res.result.cliente,
                        //isCostoProduccion: res.result.cliente,
                        //isFechaVenProd: res.result.cliente,
                        //isAdministrador: res.result.isAdministrador,
                        idPerfil: res.result.idPerfil,
                        perfil: res.result.perfil
                      }

                      let permisosUsuario = {
                        isAdministrador: res.result.isAdministrador,
                        isTipoProducto: res.result.isTipoProducto,
                        isCostoProduccion: res.result.isCostoProduccion,
                        isFechaVenProd: res.result.isFechaVenProd,
                        //RUBRO MEDICO
                        isLaboratorio: res.result.isLaboratorio,
                        isNombreGenerico: res.result.isNombreGenerico,
                        isGrupoMedico: res.result.isGrupoMedico,
                        isTipoMedico: res.result.isTipoMedico,
                        isTipoPresentacion: res.result.isTipoPresentacion,
                        isComposicion: res.result.isComposicion,
                        isContraIndicaciones: res.result.isContraIndicaciones,
                        isUbicacion: res.result.isUbicacion,
                        isLote: res.result.isLote,
                      }

                      let obeUsuario = {
                        id: res.result.usuarioId,
                        active: false,
                        url: res.result.imagen,//'https://cdn.quasar.dev/img/avatar.png',
                        background: res.result.background, //'https://cdn.quasar.dev/img/material.png',
                        description: 'Usuario',
                        name: res.result.usuarioNombre + ' ' + res.result.usuarioApePat + ' ' + res.result.usuarioApeMat,
                        profile: res.result.perfil,
                      }

                      let lobeUsuario = [];
                      lobeUsuario.push(obeUsuario);
                      let tittleHeader = res.result.tittleHeader;
                      let imageHeader = res.result.imageHeader;
                      let tittleFooter = res.result.tittleFooter;
                      let footer = res.result.footer;
                      let loFooter = res.result.loFooter;
                      let loNotificacion = res.result.loNotification;
                      let loTienda = res.result.loTienda;

                      let lobeMenu = res.result.loMenu;
                      let index = lobeMenu.findIndex(dat=>dat.active==true);
                      if(index!=-1){
                        let activeMenu = lobeMenu[index].url;

                        let resultSesion = {
                          setUsuario : usuarioLogueado,
                          setPermisos : permisosUsuario,
                          setUsuarioDatos: lobeUsuario,
                          setTittleHeader: tittleHeader,
                          setImageHeader: imageHeader,
                          setTittleFooter: tittleFooter,
                          setFooter: footer,
                          setloFooter: loFooter,
                          setloNotificacion: loNotificacion,
                          setloTienda: loTienda,
                          setMenu: lobeMenu,
                          path: activeMenu,
                        }


                        this.$store.commit('setUsuario', usuarioLogueado);
                        this.$store.commit('setPermisos', permisosUsuario);
                        this.$store.commit('setUsuarioDatos', lobeUsuario);
                        this.$store.commit('setTittleHeader', tittleHeader);
                        this.$store.commit('setImageHeader', imageHeader);
                        this.$store.commit('setTittleFooter', tittleFooter);
                        this.$store.commit('setFooter', footer);
                        this.$store.commit('setloFooter', loFooter);
                        this.$store.commit('setloNotificacion', loNotificacion);
                        this.$store.commit('setloTienda', loTienda);
                        this.$store.commit('setMenu', lobeMenu);
                        this.$router.push({ path: activeMenu});

                        this.SaveLocalStorage(resultSesion);
                      } else {
                        this.$message({
                          showClose: true,
                          message: "Perfil de Usuario no tiene menú por defecto seleccionado.",
                          type: 'warning'
                        });
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
                  console.log("Error",err);
                  this.isLogin=false;
                  this.$message({
                      showClose: true,
                      message: 'Ocurrió un error inesperado. Contáctese con MSI.',
                      type: 'error'
                  });
              });
        } else {
          this.$message({
              showClose: true,
              message: this.msjValidacion,
              type: 'warning'
          });
        }
      },
      SaveLocalStorage(res){
        if(this.saveSession){
            if (typeof(Storage) !== "undefined") {
                localStorage.setItem("usrValSistVentas", JSON.stringify(res));
            }
        }else{
            if (typeof(Storage) !== "undefined") {
                localStorage.removeItem("usrValSistVentas");
            }
        }
      },
      GetUserLocalStorage(){
        if (typeof(Storage) !== "undefined") {
            let usrValSistLS = localStorage.getItem("usrValSistVentas");
            if(usrValSistLS){
                let usrValSist = JSON.parse(usrValSistLS);
                if (usrValSist.setUsuario && usrValSist.setUsuarioDatos) {
                    this.SetUserAndProcess(usrValSist);
                    return true;
                }
            }
        }
        return false;
      },
      SetUserAndProcess(userProcess){
        let object = {
            usuarioLogueado: userProcess.setUsuario,
            permisosUsuario: userProcess.setPermisos,
            lobeUsuario: userProcess.setUsuarioDatos,
            tittleHeader: userProcess.setTittleHeader,
            imageHeader: userProcess.setImageHeader,
            tittleFooter: userProcess.setTittleFooter,
            footer: userProcess.setFooter,
            loFooter: userProcess.setloFooter,
            loNotificacion: userProcess.setloNotificacion,
            loTienda: userProcess.setloTienda,
            lobeMenu: userProcess.setMenu,
            activeMenu: userProcess.path,
        }

        this.$store.commit('setUsuario', object.usuarioLogueado);
        this.$store.commit('setPermisos', object.permisosUsuario);
        this.$store.commit('setUsuarioDatos', object.lobeUsuario);
        this.$store.commit('setTittleHeader', object.tittleHeader);
        this.$store.commit('setImageHeader', object.imageHeader);
        this.$store.commit('setTittleFooter', object.tittleFooter);
        this.$store.commit('setFooter', object.footer);
        this.$store.commit('setloFooter', object.loFooter);
        this.$store.commit('setloNotificacion', []);//object.loNotificacion);
        this.$store.commit('setloTienda', object.loTienda);
        this.$store.commit('setMenu', object.lobeMenu);
        this.$router.push({ path: object.activeMenu});
      },
      validateLogin(){
          if (!(this.user && this.password)) {
              return "Por favor ingrese usuario y contraseña";
          }
          return "";
      },
      startAnimation(){
        this.vivus = new Vivus('logo', {
            duration: 400,
          forceRender: false
          }, function(element) {
            for (let item of element.el.children[0].children) {
              item.setAttribute('style', 'fill:white')
              item.setAttribute('style', 'fill:white')
            }
          }
        )
      }
    }
  }
</script>

<style scoped>
  .card {
    margin-bottom: 0px;
  }
  .card-content {
    min-height: 120px;
  }
  button {
    margin-bottom: 4%;
  }
  h4 {
    font-weight: 300;
  }
  .n-box-card-centered{
    margin-top: 100px !important;
    margin-left: auto !important;
    margin-right: auto !important;
  }
</style>