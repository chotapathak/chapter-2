//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;


contract Token{
    string public _name;
    string public _symbol;
    uint8 public _decimals;
    uint256 public _totalSuppy;
    address public _owner;

    event Transferd(address indexed from, address indexed to, uint256 amount);

    event Approval(address owner,address spender,uint256 value);

    mapping(address => uint256) public balances;
    mapping(address => mapping(uint256 => bool)) public approve;
    mapping(address => mapping(address => uint256)) public allowed;

    constructor (string memory name, string memory symbol,uint8 decimals, uint256 totalSupply)  payable {
        _owner = msg.sender;
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
        balances[msg.sender] = totalSupply;
    }
    modifier onlyOwner() {
        require(msg.sender == _owner, "Only owner can call this function");
        _;
    }
    modifier isValid(address Address) {
        require(Address != address(0),"not. valid Account address");
        require(msg.sender != address(0), "not. valid owner");
        _;
    }
    function transferEther(uint256 amount, address payable to) public payable isValid(to) onlyOwner returns(bool) {
        // require(msg.value > 0, "value should greater then 0");
        require(balances[msg.sender] >= amount, "balance is less then amount");
        balances[msg.sender] -= amount;
        to.transfer(amount);
        balances[to] += amount;

        emit Transferd(msg.sender, to, amount);
        return true;
    }
    receive() external payable { }

    function  deposit(uint256 amount,address account) external payable {
        balances[account] += amount;
    }

    function Allowance(address owner, address to) public view isValid(to) onlyOwner returns(uint256 remaining) {
        require(allowed[owner][to] == 0, "Already allowed");
        return allowed[owner][to];        
    }

    function Approve(address to , uint256 amount) public isValid(to) onlyOwner returns(bool success) {
        require(amount > 0, "Send more then 0");
        allowed[msg.sender][to] = amount;
        emit Approval(msg.sender, to, amount);
        return true;
    }
    
    function transferFrom(address sender, address recipient, uint256 amount) public isValid(recipient) returns(bool success) {
        uint allowance = allowed[sender][msg.sender];
        require(allowance >= amount, "Allowance is low");
        require(balances[sender] >= amount, "Low Balance ");

        allowed[sender][msg.sender] -= amount;
        balances[sender] -= amount;
        balances[recipient] += amount;
        emit Transferd(msg.sender, recipient, amount);

        return true;
    }   
    function balanceOf(address actAddress) public view isValid(actAddress) returns(uint256) {
        return balances[actAddress]; 
    }
}