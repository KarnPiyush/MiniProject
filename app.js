// app.js
import express from 'express';
import Web3 from 'web3';
import fs from 'fs';


const app = express();
const port = 3000;


app.use(express.json()); // For parsing application/json

const web3 = new Web3('http://127.0.0.1:7545');
const contractAbi =[
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
	}
]

const contractBytecode = "0x608060405234801561001057600080fd5b50610879806100206000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c806309e322dc1461003b5780632da96d7314610057575b600080fd5b6100556004803603810190610050919061042d565b610076565b005b61005f61014c565b60405161006d929190610524565b60405180910390f35b6040518060400160405280838152602001828152506000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008201518160000190816100de9190610771565b5060208201518160010190816100f49190610771565b509050503373ffffffffffffffffffffffffffffffffffffffff167fc369488329817c9d9f49d495f257aaf73ea9d68b25a3151cfbb37947c6b83d868383604051610140929190610524565b60405180910390a25050565b60608060008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206040518060400160405290816000820180546101aa9061058a565b80601f01602080910402602001604051908101604052809291908181526020018280546101d69061058a565b80156102235780601f106101f857610100808354040283529160200191610223565b820191906000526020600020905b81548152906001019060200180831161020657829003601f168201915b5050505050815260200160018201805461023c9061058a565b80601f01602080910402602001604051908101604052809291908181526020018280546102689061058a565b80156102b55780601f1061028a576101008083540402835291602001916102b5565b820191906000526020600020905b81548152906001019060200180831161029857829003601f168201915b50505050508152505090508060000151816020015192509250509091565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61033a826102f1565b810181811067ffffffffffffffff8211171561035957610358610302565b5b80604052505050565b600061036c6102d3565b90506103788282610331565b919050565b600067ffffffffffffffff82111561039857610397610302565b5b6103a1826102f1565b9050602081019050919050565b82818337600083830152505050565b60006103d06103cb8461037d565b610362565b9050828152602081018484840111156103ec576103eb6102ec565b5b6103f78482856103ae565b509392505050565b600082601f830112610414576104136102e7565b5b81356104248482602086016103bd565b91505092915050565b60008060408385031215610444576104436102dd565b5b600083013567ffffffffffffffff811115610462576104616102e2565b5b61046e858286016103ff565b925050602083013567ffffffffffffffff81111561048f5761048e6102e2565b5b61049b858286016103ff565b9150509250929050565b600081519050919050565b600082825260208201905092915050565b60005b838110156104df5780820151818401526020810190506104c4565b60008484015250505050565b60006104f6826104a5565b61050081856104b0565b93506105108185602086016104c1565b610519816102f1565b840191505092915050565b6000604082019050818103600083015261053e81856104eb565b9050818103602083015261055281846104eb565b90509392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806105a257607f821691505b6020821081036105b5576105b461055b565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b60006008830261061d7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826105e0565b61062786836105e0565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061066e6106696106648461063f565b610649565b61063f565b9050919050565b6000819050919050565b61068883610653565b61069c61069482610675565b8484546105ed565b825550505050565b600090565b6106b16106a4565b6106bc81848461067f565b505050565b5b818110156106e0576106d56000826106a9565b6001810190506106c2565b5050565b601f821115610725576106f6816105bb565b6106ff846105d0565b8101602085101561070e578190505b61072261071a856105d0565b8301826106c1565b50505b505050565b600082821c905092915050565b60006107486000198460080261072a565b1980831691505092915050565b60006107618383610737565b9150826002028217905092915050565b61077a826104a5565b67ffffffffffffffff81111561079357610792610302565b5b61079d825461058a565b6107a88282856106e4565b600060209050601f8311600181146107db57600084156107c9578287015190505b6107d38582610755565b86555061083b565b601f1984166107e9866105bb565b60005b82811015610811578489015182556001820191506020850194506020810190506107ec565b8683101561082e578489015161082a601f891682610737565b8355505b6001600288020188555050505b50505050505056fea2646970667358221220453fea2015c74676c16893e8df0f41e61c572bc9b60ace76e9130a72a58e25e064736f6c63430008120033"
let contract = null;
if (fs.existsSync('./deployedContract.json')) {
  contract = JSON.parse(fs.readFileSync('./deployedContract.json', 'utf-8'));
}

// Load deployed contract information (from the file generated by the deploy script)
app.post('/deployContract', async (req, res) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const deployer = accounts[0]; // Use the first account for deploying the contract
  
      const newContract = new web3.eth.Contract(contractAbi);
  
      // Deploy the contract
      const deployedContract = await newContract.deploy({
        data: contractBytecode
      }).send({
        from: deployer,
        gas: 3000000,
        gasPrice: '30000000000'
      });
  
      console.log('Contract deployed at address:', deployedContract.options.address);
  
      // Save contract address and ABI for future use
      fs.writeFileSync('./deployedContract.json', JSON.stringify({
        address: deployedContract.options.address,
        abi: contractAbi
      }, null, 2));
  
      // Update the contract instance
      contract = new web3.eth.Contract(contractAbi, deployedContract.options.address);
  
      res.status(200).json({
        message: 'Contract deployed successfully',
        address: deployedContract.options.address
      });
  
    } catch (error) {
      console.error('Error deploying contract:', error);
      res.status(500).json({ error: 'Error deploying contract', details: error.message });
    }
  });

// Route to save files to the blockchain
app.post('/saveFiles', async (req, res) => {
  const { fileEncoding1, fileEncoding2 } = req.body;

  if (!fileEncoding1 || !fileEncoding2) {
    return res.status(400).json({ error: 'fileEncoding1 and fileEncoding2 are required.' });
  }

  try {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0]; // Replace with correct user address from Ganache

    const receipt = await contract.methods.saveFiles(fileEncoding1, fileEncoding2).send({
      from: userAddress,
      gas: 100000,
    });

    res.status(200).json({
        message: 'Files saved successfully!',
        receipt: JSON.stringify(receipt, (key, value) => 
          typeof value === 'bigint' ? value.toString() : value) // Convert BigInt to string
      });
    } catch (error) {
    console.error('Error saving files:', error);
    res.status(500).json({ error: 'Error saving files', details: error.message });
  }
});

// Route to get files from the blockchain
app.get('/getFiles', async (req, res) => {
  try {
    const accounts = await web3.eth.getAccounts();
    const userAddress = accounts[0]; // Replace with correct user address from Ganache

    const files = await contract.methods.getFiles().call({ from: userAddress });

    res.status(200).json({
      fileEncoding1: files[0],
      fileEncoding2: files[1],
    });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Error fetching files', details: error.message });
  }
});

// Health check route
app.get('/', (req, res) => {
  res.send('Welcome to the File Storage DApp API');
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
