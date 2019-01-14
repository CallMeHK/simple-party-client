<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout
        row
        align-center
        wrap
      >
        <v-progress-circular
          v-if='creating'
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <v-flex sm4>
          <v-card>
            <v-card-title style="flex-direction: column;">
              <div class="headline">
                Create Character
              </div>
              <div>
                <v-form
                  v-if="!creating"
                  v-model="valid"
                  @submit.prevent="createChar"
                  @keydown.prevent.enter
                >
                  <v-text-field
                    v-model="char.name"
                    :rules="notEmptyRules"
                    label="name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.playerId"
                    :rules="notEmptyRules"
                    label="playerId"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.hp.total"
                    :rules="notEmptyRules"
                    label="hp"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.stats.str"
                    :rules="notEmptyRules"
                    label="str"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.stats.con"
                    :rules="notEmptyRules"
                    label="con"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.stats.dex"
                    :rules="notEmptyRules"
                    label="dex"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.stats.wis"
                    :rules="notEmptyRules"
                    label="wis"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.stats.int"
                    :rules="notEmptyRules"
                    label="int"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="char.stats.cha"
                    :rules="notEmptyRules"
                    label="cha"
                    required
                  ></v-text-field>
                  <v-btn
                    type="submit"
                    :disabled="!valid"
                  >Create</v-btn>
                </v-form>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-container>
        <v-flex
          v-if='!loading'
          sm3
          pa-2
          v-for="char in chars"
          :key="char._id"
        >
          <v-card>
            <v-card-title style="flex-direction: column;">
              <div class="headline">
                {{char.name}}
              </div>
              <div class="subheading">
                {{char.hp.current}}/{{char.hp.total}}
              </div>
              <div>
                <v-btn color="success" @click='() => updateCharHp(1, char)'>+1</v-btn>
                <v-btn color="error" @click='() => updateCharHp(-1, char)'>-1</v-btn>
              </div>
              <div>
                <div>STR:{{char.stats.str}}</div>
                <div>DEX:{{char.stats.dex}}</div>
                <div>CON:{{char.stats.con}}</div>
                <div>WIS:{{char.stats.wis}}</div>
                <div>INT:{{char.stats.int}}</div>
                <div>CHA:{{char.stats.cha}}</div>
                <v-btn
                  color="success"
                  @click="() => console.log('clicked')"
                >edit</v-btn>

              </div>
            </v-card-title>
          </v-card>
        </v-flex>
        </v-container>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'CreateCharacter',
  mounted() {
    this.findChars({ query: {} });
    //   .then((response) => {
    //   // eslint-disable-next-line
    //   const chars = response.data || response;
    // });
  },
  data: () => ({
    valid: false,
    notEmptyRules: [value => !!value || 'Cannot be empty'],
    char: {
      name: 'char',
      playerId: '5c16ae5460988a24fc32bc92',
      hp: { total: '30' },
      stats: {
        str: '10',
        con: '11',
        dex: '12',
        int: '13',
        wis: '14',
        cha: '15',
      },
    },
  }),
  computed: {
    ...mapState('char', {
      creating: 'isCreatePending',
      loading: 'isFindPending',
    }),
    ...mapState('auth', { user: 'payload' }),

    ...mapGetters('char', { findCharsInStore: 'find' }),

    chars() {
      const foundChars = this.findCharsInStore({});
      console.log(foundChars.data);
      return foundChars.data;
    },
  },
  methods: {
    ...mapActions('char', { findChars: 'find', updateChar: 'patch' }),
    createChar() {
      if (this.valid) {
        const newChar = this.char;
        newChar.hp.current = newChar.hp.total;
        console.log(newChar);
        const { Char } = this.$FeathersVuex;
        const char = new Char(newChar);
        char.save();
      }
    },
    updateCharHp(num, sheet) {
      const id = sheet._id;
      const data = { hp: sheet.hp };
      data.hp.current = data.hp.current + num;
      const params = {};
      const paramsArray = [id, data, params];

      this.updateChar(paramsArray);
    },
    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
  },
};
</script>
<style scoped>
.move-right {
  margin-left: 300px;
}
</style>
