namespace BaoHiemYTe.DTOs
{
    public class DonDangKyUpdateDto
    {
        public string TinhTrang { get; set; }
        public int MaNV { get; set; }
        public DateTime ThoiGianBD { get; set; }
        public DateTime ThoiGianHetHan {  get; set; }

        // Properties for updating NhanVien
        public string DiaChi { get; set; }
        public string Email { get; set; }
        public string HoTen { get; set; }
        public string SDT { get; set; }

        // Add more properties as needed for updating NhanVien
    }
}