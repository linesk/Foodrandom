<template>
  <v-card class="elevation-12 pa-2">
    <v-card-title>
      <v-icon large left>mdi-note-text</v-icon>
      <span class="title font-weight-light">Board</span>
    </v-card-title>
    <v-divider light class="ma-2"></v-divider>
    <v-data-table :headers="headers" :items="desserts" hide-actions>
      <template slot="items" slot-scope="props">
        <td>{{ props.item.number }}</td>
        <td class="text-xs-center">{{ props.item.contract }}</td>
        <td class="text-xs-center">{{ props.item.by }}</td>
        <td class="text-xs-center">{{ props.item.result }}</td>
        <td class="text-xs-center">{{ props.item.score }}</td>
        <td class="text-xs-center">{{ props.item.percent }}</td>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: 'Board Number',
          align: 'left',
          value: 'number'
        },
        { text: 'Contract', value: 'contract' },
        { text: 'By', value: 'by' },
        { text: 'Result', value: 'result' },
        { text: 'Score', value: 'score' },
        { text: '(%)', value: 'percent' }
      ],
      desserts: [
        {
          number: 1,
          contract: '4H',
          by: 'N',
          result: 24,
          score: 4.0,
          percent: '1%'
        },
        {
          number: 2,
          contract: '2S',
          by: 'S',
          result: 37,
          score: 4.3,
          percent: '1%'
        },
        {
          number: 3,
          contract: '3H',
          by: 'N',
          result: 23,
          score: 6.0,
          percent: '7%'
        },
        {
          number: 4,
          contract: '4S',
          by: 'S',
          result: 67,
          score: 4.3,
          percent: '8%'
        },
        {
          number: 5,
          contract: '6H',
          by: 'E',
          result: 49,
          score: 3.9,
          percent: '16%'
        },
        {
          number: 6,
          contract: '4H',
          by: 'W',
          result: 94,
          score: 0.0,
          percent: '0%'
        },
        {
          number: 7,
          contract: '4H',
          by: 'E',
          result: 98,
          score: 0,
          percent: '2%'
        },
        {
          number: 8,
          contract: '4H',
          by: 'N',
          result: 87,
          score: 6.5,
          percent: '45%'
        }
      ]
    }
  }
}
</script>

<style>
</style>
