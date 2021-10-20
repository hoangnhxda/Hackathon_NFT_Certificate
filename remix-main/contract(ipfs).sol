//SPDX-License-Identifier: open-source
pragma solidity ^0.8.2;
import "./Certificate_NFT.sol";

contract quanly{
    
    CertificateNFT NFT;
    Certificate[] AllCert;
    
    event issueCert(string title, string signature, string tokenUrl ,uint tokenID,address userAddress);
   
    modifier onlyOwner {
        require(msg.sender == deployAddress, "Ownable: You are not the owner");
        _;
    }
    
    //cấu trúc một giấy chứng nhận
    struct Certificate{
        string title; //tên chứng nhận
        string tokenUrl;//nội dung
        uint date;//ngày cấp
        string signature;//chữ ký sô của người cấp
        uint tokenID;
        address userAddress;
    }
    //cấu trúc một người có quyền cấp
    struct Author{
        string name;//tên
        bool status;//quyền hạn (được cấp hoặc không)
    }
    
    address public deployAddress;//biến lưu địa chỉ của quản trị viên tối cao
    constructor(address _AddressNFT){
        deployAddress = msg.sender;//gán đại chỉ quản trị viên bằng người deploy hợp đồng thông minh
        NFT = CertificateNFT(_AddressNFT);
    }
    
    //hàm thực hiện việc cấp chứng nhận. Chỉ những người được cấp quyền mới có thể chạy
    function addCert( string memory title, string memory tokenUrl, string memory signature) public{
            uint tokenID = NFT.safeMint(msg.sender,tokenUrl);
            //student[_student].push(AllCert.length);
            AllCert.push(Certificate(title,tokenUrl,block.timestamp,signature,tokenID,msg.sender));
            emit issueCert(title, signature, tokenUrl , tokenID,msg.sender);
    }
    

    
    // Lấy danh sách chứng nhận bằng array Allcert
    function getCerbyID(uint _ordering) public view returns(bool,string memory, string memory, uint, uint,address){
        if(_ordering>=0 && _ordering<AllCert.length && AllCert.length>0){
            return (true, AllCert[_ordering].title, AllCert[_ordering].tokenUrl, AllCert[_ordering].date, AllCert[_ordering].tokenID,AllCert[_ordering].userAddress);
        }
        else{
            address empty;
            return (false,"","",0,0,empty);
        }
    }
    function getAllCer() public view returns(Certificate[] memory){
        return AllCert;
    }
    function Counter() public view returns(uint){
        return AllCert.length;
    }
    
}
