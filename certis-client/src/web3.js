var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws/v3/acf6228312504a1391e4eb81310a89a9');

const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
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
                    }
                ],
                "indexed": false,
                "internalType": "struct Cert.Certificate[]",
                "name": "certs",
                "type": "tuple[]"
            }
        ],
        "name": "dataChange",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "tokenUrl",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "title",
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
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "certs",
        "outputs": [
            {
                "internalType": "address",
                "name": "userAddress",
                "type": "address"
            },
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
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getCerts",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "userAddress",
                        "type": "address"
                    },
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
                    }
                ],
                "internalType": "struct Cert.Certificate[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const address = "0x3C47d53e5D633dCAbF54292B63c2DEE29B08Deae" //contract address

const contract = new web3.eth.Contract(abi, address);

export {web3,contract}