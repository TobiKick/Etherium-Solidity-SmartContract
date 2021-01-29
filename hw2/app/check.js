const Web3 = require('web3');
const web3u = require('web3-utils');
var Tx = require('ethereumjs-tx');
const CryptoJS = require('crypto');
var fs = require("fs");



// Check Token balance for account
web3.eth.getBalance(acc_address, (err, wei) => {
    try{
        balance = web3u.fromWei(wei.toString(), 'ether')
        console.log("Account balance: " + balance.toString())
    }catch(err){
        console.log(error);
    }
})

web3.eth.defaultAccount = acc_address
const contractAddress = '0xC820cBdc60c879cB73Cdd895e7e89E796f6C6C16'
const contractABI = [ { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "uint8", "name": "key", "type": "uint8" } ], "name": "Bonus", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" } ], "name": "Problem1", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "string", "name": "HashedHex", "type": "string" } ], "name": "Problem2", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "string", "name": "HashedHex", "type": "string" }, { "internalType": "address", "name": "yourContract", "type": "address" } ], "name": "Problem3", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2address", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2P2Hex", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2P3Hex", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isBonusSubmit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP1Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP2Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP3Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "score", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]

const myContract = new web3.eth.Contract(contractABI, contractAddress);
console.log(myContract)

var res = myContract.methods.score(ID).call();
res.then(function(success){
    console.log("Score: " + success.toString());
}).catch(function(error){
    console.log(error);
})

var resP1 = myContract.methods.isP1Submit(ID).call();
resP1.then(function(success){
    console.log("Is P1 submitted: " + success.toString());
}).catch(function(error){
    console.log(error);
})

var resP2 = myContract.methods.isP2Submit(ID).call();
resP2.then(function(success){
    console.log("Is P2 submitted: " + success.toString());
}).catch(function(error){
    console.log(error);
})

var resP3 = myContract.methods.isP3Submit(ID).call();
resP3.then(function(success){
    console.log("Is P3 submitted: " + success.toString());
}).catch(function(error){
    console.log(error);
})
