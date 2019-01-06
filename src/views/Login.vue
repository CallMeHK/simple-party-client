<template>
    <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center
      >
        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="login"
          @keydown.prevent.enter
        >
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-btn
            type="submit"
            :disabled="!valid"
          >Log in</v-btn>
        </v-form>
        <v-progress-circular
          v-if="loading"
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import store from '../store';
// 1:07:11     "@vue/eslint-config-airbnb": "^4.0.0",
export default {
  name: 'login',
  data: () => ({
    valid: false,
    user: {
      username: 'dude', // asd
      password: '123', // asd
    },
    notEmptyRules: [value => !!value || 'Cannot be empty'],
  }),
  computed: {
    ...mapState('auth', { loading: 'isAuthenticatePending' }),

  },
  methods: {
    ...mapActions('auth', ['authenticate']),
    login() {
      if (this.valid) {
        this.authenticate({
          strategy: 'local',
          ...this.user,
        }).then(() => {
          console.log(store.getters['users/current'].role);
          if (store.getters['users/current'].role === 'admin') {
            this.$router.push('./dashboard');
          } else {
            this.$router.push('/charactersheet');
          }
        }).catch((e) => {
          // eslint-disable-next-line
          console.error('Auth Error', e);
        });
      }
    },

  },
};
</script>
