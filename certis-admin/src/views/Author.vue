<template>
  <div>
    <Author v-if="login" />
    <v-container v-else>
      <v-card width="100%" align="center">
        <v-app-bar dark color="warning" class="d-flex justify-center">
          <h1 class="text-center">Bạn Không Có Quyền Truy Cập Trang Web Này</h1>
        </v-app-bar>
        <v-img width="80%" class="mt-4" src="https://cdnstepup.r.worldssl.net/wp-content/uploads/2020/09/tu-vung-tieng-anh-ve-phuong-tien-giao-thong-3.jpg" alt=""></v-img>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Author from "../components/Author.vue";
import { contract } from "../web3";
export default {
  name: "Home",

  components: {
    Author,
  },
  data: () => {
    return {
      login: false,
    };
  },
  mounted() {
    window.ethereum
      .request({
        method: "eth_requestAccounts",
      })
      .then(async (data) => {
        this.$store.state.address = data[0];
        this.login = await contract.methods
          .authorLogin()
          .call({ from: data[0] });
      });
  },
};
</script>
