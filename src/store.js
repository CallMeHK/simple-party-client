import Vue from 'vue';
import Vuex from 'vuex';
import feathersVuex from 'feathers-vuex';
import feathersClient from './feathers-client';

const { service, auth, FeathersVuex } = feathersVuex(feathersClient, { idField: '_id' });
Vue.use(Vuex);
Vue.use(FeathersVuex);

const store = new Vuex.Store({
  plugins: [
    service('users', {
      instanceDefaults: {
        username: '',
        password: '',
        displayName: '',
        imageUrl: '',
      },
    }),
    service('boards', {
      instanceDefaults: {
        name: '',
        background: '',
      },
    }),
    service('char', {
      instanceDefaults: {
        name: '',

      },
    }),
    service('party', {
      instanceDefaults: {
        name: '',
      },
    }),
    auth({
      userService: 'users',
    }),
  ],
});

export default store;

// const initialStateCopy = JSON.parse(JSON.stringify(store.state))

// export function resetState () {
//   store.replaceState(JSON.parse(JSON.stringify(initialStateCopy)))
// }
