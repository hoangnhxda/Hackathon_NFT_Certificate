//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.5;
import "./Certificate_NFT.sol";

contract Cert{
     CertificateNFT NFT;
    struct Certificate{
        address userAddress;
        string title;
        string tokenUrl;
        uint date;
        uint tokenId;
    }
    
   
    modifier onlyOwner {
        require(msg.sender == deployAddress, "Ownable: You are not the owner");
        _;
    }
    
    
    Certificate[] public certs;
    constructor(address _AddressNFT){
       
        NFT = CertificateNFT(_AddressNFT);
    }
    event dataChange(Certificate[] certs);
    
    function addCert(string memory tokenUrl, string memory title) public {
         uint tokenID = NFT.safeMint(msg.sender,content);
        certs.push(Certificate(msg.sender,title,tokenUrl,block.timestamp,tokenId));
        emit dataChange(certs);
    }
    function getCerts()public view returns( Certificate[] memory){
        return(certs);
    }
}



