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
      { text: "Certificate Id", value: "userAddress" },
      { text: "Title", value: "title" },
      { text: "Time", value: "date" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    items: [],
    search: "",
  }),
  methods: {
    show(item){
      this.cert=item
      this.dialog=true;
    }
  }
  ,
  beforeCreate(){
    window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then(handleAccountsChanged)
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });
  },
  beforeMount() {

    getCertificate().then((data)=>{
      this.items=data;
      console.log('data: ',data);
    })
    
    
    console.log(getCertificate());

     console.log(contract.methods.getAllCer().call().then((data)=>{
       console.log(data)
     }));
  },
};


async function getCertificate() {
  //console.log("hello  ")
  var items = [];
  // Lay tong so Certificate
    var a = await contract.methods.Counter().call().then(async (length)=>{
    //console.log("Total Certificate: " + length);
    // loop through each certificate
    for(let i = 0; i < length; i++){
       var b = await contract.methods.getCerbyID(i).call().then(async (data) =>{
         console.log('data',data);
        if(data[0]){

           // get image from metadata
          //console.log('da: ',data)
          /* var metalink = data[2].replace("ipfs://","https://ipfs.io/ipfs/");
          const response = await fetch(metalink);
          if(!response.ok)
          throw new Error(response.statusText);
          const json = await response.json();
          console.log
          let image = json.image.replace("ipfs://","https://ipfs.io/ipfs/"); */
          // console.log ("---img: " + image); 
          /// update item
/*
          let maxLength = data[5].length;
          let fix_address = data[5].substr(0, 7)+"..."+data[5].substr(maxLength-4, maxLength);
*/
           const response = await fetch(data[2]);
          if(!response.ok)
          throw new Error(response.statusText);
          const json = await response.json();
          console.log("json file: " + json.image);

          var newitem = {
            userAddress: data[4],
            title: data[1],
            date: timeConverter(data[3]),
            tokenUrl: json.image,
          }
          items.push(newitem);
        }
      })
    }

  })
  
  return items;
} 

/// timestamp to date 
function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return time;
}
</script>
