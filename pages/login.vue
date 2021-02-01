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
      //   username: "",
      //   password: "",
    };
  },
  methods: {
    // async loginSumbit() {
    //   await this.$axios.$post("/api/login", {
    //     username: this.username,
    //     password: this.password,
    //   });
    // },
    async loginSumbit() {
      try {
        let response = await this.$auth.loginWith("local", {
          data: this.login,
        });
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>