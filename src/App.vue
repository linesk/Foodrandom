
<template>
  <v-app>
    <ToolBar></ToolBar>
    <v-content>
      <v-container fluid>
      <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import ToolBar from '@/components/core/ToolBar'
export default {
  data() {
    return {
      sidebar: false
    }
  },
  components: { ToolBar },
  computed: {
    appTitle() {
      return this.$store.state.appTitle
    }
  }
}
</script>
