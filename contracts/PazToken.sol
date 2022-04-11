// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract PazToken {

    string public name = "Paz Token";
    string public symbol = "PAZ";

    uint public totalSupply;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    mapping(address => uint) public balanceOf;

    constructor(uint _initialSupply)  {
        balanceOf[msg.sender] = _initialSupply;
        totalSupply = _initialSupply;
    }


    //Transfer
    function transfer(address _to , uint _value) public returns (bool success) {
        // have enough balance to transfer
        require(balanceOf[msg.sender] >= _value);
        //transfer balance
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;



    }

    //Transfer event

}
