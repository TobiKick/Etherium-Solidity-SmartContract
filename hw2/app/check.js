const Web3 = require('web3');
const web3u = require('web3-utils');
var Tx = require('ethereumjs-tx');
const CryptoJS = require('crypto');
var fs = require("fs");

////////////////////////////////////////////////
///// TAKE CARE OF ARGUMENTS!! PRIVATE!! //////
const URL = 'https://ropsten.infura.io/v3/ce2a13cf0e254cd8b311a7f59a7d1206'
const web3 = new Web3(new Web3.providers.HttpProvider(URL))

const acc_address = '0x54afDfe692ACb56e0CA14dfcc4568398AEDAF729'
const acc_privateKey = Buffer.from('2A3B30D603DDBB99302A1A6A103200011BF8F3B9769A2DCCBE4CDC96ECF6A037', 'hex')
////////////////////////////////////////////////

// Check Token balance for account
web3.eth.getBalance(acc_address, (err, wei) => {
    try{
        balance = web3u.fromWei(wei.toString(), 'ether')
        console.log("Account balance: " + balance.toString())
    }catch(error){
        console.log(error);
    }
})
web3.eth.score(acc_address, (err, res) => {
    console.log("Current score: " + res.toString())
})

web3.eth.isP1Submit(acc_address, (err, res) => {
    console.log("P1 submitted: " + res.toString())
})
web3.eth.isP2Submit(acc_address, (err, res) => {
    console.log("P2 submitted: " + res.toString())
})
web3.eth.isP3Submit(acc_address, (err, res) => {
    console.log("P3 submitted: " + res.toString())
})