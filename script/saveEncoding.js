// saveFiles.js
// require('dotenv').config();
// const Web3 = require("web3");
// const fs = require("fs");
import Web3 from "web3";
import fs from 'fs'
const web3 = new Web3('http://127.0.0.1:7545');

// Load deployed contract information (from the file generated by the deploy script)
const contractInfo = await import('./deployedContract.json', { assert: { type: 'json' } });
const contract = new web3.eth.Contract( [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "user",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileEncoding1",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "fileEncoding2",
          "type": "string"
        }
      ],
      "name": "FilesSaved",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "fileEncoding1",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "fileEncoding2",
          "type": "string"
        }
      ],
      "name": "saveFiles",
      "outputs": [
        
      ],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        
      ],
      "name": "getFiles",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ], "0x1B4931EA57785E12F19a33d638AD12Ae46a99f3d");

async function saveFiles(fileEncoding1, fileEncoding2) {
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0]; // Replace with correct user address from Ganache

  try {
    const receipt = await contract.methods.saveFiles(fileEncoding1, fileEncoding2).send({
      from: userAddress,
      gas: 100000
    });
    console.log("Files saved successfully:", receipt);
  } catch (error) {
    console.error("Error saving files:", error);
  }
}

// Call the function with some example data
saveFiles("exampleFileEncoding1", "exampleFileEncoding2");