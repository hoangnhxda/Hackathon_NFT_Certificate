<template>
  <v-app>
    <v-app-bar color="primary" dark app>
      <v-img max-width="60" src="./assets/Logo.png"></v-img>
      <v-tabs align-with-title>
        <v-tab to="/">Trang Tra Cứu</v-tab>
        <v-tab href="https://google.com">Kiểm Tra Chữ Ký</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <v-container class="px-14 py-7" fluid>
        <v-row>
          <v-col cols="8">
            <router-view></router-view>
          </v-col>
          <v-col cols="4">
            <Profile class="main" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Profile from "./components/miniProfile.vue";
export default {
  components: {
    Profile,
  },
  data: () => {
    return {
      menu: false,
    };
  },
  created() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then((data) => {
        this.$store.state.address = data[0];
      });
  },
};
</script>

<style scoped>
.main {
  position: fixed;
}
</style>
