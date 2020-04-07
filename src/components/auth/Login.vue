<template>
  <div class="form-group">
    <form action="#" @submit.prevent="login">

      <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>
      <div v-if="serverError" class="alert alert-danger" role="alert">Error !! {{ serverError.error }}</div>

      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email">
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password">
      </div>

      <button type="submit" class="btn btn-outline-primary btn-lg btn-block">
        Login
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  props: {
    dataSuccessMessage: {
      type: String,
    }
  },
  data() {
    return {
      email: '',
      password: '',
      serverError: '',
      successMessage: this.dataSuccessMessage,
    }
  },
  methods: {
    login() {
      this.loading = true
      this.$store.dispatch('getToken', {
        email: this.email,
        password: this.password,
      })
        .then(response => {
          this.$router.push({ name: 'task' })
        })
        .catch(error => {
          this.serverError = error.response.data
          this.password = ''
          this.successMessage = ''
        })
    }
  }
}
</script>

