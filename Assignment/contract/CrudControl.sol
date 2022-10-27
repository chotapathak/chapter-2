// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract CrudControl {

    uint256  _id;
    string  _name;
    address  _owner;

    struct User {
        address userAddress;
        string name;
        string email;
        uint256 id;
    }
    
    User[] public users;

    mapping(address => uint256) public userID;

    event DeletedUser(address owner ,string name, string email);

    constructor () {
        _owner = msg.sender;
    }
    function addUser(string memory name, string memory email) public {
        require(msg.sender == _owner, "not an owner");
        uint256 userid = userID[msg.sender];
        User memory NewUsr = User(
            _owner,
            name,
            email,
            userid
        );

        users.push(NewUsr);
    }

    function Update(uint256 id, string memory name, string memory email) public {
        User storage admin = users[id];
        admin.name = name;
        admin.email = email;
    }

    function getUser(uint256 id) public view returns (User memory admin) {
        User storage newUser = users[id];
        require(id == newUser.id, "Not an user");
        return (newUser);
    }

    function deleteUser(address _user) public returns (uint256 adminId) {
        adminId =  userID[_user];   
        User storage user = users[adminId];
        require(user.id == adminId, "not the owner");

        require(userID[msg.sender] == adminId, "ID not matched");
        delete users[adminId];
        
        // for(uint i = 0; i < users.length; i++){
        //     if(userID[msg.sender] == adminId){
        //         delete users[adminId];
        //     }
        // }
        emit DeletedUser(user.userAddress, user.name, user.email);
        return adminId;
    }
}