using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HoaDonThanhToanDKController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;

        public HoaDonThanhToanDKController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
       
       
        [HttpGet("GetHoaDonThanhToanByUserName/{username}")]
        public IActionResult GetHoaDonThanhToanByUserName(string username)
        {
            try
            {
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = userDbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                // Lấy danh sách MaDonDK từ bảng DonDangKy
                var maDonDKs = userDbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .Select(d => d.MaDonDK)
                    .ToList();

                if (maDonDKs == null || !maDonDKs.Any())
                {
                    return NotFound($"Người dùng {username} không có Đơn Đăng Ký");
                }

                // Lấy thông tin Hóa Đơn từ bảng HoaDonThanhToanDK
                var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                    .Where(h => maDonDKs.Contains(h.MaDonDK))
                    .ToList();

                if (hoaDonThanhToanEntities == null || !hoaDonThanhToanEntities.Any())
                {
                    return NotFound($"Người dùng {username} không có Hóa Đơn Thanh Toán Đăng Ký");
                }

                // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
                var hoaDonThanhToanDTOs = hoaDonThanhToanEntities.Select(h => new HoaDonThanhToanDKDTO
                {
                    MaHD = h.MaHD,
                    SoTien = h.SoTien,
                    ThoiGianHetHan = h.ThoiGianHetHan,
                    HanKy = h.HanKy,
                    TinhTrangThanhToan = h.TinhTrangThanhToan,
                    ThoiGianThanhToan = h.ThoiGianThanhToan,
                    MaDonDK = h.MaDonDK
                }).ToList();

                return Ok(hoaDonThanhToanDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
        [HttpGet("GetHoaDonThanhToanByUserNameAndTinhTrang/{username}/{tinhTrang}")]
        public IActionResult GetHoaDonThanhToanByUserNameAndTinhTrang(string username, string tinhTrang)
        {
            try
            {
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = userDbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                // Lấy danh sách MaDonDK từ bảng DonDangKy
                var maDonDKs = userDbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .Select(d => d.MaDonDK)
                    .ToList();

                if (maDonDKs == null || !maDonDKs.Any())
                {
                    return NotFound($"Người dùng {username} không có Đơn Đăng Ký");
                }

                // Lấy thông tin Hóa Đơn từ bảng HoaDonThanhToanDK với điều kiện TinhTrangThanhToan
                var hoaDonThanhToanEntities = userDbContext.HoaDonThanhToanDK
                    .Where(h => maDonDKs.Contains(h.MaDonDK) && h.TinhTrangThanhToan == tinhTrang)
                    .ToList();

                if (hoaDonThanhToanEntities == null || !hoaDonThanhToanEntities.Any())
                {
                    return NotFound($"Người dùng {username} không có Hóa Đơn Thanh Toán Đăng Ký với Tình Trạng Thanh Toán là {tinhTrang}");
                }

                // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
                var hoaDonThanhToanDTOs = hoaDonThanhToanEntities.Select(h => new HoaDonThanhToanDKDTO
                {
                    MaHD = h.MaHD,
                    SoTien = h.SoTien,
                    ThoiGianHetHan = h.ThoiGianHetHan,
                    HanKy = h.HanKy,
                    TinhTrangThanhToan = h.TinhTrangThanhToan,
                    ThoiGianThanhToan = h.ThoiGianThanhToan,
                    MaDonDK = h.MaDonDK
                }).ToList();

                return Ok(hoaDonThanhToanDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }


    }
}
