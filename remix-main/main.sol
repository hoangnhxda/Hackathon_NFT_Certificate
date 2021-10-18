//SPDX-License-Identifier: open-source
pragma solidity ^0.8.5;

contract quanly{
    //cấu trúc một giấy chứng nhận
    struct Certificate{
        string title; //tên chứng nhận
        string content;//nội dung
        uint date;//ngày cấp
        address author;//địa chỉ người cấp
        string signature;//chữ ký sô của người cấp
    }
    //cấu trúc một người có quyền cấp
    struct Author{
        string name;//tên
        bool status;//quyền hạn (được cấp hoặc không)
    }
    
    address public deployAddress;//biến lưu địa chỉ của quản trị viên tối cao
    constructor(){
        deployAddress = msg.sender;//gán đại chỉ quản trị viên bằng người deploy hợp đồng thông minh
    }
    mapping (address => Author) public authors;//chứa dữ liệu những người có quyền cấp chứng nhận
    mapping(address => Certificate[]) public student; //chứa dữ liệu người được nhận chứng nhận
    
    
    //hàm cấp quyền cho author chỉ admin tối cao mới có quyền chạy hàm
    function addAuthor(string memory name, address _address) public{
        if(msg.sender == deployAddress){
            authors[_address].status = true;
            authors[_address].name = name;
        }else{
            revert("khong cos quyen");
        }
    } 
    
    
    //hàm thực hiện việc cấp chứng nhận. Chỉ những người được cấp quyền mới có thể chạy
    function addCer(address _student, string memory title, string memory content, string memory signature) public{
        
        if(authors[msg.sender].status){
            student[_student].push(Certificate(title,content,block.timestamp,msg.sender,signature));
        }else revert("khong cos quyen");
        
    }
    
    //hàm lấy danh sách chứng nhận của người có địa chỉ là _address (dữ liệu trả về trên web3js)
    function getCer(address _address) public view returns(Certificate[] memory){
        return student[_address];
    }
    
}
