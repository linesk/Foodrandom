<template>
  <v-card class="elevation-12 pa-3 mx-5">
    <v-layout wrap align-center>
      <v-flex xs12 sm6 d-flex class="pa-1">
        <v-select :items="trumps" label="Trump" v-model="selectedtrump" outline></v-select>
      </v-flex>
      <v-flex xs12 sm6 d-flex class="pa-1">
        <v-select :items="levels" label="Level" v-model="selectedlevel" outline></v-select>
      </v-flex>
      <v-flex xs12 sm6 d-flex class="pa-1">
        <v-switch
          :label="`Vulnerable 1: ${vulnerable.toString().toUpperCase()}`"
          v-model="vulnerable"
        ></v-switch>
      </v-flex>
      <v-flex xs12 sm6 d-flex class="pa-1">
        <v-switch :label="`Doubled: ${doubled.toString().toUpperCase()}`" v-model="doubled"></v-switch>
        <v-switch
          v-show="doubled"
          :label="`Redoubled: ${redoubled.toString().toUpperCase()}`"
          v-model="redoubled"
        ></v-switch>
      </v-flex>
      <v-flex xs12 sm12 d-flex class="pa-1">
        <v-slider
          v-model="result"
          thumb-label="always"
          label="Result"
          step="1"
          :min="results[1]"
          :max="results[0]"
          ticks
          :color="color"
        ></v-slider>
      </v-flex>

      <v-flex xs12 sm12 d-flex class="pa-3">
        <h5>Vulnerable: {{ vulnerable }}</h5>
        <h5>Bid: {{ bid }}</h5>
        <h5>Result: {{ result }}</h5>
        <h4>Score: {{ score }}</h4>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
import scorer from 'bridge-scorer'

export default {
  data() {
    return {
      levels: [1, 2, 3, 4, 5, 6, 7],
      trumps: ['NT', 'S', 'H', 'D', 'C'],
      selectedlevel: null,
      selectedtrump: null,
      vulnerable: false,
      doubled: false,
      redoubled: false,
      result: 0
    }
  },
  computed: {
    bid() {
      if (this.selectedlevel && this.selectedtrump) {
        var x = ''
        if (this.redoubled) x = 'xx'
        else if (this.doubled) x = 'x'
        return this.selectedlevel + this.selectedtrump + x
      } else return '-'
    },
    results() {
      var results = []
      for (var i = 1; i <= 13; i++) {
        results.push(i - 6 - this.selectedlevel)
      }
      return [Math.max(...results), Math.min(...results)]
    },
    score() {
      var risk = ''
      if (this.doubled) {
        risk += 'X'
        if (this.redoubled) risk += 'X'
      }
      let contract = {
        level: this.selectedlevel,
        denomination: this.selectedtrump,
        risk: risk
      }
      return scorer.contractMade(contract, this.vulnerable, this.result)
    },
    color() {
      if (this.result >= 0) return 'success'
      else return 'error'
    }
  }
}
</script>
