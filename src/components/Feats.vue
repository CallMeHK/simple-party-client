<template>

  <v-flex
    sm4
    v-if='sheet!=undefined'
  >
    <v-card>
      <v-card-title style="flex-direction: column;">
        <div class="headline font-weight-medium mb-2">
          Feats
        </div>
        <div v-if="!edit.feats">
          <div
            v-for='(feat,i) in sheet.feats'
            :key='i'
          >
            <div class='title mb-1'>{{ feat.name }}</div>
            <div class='body-2 mb-3'>{{ feat.detail }}</div>
          </div>
          <v-btn
            color="success"
            @click="() => { edit.feats=!edit.feats; this.feats = JSON.parse(JSON.stringify(this.sheet.feats));}"
          >edit</v-btn>

        </div>
        <div v-if="edit.feats">
          <div
            v-for='(feat,i) in feats'
            :key="'edit' + i"
          >
            <!-- feats[i].name = $event -->
            <v-text-field
              :value='feat.name'
              v-on:input="featOnChange($event,i,'name')"
              label="Name"
            ></v-text-field>
            <v-text-field
              :value='feat.detail'
              v-on:input="featOnChange($event,i,'detail')"
              label="Detail"
            ></v-text-field>
          </div>
          <v-btn
            class="success"
            @click="updateCharFeats"
          >save</v-btn>
          <v-btn
            class="info"
            @click="addCharFeat"
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
      feats: false
    },
    feats: []
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
      this.feats = [];
      this.edit.feats = !this.edit.feats;
    },
    featOnChange(e, i, type) {
      this.feats[i][type] = e;
    },
    addCharFeat(){
      this.feats = [...this.feats, {name:'', detail:''}]
    },
    updateCharFeats() {
      const id = this.sheet._id;
      this.feats = this.feats.filter(elt => elt.name!='')
      const data = { feats: this.feats };
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
