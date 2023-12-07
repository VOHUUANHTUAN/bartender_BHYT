using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BaoHiemYTe.Domain
{
    public class NhanVien
    {
        [Key]
        public int MaNV { get; set; }
        public string HoTen { get; set; }
        public string DiaChi { get; set; }
        public string SDT { get; set; }
        public string Email { get; set; }

        // Khai báo khóa ngoại với User
        [ForeignKey("username")]
        public User User { get; set; }

        public string username { get; set; }
    }
}
