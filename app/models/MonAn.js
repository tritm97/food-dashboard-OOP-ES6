
class MonAn {
    // maMon, tenMon, loaiMon, giaMon, khuyenMai, tinhTrang, image, description 
    foodID = '';
    tenMon = '';
    loai = '';
    giaMon = '';
    khuyenMai = '';
    tinhTrang = '';
    hinhMon = '';
    moTa = '';

    // phương thức tính giá khuyến mãi
    tinhGiaKhuyenMai = () => (this.giaMon * (100 - this.khuyenMai)) / 100;
}

export default MonAn;