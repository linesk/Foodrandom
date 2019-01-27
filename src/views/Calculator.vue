<template>
  <v-layout row wrap>
    <v-flex xs12 md8 offset-md2 mt-2>
      <bridgeScorer></bridgeScorer>
    </v-flex>
  </v-layout>
</template>

<script>
import BridgeScorer from '@/components/BridgeScorer'
export default {
  name: 'Calculator',
  components: {
    BridgeScorer
  }
}
</script>

<style>
</style>
