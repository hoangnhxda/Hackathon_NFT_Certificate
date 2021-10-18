<template>
  <div>
    <Admin v-if="login" />
    <v-container v-else>
      <v-card width="100%" align="center">
        <v-app-bar dark color="warning" class="d-flex justify-center">
          <h1 class="text-center">Bạn Không Có Quyền Truy Cập Trang Web Này</h1>
        </v-app-bar>
        <v-img
          width="80%"
          class="mt-4"
          src="https://cdnstepup.r.worldssl.net/wp-content/uploads/2020/09/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-3.jpg"
          alt=""
        ></v-img>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Admin from "../components/Admin.vue";
//import {contract} from '../web3.js';
export default {
  components: {
    Admin,
  },
  data: () => {
    return {};
  },
  mounted() {},
  computed: {
    login() {
      return (
        this.$store.state.address ==
        "0xb54aad7b14022d96e26566149fffbd6c067d2e39"
      );
    },
  },
};
</script>
