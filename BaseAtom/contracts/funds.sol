// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Funding{
    uint public totalBalance;
    address payable owner;

    event Received(address, uint);
    event Sent(address, uint);


    constructor () {
        totalBalance = 0;
    }

    receive() external payable {
        totalBalance += msg.value;
        emit Received(msg.sender, msg.value);
    }

    function sendFund(address payable user, uint256 amount) external payable {
    // sender cannot send be the receiver
        require(user != msg.sender, "cann't send funds to self");
        // WE can send only send salt, value, or gas with call function
        (bool sent, bytes memory data) = user.call{value: msg.value, gas:20001}("");
        //bool is for confirmation and data is what we generate and send with transaction
        require(sent, "failed to send");
        emit Sent(user, msg.value)

    }
}
