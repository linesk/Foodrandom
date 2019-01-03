<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Hello! {{ getUser.displayName }}</p>
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
    ...mapGetters(['getUserProfile', 'getUser'])
  }
}
</script>
