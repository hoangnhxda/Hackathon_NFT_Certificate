<template>
  <v-container fluid class="d-flex justify-center mt-3">
    <v-row>
      <v-col cols="4">
        <v-card width="100%">
          <v-app-bar dark color="primary">
            <h2>Thêm Cơ Sở Cấp Chứng Nhận</h2>
          </v-app-bar>
          <v-card-text>
            <v-text-field label="Tên cơ sở" v-model="name"></v-text-field>
            <v-text-field label="Địa chỉ ví" v-model="address"></v-text-field>
          </v-card-text>
          <v-card-actions class="d-flex justify-center">
            <v-btn color="primary" @click="addAuthor(name, address)"
              >Xác Nhận Thêm Cơ Sở</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-simple-table fixed-header height="600px">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left"></th>
                <th class="text-left">
                  Tên cơ sở
                </th>
                <th class="text-left">
                  Địa chỉ ví
                </th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in authors" :key="item.name">
                <td>
                  <v-avatar size="40" color="warning">
                    <img :src="item.avtUrl"/>
                  </v-avatar>
                </td>
                <td>{{ item.name }}</td>
                <td>{{ item.authorAddress }}</td>
                <td>
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="800"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="info" v-bind="attrs" icon v-on="on"
                        ><v-icon @click="see(item)"
                          >mdi-information</v-icon
                        ></v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="primary" dark
                          ><h2>Thông tin chi tiết</h2></v-toolbar
                        >
                        <v-card-text>
                          <v-container class="mt-12">
                            <v-row>
                              <v-col align="center" cols="4">
                                <v-avatar class="mb-4" size="120" color="primary">
                                  <img :src="view.avtUrl" />
                                </v-avatar>
                                <h2>{{ view.name }}</h2>
                              </v-col>
                              <v-divider vertical></v-divider>
                              <v-col cols='8' class='d-flex flex-column justify-center'>
                                <h3>Địa Chỉ: {{view.authorAddress}}</h3>
                                <h3>Email: {{view.email}}</h3>
                                <h3>Mô tả: {{view.about}}</h3>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn text @click="dialog.value = false">Đóng</v-btn>
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { contract } from "../web3.js";
export default {
  data() {
    return {
      name: "",
      address: "",
      authors: ["hello"],
      view: null,
      dialog: false,
    };
  },
  methods: {
    addAuthor(name, address) {
      contract.methods
        .addAuthor(name, address)
        .send({ from: this.$store.state.address })
        .on("receipt", () => {
          contract.methods
            .getAllAuthor()
            .call()
            .then((data) => {
              let arr = [];
              for (const address of data) {
                contract.methods
                  .Authors(address)
                  .call()
                  .then((data) => {
                    arr.unshift(data);
                  });
              }
              this.authors = arr;
            });
        });
    },

    see(item) {
      this.view = item;
      this.dialog = true;
    },
  },
  mounted() {
    contract.methods
      .getAllAuthor()
      .call()
      .then((data) => {
        let arr = [];
        for (const address of data) {
          contract.methods
            .Authors(address)
            .call()
            .then((data) => {
              arr.unshift(data);
            });
        }

        this.authors = arr;
      });

    contract.events.authorData().on("data", () => {
      contract.methods
        .getAllAuthor()
        .call()
        .then((data) => {
          let arr = [];
          for (const address of data) {
            contract.methods
              .Authors(address)
              .call()
              .then((data) => {
                arr.unshift(data);
              });
          }

          this.authors = arr;
        });
    });
  },
};
</script>

<style lang="scss" scoped></style>
