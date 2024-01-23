using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;


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
            if (string.IsNullOrEmpty(username))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }
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
                NhanVien = d.NhanVien,
                LiDoTuChoi = d.LiDoTuChoi,
                ThoiGianDuyet = d.ThoiGianDuyet ?? default(DateTime),

            });

            return Ok(donDangKyDTOs);
        }

        // GET: api/DonDangKy/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DonDangKyDTO>> GetDonDangKyById(int id)
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
                ThoiGianDuyet = donDangKy.ThoiGianDuyet ?? default(DateTime),
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
            donDangKy.LiDoTuChoi = updateDto.LiDoTuChoi;
            donDangKy.ThoiGianDuyet = updateDto.ThoiGianDuyet;

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
                        throw;
                    }
                }
                catch (Exception)
                {
                    // Log or handle the exception as needed
                    transaction.Rollback();
                    throw;
                }
            }

            return NoContent();
        }


        private bool DonDangKyExists(int id)
        {
            return _dbContext.DonDangKy.Any(e => e.MaDonDK == id);
        }

        // GET: api/DonDangKy/KhachHang/TinhTrang
        [HttpGet("LichSuDK/{tinhtrang}")]
        public async Task<ActionResult<DonDangKyDTO>> GetDonDKUser(string tinhtrang)
        {
            try
            {
                var tokenService = new TokenService();
                // Sử dụng TokenService để lấy username từ token
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "khachhang";
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = _dbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                var donDangKys = await _dbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .Where(d => d.TinhTrang == tinhtrang)
                    .ToListAsync();

                if (donDangKys == null)
                {
                    return NotFound();
                }

                var donDangKyDTOs = donDangKys.Select(d => new DonDangKyDTO
                {
                    MaDonDK = d.MaDonDK,
                    MaGoiBH = d.MaGoiBH,
                    // Thêm tên Gói Bảo Hiểm
                    TenGoiBH = _dbContext.GoiBaoHiem
                            .Where(g => g.MaGoiBH == d.MaGoiBH)
                            .Select(g => g.TenGoiBH)
                            .FirstOrDefault(),
                    ThoiGianDK = d.ThoiGianDK,
                    ThoiGianBD = d.ThoiGianBD,
                    ThoiGianHetHan = d.ThoiGianHetHan,
                    TinhTrang = d.TinhTrang,
                    LiDoTuChoi = d.LiDoTuChoi,
                    SoKyHanThanhToan = d.SoKyHanThanhToan,
                    TongGia = d.TongGia,
                    MaKH = d.MaKH,
                    MaNV = d.MaNV
                });

                return Ok(donDangKyDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        // Lấy toàn bộ lịch sử đăng ký của user hiện tại
        // GET: api/DonDangKy/KhachHang
        [HttpGet("LichSuDK")]
        public async Task<ActionResult<DonDangKyDTO>> danhsachdondk()
        {
            try
            {
                var tokenService = new TokenService();
                // Sử dụng TokenService để lấy username từ token
                var username = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }
                //var username = "khachhang";
                // Lấy thông tin MaKH từ bảng KhachHang
                var maKH = _dbContext.KhachHang
                    .Where(u => u.username == username)
                    .Select(u => u.MaKH)
                    .FirstOrDefault();

                if (maKH == 0)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
                }

                var donDangKys = await _dbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .ToListAsync();

                if (donDangKys == null)
                {
                    return NotFound();
                }

                var donDangKyDTOs = donDangKys.Select(d => new DonDangKyDTO
                {
                    MaDonDK = d.MaDonDK,
                    MaGoiBH = d.MaGoiBH,
                    TenGoiBH = _dbContext.GoiBaoHiem
                            .Where(g => g.MaGoiBH == d.MaGoiBH)
                            .Select(g => g.TenGoiBH)
                            .FirstOrDefault(),
                    ThoiGianDK = d.ThoiGianDK,
                    ThoiGianBD = d.ThoiGianBD,
                    ThoiGianHetHan = d.ThoiGianHetHan,
                    TinhTrang = d.TinhTrang,
                    LiDoTuChoi = d.LiDoTuChoi,
                    SoKyHanThanhToan = d.SoKyHanThanhToan,
                    TongGia = d.TongGia,
                    MaKH = d.MaKH,
                    MaNV = d.MaNV
                });

                return Ok(donDangKyDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        // Nhân viên lấy toàn bộ lịch sử đăng ký của 1 user
        // GET: api/DonDangKy/KhachHang
        [HttpGet("LichSuDK/NhanVien/{user}")]
        public async Task<ActionResult<DonDangKyDTO>> DonDKByNhanVien(string user)
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

                // Kiểm tra xem người dùng có role "Nhân viên" hay không
                var isNhanVien = _dbContext.Users.Any(u => u.username == username && u.role == "Nhân viên");


                if (isNhanVien)
                {
                    // Lấy mã khách hàng
                    var maKH = _dbContext.KhachHang
                        .Where(u => u.username == user)
                        .Select(u => u.MaKH)
                        .FirstOrDefault();

                    var donDangKys = await _dbContext.DonDangKy
                    .Where(d => d.MaKH == maKH)
                    .ToListAsync();

                    if (donDangKys == null)
                    {
                        return NotFound();
                    }

                    var donDangKyDTOs = donDangKys.Select(d => new DonDangKyDTO
                    {
                        MaDonDK = d.MaDonDK,
                        MaGoiBH = d.MaGoiBH,
                        TenGoiBH = _dbContext.GoiBaoHiem
                                .Where(g => g.MaGoiBH == d.MaGoiBH)
                                .Select(g => g.TenGoiBH)
                                .FirstOrDefault(),
                        ThoiGianDK = d.ThoiGianDK,
                        ThoiGianBD = d.ThoiGianBD,
                        ThoiGianHetHan = d.ThoiGianHetHan,
                        TinhTrang = d.TinhTrang,
                        LiDoTuChoi = d.LiDoTuChoi,
                        SoKyHanThanhToan = d.SoKyHanThanhToan,
                        TongGia = d.TongGia,
                        MaKH = d.MaKH,
                        MaNV = d.MaNV
                    });

                    return Ok(donDangKyDTOs);
                }
                else
                {
                    return BadRequest("Không có quyền truy cập danh sách khách hàng");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
    }
}
