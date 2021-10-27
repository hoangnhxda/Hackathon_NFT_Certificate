<template>
  <v-container>

     <UploadImages accept="image/*"
                        label="File input"
                        v-model="file" 
                        @change="console.log(file)"/>
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
      </v-col>
      <v-col cols="4">
        <v-card>
          <v-app-bar color="primary" dense dark>
            <h3>Profile</h3>
          </v-app-bar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="4">
                  <v-avatar size="70" color="primary">
                    <img src="https://i.pravatar.cc/150?img=3" alt="AVT" />
                  </v-avatar>
                </v-col>
                <v-col cols="8">
                  <h3>Name</h3>
                  <p class="address">{{ address }}</p>
                </v-col>
              </v-row>
              <v-divider></v-divider>
              <v-row class="mt-1 px-2">
                <v-col cols="3">
                  <h4>Email</h4>
                  <h4>Phone</h4>
                  <h4>Location</h4>
                </v-col>
                <v-col cols="9">
                  <h4>: email@email.email</h4>
                  <h4>: 0123456789</h4>
                  <h4>: Innsbruck, Austria</h4>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-dialog v-model="update" width="500">
              <template v-slot:activator="{ on, attrs }">
                <v-btn text color="primary" v-bind="attrs" v-on="on">
                  Update
                </v-btn>
              </template>
              <v-card>
                <v-app-bar dark dense color="primary">
                  <h2>Update</h2>
                </v-app-bar>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col>
                        <h3 align="center">Avatar</h3>
                        <v-avatar
                          size="70"
                          color="primary"
                          align="center"
                        >
                          <img src="https://i.pravatar.cc/150?img=3" alt="alt">
                        </v-avatar>
                      </v-col>
                      <v-col>

                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary"> Update </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

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
import { web3, contract,checkmetamask,getUserCertificate } from "../web3";
 import UploadImages from "vue-upload-drop-images"
import {ipfs} from "../ipfs";
//import { NFTStorage, File } from "nft.storage";
/* const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJEYTU1QmZlNjVBYkI2NjZiZkY2NjgxYmE0ZWY1NTM2ODdjNmIwYjIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYzNDU3NDYxMTM4NiwibmFtZSI6IkNlcnQifQ.6YOAUWGWF9OIY2iF-buoTDuN0NwQ9pE5Ajm1573VxjU";
const client = new NFTStorage({ token: apiKey }); */
export default {
  data: () => ({
    update: false,
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

    checkmetamask();
    // Connect to MetaMask
    ethereum
      .request({ method: "eth_requestAccounts" })
      .then((acc) => {
        this.address = acc[0];
        console.log("Current Account: "+this.address);
      
       getUserCertificate(this.address).then((result) => console.log(result));  //return array of User Certificate
      })

    window.ethereum.on('accountsChanged',(acc)=>{
        this.address = acc[0];
        console.log("Current Account: "+this.address);
       getUserCertificate(this.address).then((result) => console.log(result));  //return array of User Certificate
    }) 

    ipfs("Name",'test1.jpg',"20/10/2021","Description");
  
  },
  components: {
                     UploadImages,
                 },
  methods: {
    handleImages(files){
        console.log("upload test: " + files);
    },
    show(item) {
      this.cert = item;
      this.dialogShow = true;
    },
    uploadImg(file) {
       var reader = new FileReader();
       reader.readAsDataURL(file);
       // var accounts = await web3.eth.getAccounts()
        
       reader.onload = () => {
        this.data = reader.result;
        console.log(web3.utils.sha3(this.data));
        var hash = web3.utils.sha3(this.data);
        var signature = web3.eth.personal.sign(hash, this.address);
        signature.then(function(result){
          console.log(result);
        });
      }
      // console.log(web3.utils.sha3("hjgsdgsk325235"));
      
      // this.viewImage = URL.createObjectURL(file);
      // const requestOptions = {
      //   method: "POST",
      //   headers: { "Content-Type": "multipart/form-data" },
      //   body: file
      // };
      // fetch("https://api.imgbb.com/1/upload", requestOptions)
      //   .then(response => response.json(
      //     console.log(response.json)
      //   ))
      //   .then(data => (
      //     console.log(data)));
      
    },
    uploadCert(file, title) {
      if (!file && title == "") {
        alert("Thiếu thông tin");
      } else if (this.address != "") {
        //chỗ này sẽ chạy cái function upload ảnh lên nơi lưu trữ, func này cần trả về url của ảnh

        let imageUrl = "https://source.unsplash.com/random/800x600/"; //lấy ngẫu nhiên cái ảnh nào đó trên mạng. sẽ thay bằng cái url được return của func trên

        // contract.methods
        //   .addCert(imageUrl, title)
        //   .send({ from: this.address })
        //   .then(() => {
        //     alert("Upload Thành Công");
        //   });

        this.file = null;
        this.title = "";
        this.viewImage = null;
        this.dialog = false;
      }
    },
  },
};


</script>

<style lang="css" scoped>
.address {
  font-weight: bold;
  font-size: 0.7rem;
}
</style>
