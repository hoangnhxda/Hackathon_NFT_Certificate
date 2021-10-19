<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      
    >
      <v-tabs>
        <v-tab to="/">Search</v-tab>
        <v-tab to="/user">User</v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data: () => ({

  }),
  mounted() {
    

    
  },

  methods: {
    
  },
};
</script>
