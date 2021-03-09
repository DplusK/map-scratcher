<template>
  <div class="min-h-screen w-screen flex items-center justify-center">
    <div class="container">
      <UserForm title="Login" :formFunction="loginSumbit" class="text-center" />
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    async loginSumbit(login) {
      try {
        await this.$auth
          .loginWith("local", {
            data: login,
          })
          .then(() => this.$toast.success("success", { duration: 1000 }));
        this.$router.push("/testing");
      } catch (err) {
        if (err.response.status === 403) {
          this.$toast.error("Login Fail, Please try again", { duration: 1000 });
        }
        console.log(err);
      }
    },
  },
};
</script>