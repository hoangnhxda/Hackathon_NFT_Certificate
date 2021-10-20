var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws/v3/acf6228312504a1391e4eb81310a89a9');

const abi = [{
        "inputs": [{
            "internalType": "address",
            "name": "_AddressNFT",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
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
        "inputs": [],
        "name": "Counter",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
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
        "inputs": [],
        "name": "deployAddress",
        "outputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllCer",
        "outputs": [{
            "components": [{
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
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_ordering",
            "type": "uint256"
        }],
        "name": "getCerbyID",
        "outputs": [{
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

const address = "0x9a02c949eA7D2323AD9143508af83dAbDf2Ebc55" //contract address

const contract = new web3.eth.Contract(abi, address);

export { web3, contract }