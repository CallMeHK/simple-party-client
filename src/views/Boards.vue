<template>
  <v-container fluid>
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
        <v-flex v-if='!loading' sm3 pa-2 v-for="board in boards" :key="board._id">
          <v-card>
            <v-card-media
              height="200px"
              :src="board.background"
            ></v-card-media>
            <v-card-title primary-title>
              <div class="headline">{{board.name}}</div>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex sm4>
          <v-card>
            <v-card-title style="flex-direction: column;">
              <div class="headline">
                Create Board
              </div>
              <div>
                <v-form
                  v-if="!creating"
                  v-model="valid"
                  @submit.prevent="createBoard"
                  @keydown.prevent.enter
                >
                  <v-text-field
                    v-model="board.name"
                    :rules="notEmptyRules"
                    label="Name"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="board.background"
                    :rules="notEmptyRules"
                    label="Background"
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
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>

<script>
// eslint-disable-next-line
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'boards',
  mounted() {
    this.findBoards({ query: { } });
    //   .then((response) => {
    //   // eslint-disable-next-line
    //   const boards = response.data || response;
    // });
  },
  data: () => ({
    valid: false,
    notEmptyRules: [value => !!value || 'Cannot be empty'],
    board: {
      name: '',
      background: '',
    },
  }),
  computed: {
    ...mapState('boards', { creating: 'isCreatePending', loading: 'isFindPending' }),
    ...mapState('auth', { user: 'payload' }),

    ...mapGetters('boards', { findBoardsInStore: 'find' }),

    boards() {
      return this.user ? this.findBoardsInStore({
        query: {
          ownerId: this.user.userId,
        },
      }).data : [];
    },
  },
  methods: {
    ...mapActions('boards', { findBoards: 'find' }),
    createBoard() {
      if (this.valid) {
        const { Board } = this.$FeathersVuex;
        const board = new Board(this.board);
        board.save();
        this.board = {
          name: '',
          background: '',
        };
      }
    },
    sleep(time) {
      return new Promise(resolve => setTimeout(resolve, time));
    },
  },
};
</script>
