import MonAn from "./MonAn.js";

class Menu {
    // sẽ là nơi chứa mảng tất cả các món ăn và các phương thức xử lý với mảng đó
    arrMonAn = [];
    
    // thêm món ăn, render món ăn lên giao diện, xoá món ăn, cập nhật món ăn, lưu xuống local và gọi dữ liệu từ local lên, tìm kiếm và lọc theo yêu cầu

    // thêm món ăn
    themMonAn = (monAn) => {
        this.arrMonAn.push(monAn);
        this.renderMonAn();
        this.luuXuongLocal();
    };

    // render dữ liệu
    renderMonAn = (arr = this.arrMonAn) => {
        let content = '';
        for (let i = 0; i<arr.length; i++) {
            // spread operator
            let monAn = new MonAn();
            Object.assign(monAn, arr[i]);
            // monAn = {...monAn, ...arr[i]}; //viết như hàng trên cũng đúng

            let {foodID, tenMon, loai, giaMon, khuyenMai, tinhTrang, tinhGiaKhuyenMai} = monAn;
            // loai == 'loai1' ? 'Chay' : 'Mặn' đây là toán tử 3 ngôi
            content += `
            <tr>
                <td>${foodID}</td>
                <td>${tenMon}</td>
                <td>${loai == 'loai1' ? 'Chay' : 'Mặn'}</td>
                <td>${giaMon}</td>
                <td>${khuyenMai}</td>
                <td>${tinhGiaKhuyenMai()}</td>
                <td>${tinhTrang == '0' ? 'Hết' : 'Còn'}</td>
                <td>
                    <button class="btn btn-danger" onclick="xoaMonAn('${foodID}')">Xoá</button>
                    <button class="btn btn-warning" onclick="suaMonAn('${foodID}')">Sửa</button>
                </td>
            </tr>
            `;
        }
        document.getElementById('tbodyFood').innerHTML = content;
    };

    // lưu xuống local 
    luuXuongLocal = () => {
        // chuyển mảng thành dạng dữ liệu JSON.stringify
        let chuoiJson = JSON.stringify(this.arrMonAn);
        localStorage.setItem('arrMonAn', chuoiJson);
    };

    // lấy từ local lên 
    layDuLieuLocal = () => {
        // gọi dữ liệu từ local lên
        let arrMonAn = localStorage.getItem('arrMonAn');
        // parse chuỗi json về lại kiểu dữ liệu ban đầu
        // parse xong sẽ gán giá trị vào bên trong arrMonAn của lớp đối tượng
        if (arrMonAn) {
            this.arrMonAn = JSON.parse(arrMonAn);
            this.renderMonAn();
        }
    };

    // phương thức xoá món ăn khỏi mảng 
    xoaMonAn = (id) => {
        // findIndex => tìm ra được vị trí index của phần tử chúng ta muốn tìm 

        // let index = this.arrMonAn.findIndex(function(item,index) {
        //     // có 1 biểu thức so sánh để tìm ra được item mà các bạn muốn
        //     return id === item.foodID; //nếu id đưa vào == id trong mảng thì return vị trí index
        // }); //đây là cách viết findIndex truyền thống

        // findIndex sử dụng với arrow function
        let index = this.arrMonAn.findIndex((item) => item.foodID == id);

        // TH1: tìm được phần tử mà chúng ta muốn
        // TH2: tìm không có phần tử đó trong mảng => index = -1

        if (index !== -1) {
            this.arrMonAn.splice(index, 1);
            this.renderMonAn();
            this.luuXuongLocal();
        }
    };



    // đầu tiên tìm thông tin về món ăn người dùng muốn sửa sau đó cho hiển thị lên form 
    
    // lấy thông tin món ăn
    layThongTinMonAn = (id) => {
        // dùng id để xác định phần tử cần lấy
        // hàm find giúp lấy ra phần tử thoả điều kiện bên trong mảng
        let monAn = this.arrMonAn.find(function(item, index) {
            return item.foodID == id;
        });
        // TH1: tìm được phần tử mà chúng ta muốn
        // TH2: tìm không có phần tử đó trong mảng => monAn = undefind
        if (monAn) {
            return monAn;
        }

    };

    // sau khi chỉnh sửa xong sẽ lấy hết thông tin và update lại món ăn đó
    capNhatMonAn = (monAn) => {
        // tìm vị trí index của món cần sửa
        let index = this.arrMonAn.findIndex((item) => item.foodID == monAn.foodID);
        if (index !== -1) {
            this.arrMonAn[index] = monAn;
            this.luuXuongLocal();
            this.renderMonAn();
        }
    };
}

export default Menu;