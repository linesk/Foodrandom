<template>
  <v-layout align-center justify-center>
    <v-card class="elevation-12 pa-3">
      <v-flex xs12 sm12 d-flex>
        <v-radio-group v-model="selectedlevel" row>
          <v-radio v-for="level in levels" :key="level" :label="`Level ${level}`" :value="level"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs12 sm12 d-flex>
        <v-radio-group v-model="selectedtrump" row>
          <v-radio v-for="trump in trumps" :key="trump" :label="`Trump ${trump}`" :value="trump"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs12 sm12 d-flex>
        <v-radio-group v-model="result" solo row>
          <v-radio v-for="i in results" :key="i" :label="`Result: ${i}`" :value="i"></v-radio>
        </v-radio-group>
      </v-flex>

      <v-flex xs12 sm12 d-flex class="pa-3">
        <h5>Board Number: {{ bid }}</h5>
        <h5>Bid: {{ bid }}</h5>
        <h5>Result: {{ result }}</h5>
        <h5>Score: {{ score }}</h5>
      </v-flex>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      levels: [1, 2, 3, 4, 5, 6, 7],
      trumps: ['NT', 'S', 'H', 'D', 'C'],
      selectedlevel: 1,
      selectedtrump: 'S',
      boardnumber: 1,
      result: 0
    }
  },
  computed: {
    bid() {
      return this.selectedlevel + this.selectedtrump
    },
    results() {
      var results = []
      for (var i = 1; i <= 13; i++) {
        results.push(i - 6 - this.selectedlevel)
      }
      results.reverse()
      return results
    },
    score() {
      var score = 0
      if (this.result >= 0) {
        if (this.selectedtrump == 'NT') {
          score += 40 + 30 * (this.selectedlevel + this.result - 1)
          if (this.selectedlevel >= 3) score += 300
          else score += 50
        } else if (this.selectedtrump == 'S' || this.selectedtrump == 'H') {
          score += 30 * (this.selectedlevel + this.result)
          if (this.selectedlevel >= 4) score += 300
          else score += 50
        } else {
          score += 20 * (this.selectedlevel + this.result)
          if (this.selectedlevel >= 5) score += 300
          else score += 50
        }
        if (this.selectedlevel == 6) score += 500
        else if (this.selectedlevel == 7) score += 1000
      } else {
        score += 50 * this.result
      }
      return score
    }
  }
}
</script>
