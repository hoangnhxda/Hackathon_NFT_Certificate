var Web3 = require('web3');
var web3 = new Web3(window.ethereum);
//Web3.givenProvider || 'wss://ropsten.infura.io/ws/v3/acf6228312504a1391e4eb81310a89a9'
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "signature",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "tokenUrl",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "tokenID",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "userAddress",
				"type": "address"
			}
		],
		"name": "issueCert",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tokenUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "signature",
				"type": "string"
			}
		],
		"name": "addCert",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_AddressNFT",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "Counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "deployAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllCer",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "tokenUrl",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "signature",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "tokenID",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "userAddress",
						"type": "address"
					}
				],
				"internalType": "struct quanly.Certificate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_ordering",
				"type": "uint256"
			}
		],
		"name": "getCerbyID",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
/*

const address = "0xEf071C2eb669b3577B4eDE80769442021a34ec00" //contract address
// contract
const contract = new web3.eth.Contract(abi, address);
// infura
var provider = new Web3.providers.WebsocketProvider("wss://rinkeby.infura.io/ws/v3/536fdf7a651e4d42b7027d9a477a4f4e")
var web3_infura = new Web3(provider);
var contract_Infura = new web3_infura.eth.Contract(abi,address);


async function checkmetamask(){
	console.log("Check Metamask");
	if (window.ethereum) {
		try {
		  // check if the chain to connect to is installed
		  await window.ethereum.request({
			method: 'wallet_switchEthereumChain',
			params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
		  });
		} catch (error) {
		  // This error code indicates that the chain has not been added to MetaMask
		  // if it is not, then install it into the user MetaMask
		  if (error.code === 4902) {
			try {
			  await window.ethereum.request({
				method: 'wallet_addEthereumChain',
				params: [
				  {
					chainId: '0x4',
					rpcUrl: 'https://rinkeby-light.eth.linkpool.io/',
				  },
				],
			  });
			} catch (addError) {
			  console.error(addError);
			}
		  }
		  console.error(error);
		}
	  } else {
		// if no window.ethereum then MetaMask is not installed
		alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
	  } 
	  
  }
  async function getUserCertificate(address){
	console.log ("Get certificate of "+address);
	var items = [];
	await contract.methods.getCerbyAddress(address).call().then(async (array)=>{
		array.forEach(async (id)=> {
			let item = await getCerbyID(id);	
			items.push(item);	
		});
	})
	return items;
  }

  async function getCerbyID(id){
	let newitem = {};
	await contract.methods.getCerbyID(id).call().then(async (data) =>{
        if(data[0]){
           // get image from metadata
          let metalink = data[2].replace("ipfs://","https://ipfs.io/ipfs/");
          const response = await fetch(metalink);
          if(!response.ok)
          throw new Error(response.statusText);
          const json = await response.json();
          let image = json.image.replace("ipfs://","https://ipfs.io/ipfs/");
		  /// update item
          newitem = {
            userAddress: data[5],
            title: data[1],
            date: timeConverter(data[3]),
            tokenUrl: image,
          }
        }
    });
	//console.log(newitem);
	return newitem;
  }

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
export { web3, contract,contract_Infura,checkmetamask,getUserCertificate}

*/
const address = "0xfE0f156c7A102515f4603dB49c832e9A7a9fdf83" //contract address

const contract = new web3.eth.Contract(abi, address);
checkmetamask();
async function checkmetamask() {
    if (window.ethereum) {
        try {
            // check if the chain to connect to is installed
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: '0x4' }], // chainId must be in hexadecimal numbers
            });
        } catch (error) {
            // This error code indicates that the chain has not been added to MetaMask
            // if it is not, then install it into the user MetaMask
            if (error.code === 4902) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: '0x4',
                            rpcUrl: 'https://rinkeby-light.eth.linkpool.io/',
                        }, ],
                    });
                } catch (addError) {
                    console.error(addError);
                }
            }
            console.error(error);
        }
    } else {
        // if no window.ethereum then MetaMask is not installed
        alert('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
}
export { web3, contract }
