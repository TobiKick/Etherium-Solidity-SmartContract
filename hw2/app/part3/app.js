const Web3 = require('web3');
const web3u = require('web3-utils');
var Tx = require('ethereumjs-tx');
const CryptoJS = require('crypto');
var fs = require("fs");



web3.eth.defaultAccount = acc_address
const contractAddress = '0xC820cBdc60c879cB73Cdd895e7e89E796f6C6C16'
const contractABI = [ { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "uint8", "name": "key", "type": "uint8" } ], "name": "Bonus", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" } ], "name": "Problem1", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "string", "name": "HashedHex", "type": "string" } ], "name": "Problem2", "outputs": [], "payable": true, "stateMutability": "payable", "type": "function" }, { "constant": false, "inputs": [ { "internalType": "string", "name": "ID", "type": "string" }, { "internalType": "string", "name": "HashedHex", "type": "string" }, { "internalType": "address", "name": "yourContract", "type": "address" } ], "name": "Problem3", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2address", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2P2Hex", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "ID2P3Hex", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isBonusSubmit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP1Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP2Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "isP3Submit", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [ { "internalType": "string", "name": "", "type": "string" } ], "name": "score", "outputs": [ { "internalType": "int256", "name": "", "type": "int256" } ], "payable": false, "stateMutability": "view", "type": "function" } ]
const myContract = new web3.eth.Contract(contractABI, contractAddress);
console.log(myContract)

// Setup Contract for studentID
const ownContractABI = [ { "constant": false, "inputs": [], "name": "studentId", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "payable": false, "stateMutability": "nonpayable", "type": "function" } ]
const myOwnContract = new web3.eth.Contract(ownContractABI)

bytecode = {
           	"linkReferences": {},
           	"object": "608060405234801561001057600080fd5b5061011d806100206000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80637b487c5714602d575b600080fd5b603360ab565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101560715780820151818401526020810190506058565b50505050905090810190601f168015609d5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b60606040518060400160405280600981526020017f313038393938343133000000000000000000000000000000000000000000000081525090509056fea265627a7a72315820e1f7c9d7193bf481438649e0c1703025faaa5d10c46b543a219e71f37719568d64736f6c634300050b0032",
           	"opcodes": "PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH2 0x10 JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH2 0x11D DUP1 PUSH2 0x20 PUSH1 0x0 CODECOPY PUSH1 0x0 RETURN INVALID PUSH1 0x80 PUSH1 0x40 MSTORE CALLVALUE DUP1 ISZERO PUSH1 0xF JUMPI PUSH1 0x0 DUP1 REVERT JUMPDEST POP PUSH1 0x4 CALLDATASIZE LT PUSH1 0x28 JUMPI PUSH1 0x0 CALLDATALOAD PUSH1 0xE0 SHR DUP1 PUSH4 0x7B487C57 EQ PUSH1 0x2D JUMPI JUMPDEST PUSH1 0x0 DUP1 REVERT JUMPDEST PUSH1 0x33 PUSH1 0xAB JUMP JUMPDEST PUSH1 0x40 MLOAD DUP1 DUP1 PUSH1 0x20 ADD DUP3 DUP2 SUB DUP3 MSTORE DUP4 DUP2 DUP2 MLOAD DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP DUP1 MLOAD SWAP1 PUSH1 0x20 ADD SWAP1 DUP1 DUP4 DUP4 PUSH1 0x0 JUMPDEST DUP4 DUP2 LT ISZERO PUSH1 0x71 JUMPI DUP1 DUP3 ADD MLOAD DUP2 DUP5 ADD MSTORE PUSH1 0x20 DUP2 ADD SWAP1 POP PUSH1 0x58 JUMP JUMPDEST POP POP POP POP SWAP1 POP SWAP1 DUP2 ADD SWAP1 PUSH1 0x1F AND DUP1 ISZERO PUSH1 0x9D JUMPI DUP1 DUP3 SUB DUP1 MLOAD PUSH1 0x1 DUP4 PUSH1 0x20 SUB PUSH2 0x100 EXP SUB NOT AND DUP2 MSTORE PUSH1 0x20 ADD SWAP2 POP JUMPDEST POP SWAP3 POP POP POP PUSH1 0x40 MLOAD DUP1 SWAP2 SUB SWAP1 RETURN JUMPDEST PUSH1 0x60 PUSH1 0x40 MLOAD DUP1 PUSH1 0x40 ADD PUSH1 0x40 MSTORE DUP1 PUSH1 0x9 DUP2 MSTORE PUSH1 0x20 ADD PUSH32 0x3130383939383431330000000000000000000000000000000000000000000000 DUP2 MSTORE POP SWAP1 POP SWAP1 JUMP INVALID LOG2 PUSH6 0x627A7A723158 KECCAK256 0xe1 0xf7 0xc9 0xd7 NOT EXTCODESIZE DELEGATECALL DUP2 NUMBER DUP7 0x49 0xe0 0xc1 PUSH17 0x3025FAAA5D10C46B543A219E71F3771956 DUP14 PUSH5 0x736F6C6343 STOP SDIV SIGNEXTEND STOP ORIGIN ",
           	"sourceMap": "36:118:0:-;;;;8:9:-1;5:2;;;30:1;27;20:12;5:2;36:118:0;;;;;;;"
           };


// getting Transaction Count from acc_address ensures, that you always get a new nonce that wasn't used before
web3.eth.getTransactionCount(acc_address, (err, txCount) => {
      const txObject = {
        nonce:    web3u.toHex(txCount),
        gasLimit: web3u.toHex(8000000), // Raise the gas limit to a much higher amount
        gasPrice: web3u.toHex(web3u.toWei('5', 'gwei')),
        from: acc_address,
        value: '0x00',
        data: bytecode.object,
        chainId: 3
      }

      // signing Transaction with private Key, so that provider can just pass it on
      const tx = new Tx(txObject)
      tx.sign(acc_privateKey)  // sign Transaction with my private key
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)
            // Use this txHash to find the contract on Etherscan!
      })
})


// Parameters for the Problem3 function
var myHash = fs.readFileSync("./hexdigest.txt").toString();  // reading in the hash digest
console.log(myHash)

web3.eth.getTransactionCount(acc_address, async (err, txCount) => {
      const txObject = {
        nonce:    web3u.toHex(txCount),
        gasLimit: web3u.toHex(800000), // Raise the gas limit to a much higher amount
        gasPrice: web3u.toHex(web3u.toWei('10', 'gwei')),
        from: acc_address,
        to: contractAddress,
        data: myContract.methods.Problem3("108998413", myHash, 'Cc3c4f7dfE5254b146384894Dc843D32c102a99F').encodeABI(),
        chainId: 3
      }

      // signing Transaction with private Key, so that provider can just pass it on
      const tx = new Tx(txObject)
      tx.sign(acc_privateKey)  // sign Transaction with my private key
      const serializedTx = tx.serialize()
      const raw = '0x' + serializedTx.toString('hex')

      await web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            console.log('err:', err, 'txHash:', txHash)
            // Use this txHash to find the contract on Etherscan!
      })
})