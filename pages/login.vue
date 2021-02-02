<template>
  <div>
    <form @submit.prevent="loginSumbit">
      <div>
        <label>Username:</label>
        <input type="text" name="username" v-model="login.username" />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" v-model="login.password" />
      </div>
      <div>
        <input type="submit" value="Log In" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async loginSumbit() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
          headers: { "Content-Type": "application/json" },
        });
        console.log(response.data);
        console.log(this.$auth.user);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>