using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class KhachHang
    {
        [Key]
        public int MaKH { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }
        public int SoDu { get; set; }
        public User User { get; set; }
    }
}
