<template>
  <div>
    <h1>test</h1>
    <button @click="logout">logout</button>
  </div>
</template>
<script>
export default {
  middleware: "auth",
  methods: {
    async logout() {
      await this.$auth.logout("local").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>