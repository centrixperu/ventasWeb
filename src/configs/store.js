import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:{
      usuarioId: -1,
      usuarioLogin: '',
      usuarioNombre: '',
      usuarioApePat: '',
      usuarioApeMat: '',
      usuarioDNI: '',
      email: '',
      idCliente: -1,
      cliente: '',
      idPerfil: -1,
      perfil: '',
      idTienda: [],
      //isTipoProducto: false,
      //isCostoProduccion: false,
      //isFechaVenProd: false,
    },
    permisos:{
      isAdministrador: false,
      isTipoProducto: false,
      isCostoProduccion: false,
      isFechaVenProd: false,
      //RUBRO MEDICO
      isLaboratorio: false,
      isNombreGenerico: false,
      isGrupoMedico: false,
      isTipoMedico: false,
      isTipoPresentacion: false,
      isComposicion: false,
      isContraIndicaciones:false,
      isUbicacion:false,
      isLote:false,
    },
    loMenu: [],
    loFooter: [],
    loNotificacion: [],
    loTienda: [],
    loUsuario: [],
    loNotificaciones: [],
    tittleHeader: '',
    imageHeader: '',
    tittleFooter: '',
    footer: '',
    token: '',
    layoutNeeded: true,
    isLoginPage: false,
    mobileMode: false,
    menuCollapse: true,
  
    posts: [{
      title:"Prueba"
    }]
  },
  getters: {//funciones que aceptan el state
    existUsuario(state) {
        if(state.usuario && state.usuario.usuarioId != -1){ //&& state.token
            return true;
        }
        return false;
    },
    token(state){
        return state.token;
    },
    getLayoutNeeded(state) {
      return state.layoutNeeded
    },
    getIsLoginPage(state) {
      return state.isLoginPage
    },
    Menu(state) {
      return state.loMenu
    },
    UsuarioDatos(state) {
      return state.loUsuario
    },
    TittleHeader(state) {
      return state.tittleHeader
    },
    ImageHeader(state) {
      return state.imageHeader
    },
    TittleFooter(state) {
      return state.tittleFooter
    },
    Footer(state) {
      return state.footer
    },
    loFooter(state) {
      return state.loFooter
    },
    loNotificacion(state) {
      return state.loNotificacion
    },
    loTienda(state) {
      return state.loTienda
    },
    /*getMobileMode () {
      return state.mobileMode
    },
    getMenuCollapse () {
      return state.menuCollapse
    },
    getPosts () {
      return state.posts
    }*/
  },
  mutations: {
    //DATOS DE USUARIO
    setUsuario(state, inUsuario){
      state.usuario = inUsuario
    },
    setPermisos(state, inPermiso){
      state.permisos = inPermiso
    },
    setLayoutNeeded (state, value) {
      state.layoutNeeded = value
    },
    setIsLoginPage (state, value) {
      state.isLoginPage = value
    },
    setMenu (state, value) {
      state.loMenu = value
    },
    setUsuarioDatos (state, value) {
      state.loUsuario = value
    },
    setTittleHeader (state, value) {
      state.tittleHeader = value
    },
    setImageHeader (state, value) {
      state.imageHeader = value
    },
    setTittleFooter (state, value) {
      state.tittleFooter = value
    },
    setFooter (state, value) {
      state.footer = value
    },
    setloFooter (state, value) {
      state.loFooter = value
    },
    setloNotificacion (state, value) {
      state.loNotificacion = value
    },
    setloTienda (state, value) {
      state.loTienda = value
    },
    /*setMobileMode (state, value) {
      state.mobileMode = value
    },
    setMenuCollapse (state, value) {
      state.menuCollapse = value
    },
    setPosts (state, posts) {
      state.posts = posts
    }*/
  },
  actions: {}
});


