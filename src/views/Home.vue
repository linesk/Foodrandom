<template>
    <v-layout row wrap>
      <v-flex xs12 md8 offset-md2 class="text-xs-center">
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Hello {{ getUser.displayName }}</p>
      </v-flex>
      <v-flex xs12 md8 offset-md2>
        <Broad></Broad>
      </v-flex>
    </v-layout>
</template>

<script>
import Broad from '@/components/Broad'
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  components: {
    Broad
  },
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getUser'])
  }
}
</script>
