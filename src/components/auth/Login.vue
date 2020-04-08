<template>
  <div class="tasks-container">
    <form action="#" @submit.prevent="login">

      <div v-if="successMessage" class="alert alert-success" role="alert">{{ successMessage }}</div>
      <div v-if="serverError" class="alert alert-danger" role="alert">Error !!
        <div v-for="(value, key) in serverError" :key="key">
          {{ value[0] }}
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email address</label>
        <input type="email" class="form-control" id="email" v-model="email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" v-model="password" required>
      </div>

      <button type="submit" class="btn btn-outline-primary">
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
          this.serverError = Object.values(error.response.data.error)
          this.password = ''
          this.successMessage = ''
        })
    }
  }
}
</script>
<style lang="scss">
.tasks-container {
  margin-top: 10px;
  margin-right: auto;
  margin-left: auto; 
  width: 50%;
}
</style>

