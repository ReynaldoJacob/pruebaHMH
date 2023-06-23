import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';

// Importa tus componentes y define las rutas
import LoginComponent from './components/LoginComponent.vue';
import DashboardView from './components/DashboardView.vue';
import TodoList from './components/TodoList.vue';
import TimerComponent from './components/TimerComponent.vue';
import GitComponent from './components/GitComponent.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'LoginComponent',
    component: LoginComponent,
    meta: { public: true } // Marca esta ruta como pública
  },
  {
    path: '/dashboard',
    name: 'DashboardView',
    component: DashboardView,
    meta: { requiresAuth: true } // Requiere autenticación
  },
  {
    path: '/todolist',
    name: 'TodoList',
    component: TodoList,
    meta: { requiresAuth: true } // Requiere autenticación
  },
  {
    path: '/timercomponent',
    name: 'TimerComponent',
    component: TimerComponent,
    meta: { requiresAuth: true } // Requiere autenticación
  },
  {
    path: '/gitcomponent',
    name: 'GitComponent',
    component: GitComponent,
    meta: { requiresAuth: true } // Requiere autenticación
  }
  // Más rutas aquí
];

const router = new VueRouter({
  routes
});

router.beforeEach((to, from, next) => {
    // Verifica si la ruta requiere autenticación
    if (to.matched.some(route => route.meta.requiresAuth)) {
      // Aquí puedes implementar tu lógica de autenticación
      const isAuthenticated = VueCookies.get('sessionToken');
      
      if (isAuthenticated) {
        // Si el usuario está autenticado, continúa con la navegación
        next();
      } else {
        // Si el usuario no está autenticado, redirige a la vista de login
        next('/');
      }
    } else {
      // Si la ruta es pública, permite el acceso sin restricciones
      next();
    }
  });
  

export default router;