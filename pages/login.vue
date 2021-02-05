<template>
  <div>
    <form v-if="!$auth.user" @submit.prevent="loginSumbit">
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
    <div v-else>Loggin</div>
    {{ $auth.loggedIn }}
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
  computed: {
    isLogin() {
      return this.$auth.user;
    },
  },
  methods: {
    async loginSumbit() {
      try {
        await this.$auth
          .loginWith("local", {
            data: this.login,
          })
          .then(() => this.$toast.success("success", { duration: 500 }));
        this.$router.push("/testing");
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>