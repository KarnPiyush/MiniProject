# Blockchain File Storage Application

This application demonstrates a simple blockchain-based file storage system using Ethereum (Ganache), Web3.js, and Express.js. It allows users to store and retrieve file encodings on the blockchain.

## Prerequisites

Before running the application, make sure you have the following installed:
- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Ganache](https://trufflesuite.com/ganache/) - A personal blockchain for Ethereum development
- npm (Node Package Manager, comes with Node.js)

## Setup

1. Clone the repository and navigate to the project directory:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install the required dependencies:
```bash
npm install express web3 fs
```

3. Start Ganache:
   - Launch the Ganache application
   - Make sure it's running on `http://127.0.0.1:7545` (default port)
   - Keep note of the available accounts and their private keys

## Smart Contract Architecture

The `FileStorage` smart contract (`FileStorage.sol`) serves as the core of this application, managing file storage on the blockchain.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileStorage {
    // Struct to store two file encoding strings
    struct FileData {
        string fileEncoding1;
        string fileEncoding2;
    }

    // Mapping user address to their file data
    mapping(address => FileData) private fileMappings;

    // Event to emit when files are saved
    event FilesSaved(address indexed user, string fileEncoding1, string fileEncoding2);

    // Function to save the file encodings
    function saveFiles(string memory fileEncoding1, string memory fileEncoding2) public {
        fileMappings[msg.sender] = FileData(fileEncoding1, fileEncoding2);
        emit FilesSaved(msg.sender, fileEncoding1, fileEncoding2);
    }

    // Function to get the file encodings for the calling user
    function getFiles() public view returns (string memory, string memory) {
        FileData memory fileData = fileMappings[msg.sender];
        return (fileData.fileEncoding1, fileData.fileEncoding2);
    }
}
```

### Contract Components

1. **FileData Struct**
   - Purpose: Organizes two file encodings as a single data structure
   - Properties:
     - `fileEncoding1`: First file encoding string
     - `fileEncoding2`: Second file encoding string

2. **Storage Mapping**
   - Type: `mapping(address => FileData)`
   - Purpose: Associates each Ethereum address with their file data
   - Access: Private to ensure data security

3. **Events**
   - `FilesSaved` event
   - Parameters:
     - `user` (indexed): Address of the user saving files
     - `fileEncoding1`: First file encoding
     - `fileEncoding2`: Second file encoding
   - Purpose: Enables event tracking and frontend notifications

### Contract Functions

1. **saveFiles**
   ```solidity
   function saveFiles(string memory fileEncoding1, string memory fileEncoding2) public
   ```
   - Purpose: Stores two file encodings for the calling user
   - Parameters:
     - `fileEncoding1`: First file encoding string
     - `fileEncoding2`: Second file encoding string
   - Behavior:
     - Creates/updates FileData for msg.sender
     - Emits FilesSaved event
   - Gas considerations: Cost varies with string lengths

2. **getFiles**
   ```solidity
   function getFiles() public view returns (string memory, string memory)
   ```
   - Purpose: Retrieves stored file encodings for the calling user
   - Returns: Tuple of both file encodings
   - Access: Public view function (no gas cost for calls)
   - Security: Only returns caller's own files

## Deployment

1. First, deploy the smart contract:
```bash
node deployContract.js
```
This will:
- Deploy the contract to your local Ganache blockchain
- Create a `deployedContract.json` file containing the contract's address and ABI
- Use the following configuration:
  - Gas limit: 1,500,000 units
  - Gas price: 30 Gwei

2. Start the Express server:
```bash
node app.js
```
The server will start running on port 3000.

## API Integration Details

### API Endpoints

1. **Save Files**
- **Endpoint**: POST `/save-files`
- **Content-Type**: `application/json`
- **Request Body**:
```json
{
    "fileEncoding1": "your-file-encoding-1",
    "fileEncoding2": "your-file-encoding-2"
}
```
- **Response**:
```json
{
    "success": true,
    "transactionHash": "0x..."
}
```

2. **Get Files**
- **Endpoint**: GET `/get-files/:address`
- **Parameters**: 
  - `address`: Ethereum address of the user
- **Response**:
```json
{
    "success": true,
    "address": "0x...",
    "fileEncoding1": "your-file-encoding-1",
    "fileEncoding2": "your-file-encoding-2"
}
```

### Implementation Details

1. **Contract Instance Creation**
```javascript
const web3 = new Web3('http://127.0.0.1:7545');
const contract = new web3.eth.Contract(contractABI, address);
```

2. **Data Flow**
   - Saving Files:
     ```
     Client Request → Express API → Web3.js → Smart Contract → Blockchain
     ```
   - Retrieving Files:
     ```
     Client Request → Express API → Web3.js → Smart Contract → Response
     ```

## Performance and Security Considerations

### Performance
1. **Storage Limitations**
   - String storage is expensive on Ethereum
   - Consider file encoding size limits
   - Monitor gas costs for large strings

2. **Gas Optimization**
   - `saveFiles` function costs vary with data size
   - `getFiles` is free (view function)
   - Consider batch operations for multiple files

### Security
- This is a demonstration application and should not be used in production without proper security auditing
- The application currently uses the first Ganache account for transactions
- File encodings are stored directly on the blockchain, which may not be suitable for large files
- No authentication mechanism is implemented

## Error Handling

The application includes error handling for:
- Invalid Ethereum addresses
- Non-existent files
- Contract interaction errors
- Server errors

## Troubleshooting

1. If you encounter connection errors:
   - Ensure Ganache is running and accessible at `http://127.0.0.1:7545`
   - Check if the contract was deployed successfully
   - Verify the contract address in `deployedContract.json`

2. If transactions fail:
   - Ensure your Ganache account has sufficient ETH
   - Check the gas limits and prices in `deployContract.js`

## License

MIT License

