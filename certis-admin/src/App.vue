<template>
  <v-app>

    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-avatar
          size="50"
          color="primary"
        >
          <img src="./assets/logo.png">
        </v-avatar>

        <h1 class="ml-2">Trang Quản Trị</h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://liam-parry.github.io/certis"
        target="_blank"
        text
      >
        <span class="mr-2">Quay lại trang tra cứu</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
      
    </v-main>
  </v-app>
  
</template>

<script>

//import {web3} from './we'
export default {
  name: 'App',
  components:{
  
  },
  data: () => ({
    //
  }),
  created() {
    window.ethereum.request({
      method: "eth_requestAccounts",
    }).then((data)=>{
      this.$store.state.address = data[0];
      
    });

  },
  computed:{
    login(){
      return this.$store.state.address=='0xb54aad7b14022d96e26566149fffbd6c067d2e39'
    }
  }
};
</script>
