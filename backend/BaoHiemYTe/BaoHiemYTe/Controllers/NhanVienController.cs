using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NhanVienController: ControllerBase
    {
        private readonly UserDbContext userDbContext;
        public NhanVienController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        [HttpGet("{username}")]
        public IActionResult GetByUsername(string username)
        {
            try
            {
                var user = userDbContext.NhanVien.FirstOrDefault(u => u.username == username);

                if (user == null)
                {
                    return NotFound("Không tìm thấy username");
                }

                var NhanVienDTO = new NhanVienDTO
                {
                    MaNV = user.MaNV,
                    HoTen = user.HoTen,
                    DiaChi = user.DiaChi,
                    SDT = user.SDT,
                    Email = user.Email
                };

                return Ok(NhanVienDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }
    }
}
