<template>
  <v-container fluid>
    <v-slide-y-transition mode="out-in">
      <v-layout row align-center wrap>
        <v-navigation-drawer v-model="drawer" absolute temporary>
          <v-toolbar flat class="transparent">
            <v-list class="pa-0">
              <v-list-tile avatar>
                <v-list-tile-avatar></v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title>Admin</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </v-list>
          </v-toolbar>

          <v-list class="pt-0" dense>
            <v-divider></v-divider>

            <v-list-tile @click="() => {this.page='CreateUser';this.drawer=!this.drawer}">
              <v-list-tile-action>
                <v-icon>info</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Create User</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="() => {this.page='CreateCharacter';this.drawer=!this.drawer}">
              <v-list-tile-action>
                <v-icon>info</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Create Character</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile @click="() => {this.page='CreateParty';this.drawer=!this.drawer}">
              <v-list-tile-action>
                <v-icon>info</v-icon>
              </v-list-tile-action>

              <v-list-tile-content>
                <v-list-tile-title>Create Party</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
      </v-layout>
    </v-slide-y-transition>
    <v-btn color="pink" dark @click.stop="drawer = !drawer">Menu</v-btn>
    <CreateUser v-if="page=='CreateUser'"></CreateUser>
    <CreateCharacter v-if="page=='CreateCharacter'"></CreateCharacter>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapActions, mapGetters } from "vuex";
import CreateUser from "./CreateUser";
import CreateCharacter from "./CreateCharacter";

export default {
  name: "dashboard",
  components: {
    CreateUser,
    CreateCharacter
  },
  mounted() {
    this.findBoards({ query: {} });
    //   .then((response) => {
    //   // eslint-disable-next-line
    //   const boards = response.data || response;
    // });
  },
  data: () => ({
    valid: false,
    drawer: null,
    page: "CreateUser",
    notEmptyRules: [value => !!value || "Cannot be empty"],
    board: {
      name: "",
      background: ""
    }
  }),
  computed: {
    ...mapState("boards", {
      creating: "isCreatePending",
      loading: "isFindPending"
    }),
    ...mapState("auth", { user: "payload" }),

    ...mapGetters("boards", { findBoardsInStore: "find" }),

    boards() {
      return this.user
        ? this.findBoardsInStore({
            query: {
              ownerId: this.user.userId
            }
          }).data
        : [];
    }
  },
  methods: {
    ...mapActions("boards", { findBoards: "find" }),
    createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex;
        const board = new Board(this.board);
        board.save();
        this.board = {
          name: "",
          background: ""
        };
      }
    },
    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    }
  }
};
</script>
