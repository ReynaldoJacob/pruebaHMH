<template>
  <div id="app">
    <HeaderPartial v-if="showHeader" />
    <router-view />
  </div>
</template>

<script>
import { checkUserAuthentication } from './auth';
import router from './routes';
import HeaderPartial from './components/HeaderPartial.vue';
import { useCookies } from 'vue-cookies';

export default {
  name: 'App',
  components: {
    HeaderPartial
  },
  data() {
    return {
      showHeader: false, // Inicialmente ocultamos el encabezado
    };
  },
  created() {
    // Verificar la autenticación del usuario al cargar la aplicación
    this.showHeader = checkUserAuthentication();
  },
  watch: {
    $route(to) {
      // Verificar la autenticación del usuario al cambiar de ruta
      this.showHeader = checkUserAuthentication();
      if (to.meta.requiresAuth && !this.showHeader) {
        // Redirigir al usuario a la página de inicio de sesión si no está autenticado y trata de acceder a una ruta protegida
        this.$router.push('/');
      }
    }
  },
  mounted() {
    const { $cookies } = useCookies();
    this.showHeader = checkUserAuthentication($cookies);
    console.log(this.showHeader);
  },
  router
};
</script>
