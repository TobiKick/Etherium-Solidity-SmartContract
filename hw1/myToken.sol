pragma solidity >=0.4.22 <0.6.0;

contract Token {
    function totalSupply() public view returns (uint);
    function balanceOf(address tokenOwner) public view returns (uint balance);
    function allowance(address tokenOwner, address spender) public view returns (uint remaining);
    function transfer(address to, uint tokens) public returns (bool success);
    function approve(address spender, uint tokens) public returns (bool success);
    function transferFrom(address from, address to, uint tokens) public returns (bool success);

    event Transfer(address indexed from, address indexed to, uint tokens);
    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
}


contract StandardToken is Token {
    mapping(address => uint256) balances;  // associative array with address as key and a positive integer as the balance
    mapping(address => mapping (address => uint256)) allowed;

    uint256 _totalSupply;


    // returning the total supply
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    // returning the current balance of an owner's address
    function balanceOf(address tokenOwner) public view returns (uint) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint numTokens) public returns (bool) {
        require(numTokens <= balances[msg.sender]); // requires the balance of the sender to be bigger than number of moved tokens
        balances[msg.sender] = balances[msg.sender] - numTokens;
        balances[receiver] = balances[receiver] + numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint numTokens) public returns (bool) {
        allowed[msg.sender][delegate] = numTokens; // allows to delegate to so. the use of the sender's x amount of tokens
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    // looks up the current allowed number of tokens by an owner to delegate
    function allowance(address owner, address delegate) public view returns (uint) {
        return allowed[owner][delegate];
    }

    // this function is needed alongside the approve function (= its peer)
    function transferFrom(address owner, address buyer, uint numTokens) public returns (bool) {
        require(numTokens <= balances[owner]); // check balance
        require(numTokens <= allowed[owner][msg.sender]); // check allowance
        balances[owner] = balances[owner] - numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender] - numTokens;
        balances[buyer] = balances[buyer] + numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }

    event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
    event Transfer(address indexed from, address indexed to, uint tokens);
}

contract TobiToken is StandardToken {
    /*function () {
        //if ether is sent to this address, send it back.
        throw;
    }*/

    string public name;
    uint8 public decimals;
    string public symbol;
    string public version = 'H1.0';

    constructor() public {
        balances[msg.sender] = 100000;    // Give the creator all initial tokens (100000 for example)
        _totalSupply = 100000;             // Update total supply (100000 for example)
        name = "TToken";                  // Set the name for display purposes
        decimals = 0;                     // Amount of decimals for display purposes
        symbol = "SYM";                   // Set the symbol for display purposes
    }

    /* Approves the contract + then calls the receiving contract */
    function approveAndCall(address _spender, uint256 _value, bytes memory _extraData) public returns (bool success) {
        allowed[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);

        //call the receiveApproval function on the contract you want to be notified. This crafts the function signature manually so one doesn't have to include a contract in here just for this.
        //receiveApproval(address _from, uint256 _value, address _tokenContract, bytes _extraData)
        //it is assumed that when does this that the call *should* succeed, otherwise one would use vanilla approve instead.
        // if(!_spender.call(bytes4(bytes32(sha3("receiveApproval(address,uint256,address,bytes)"))), msg.sender, _value, this, _extraData)) { revert(); }
        return true;
    }
}
