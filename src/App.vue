
<template>
  <v-app>
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
      <span class="hidden-sm-and-up">
        <v-toolbar-side-icon @click="sidebar = !sidebar"></v-toolbar-side-icon>
      </span>
      <v-toolbar-title v-if="!isAuthenticated">
        <router-link to="/" tag="span" style="cursor: pointer"><v-icon>mdi-cards</v-icon> {{ appTitle }}</router-link>
      </v-toolbar-title>
      <v-toolbar-title v-else>
        <router-link to="/home" tag="span" style="cursor: pointer"><v-icon>mdi-cards</v-icon> {{ appTitle }}</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn flat v-for="item in menuItems" :key="item.title" :to="item.path">
          <v-icon left dark>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
        <v-btn flat @click="userSignOut" v-if="isAuthenticated">
          <v-icon left>exit_to_app</v-icon>Sign Out
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
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
        this.$store.getters.getUser !== null &&
        this.$store.getters.getUser !== undefined
      )
    },
    menuItems() {
      return this.isAuthenticated
        ? [
            { title: 'Home', path: '/home', icon: 'home' },
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
