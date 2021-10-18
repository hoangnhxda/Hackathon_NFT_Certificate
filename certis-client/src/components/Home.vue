<template>
  <v-data-table
    :headers="headers"
    :items="certis"
    :search="search"
    height="400"
  >
    <template v-slot:item.date="{ item }">
      {{ time(item.date) }}
    </template>
    <template v-slot:item.person="{ item }">
      <v-tooltip dark color="info" right>
      <template v-slot:activator="{ on, attrs }">
        <span
          @click="cop(item.person)"
          v-bind="attrs"
          v-on="on"
        >{{(item.person.slice(0,5)+"..."+item.person.slice(-5))}}</span>
      </template>
      <span>Click to copy: {{item.person}}</span>
    </v-tooltip>
    </template>
    <template v-slot:item.action="{ item }">
      <v-dialog transition="dialog-bottom-transition" max-width="600">
        <template v-slot:activator="{ on, attrs }">
          <v-btn color="primary" icon v-bind="attrs" v-on="on">
            <v-icon>mdi-information</v-icon>
          </v-btn>
        </template>
        <template v-slot:default>
          <v-card>
            <v-toolbar color="primary" dark
              ><h2>Thông tin chi tiết</h2></v-toolbar
            >
            <v-card-text class="mt-3">
              <v-container fluid>
                <v-row>
                  <v-col cols="12"
                    ><h1 align="center">{{ item.name }}</h1>
                  </v-col>
                  <v-col cols="12"
                    ><h3 class="px-8" align="center">
                      {{ item.content }}
                    </h3>
                  </v-col>
                  <v-col cols="6">
                    <h3>From: {{ item.author }}</h3>
                    <h3>
                      To: <span class="address">{{ item.person }}</span>
                    </h3>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="6" align="center">
                    <h4 align="center">{{ time(item.date) }}</h4>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6" align="center">
                    <h4 align="center" class="mt-2">Mã Băm Nội Dung</h4>
                    <span align="center">
                      <img :src="'http://api.qrserver.com/v1/create-qr-code/?data=' +contentHash(item.name, item.content, item.person) +'&size=150x150'"/>
                    </span>
                  </v-col>
                  <v-divider vertical></v-divider>
                  <v-col cols="6" align="center">
                    <h3 class="mt-2">Chữ Ký</h3>
                    <img :src="'http://api.qrserver.com/v1/create-qr-code/?data=' +item.signature +'&size=150x150'"/>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
          </v-card>
        </template>
      </v-dialog>
    </template>
  </v-data-table>
</template>

<script>
import {web3, contract } from "../web3/web3";
export default {
  data: () => ({
    certis: [],
    search: "",
      headers: [
        { text: "Chứng Nhận", value: "name" },
        { text: "Người Nhận", value: "person" },
        { text: "Thời Điểm Cấp", value: "date" },
        { text: "Chi Tiết", value: "action" },
      ],
  }),
  created() {
    contract.methods
      .getAll()
      .call()
      .then((data) => {
        for (const item of data) {
          this.certis.unshift(item);
        }
      });
  },
  methods: {
    cop(item) {
      window.navigator.clipboard.writeText(item);
    },
    contentHash(name, content, person) {
      return web3.utils.sha3(name + content + person);
    },
    time(stamp) {
      var m = new Date(stamp * 1000);
      return (
        m.getUTCFullYear() +
        "/" +
        (m.getUTCMonth() + 1) +
        "/" +
        m.getUTCDate() +
        " " +
        m.getUTCHours() +
        ":" +
        m.getUTCMinutes() +
        ":" +
        m.getUTCSeconds()
      );
    },
  },
};
</script>
