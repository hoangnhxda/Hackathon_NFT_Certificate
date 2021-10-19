const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws/v3/acf6228312504a1391e4eb81310a89a9');

const abi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "address",
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "addAuthor",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "_student",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "signature",
                "type": "string"
            }
        ],
        "name": "addCer",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "_authorAddress",
            "type": "address"
        }],
        "name": "authorLogin",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "",
            "type": "address"
        }],
        "name": "authors",
        "outputs": [{
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "bool",
                "name": "status",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
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
        "inputs": [{
            "internalType": "address",
            "name": "_address",
            "type": "address"
        }],
        "name": "getCer",
        "outputs": [{
            "components": [{
                    "internalType": "string",
                    "name": "title",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "content",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "date",
                    "type": "uint256"
                },
                {
                    "internalType": "address",
                    "name": "author",
                    "type": "address"
                },
                {
                    "internalType": "string",
                    "name": "signature",
                    "type": "string"
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
                "internalType": "address",
                "name": "",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "student",
        "outputs": [{
                "internalType": "string",
                "name": "title",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "content",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "date",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "author",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "signature",
                "type": "string"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const address = '0x4E6380418Fe0D16454B573F90F402Ab0e485AFF3'

const contract = new web3.eth.Contract(abi, address)

export { web3, contract }