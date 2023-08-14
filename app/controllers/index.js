import MonAn from "../models/MonAn.js";
import Menu from "../models/Menu.js";

// tạo 1 đối tượng menu từ lớp đối tượng Menu 
let menu = new Menu(); //arrMonAn, phương thức xử lý mảng

// vừa vào trang sẽ load lấy dữ liệu từ local lên để hiển thị ngay luôn
menu.layDuLieuLocal();

// thêm món ăn
document.getElementById('foodForm').onsubmit = () => {
    event.preventDefault();

    // gọi tạo ra 1 đối tượng từ lớp đối tượng MonAn
    let monAn = new MonAn();
    console.log(monAn);
    // lấy dữ liệu từ người dùng
    // dùng vòng lặp để đi qua từng phần tử có trong mảng
    // for ... of sẽ trả về từng phần tử trong mảng
    let arrField = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea');
    for (let field of arrField) {
        // console.log(field);
        // let value = field.value;
        // let id = field.id; //cách viết trên es5

        // dùng destructuring
        let {value, id} = field; //cách viết trên es6
        monAn[id] = value;
    }
    console.log(monAn);
    // gọi ra phương thức để thêm món ăn vào mảng
    menu.themMonAn(monAn);
};


// cách đầu tiên là khai báo cho 1 đối tượng windows sự kiện xoaMonAn
window.xoaMonAn = function (id) {
    console.log(id);
    menu.xoaMonAn(id);
};

window.suaMonAn = function (id) {
    console.log(id);
    // gọi tới đối tượng menu và lấy ra món ăn tìm kiếm
    // data-toggle="modal" data-target="#exampleModal"

    // món ăn cần chỉnh sửa
    let monAn = menu.layThongTinMonAn(id);
    if (monAn) {
        // mở modal lên
        document.getElementById('btnThem').click();

        let arrField = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea');

        // for ... of 
        for (let item of arrField) {
            // item là từng cái dom tới các input, select và textarea 
            item.value = monAn[item.id]; //item đại diện cho từng input... trong form nên có thể bóc id từ item để xác định lấy dữ liệu từ thuộc tính nào trong đối tượng món ăn
        }

        // ngăn chặn người dùng ko được chỉnh sửa mã món
        document.getElementById('foodID').readOnly = true;
    }
};


// cập nhật thông tin món ăn
document.getElementById('btnCapNhat').onclick = () => {
    // console.log('object');
    // lấy dữ liệu từ người dùng về
    // tạo ra 1 đối tượng món ăn để lưu trữ dữ liệu người dùng đã chỉnh sửa
    let monAn = new MonAn();
    let arrField = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea');
    for (let item of arrField) {
        // gọi lấy ra id và value từ item, item đại diện cho từng dom bên trong arrField
        let {id, value} = item;
        monAn[id] = value;
    }
    console.log(monAn);
    menu.capNhatMonAn(monAn);

    // khi cập nhật xong nhớ tắt modal + clear form để lần sau không còn dữ liệu đó + mở readOnly cho input foodID
    document.querySelector('.modal-footer .btn-secondary').click();
    document.querySelector('#foodForm').reset();
    document.getElementById('foodID').readOnly = false;
};


// lọc món ăn dựa theo loại món 
document.getElementById('selLoai').onchange = (event) => {
    // dùng event.target để dom tới thẻ đang có sự kiện onchange
    let {value} = event.target;
    let arrFilter = [];
    // check nếu như value == all thì sẽ ko lọc mà lấy hết tất cả

    if (value == 'all') {
        arrFilter = menu.arrMonAn;
    } else {
        // dùng value để lọc ra các món ăn theo người dùng muốn
        arrFilter = menu.arrMonAn.filter((item) => item.loai == value);
        console.log(arrFilter);
    };
    menu.renderMonAn(arrFilter);
};

// về nhà làm phần tìm kiếm
console.log(menu.arrMonAn);

// tìm kiếm món ăn theo loại
window.timKiemTheoLoai = function () {
    // chuyển đổi dữ liệu nhập vào về dạng chữ thường và loại bỏ khoảng cách
    let keyword = document.getElementById('timKiem').value.toLowerCase().trim();
    // loại bỏ các dấu trong tiếng Việt
    let newKeyWord = removeVietnameseTones(keyword);
    console.log(newKeyWord);

    let arrTimKiem = [];
    // hàm giúp kiểm tra xem ký tự này có nằm trong chuỗi đó hay không - includes()
    for (var i = 0; i < menu.arrMonAn.length; i++) {
        let loaiMonAn = '';

        // console.log(menu.arrMonAn[i].loai);
        // if (menu.arrMonAn[i].loai == 'loai1') {
        //     loaiMonAn = 'chay';
        // } else if (menu.arrMonAn[i].loai == 'loai2') {
        //     loaiMonAn = 'man';
        // }
        switch (menu.arrMonAn[i].loai) {
            case 'loai1': loaiMonAn = 'chay';
            break;
            case 'loai2': loaiMonAn = 'man';
            break;
            default: loaiMonAn = '';
        }
        // console.log(typeof loaiMonAn);

        if (loaiMonAn.includes(newKeyWord)) {
            arrTimKiem.push(menu.arrMonAn[i]);
        }
    }
    menu.renderMonAn(arrTimKiem);
};




