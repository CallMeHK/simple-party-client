<template>

  <v-flex
    sm4
    v-if='sheet!=undefined'
  >
    <v-card>
      <v-card-title style="flex-direction: column;">
        <div class="headline font-weight-medium mb-2">
          Spells
        </div>
        <div v-if="!edit.spells">
          <div
            v-for='(spell,i) in sheet.spell'
            :key='i'
          >
            <div class='title mb-1'>{{ spell.name }}</div>
            <div class='body-2 mb-3'>Level: {{ spell.level }}</div>
            <div class='body-2 mb-3'>{{ spell.detail }}</div>
          </div>
          <v-btn
            color="success"
            @click="() => { edit.spells=!edit.spells; this.spells = JSON.parse(JSON.stringify(this.sheet.spell));}"
          >edit</v-btn>

        </div>
        <div v-if="edit.spells">
          <div
            v-for='(spell,i) in spells'
            :key="'edit' + i"
          >
            <!-- feats[i].name = $event -->
            <v-text-field
              :value='spell.name'
              v-on:input="spellOnChange($event,i,'name')"
              label="Name"
            ></v-text-field>
            <v-text-field
              :value='spell.level'
              v-on:input="spellOnChange($event,i,'level')"
              label="Level"
            ></v-text-field>
            <v-text-field
              :value='spell.detail'
              v-on:input="spellOnChange($event,i,'detail')"
              label="Detail"
            ></v-text-field>
          </div>
          <v-btn
            class="success"
            @click="updateCharSpells()"
          >save</v-btn>
          <v-btn
            class="info"
            @click="addCharSpell()"
          >add</v-btn>
          <v-btn
            class="error"
            @click="closeEditor()"
          >cancel</v-btn>
        </div>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "CharacterSheet",
  mounted() {},
  data: () => ({
    valid: false,
    notEmptyRules: [value => !!value || "Cannot be empty"],
    edit: {
      spells: false
    },
    spells: []
  }),
  computed: {
    ...mapState("char", { loading: "isFindPending" }),
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
    ...mapActions("party", {
      findParty: "find",
      updateParty: "patch",
      getParty: "get"
    }),
    closeEditor() {
      this.spells = [];
      this.edit.spells = !this.edit.spells;
    },
    spellOnChange(e, i, type) {
      this.spells[i][type] = e;
    },
    addCharSpell(){
      this.spells = [...this.spells, {name:'',level:'', detail:''}]
    },
    updateCharSpells() {
      const id = this.sheet._id;
      this.spells = this.spells.filter(elt => elt.name!='')
      const data = { spell: this.spells };
      const params = {};
      const paramsArray = [id, data, params];

      console.log(paramsArray);
      this.updateChar(paramsArray);
      this.closeEditor()
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
