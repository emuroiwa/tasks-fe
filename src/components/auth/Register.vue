<template>
  <div class="form-group">
    <form action="#" @submit.prevent="register">

      <!-- <div v-if="successMessage" class="success-message">{{ successMessage }}</div> -->

      <div v-if="serverErrors" class="server-error">
        <div v-for="(value, key) in serverErrors" :key="key">
          {{ value[0] }}
        </div>

      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input type="text" name="name" id="name" class="form-control"  v-model="name" required>
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" class="form-control"  v-model="email" required >
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" name="password" id="password" class="form-control"  v-model="password" required>
      </div>

      <div class="form-group">
        <label for="c_password">Confirm Password</label>
        <input type="password" name="password" id="c_password"  class="form-control"  v-model="c_password" required>
      </div>
      <button type="submit"  class="btn btn-outline-primary btn-lg btn-block">Create Account</button>

    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      c_password: '',
      serverErrors: '',
      successMessage: '',
    }
  },
  methods: {

    register() {
      this.$store.dispatch('register', {
        name: this.name,
        email: this.email,
        password: this.password,
        c_password: this.c_password,
      })
        .then(response => {
          this.successMessage = 'Registered Successfully!'
          this.$router.push({ name: 'login', params: { dataSuccessMessage: this.successMessage } })
        })
        .catch(error => {
          this.serverErrors = Object.values(error.response.data.errors)
        })
    }
  }
}
</script>
