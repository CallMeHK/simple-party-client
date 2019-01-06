<template>
  <v-container>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-progress-circular v-if="loading" :size="70" :width="7" color="primary" indeterminate></v-progress-circular>

        <v-flex sm4 v-if="!loading">
          <div v-for="character in sheet" v-bind:key="character._id">
            <simple-char :char="character"></simple-char>
          </div>

          <v-container>
            <v-flex sm4>
              <v-card v-if="party!=undefined">
                <v-card-title style="flex-direction: column;">
                  <div class="headline">Party Messages</div>
                  </v-card-title>
                  <div v-for="msg in party.messages" :key="msg">
                    <v-card-text>{{ msg }}</v-card-text>
                  </div>
                  <v-textarea
                    solo
                    name="input-7-4"
                    label="message"
                    v-model="chat"
                  ></v-textarea>

                
              </v-card>
            </v-flex>
          </v-container>
        </v-flex>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapActions, mapGetters } from "vuex";
import SimpleChar from "@/views/SimpleChar";

export default {
  name: "MyParty",
  components: {
    SimpleChar
  },
  mounted() {
    // this.findParty({})
    //   .then((res) => {
    //     {console.log(res.data[0].charIds)
    //     res.data[0].charIds.forEach(elt => this.getChar(elt));
    //     }
    //   })
    //   .catch(e => console.log(e)).then(() => this.mount = true);
    console.log(this.party.charIds)
    this.party.charIds.forEach(elt => this.getChar(elt))
  },
  data: () => ({
    valid: false,
    mount: true,
    notEmptyRules: [value => !!value || "Cannot be empty"],
    edit: {
      stats: false
    },
    char: {
      stats: {}
    },
    chat: ""
  }),
  computed: {
    ...mapState("char", {
      creating: "isCreatePending",
      loading: "isGetPending"
    }),
    ...mapState("party", {
      partycreating: "isCreatePending",
      partyloading: "isFindPending"
    }),

    ...mapState("auth", { user: "payload", userobj: "user" }),

    ...mapGetters("char", { findCharsInStore: "find" }),
    ...mapGetters("party", { findPartyInStore: "find" }),

    sheet() {
      const sheets = this.findCharsInStore({});
      return sheets.data;
    },
    party() {
      const party = this.findPartyInStore({});
      return party.data[0];
    }
  },
  methods: {
    ...mapActions("char", {
      findChars: "find",
      updateChar: "patch",
      getChar: "get"
    }),
    ...mapActions("party", { findParty: "find", updateParty: "patch" }),
    createChar() {
      if (this.valid) {
        const newChar = this.char;
        newChar.hp.current = newChar.hp.total;
        //console.log(newChar);
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
    sendMessage() {
      const id = this.party._id;
      const data = { messages: [...this.party.messages, this.chat] };
      data.hp.current = data.hp.current + num;
      const params = {};
      const paramsArray = [id, data, params];

      console.log('this')
      //this.updateChar(paramsArray);
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
