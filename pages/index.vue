<template>
  <div class="text-center">
    <h1>Homepage</h1>
    <UserForm title="Register" :formFunction="registerSumbit" />
  </div>
</template>

<script>
export default {
  methods: {
    async registerSumbit(login) {
      try {
        await this.$axios.$post("api/register", { data: login }).then((res) => {
          if (res.status == "success")
            this.$toast.success(res.message, { duration: 1000 });
          else this.$toast.error(res.message, { duration: 1000 });
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
</style>
