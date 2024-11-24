// getFiles.js
import dotenv from 'dotenv';
import Web3 from 'web3';
import contractJson from './deployedContract.json' assert {type : 'json'};
const abi = contractJson.abi;

const address = contractJson.address;
dotenv.config();

const web3 = new Web3('http://127.0.0.1:7545');



// Load deployed contract information (dynamic import for JSON)
const contract = new web3.eth.Contract( abi , address);

async function getFiles(address) {
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
}


// Call the function to get files
getFiles(address);
