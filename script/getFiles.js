// getFiles.js
import dotenv from 'dotenv';
import Web3 from 'web3';
import { promises as fs } from 'fs';

dotenv.config();

const web3 = new Web3('http://127.0.0.1:7545');

// Load deployed contract information (dynamic import for JSON)
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
async function getFiles() {
  const accounts = await web3.eth.getAccounts();
  const userAddress = accounts[0]; // Replace with correct user address from Ganache

  try {
    const files = await contract.methods.getFiles().call({ from: userAddress });
    console.log({
      fileEncoding1: files[0],
      fileEncoding2: files[1]
    });
  } catch (error) {
    console.error("Error fetching files:", error);
  }
}

// Call the function to get files
getFiles();
