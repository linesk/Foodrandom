<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign In</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <form @submit.prevent="userSignIn">
          <v-flex>
            <v-alert
              error
              dismissible
              icon="warning"
              transition="scale-transition"
              outline
              v-model="alert"
            >{{ error }}</v-alert>
          </v-flex>
          <v-layout column>
            <v-flex>
              <v-text-field
                name="email"
                label="Email"
                id="email"
                type="email"
                v-model="email"
                required
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="password"
                label="Password"
                id="password"
                type="password"
                v-model="password"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-5>
              <v-btn color="primary" type="submit" :disabled="loading">Sign In</v-btn>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      alert: false
    }
  },
  computed: {
    error() {
      return this.$store.getters.getError
    },
    loading() {
      return this.$store.getters.getLoading
    }
  },
  watch: {
    error(value) {
      if (value) {
        this.alert = true
      }
    },
    alert(value) {
      if (!value) {
        this.$store.dispatch('setError', null)
      }
    }
  },
  methods: {
    userSignIn() {
      this.$store.dispatch('userSignIn', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
