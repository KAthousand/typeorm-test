<template>
  <div class='login-container'>
    <div class='login-content'>
      <h1>Login</h1>
      <br />
      <form
        @submit.prevent="handleLogin()"
        id="form"
      >
        <label>
          Username:<br/>
          <input
            v-model="username"
            type='text'
            name='username'
            class='username'
          />
        </label>
        <label>
          Password:<br/>
          <input
            v-model="passwordHash"
            type='password'
            name='passwordHash'
            class='passwordHash'
          />
        </label>
        <hr/>
        <button>Login</button>
        <p>Don't have an account? <router-link to='/register'>Register here.</router-link></p>
      </form>
    </div>
  </div>
</template>

<script>
import {loginUser} from '../../services/auth'
export default {
  name: 'Login',
  data(){
    return {
        username: '',
        passwordHash: ''
      }
  },
  methods: {
      async handleLogin(formData) {
      try {
        const currentUser = await loginUser({username: this.username, passwordHash: this.passwordHash});
        this.$router.push('/');
      } catch (error) {
        console.log(`Error in handleLogin, ${error}`)
      }
      // try {
      //   const formData = new FormData()
      //   formData.append('username', this.username)
      //   formData.append('passwordHash', this.passwordHash)
      //   await console.log({...formData})
      // } catch (error) {
      //   console.log(`Error in handleLogin, ${error}`)
      // }
    }
  }
}
</script>

<style>

</style>