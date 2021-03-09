<template>
  <div class="min-h-screen w-screen flex items-center justify-center">
    <div class="container">
      <div>
        <h1>test</h1>
        <button @click="logout">logout</button>
      </div>
      <div class="flex mt-2">
        <div
          class="px-3 py-1 bg-gray-300 rounded-md w-max cursor-pointer hover:bg-teal-400 transition duration-200 mr-2"
          @click="start"
        >
          Start
        </div>
        <div
          class="px-3 py-1 bg-gray-300 rounded-md w-max cursor-pointer hover:bg-teal-400 transition duration-200"
          @click="stop"
        >
          Stop
        </div>
      </div>
      <div>
        {{ cordinateList }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // cordinateList: [],
      index: 0,
    };
  },
  computed: {
    cordinateList() {
      return this.$store.state.cordinateList;
    },
  },

  methods: {
    start() {
      navigator.geolocation.watchPosition(
        (data) => {
          this.$store.commit("add", [
            data.coords.longitude,
            data.coords.latitude,
          ]);
        },
        (error) => console.log(error),
        {
          enableHighAccuracy: true,
        }
      );
    },
    async stop() {
      await this.$axios
        .$post("/api/auth/data", this.cordinateList)
        .then((res) => {
          console.log(res);
        });
      // console.log(this.cordinateList);
    },
    async logout() {
      await this.$auth.logout("local").then(() => {
        this.$router.push("/");
      });
    },
  },
  middleware: "auth",
};
</script>