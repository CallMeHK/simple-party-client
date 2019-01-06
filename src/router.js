import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import SignUp from './views/SignUp.vue';
import Login from './views/Login.vue';
// eslint-disable-next-line
import Boards from "./views/Boards.vue";
import Dashboard from './views/Dashboard.vue';
import CharacterSheet from './views/CharacterSheet.vue';
import MyParty from './views/MyParty.vue';

import store from './store';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            if (store.getters['users/current'].role == 'admin') {
              next('./dashboard');
            }
            next('/charactersheet');
          })
          .catch(() => {
            next('./login');
          });
      },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/myparty',
      name: 'myparty',
      component: MyParty,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            next();
          })
          .catch(() => {
            next('./login');
          });
      },
    },
    {
      path: '/boards',
      name: 'boards',
      component: Boards,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            next();
          })
          .catch(() => {
            next('./login');
          });
      },
    },
    {
      path: '/charactersheet',
      name: 'charactersheet',
      component: CharacterSheet,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            next();
          })
          .catch(() => {
            next('./login');
          });
      },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter(to, from, next) {
        store.dispatch('auth/authenticate')
          .then(() => {
            next();
          })
          .catch(() => {
            next('./login');
          });
      },
    },
  ],
});
