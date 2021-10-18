pragma solidity ^0.8.5;

contract certis{
    
    struct Certificate{
        address sender;
        address receiver;
        uint date;
        string ipfsLink;
        string signature;
    }
    
    struct User{
        string userId;
        address _address;
        string name;
        string dateOfBirth;
        string avtLink;
        string email;
        string phone;
        string detail;
        uint[] certId;
        string[] voted;
    }
    
    struct Author{
        address _address;
        string name;
        string avtLink;
        string detail;
        string email;
        string phone;
        int192 voteScore;
        //mapping(address => bool) us;
        //address[] users;
        uint[] certId;
    }
    
    
    Certificate[] public cert;
    mapping(address => User) public users;
    mapping(address => Author) public authors;
    
    address public admin = msg.sender;
    


    
//Author function--------------------

    //Author Event-----------------------
    
        event certAdded(uint id);
        event authorChange(address aAdress);

    //-----------------------------------
    
    
    function AuthorReg(
        string memory name, 
 
        string memory avtLink, 
        string memory detail, 
        string memory email, 
        string memory phone
        ) public payable {
        
        address empty;
        if(authors[msg.sender]._address!=empty){
            revert("Address");
        }
        if(msg.value != 1e17){
            revert("Amount");
        }
        
        authors[msg.sender]._address = msg.sender;
        authors[msg.sender].name = name;
        authors[msg.sender].avtLink = avtLink;
        authors[msg.sender].detail = detail;
        authors[msg.sender].email = email;
        authors[msg.sender].phone = phone;
        
    }
    
    function AuthorUpdate(string memory name, 
        string memory avtLink, 
        string memory detail, 
        string memory email, 
        string memory phone
    ) public {
        if(authors[msg.sender]._address == msg.sender){
            authors[msg.sender].name = name;
            authors[msg.sender].avtLink = avtLink;
            authors[msg.sender].detail = detail;
            authors[msg.sender].email = email;
            authors[msg.sender].phone = phone;
            emit authorChange(msg.sender);
        }else{
            revert("Address");
        }
    }
    
    function checkAuthor(address _address) public view returns(bool){
        address empty;
        if(authors[_address]._address == empty){
            return false;
        }else{
            return true;
        }
    }
    
  /*  function addUser(address userAddress) public {
        
        if(checkAuthor(msg.sender)){
            if(!authors[msg.sender].us[userAddress]){
                authors[msg.sender].users.push(userAddress);
            }
            authors[msg.sender].us[userAddress]=true;
        }else{
            revert();
        }
    }*/
    
    function addCert(address user, string memory signature, string memory ipfsLink) public {
        //addUser(user);
        if(checkAuthor(msg.sender)){
            authors[msg.sender].certId.push(cert.length);
            users[user].certId.push(cert.length);
            cert.push(Certificate(msg.sender,user,block.timestamp,ipfsLink, signature));
            emit certAdded(cert.length-1);
        }else{
            revert();
        }
    }
    
    function getAthorInfo(address author) public view returns(Author memory){
        return authors[author];
    }
    
    
    
    
//User function--------------------


    
    function userUpdate(
        string memory userId,
        string memory name,
        string memory dateOfBirth,
        string memory avtLink,
        string memory email,
        string memory phone,
        string memory detail
    ) public {
        users[msg.sender].userId = userId;
        users[msg.sender].name = name;
        users[msg.sender].dateOfBirth = dateOfBirth;
        users[msg.sender].avtLink = avtLink;
        users[msg.sender].email = email;
        users[msg.sender].phone = phone;
        users[msg.sender].detail = detail;
    }
    
    
    
    
}
