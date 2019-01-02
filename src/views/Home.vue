<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Hello! {{ fullname }}</p>
        <bridge></bridge>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Bridge from '../components/Bridge'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Bridge
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getUserProfile']),
    fullname() {
      if (this.getUserProfile.firstname || this.getUserProfile.lastname) {
        return (
          this.getUserProfile.firstname + ' ' + this.getUserProfile.lastname
        )
      } else return 'none'
    }
  }
}
</script>
