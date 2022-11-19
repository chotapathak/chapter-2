// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "./ERC1155.sol";

contract BatchNFT is ERC1155  {
    string public _name;
    string public _symbol;
    uint256 public tokenCount;
    
    mapping(uint256 => string) private _tokenUris;

    constructor(string memory name, string memory symbol)  {
        _name = name;
        _symbol = symbol;
    }

    function uri(uint256 tokenId) public view returns(string memory) {
        return _tokenUris[tokenId];
    }
    function mint(uint256 amount, string memory _uri) public {
        require(msg.sender != address(0), "Not valid addresss");
        tokenCount += 1;
        _balances[tokenCount][msg.sender] += amount;
        _tokenUris[tokenCount] = _uri;

        emit TransferSingle(msg.sender, address(0), msg.sender, tokenCount, amount);
    }

    function _supportInterface(bytes4 interfaceId) public pure override returns(bool) {
        return interfaceId == 0xd9b67a26 || interfaceId == 0x0e89341c;
    }
}
