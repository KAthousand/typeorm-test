<template>
  <div id="app">
    <Nav/>
      <router-view/>
  </div>
</template>

<script>
import Vue from 'vue';
import Nav from './components/Nav/Nav.vue';
import {registerUser, verifyUser} from './services/auth';
export default Vue.extend({
  name: 'App',
  components: {Nav},
  store,
  created: function () {
    this.handleVerify();
  },
  data() {
    return {
      currentUser: null
    }
  },
  methods: {
    handleVerify: async () => {
      try {
        const currentUser = await verifyUser()
        setCurrentUser(currentUser)
      } catch (error) {
        console.log(`Error in handleVerify, ${error}`)
      }
    },
    handleRegister: async (formData) => {
      try {
        const currentUser = await registerUser(formData);
        setCurrentUser(currentUser);
        this.$router.push('/');
      } catch (error) {
        console.log(`Error in handleRegister, ${error}`);
      }
    } 
  }
})

const store = {
  state: {
    currentUser: this.currentUser
  },
  setCurrentUser (newValue) {
    this.state.currentUser = newValue
  },
  clearCurrentUser () {
    this.state.currentUser = null
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
