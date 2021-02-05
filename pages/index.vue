<template>
  <h1>Homepage</h1>
</template>

<script>
export default {
  mounted() {
    console.log(this.$auth.user);
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
