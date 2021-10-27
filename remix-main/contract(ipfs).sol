//SPDX-License-Identifier: open-source
pragma solidity ^0.8.2;
import "./Certificate_NFT.sol";

contract quanly{
    
    CertificateNFT NFT;
    Certificate[] AllCert;
    mapping(address => uint[]) student; // each student can have many Certificate, uint: array of Certificate ID
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
        uint tokenID; // TokenID cùa NFT
        address userAddress;
    }
    
    address public deployAddress;//biến lưu địa chỉ của quản trị viên tối cao
    constructor(address _AddressNFT){
        deployAddress = msg.sender;//gán đại chỉ quản trị viên bằng người deploy hợp đồng thông minh
        NFT = CertificateNFT(_AddressNFT);
    }
    
    //hàm thực hiện việc cấp chứng nhận. Chỉ những người được cấp quyền mới có thể chạy
    function addCert(address userAddress, string memory title, string memory tokenUrl, string memory signature) public payable{
        require(msg.value == 0.001 ether);
        uint tokenID = NFT.safeMint(userAddress,tokenUrl);
        student[userAddress].push(AllCert.length);
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
    // return ra Array of ID của mỗi student, từ ID này có thể dùng getCerbyID truy cập vô Certificate
    function getCerbyAddress(address userAddress ) public view returns( uint[] memory){
        return student[userAddress];
    }

    function Counter() public view returns(uint){
        return AllCert.length;
    }
    
}
