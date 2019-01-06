<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout
        row
        align-center
        wrap
      >
        <v-progress-circular
          v-if='loading'
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>

        <v-flex
          sm4
          v-if='sheet!=undefined'
        >
          <v-card>
            <v-card-title style="flex-direction: column;">
              <div class="headline">
                {{sheet.name}}
              </div>
              <div class="subheading">
                {{sheet.hp.current}}/{{sheet.hp.total}}
              </div>
              <div>
                <v-btn
                  color="success"
                  @click='() => updateCharHp(1)'
                >+1</v-btn>
                <v-btn
                  color="error"
                  @click='() => updateCharHp(-1)'
                >-1</v-btn>
              </div>
              <div v-if="!edit.stats">
                <div>STR:{{sheet.stats.str}}</div>
                <div>DEX:{{sheet.stats.dex}}</div>
                <div>CON:{{sheet.stats.con}}</div>
                <div>WIS:{{sheet.stats.wis}}</div>
                <div>INT:{{sheet.stats.int}}</div>
                <div>CHA:{{sheet.stats.cha}}</div>
                <v-btn
                  color="success"
                  @click="() => { edit.stats=!edit.stats; char.stats = sheet.stats }"
                >edit</v-btn>

              </div>
              <div v-if="edit.stats">
                <v-text-field
                  :value='sheet.stats.str'
                  v-on:input="char.stats.str = $event"
                  label="str"
                ></v-text-field>
                <v-text-field
                  :value='sheet.stats.dex'
                  v-on:input="char.stats.dex = $event"
                  label="dex"
                ></v-text-field>
                <v-text-field
                  :value='sheet.stats.con'
                  v-on:input="char.stats.con = $event"
                  label="con"
                ></v-text-field>
                <v-text-field
                  :value='sheet.stats.wis'
                  v-on:input="char.stats.wis = $event"
                  label="wis"
                ></v-text-field>
                <v-text-field
                  :value='sheet.stats.int'
                  v-on:input="char.stats.int = $event"
                  label="int"
                ></v-text-field>
                <v-text-field
                  :value='sheet.stats.cha'
                  v-on:input="char.stats.cha = $event"
                  label="cha"
                ></v-text-field>
                <v-btn
                  class="success"
                  @click="updateCharStats"
                >save</v-btn>
                <v-btn
                  class="error"
                  @click="() => {edit.stats=!edit.stats; char.stats = {}}"
                >cancel</v-btn>

              </div>
            </v-card-title>
          </v-card>
        </v-flex>

      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "CharacterSheet",
  mounted() {
    this.findChars({
      query: {
        playerId: this.userobj._id,
        $limit: 1
      }
    })
    .then((res) => {
      //console.log(res.data[0].partyId)
      this.getParty(res.data[0].partyId).catch(e => console.log(`findParty error: ${e}`));
    });
    //5c1a69db6e09a90a6cb8e20d
  },
  data: () => ({
    valid: false,
    notEmptyRules: [value => !!value || "Cannot be empty"],
    edit: {
      stats: false
    },
    char: {
      stats: {}
    }
  }),
  computed: {
    ...mapState("char", {
      creating: "isCreatePending",
      loading: "isFindPending"
    }),
    ...mapState("auth", { user: "payload", userobj: "user" }),

    ...mapGetters("char", { findCharsInStore: "find" }),

    sheet() {
      const sheets = this.findCharsInStore({});
      console.log(sheets.data);
      return sheets.data[0];
    }
  },
  methods: {
    ...mapActions("char", { findChars: "find", updateChar: "patch" }),
    ...mapActions("party", { findParty: "find", updateParty: "patch", getParty:"get" }),

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
    updateCharStats() {
      const id = this.sheet._id;
      const data = { stats: this.char.stats };
      const params = {};
      const paramsArray = [id, data, params];

      this.updateChar(paramsArray);
      this.edit.stats = !this.edit.stats;
    },
    updateCharHp(num) {
      const id = this.sheet._id;
      const data = { hp: this.sheet.hp };
      data.hp.current = data.hp.current + num;
      const params = {};
      const paramsArray = [id, data, params];

      this.updateChar(paramsArray);
    },
    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
  }
};
</script>
<style scoped>
.move-right {
  margin-left: 300px;
}
</style>
