<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout
        column
        align-center
      >

        <v-form
          v-if="!loading"
          v-model="valid"
          @submit.prevent="signUp"
          @keydown.prevent.enter
        >
          <v-text-field
            v-model="user.username"
            :rules="notEmptyRules"
            label="Username"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.displayName"
            :rules="notEmptyRules"
            label="Display Name"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="notEmptyRules"
            label="Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.confirmPassword"
            :rules="confirmPasswordRules"
            label="Confirm Password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.role"
            :rules="notEmptyRules"
            label="role"
            required
          ></v-text-field>
          <v-btn
            type="submit"
            :disabled="!valid"
          >Sign Up</v-btn>
        </v-form>
        <div v-if="message!=''">{{ message }}</div>
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
import { mapState } from 'vuex';

export default {
  name: 'CreateUser',
  data: vm => ({
    valid: false,
    message: '',
    user: {
      username: '',
      password: '',
      confirmPassword: '',
      displayName: '',
      role: 'player',
    },
    notEmptyRules: [value => !!value || 'Cannot be empty'],
    confirmPasswordRules: [
      confirmPassword => confirmPassword === vm.user.password || 'Password must match',
    ],
  }),
  computed: {
    ...mapState('users', { loading: 'isCreatePending' }),
  },
  methods: {
    signUp() {
      if (this.valid) {
        const { User } = this.$FeathersVuex;
        const user = new User(this.user);
        // eslint-disable-next-line
        user.create().then((user) => {
          // eslint-disable-next-line
          console.log(user);
          this.message = `Created ${user.username} as a ${user.role}.`;
          this.user = {
            username: '',
            password: '',
            confirmPassword: '',
            displayName: '',
            role: 'player',
          };
        });
      }
    },
  },
};
</script>
<style scoped>
.move-right{
    margin-left:300px;
}
</style>
