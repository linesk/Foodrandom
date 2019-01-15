<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 class="text-xs-center">
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a Bridge calculator</p>
        <p>Hello {{ getUser.displayName }}</p>
      </v-flex>
      <v-flex xs12 md8 offset-md2>
        <bridgeScorer></bridgeScorer>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import BridgeScorer from '../components/BridgeScorer'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    BridgeScorer
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getUser']),
  }
}
</script>
