<template>
  <div>
    <h2 class="text-lg font-bold">{{ title }}</h2>
    <form @submit.prevent="formFunction(login)">
      <div :class="{ 'form-group--error': $v.login.username.$anyError }">
        <label class="hover:text-red-600">Username:</label>
        <input
          class="border ring ring-blue border-gray-700 mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent;"
          type="text"
          name="username"
          v-model.trim="login.username"
          @input="$v.login.username.$touch"
        />
      </div>
      <div class="error" v-show="!$v.login.username.required">
        Field is required
      </div>
      <div :class="{ 'form-group--error': $v.login.password.$anyError }">
        <label>Password:</label>
        <input
          class="border border-black mt-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent;"
          type="password"
          v-model.trim="login.password"
          @input="$v.login.password.$touch"
        />
      </div>
      <div
        class="error"
        v-show="!$v.login.password.minLength && title == 'Register'"
      >
        Name must have at least
        {{ $v.login.password.$params.minLength.min }} letters.
      </div>
      <div>
        <button
          class="px-5 border mt-2 rounded-lg py-1 transition-colors duration-500"
          type="submit"
          :disabled="$v.$invalid"
          :class="
            $v.$invalid
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-transparent text-black'
          "
        >
          {{ title }}
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { required, minLength } from "vuelidate/lib/validators";

export default {
  props: ["title", "formFunction"],
  data() {
    return {
      login: {
        username: null,
        password: null,
      },
    };
  },
  mounted() {
    if (this.title == "login") this.$v.login.password.minLength = true;
  },
  validations: {
    login: {
      username: {
        required,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },
};
</script>

<style lang="scss" scoped>
// input {
//   @apply border border-black mt-2 rounded-lg;
// }
.error {
  @apply hidden;
}
.form-group--error + .error {
  @apply block text-red-600 text-sm;
}
// input {
//   @apply focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent;
// }
</style>