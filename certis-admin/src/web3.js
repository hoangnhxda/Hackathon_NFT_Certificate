const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider || 'wss://ropsten.infura.io/ws/v3/acf6228312504a1391e4eb81310a89a9');

const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "note",
				"type": "string"
			}
		],
		"name": "allData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "authorAddress",
				"type": "address"
			}
		],
		"name": "authorData",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "personAddress",
				"type": "address"
			}
		],
		"name": "personData",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "Authors",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "authorAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "avtUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "about",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "People",
		"outputs": [
			{
				"internalType": "address",
				"name": "personAddress",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "avtUrl",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "_authorAddress",
				"type": "address"
			}
		],
		"name": "addAuthor",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "content",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "person",
				"type": "address"
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
		"inputs": [],
		"name": "admin",
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
		"name": "authorLogin",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
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
		"name": "authors",
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
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_avtUrl",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_about",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_email",
				"type": "string"
			}
		],
		"name": "changeAuthorInfo",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAll",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
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
						"internalType": "string",
						"name": "author",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "authorAddress",
						"type": "address"
					},
					{
						"internalType": "address",
						"name": "person",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "signature",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "status",
						"type": "bool"
					}
				],
				"internalType": "struct Certi.Certificate[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllAuthor",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAuthor",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "authorAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "avtUrl",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "about",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
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
								"internalType": "string",
								"name": "author",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "authorAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "person",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "signature",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "status",
								"type": "bool"
							}
						],
						"internalType": "struct Certi.Certificate[]",
						"name": "cers",
						"type": "tuple[]"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					}
				],
				"internalType": "struct Certi.Author",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPerson",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "personAddress",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "dateOfBirth",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "avtUrl",
						"type": "string"
					},
					{
						"components": [
							{
								"internalType": "string",
								"name": "name",
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
								"internalType": "string",
								"name": "author",
								"type": "string"
							},
							{
								"internalType": "address",
								"name": "authorAddress",
								"type": "address"
							},
							{
								"internalType": "address",
								"name": "person",
								"type": "address"
							},
							{
								"internalType": "string",
								"name": "signature",
								"type": "string"
							},
							{
								"internalType": "bool",
								"name": "status",
								"type": "bool"
							}
						],
						"internalType": "struct Certi.Certificate[]",
						"name": "cers",
						"type": "tuple[]"
					}
				],
				"internalType": "struct Certi.Person",
				"name": "",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dateOfBirth",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "avtUrl",
				"type": "string"
			}
		],
		"name": "personUpdate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const address = '0x1B76d8ce6B97B58A4D98Da03d2cbD56740907233'

const contract = new web3.eth.Contract(abi,address)

export{web3, contract}