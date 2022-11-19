//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract ERC721 {

    event Transfer(address indexed _from, address indexed _to, uint256 indexed _tokenId);
    event Approval(address indexed _owner, address indexed _approved, uint256 indexed _tokenId);
    event ApprovalForAll(address indexed _owner, address indexed _operator, bool _approved);

    mapping(address => uint256) internal _balances;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    mapping(uint256 => address) internal _owners;
    mapping(uint256 => address) internal _tokenApprovals;

    function safeTransferFrom(address _from, address _to, uint256 _tokenId, bytes memory data) public payable{
        transferFrom(_from, _to, _tokenId);
        require(_checkOnERC721Recieved() == true,  "Reciever not implemented");
    }

    function safeTransferFrom(address _from, address _to, uint256 _tokenId) public payable {
        safeTransferFrom(_from, _to, _tokenId, "");
    }

    // EIP165: Query if contract implemented another interface
    function _supportInterface(bytes4 interfaceId) public pure virtual returns(bool) {
        return interfaceId == 0x80ac58cd;
    }
    function _checkOnERC721Recieved() public pure returns(bool) {
            return true;
    }
    
    function balanceOf(address _owner) internal view returns (uint256){
        require(_owner != address(0), "Not valid addresss");
        return _balances[_owner];
    }
    function ownerOf(uint256 _tokenId) public view returns (address){
        address owner = _owners[_tokenId];
        require(owner != address(0), "Token ID is note valid");
        return owner;
    }
    function transferFrom(address _from, address _to, uint256 _tokenId) public payable{
        address owner = ownerOf(_tokenId);
        require(
                msg.sender == owner
            || getApproved(_tokenId) == msg.sender 
            || isApprovedForAll(_from, _to) ,
        "Msg,sender is not owner or approved address for transfer"
        );

        require(owner == _from, "From addres is not the owner");
        require(_to != address(0), "To address is not valid");

        approve(address(0), _tokenId);

        _balances[_from] -= 1;
        _balances[_to] += 1;
        _owners[_tokenId] = _to;

        emit Transfer(_from, _to, _tokenId);
    }
    function approve(address _approved, uint256 _tokenId) public payable{
        address owner = ownerOf(_tokenId);
        require(msg.sender == owner || isApprovedForAll(owner, msg.sender)  , "Msg.sender is not a Owner or operator");
        _tokenApprovals[_tokenId] = _approved;
    }
    function setApprovalForAll(address _operator, bool _approved) external{
        _operatorApprovals[msg.sender][_operator] = _approved;
        emit ApprovalForAll(msg.sender, _operator, _approved);
    }
    function getApproved(uint256 _tokenId) internal view returns (address){
        require(_owners[_tokenId] != address(0), "Token id is not vaid");
        return _tokenApprovals[_tokenId];
    }
    function isApprovedForAll(address _owner, address _operator) public view returns (bool){
        return _operatorApprovals[_owner][_operator];
    }

}

