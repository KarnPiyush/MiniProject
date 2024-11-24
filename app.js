import express from 'express'
import Web3 from 'web3';
import fs from 'fs'
import contractJson from './deployedContract.json' assert {type : 'json'}

const app = express();
app.use(express.json());

// Connect to Ganache
const web3 = new Web3('http://127.0.0.1:7545');

// Get contract ABI and address
const contractABI = [
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
]; // Same ABI as above
const address = contractJson.address

// Create contract instance
const contract = new web3.eth.Contract(contractABI, address);

// Routes
app.post('/save-files', async (req, res) => {
    try {
        const { fileEncoding1, fileEncoding2 } = req.body;
        const accounts = await web3.eth.getAccounts();
        const userAccount = accounts[0];

        const result = await contract.methods
            .saveFiles(fileEncoding1, fileEncoding2)
            .send({ from: userAccount });

        res.json({
            success: true,
            transactionHash: result.transactionHash
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

app.get('/get-files/:address', async (req, res) => {
  try {
      // Get the address from the URL parameters
      const userAddress = req.params.address;

      // Validate Ethereum address format
      if (!web3.utils.isAddress(userAddress)) {
          return res.status(400).json({
              success: false,
              error: 'Invalid Ethereum address format'
          });
      }

      // Call the contract method with the provided address
      const result = await contract.methods
          .getFiles()
          .call({ from: userAddress });

      // Check if files exist (assuming empty strings mean no files)
      if (!result[0] && !result[1]) {
          return res.status(404).json({
              success: false,
              error: 'No files found for this address'
          });
      }

      res.json({
          success: true,
          address: userAddress,
          fileEncoding1: result[0],
          fileEncoding2: result[1]
      });
  } catch (error) {
      console.error('Error fetching files:', error);
      res.status(500).json({
          success: false,
          error: error.message || 'Error retrieving files from blockchain'
      });
  }
}); 

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});