<template>
  <div>
      <h1>Dashboard</h1>

      <button @click="logout()">Logout</button>

  </div>
</template>

<script>
export default {
    methods:{
        logout(){
            localStorage.removeItem('access_token')
            localStorage.removeItem('loginStatus')
            this.$router.push('/login')
        }
    }
}
</script>

<style>

</style>