<template>
  <div>
    <v-navigation-drawer v-model="sidebar" temporary app>
      <v-list>
        <v-list-tile v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>
        <v-list-tile flat @click="userSignOut" v-if="isAuthenticated">
          <v-list-tile-action>
            <v-icon left>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Sign Out</v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar app>
      <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      <v-toolbar-title v-if="!isAuthenticated">
        <router-link to="/" tag="span" style="cursor: pointer">
          <v-icon>mdi-cards</v-icon>
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <router-link to="/home" tag="span" style="cursor: pointer">
          <v-icon>mdi-cards</v-icon>
          {{ appTitle }}
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat icon v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon dark>{{ item.icon }}</v-icon>
        </v-btn>
        <v-btn flat icon @click="userSignOut" v-if="isAuthenticated">
          <v-icon>exit_to_app</v-icon>
        </v-btn>
        <v-btn flat icon>
          <v-avatar size="35" color="grey lighten-4">
            <img
              v-if="$store.getters.getUser.photoURL"
              :src="$store.getters.getUser.photoURL"
              alt="avatar"
            >
            <v-icon v-else>account_circle</v-icon>
          </v-avatar>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebar: false
    }
  },
  computed: {
    appTitle() {
      return this.$store.state.appTitle
    },
    isAuthenticated() {
      return (
        this.$store.getters.getUser.uid !== null &&
        this.$store.getters.getUser.uid !== undefined
      )
    },
    menuItems() {
      return this.isAuthenticated
        ? [
            { title: 'Home', path: '/home', icon: 'home' },
            {
              title: 'Calculator',
              path: '/calculator',
              icon: 'mdi-calculator'
            },
            { title: 'About', path: '/about', icon: 'info' }
          ]
        : [
            { title: 'Sign Up', path: '/signup', icon: 'face' },
            { title: 'Sign In', path: '/signin', icon: 'lock_open' }
          ]
    }
  },
  methods: {
    userSignOut() {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>

<style>
</style>
