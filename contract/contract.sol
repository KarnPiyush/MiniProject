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
