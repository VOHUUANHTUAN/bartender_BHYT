using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Authorization;
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
        public IActionResult GetByUsername()
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check for the presence and validity of the token
            var tokenService = new TokenService();
            var username = tokenService.GetUsernameFromToken(HttpContext.Request);
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
            var role = tokenService.GetRoleFromToken(HttpContext.Request);
            if (role != "Nhân viên")
            {
                return Unauthorized("Unauthorized: role is missing or invalid");
            }
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
        [HttpGet("GetHoaDonNapTien")]
        public IActionResult GetHoaDonNapTien()
        {
            try
            {
                var tokenService = new TokenService();
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);
                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "admin";
                // Kiểm tra xem MaNV có tồn tại và có role Nhân viên hay không
                var nhanVien = userDbContext.NhanVien
                    .FirstOrDefault(nv => nv.username == username);

                if (nhanVien == null)
                {
                    return Unauthorized("Không có quyền truy cập");
                }

                // Lấy danh sách hóa đơn nạp tiền
                var hoaDonNapTienList = userDbContext.HoaDonNapTien
                    .Where(hd => hd.MaNV == nhanVien.MaNV)
                    .Select(hd => new HoaDonNapTienDTO
                    {
                        MaHD = hd.MaHD,
                        SoTien = hd.SoTien,
                        SoDu = hd.SoDu,
                        ThoiGianNap = hd.ThoiGianNap,
                        MaKH = hd.MaKH,
                        MaNV = hd.MaNV
                    })
                    .ToList();

                if (hoaDonNapTienList != null && hoaDonNapTienList.Any())
                {
                    return Ok(hoaDonNapTienList);
                }
                else
                {
                    return NotFound("Không có hóa đơn nạp tiền nào");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }

    }
}
