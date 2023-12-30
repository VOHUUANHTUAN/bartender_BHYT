﻿using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DonDangKyController : ControllerBase
    {
        private readonly UserDbContext _dbContext;
        private readonly TokenService tokenService;

        public DonDangKyController(UserDbContext dbContext, TokenService tokenService)
        {
            _dbContext = dbContext;
            this.tokenService = tokenService;
        }

        // GET: api/DonDangKy
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DonDangKyDTO>>> GetAll()
        {
            var donDangKys = await _dbContext.DonDangKy
                .Include(d => d.KhachHang)
                .Include(d => d.GoiBaoHiem)
                .Include(d => d.NhanVien)
                .ToListAsync();

            var donDangKyDTOs = donDangKys.Select(d => new DonDangKyDTO
            {
                MaDonDK = d.MaDonDK,
                MaGoiBH = d.MaGoiBH,
                ThoiGianDK = d.ThoiGianDK,
                ThoiGianBD = d.ThoiGianBD,
                ThoiGianHetHan = d.ThoiGianHetHan,
                TinhTrang = d.TinhTrang,
                SoKyHanThanhToan = d.SoKyHanThanhToan,
                TongGia = d.TongGia,
                MaKH = d.MaKH,
                MaNV = d.MaNV,
                KhachHang = d.KhachHang,
                GoiBaoHiem = d.GoiBaoHiem,
                NhanVien = d.NhanVien
            });

            return Ok(donDangKyDTOs);
        }

        // GET: api/DonDangKy/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DonDangKyDTO>> GetDonDangKyById(int id)
        {
            var donDangKy = await _dbContext.DonDangKy
                .Include(d => d.KhachHang)
                .Include(d => d.GoiBaoHiem)
                .Include(d => d.NhanVien)
                .FirstOrDefaultAsync(d => d.MaDonDK == id);

            if (donDangKy == null)
            {
                return NotFound();
            }

            var donDangKyDTO = new DonDangKyDTO
            {
                MaDonDK = donDangKy.MaDonDK,
                MaGoiBH = donDangKy.MaGoiBH,
                ThoiGianDK = donDangKy.ThoiGianDK,
                ThoiGianBD = donDangKy.ThoiGianBD,
                ThoiGianHetHan = donDangKy.ThoiGianHetHan,
                TinhTrang = donDangKy.TinhTrang,
                SoKyHanThanhToan = donDangKy.SoKyHanThanhToan,
                TongGia = donDangKy.TongGia,
                MaKH = donDangKy.MaKH,
                MaNV = donDangKy.MaNV,
                KhachHang = donDangKy.KhachHang,
                GoiBaoHiem = donDangKy.GoiBaoHiem,
                NhanVien = donDangKy.NhanVien
            };

            return Ok(donDangKyDTO);
        }

        [HttpPost]
        public async Task<IActionResult> PostDonDangKy([FromBody] DonDangKyDTO donDangKyDTO)
        {
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    if (!ModelState.IsValid)
                    {
                        return BadRequest(ModelState);
                    }

                    var tokenService = new TokenService();
                    var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);
                    //var username_ = "quyetvang";
                    if (string.IsNullOrEmpty(username_))
                    {
                        return Unauthorized("Unauthorized: Token is missing or invalid");
                    }

                    var khachHang = _dbContext.KhachHang.FirstOrDefault(kh => kh.username == username_);
                    if (khachHang == null)
                    {
                        return NotFound($"Người dùng với username {username_} không tồn tại");
                    }

                    var donDangKy = new DonDangKy
                    {
                        MaGoiBH = donDangKyDTO.MaGoiBH,
                        ThoiGianDK = donDangKyDTO.ThoiGianDK,
                        ThoiGianBD = donDangKyDTO.ThoiGianBD,
                        ThoiGianHetHan = donDangKyDTO.ThoiGianHetHan,
                        TinhTrang = donDangKyDTO.TinhTrang,
                        SoKyHanThanhToan = donDangKyDTO.SoKyHanThanhToan,
                        TongGia = donDangKyDTO.TongGia,
                        MaKH = khachHang.MaKH,
                        MaNV = null,
                    };

                    _dbContext.DonDangKy.Add(donDangKy);
                    await _dbContext.SaveChangesAsync();

                    // Chèn danh sách id bệnh vào TinhTrangBenh
                    foreach (var benhId in donDangKyDTO.BenhIds)
                    {
                        var tinhTrangBenh = new TinhTrangBenh
                        {
                            MaDonDK = donDangKy.MaDonDK,
                            MaBenh = benhId,
                            TinhTrang = "" // Thay bằng tình trạng thích hợp
                        };

                        _dbContext.TinhTrangBenh.Add(tinhTrangBenh);
                    }



                    await _dbContext.SaveChangesAsync();
                    transaction.Commit();

                    return Ok("Đăng ký gói bảo hiểm thành công");
                }
                catch (DbUpdateException ex)
                {
                    // Xử lý lỗi từ Entity Framework, ví dụ: khóa ngoại không hợp lệ
                    transaction.Rollback();
                    return BadRequest("Dữ liệu không hợp lệ. Vui lòng kiểm tra lại thông tin đăng ký.");
                }
                catch (Exception ex)
                {
                    // Xử lý lỗi khác
                    transaction.Rollback();
                    return StatusCode(500, "Đã xảy ra lỗi trong quá trình đăng ký gói bảo hiểm");
                }
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateDonDangKyStatus(int id, [FromBody] DonDangKyUpdateDto updateDto)
        {
            if (updateDto == null)
            {
                return BadRequest("Invalid data");
            }

            var donDangKy = await _dbContext.DonDangKy
                .Include(d => d.NhanVien)
                .FirstOrDefaultAsync(d => d.MaDonDK == id);

            if (donDangKy == null)
            {
                return NotFound();
            }

            // Update DonDangKy properties
            donDangKy.TinhTrang = updateDto.TinhTrang;
            donDangKy.MaNV = updateDto.MaNV;
            donDangKy.ThoiGianBD = updateDto.ThoiGianBD;
            donDangKy.ThoiGianHetHan= updateDto.ThoiGianHetHan;
            // Update NhanVien properties if NhanVien is not null
            if (donDangKy.NhanVien != null)
            {
                donDangKy.NhanVien.DiaChi = updateDto.DiaChi;
                donDangKy.NhanVien.Email = updateDto.Email;
                donDangKy.NhanVien.HoTen = updateDto.HoTen;
                donDangKy.NhanVien.SDT = updateDto.SDT;
                donDangKy.NhanVien.MaNV = updateDto.MaNV;
                // Add more properties as needed for updating NhanVien
            }

            // Use a transaction if needed
            using (var transaction = _dbContext.Database.BeginTransaction())
            {
                try
                {
                    await _dbContext.SaveChangesAsync();
                    transaction.Commit();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!DonDangKyExists(id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        // Log or handle the exception as needed
                        transaction.Rollback();
                        throw;
                    }
                }
            }

            return NoContent();
        }

        private bool DonDangKyExists(int id)
        {
            return _dbContext.DonDangKy.Any(e => e.MaDonDK == id);
        }
    }
}
