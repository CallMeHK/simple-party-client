<template>
  <v-app dark>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>simple-party</span>

      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if='!user'>
        <v-btn :to="{ name: 'login' }">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if='user'>
        <v-btn @click="toChar">Character</v-btn>
      </v-toolbar-items>
      <v-toolbar-items v-if='user'>
        <v-btn @click="toParty">Party</v-btn>
      </v-toolbar-items>
       <v-toolbar-items v-if='user'>
        <v-btn @click="logout">Logout</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2018 by Ty</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      fixed: false,
    };
  },
  computed: {
    ...mapState('auth', { user: 'payload' }),


  },
  methods: {
    ...mapMutations('char', [
      'clearAll', // lets you do `this.clearAll()` inside the component
    ]),
    ...mapActions('auth', { authLogout: 'logout' }),
    logout() {
      this.authLogout().then(
        () => {
          this.clearAll();
          this.$router.push('login');
        },
      );
    },
    toChar(){
      if (this.$router.history.current.name!='charactersheet'){
      this.clearAll();
      this.$router.push('charactersheet');
      }
    },
    toParty(){
      //this.clearAll();
      this.$router.push('myparty');
    },
  },
};
</script>
