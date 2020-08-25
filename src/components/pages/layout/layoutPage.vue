<template>
  <q-page>
    <router-view />
  </q-page>  
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "app",
  components: { },
  data() {
    return {

    }
  },
  mounted() {
    
  },
  created() {
    if(!this.existUsuario){
      this.$router.push({ name: 'login'})
    } else {
      this.CargarDatosIniciales();
    }
  },
  computed: {
    ...mapGetters(["existUsuario"])
  },
  watch: {

  },
  methods: {
    CargarDatosIniciales(){
      //CARGAR LA LISTA DE TAB DEL CONFIGURADOR
    },
  }
};
</script>

<style lang="scss">

</style>