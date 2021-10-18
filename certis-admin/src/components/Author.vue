<template>
  <v-container fluid class="mt-3">
    <v-row>
      <v-col cols="4">
        <v-card>
          <v-app-bar dark color="primary">
            <h2>Thông tin tài khoản</h2>
          </v-app-bar>
          <v-card-text>
            <v-container>
              <v-row class="mb-3">
                <v-col align="center" cols="4">
                  <v-avatar class="mb-4" size="80" color="primary">
                    <img :src="author.avtUrl" />
                  </v-avatar>
                  <h3>{{ author.name }}</h3>
                </v-col>
                <v-divider vertical></v-divider>
                <v-col cols="8" class="d-flex flex-column justify-center">
                  <h4>
                    Địa Chỉ:
                    <span class="address">{{ author.authorAddress }}</span>
                  </h4>
                  <h4>Email: {{ author.email }}</h4>
                  <h4>Mô tả: </h4>
                  <span class="text-caption"> {{ author.about }}</span>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-3">
                <v-col>
                  <v-dialog
                    transition="dialog-bottom-transition"
                    max-width="600"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" v-bind="attrs" v-on="on"
                        >Cập Nhật Thông Tin</v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="primary" dark
                          ><h2>Cập Nhật Thông Tin</h2></v-toolbar
                        >
                        <v-card-text>
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="authorName"
                                  label="Tên cơ sở"
                                  clearable
                                ></v-text-field>
                              </v-col>
                              <v-col cols="8">
                                <v-text-field
                                  v-model="avtUrl"
                                  label="Link Logo"
                                  clearable
                                ></v-text-field>
                              </v-col>
                              <v-col cols="4">
                                <v-avatar size="120" color="white">
                                  <img :src="avtUrl" />
                                </v-avatar>
                              </v-col>
                              <v-col cols="12"
                                ><v-text-field
                                  v-model="email"
                                  label="Email"
                                  clearable
                                ></v-text-field
                              ></v-col>
                              <v-col cols="12"
                                ><v-text-field
                                  v-model="about"
                                  label="Mô tả"
                                  clearable
                                ></v-text-field
                              ></v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn
                            color="info"
                            text
                            @click="
                              {
                                changeInfo(authorName, avtUrl, about, email);
                                dialog.value = false;
                              }
                            "
                            >Cập Nhật</v-btn
                          >
                          <v-btn
                            color="error"
                            text
                            @click="dialog.value = false"
                            >Đóng</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>

                <v-col cols="auto">
                  <v-dialog transition="dialog-top-transition" max-width="600">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn color="primary" v-bind="attrs" v-on="on"
                        >Thêm Chứng Nhận</v-btn
                      >
                    </template>
                    <template v-slot:default="dialog">
                      <v-card>
                        <v-toolbar color="primary" dark
                          ><h2>Thêm Chứng Nhận</h2></v-toolbar
                        >
                        <v-card-text>
                          <v-container fluid>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="name"
                                  label="Tên Chứng Nhận"
                                  clearable
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-textarea
                                  
                                  label="Nội Dung Chứng Nhận"
                                  v-model="content"
                                  
                                ></v-textarea>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="person"
                                  label="Người Nhận"
                                  clearable
                                ></v-text-field>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-card-text>
                        <v-card-actions class="justify-end">
                          <v-btn
                            color="primary"
                            text
                            @click="
                              {
                                addCer(name, content, person);
                                dialog.value = false;
                              }
                            "
                            >Ký Chứng Nhận</v-btn
                          >
                          <v-btn
                            color="error"
                            text
                            @click="dialog.value = false"
                            >Đóng</v-btn
                          >
                        </v-card-actions>
                      </v-card>
                    </template>
                  </v-dialog>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="8">
        <v-card>
          <v-app-bar color="primary" dark>
            <h3>Danh Sách Chứng Nhận Đã Cấp</h3>
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-app-bar>
          <v-data-table
            :headers="headers"
            :items="cerList"
            :search="search"
            height="450"
          >
            <template v-slot:item.date="{ item }">
              {{ time(item.date) }}
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
                              <img :src="'http://api.qrserver.com/v1/create-qr-code/?data='+contentHash(item.name, item.content, item.person)+'&size=150x150'"/>
                            </span>
                          </v-col>
                          <v-divider vertical></v-divider>
                          <v-col cols="6" align="center">
                            <h3 class="mt-2">Chữ Ký</h3>
                            <img :src="'http://api.qrserver.com/v1/create-qr-code/?data='+item.signature+'&size=150x150'"/>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                  </v-card>
                </template>
              </v-dialog>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { web3, contract } from "../web3.js";
export default {
  data() {
    return {
      headers: [
        { text: "Chứng Nhận", value: "name" },
        { text: "Người Nhận", value: "person" },
        { text: "Thời Điểm Cấp", value: "date" },
        { text: "Chi Tiết", value: "action" },
      ],
      author: {},
      authorName: "",
      avtUrl: "",
      email: "",
      about: "",
      cerList: [],
      search: "",
    };
  },
  methods: {
    contentHash(name, content, person) {
      return web3.utils.sha3(name + content + person);
    },
    changeInfo(name, avtUrl, about, email) {
      contract.methods
        .changeAuthorInfo(name, avtUrl, about, email)
        .send({ from: this.$store.state.address })
        .on("receipt", () => {
          contract.methods
            .getAuthor()
            .call({ from: this.$store.state.address })
            .then((data) => {
              this.author = data;
              this.authorName = data.name;
              this.email = data.email;
              this.about = data.about;
              this.avtUrl = data.avtUrl;
              this.cerList = data.cers;
            });
        });
    },
    addCer(name, content, person) {
      let sig = name + content + person;
      let mess = web3.utils.sha3(sig);
      console.log(sig);
      web3.eth.sign(mess, this.$store.state.address, (error, result) => {
        contract.methods
          .addCer(name, content, person, result)
          .send({ from: this.$store.state.address })
          .on("receipt", () => {
            contract.methods
              .getAuthor()
              .call({ from: this.$store.state.address })
              .then((data) => {
                this.author = data;
                this.authorName = data.name;
                this.email = data.email;
                this.about = data.about;
                this.avtUrl = data.avtUrl;
                this.cerList = data.cers;
              });
          });
        console.log(error, result);
      });
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
  created() {
    contract.methods
      .getAuthor()
      .call({ from: this.$store.state.address })
      .then((data) => {
        this.author = data;
        this.authorName = data.name;
        this.email = data.email;
        this.about = data.about;
        this.avtUrl = data.avtUrl;
        this.cerList = data.cers;
      });
    contract.events
      .authorData({}, (error, result) => {
        console.log(error, result);
      })
      .on("changed", function() {
        contract.methods
          .getAuthor()
          .call({ from: this.$store.state.address })
          .then((data) => {
            this.author = data;
            this.authorName = data.name;
            this.email = data.email;
            this.about = data.about;
            this.avtUrl = data.avtUrl;
            this.cerList = data.cers;
          });
      });
  },
};
</script>

<style scoped>
.address {
  font-size: 9px;
  font-weight: 300;
}
</style>
