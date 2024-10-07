# Save Files DApp

This decentralized application allows users to save file encodings to the blockchain using a deployed smart contract. The smart contract is deployed on the Ganache blockchain, and this script facilitates interaction with the contract using Web3.js.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Smart Contract Overview](#smart-contract-overview)
- [Setup](#setup)
- [Usage](#usage)
- [Troubleshooting](#troubleshooting)

---

## Introduction

This DApp enables users to store file encodings on the blockchain. The saveFiles.js script interacts with a deployed smart contract on the Ganache blockchain. It includes two primary functionalities:
1. *Save File Encodings* - Save two file encodings to the blockchain.
2. *Get File Encodings* - Retrieve the saved file encodings from the blockchain.

## Prerequisites

Before running the script, ensure you have the following software installed and configured:

- [Node.js](https://nodejs.org/) (v14.x or later)
- [Ganache](https://www.trufflesuite.com/ganache) (local blockchain)
- [Web3.js](https://web3js.readthedocs.io/)
- A deployed smart contract with the saveFiles and getFiles functions.

### Libraries Used
- *Web3.js*: To interact with the Ethereum blockchain.
- *fs*: To read and write files (used for storing deployed contract information).

## Smart Contract Overview

The smart contract has two main functions:
1. saveFiles(string fileEncoding1, string fileEncoding2) - Saves two string encodings on the blockchain.
2. getFiles() - Retrieves the two saved file encodings.

Additionally, the contract emits a FilesSaved event when files are saved successfully.

## Setup

### 1. Clone the repository:
```bash
git clone https://github.com/KarnPiyush/MiniProject.git
```
cd MiniProject


### 2. Install dependencies:
Ensure you have node_modules installed by running the following command in the project directory:
```bash
npm install
```
This will install all the required dependencies, including Web3.js.

### 3. Ganache Setup:
Make sure that Ganache is running on your machine. You can download and run it from the official website.

By default, Ganache runs on http://127.0.0.1:7545. Make sure to use this RPC URL in the script.

### 4. Smart Contract Deployment:
Deploy your smart contract to Ganache, and ensure that the deployed contract address and ABI are stored in a file named deployedContract.json.

The deployedContract.json should have the following structure:
```json
{
  "address": "YOUR_DEPLOYED_CONTRACT_ADDRESS",
  "abi": [
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
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
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
  ]
}
```


### 5. Update the Script:
Ensure the correct contract address and ABI are included in saveFiles.js. This information is obtained from the deployedContract.json file generated when deploying the smart contract.
```javascript
const contract = new web3.eth.Contract(ABI, "YOUR_DEPLOYED_CONTRACT_ADDRESS");
```
### 6. Run the Script:
You can run the saveFiles.js script with the following command:
```bash
node saveFiles.js
```
## Usage

1. Start Ganache and ensure your contract is deployed.
2. Update the deployedContract.json with the correct contract address and ABI.
3. Run the saveFiles.js script to save file encodings to the blockchain.

```bash
node saveFiles.js
```
By default, the script will use the first account in the Ganache accounts list to send the transaction.
## Troubleshooting
1. Ensure Ganache is running: If the script fails to connect to Ganache, check that Ganache is running at http://127.0.0.1:7545.
2. Check Gas Limit: If you encounter a gas issue, increase the gas limit in the transaction configuration.
