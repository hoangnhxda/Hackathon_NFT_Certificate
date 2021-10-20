<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="items"
      class="elevation-1"
      loading="true"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
            class="mr-5"
          ></v-text-field>

          <v-dialog
            v-model="dialog"
            max-width="500px"
            transition="dialog-transition"
            persistent
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark v-bind="attrs" v-on="on">
                Add Certificate
              </v-btn>
            </template>
            <v-card>
              <v-app-bar dark color="primary">
                <h3>Add Certificate</h3>
              </v-app-bar>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col>
                      <v-text-field
                        placeholder="Title"
                        label="Certificate Title"
                        v-model="title"
                        color="primary"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="8">
                      <v-img
                        size="60"
                        :src="
                          viewImage ||
                            'https://source.unsplash.com/random/800x600/'
                        "
                      ></v-img>
                    </v-col>
                    <v-col cols="4">
                      <v-file-input
                        accept="image/*"
                        label="File input"
                        v-model="file"
                        @change="uploadImg(file)"
                      ></v-file-input>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="red darken-1"
                  text
                  @click="
                    () => {
                      file = null;
                      title = '';
                      viewImage = null;
                      dialog = false;
                    }
                  "
                >
                  Close
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="uploadCert(file, title)"
                >
                  Upload
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn icon color="primary" dark @click="show(item)">
          <v-icon dark>mdi-eye</v-icon>
        </v-btn>
      </template>
    </v-data-table>
    <v-dialog v-model="dialogShow" max-width="500px">
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
import { contract } from "../web3";
//import { NFTStorage, File } from "nft.storage";
/* const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJEYTU1QmZlNjVBYkI2NjZiZkY2NjgxYmE0ZWY1NTM2ODdjNmIwYjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDU3NDYxMTM4NiwibmFtZSI6IkNlcnQifQ.6YOAUWGWF9OIY2iF-buoTDuN0NwQ9pE5Ajm1573VxjU";
const client = new NFTStorage({ token: apiKey }); */
export default {
  data: () => ({
    address: "",
    file: null,
    viewImage: null,
    title: "",
    dialog: false,
    dialogShow: false,
    search: "",
    cert: {},
    headers: [
      { text: "Title", value: "title" },
      { text: "Time", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
  }),
  beforeMount() {
    if(!window.ethereum) {
      alert("Metamask??");
      this.$router.push('/')
    }
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((acc) => {
        this.address = acc[0];
        console.log(this.address)
        contract.methods
          .getCerts()
          .call()
          .then((data) => {
            this.items=data.filter(cert => cert[0].toUpperCase()==this.address.toUpperCase())
          });
      })
      

    contract.events.dataChange().on("data", () => {
      contract.methods
        .getCerts()
        .call()
        .then((data) => {
          this.items = data.filter(cert => cert[0].toUpperCase()==this.address.toUpperCase());
        });
    });
  },
  methods: {
    show(item) {
      this.cert = item;
      this.dialogShow = true;
    },
    uploadImg(file) {
      this.viewImage = URL.createObjectURL(file);
    },
    uploadCert(file, title) {
      if (!file && title == "") {
        alert("Thiếu thông tin");
      } else if (this.address != "") {
        
        //chỗ này sẽ chạy cái function upload ảnh lên nơi lưu trữ, func này cần trả về url của ảnh

        let imageUrl = "https://source.unsplash.com/random/800x600/"; //lấy ngẫu nhiên cái ảnh nào đó trên mạng. sẽ thay bằng cái url được return của func trên

        contract.methods
          .addCert(imageUrl, title)
          .send({ from: this.address })
          .then(() => {
            alert("Upload Thành Công");
          });

        this.file = null;
        this.title = "";
        this.viewImage = null;
        this.dialog = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
