<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Sign Up</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <v-layout column>
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
          <form @submit.prevent="userSignUp">
            <v-flex>
              <v-text-field
                name="firstname"
                label="First Name"
                id="firstname"
                type="text"
                v-model.trim="firstname"
              ></v-text-field>
            </v-flex>
            <v-flex>
              <v-text-field
                name="lastname"
                label="Last Name"
                id="lastname"
                type="text"
                v-model.trim="lastname"
              ></v-text-field>
            </v-flex>
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
            <v-flex>
              <v-text-field
                name="confirmPassword"
                label="Confirm Password"
                id="confirmPassword"
                type="password"
                v-model="passwordConfirm"
                :rules="[comparePasswords]"
                required
              ></v-text-field>
            </v-flex>
            <v-flex class="text-xs-center" mt-2>
              <v-btn color="primary" type="submit" :disabled="loading">Sign Up</v-btn>
            </v-flex>
          </form>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      passwordConfirm: '',
      alert: false
    }
  },
  methods: {
    userSignUp() {
      if (this.comparePasswords !== true) {
        return
      }
      this.$store.dispatch('userSignUp', {
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        password: this.password
      })
    }
  },
  computed: {
    comparePasswords() {
      return this.password === this.passwordConfirm
        ? true
        : "Password and confirm password don't match"
    },
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
  }
}
</script>
