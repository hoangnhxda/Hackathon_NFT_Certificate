//SPDX-License-Identifier: open-source
pragma solidity ^0.8.2;
import "./Certificate_NFT.sol";

contract quanly{
    
    CertificateNFT NFT;
    event issueCert(string title, string signature, string content ,uint tokenID);
   
    modifier onlyOwner {
        require(msg.sender == deployAddress, "Ownable: You are not the owner");
        _;
    }
    
    //cấu trúc một giấy chứng nhận
    struct Certificate{
        string title; //tên chứng nhận
        string content;//nội dung
        uint date;//ngày cấp
        address author;//địa chỉ người cấp
        string signature;//chữ ký sô của người cấp
        uint tokenID;
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
    
    mapping (address => Author) public authors;//chứa dữ liệu những người có quyền cấp chứng nhận
    mapping(address => Certificate[]) public student; //chứa dữ liệu người được nhận chứng nhận
    
    
    //hàm cấp quyền cho author chỉ admin tối cao mới có quyền chạy hàm
    function addAuthor(string memory name, address _address) public onlyOwner{
        authors[_address].status = true;
        authors[_address].name = name;
    } 
    
    
    //hàm thực hiện việc cấp chứng nhận. Chỉ những người được cấp quyền mới có thể chạy
    function addCer(address _student, string memory title, string memory content, string memory signature) public{
        
        if(authors[msg.sender].status){
            uint tokenID = NFT.safeMint(msg.sender,content);
            student[_student].push(Certificate(title,content,block.timestamp,msg.sender,signature,tokenID));
            
            emit issueCert(title, signature, content , tokenID);
        }else revert("khong cos quyen");
        
    }
    
    //hàm lấy danh sách chứng nhận của người có địa chỉ là _address (dữ liệu trả về trên web3js)
    function getCer(address _address) public view returns(Certificate[] memory){
        return student[_address];
    }
    
}
