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
    }catch(error){
        console.log(error);
    }
})

web3.eth.defaultAccount = acc_address
const contractAddress = '0xC820cBdc60c879cB73Cdd895e7e89E796f6C6C16'
const contractABI = [ { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "uint8", "name": "key", "type": "uint8" } ], "name": "Bonus", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" } ], "name": "Problem1", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "string", "name": "HashedHex", "type": "string" } ], "name": "Problem2", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "string", "name": "HashedHex", "type": "string" }, { "internalType": "address", "name": "yourContract", "type": "address" } ], "name": "Problem3", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2address", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2P2Hex", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2P3Hex", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isBonusSubmit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP1Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP2Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP3Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "score", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]

const myContract = new web3.eth.Contract(contractABI, contractAddress);
var myHash = fs.readFileSync("./hexdigest.txt").toString();  // reading in the hash digest
console.log(myHash)

web3.eth.getTransactionCount(acc_address, async (err, txCount) => {
    try{
      const txObject = {
        nonce:    web3u.toHex(txCount),
        gasLimit: web3u.toHex(800000), // Raise the gas limit to a much higher amount
        gasPrice: web3u.toHex(web3u.toWei('10', 'gwei')),
        value: web3u.toHex(web3u.toWei('5', 'gwei')),
        from: acc_address,
        to: contractAddress,
        data: myContract.methods.Problem2("108998413", myHash).encodeABI(),
        chainId: 3
      }

      const tx = new Tx(txObject)
      tx.sign(acc_privateKey)  // sign Transaction with my private key
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)
            // Use this txHash to find the contract on Etherscan!
      }).catch(e => {
            console.log(e)
            throw e
      })
    }catch(error){
        console.log(error)
        throw error
    }
})