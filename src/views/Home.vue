<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Home page</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>This is a user's home page</p>
        <bridge></bridge>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Bridge from '../components/Bridge'

export default {
  name: 'Home',
  components: {
    Bridge
  }
}
</script>
