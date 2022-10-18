// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Test {

    struct Employee {
        uint id;
        string name;
        string email;
        uint age;
        address ownerAdress;
    }

    Employee[] public employees;
    uint256 public totalEmployee;
    constructor() {
        totalEmployee = 0;
    }

    function addEmp(string memory name, string memory email, uint age, address owner)
           public returns (uint256 _totalEmpl)
    {
        uint _id = 0;
        Employee memory newEmp = Employee(_id++, name, email, age, owner);
        employees.push(newEmp);
        totalEmployee++;
        return totalEmployee;
    }

    function readEmp(uint id) public view returns(Employee memory newUser)
        {
            if(employees[id].id == id)
            {
                return employees[id];
            }
        }


    function updateEmpDetail(uint id, string memory name,string memory email) public {

            if(employees[id].id == id){
                employees[id].name = name;
                employees[id].email = email;
            }
        }


    function deleteEmployee(uint id) public returns(bool done){
        bool isEmp = true;
        uint i = 0;
        for(i=0 ; i < employees.length; i++) {
            Employee memory newEmp = employees[id];
            if(newEmp.id == id){
                delete employees[i];
                isEmp = false;
                totalEmployee--;
            return isEmp;
            }
        }
    }
}
