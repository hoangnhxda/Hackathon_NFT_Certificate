<template>
  <v-container>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      loading="true"
      :search="search"
    >
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="primary" dark @click="show(item)">
          <v-icon dark>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" max-width="500px">
      <v-card>
        <v-app-bar dark color="primary">
          <h3>{{ cert.title }}</h3>
        </v-app-bar>
        <v-card-text>
          <v-container>
            <v-img size="50" :src="cert.tokenUrl"></v-img>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import {contract} from "../web3"
export default {
  name: "Home",
  data: () => ({
    cert:{},
    dialog: false,
    headers: [
      { text: "User Address", value: "userAddress" },
      { text: "Title", value: "title" },
      { text: "Time", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
      {
        userAddress: "test address",
        title: "Test Cert",
        date: 132156165,
        tokenUrl: "https://picsum.photos/1000",
      },
    ],
    search: "",
  }),
  methods: {
    show(item){
      this.cert=item
      this.dialog=true;
    }
  },
  beforeMount() {
    contract.methods.getCerts().call().then((data)=>{this.items=data})

    contract.events.dataChange().on('data',()=>{
      contract.methods.getCerts().call().then((data)=>{this.items=data})
    })
  },
};
</script>
