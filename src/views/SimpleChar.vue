<template>
  <v-container>
    <v-flex sm4>
      <v-card :class="animate">
        <v-card-title style="flex-direction: column;">
          <div class="headline">{{ char.name }}</div>

          <v-progress-linear color="success" height="20" :value="bar"></v-progress-linear>
          <v-expansion-panel>
            <v-expansion-panel-content>
              <div slot="header">Details</div>
              <v-card>
                <v-card-text>Hitpoints: {{this.char.hp.current}}/{{this.char.hp.total}}</v-card-text>
                <v-card-text>
                  <div>Character Notes</div>
                  <p>{{ this.char.details }}</p></v-card-text>
              </v-card>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-title>
      </v-card>
    </v-flex>
  </v-container>
</template>

<script>
export default {
  name: 'SimpleChar',
  props: {
    char: Object,
  },
  data: () => ({
    animate: '',
  }),
  computed: {
    bar() {
      console.log('bar changed');
      this.animate = 'animate-sc';
      this.activate();

      return (this.char.hp.current * 100) / this.char.hp.total;
    },
  },
  watch: {
    char: () => {
      console.log('bar changed');
      this.animate = 'animate';
      this.activate();
    },
  },
  methods: {
    activate() {
      setTimeout(() => (this.animate = 'nope-sc'), 300);
    },
  },
};
</script>

<style scoped>
.animate-sc {
  animation: shake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
