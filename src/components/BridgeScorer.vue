<template>
  <v-card class="elevation-12 pa-auto">
    <v-card-title class="text-xs-center">
      <v-icon large left>mdi-cards-playing-outline</v-icon>
      <span class="title font-weight-light">Bridge Calculator</span>
    </v-card-title>
    <v-divider light class="mx-2"></v-divider>
    <v-card-actions>
      <v-layout wrap align-center>
        <v-flex xs12 sm6 d-flex class="px-1">
          <v-select :items="trumps" label="Trump" v-model="selectedtrump" outline></v-select>
        </v-flex>
        <v-flex xs12 sm6 d-flex class="px-1">
          <v-select :items="levels" label="Level" v-model="selectedlevel" outline></v-select>
        </v-flex>
        <v-flex xs12 sm6 d-flex class="px-1">
          <v-switch label="Vulnerable" v-model="vulnerable" color="red"></v-switch>
        </v-flex>
        <v-flex xs12 sm6 d-flex class="px-1">
          <v-switch label="Doubled" v-model="doubled" color="red"></v-switch>
          <v-switch v-show="doubled" label="Redoubled" color="indigo" v-model="redoubled"></v-switch>
        </v-flex>
        <v-flex xs12 sm12 d-flex class="pa-auto">
          <v-slider
            v-model="result"
            thumb-label="always"
            label="Result"
            step="1"
            :min="results[1]"
            :max="results[0]"
            ticks
            :color="color"
          >
            <template slot="thumb-label">
              <span>{{ resultview }}</span>
            </template>
          </v-slider>
        </v-flex>
        <v-flex xs12 sm12 d-flex class="pa-3">
          <h5>Bid: {{ bid }}</h5>
          <h5>Result: {{ resultview }}</h5>
          <h4>Score: {{ score }}</h4>
        </v-flex>
      </v-layout>
    </v-card-actions>
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
        var risk = ''
        if (this.doubled) {
          risk += 'X'
          if (this.redoubled) risk += 'X'
        }
        return this.selectedlevel + this.selectedtrump + risk
      } else return '-'
    },
    results() {
      let max = 7 - this.selectedlevel
      let min = -(this.selectedlevel + 6)
      return [max, min]
    },
    score() {
      var risk = ''
      if (this.doubled) {
        risk += 'X'
        if (this.redoubled) risk += 'X'
      }
      return scorer.contractTricks(
        {
          level: this.selectedlevel,
          denomination: this.selectedtrump,
          risk: risk
        },
        this.vulnerable,
        this.result + this.selectedlevel + 6
      )
    },
    color() {
      if (this.result == 0) return 'success'
      else if (this.result >= 0) return 'primary'
      else return 'error'
    },
    resultview() {
      if (this.result == 0) return '='
      else if (this.result >= 0) return '+' + this.result.toString()
      else return this.result.toString()
    }
  },
  watch: {
    doubled(value) {
      if (!value) this.redoubled = false
    }
  }
}
</script>
