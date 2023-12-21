using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YeuCauHoanTraController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;

        public YeuCauHoanTraController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }

        [HttpGet("GetAllYeuCauHoanTra")]
        public IActionResult GetAllYeuCauHoanTra()
        {
            try
            {
                // Lấy tất cả các YeuCauHoanTra từ database
                var yeuCauHoanTraList = userDbContext.YeuCauHoanTra.ToList();

                // Nếu không có yêu cầu nào, trả về NotFound
                if (yeuCauHoanTraList == null || !yeuCauHoanTraList.Any())
                {
                    return NotFound("Không có yêu cầu hoàn trả nào được tìm thấy.");
                }

                // Chuyển đổi từ List<YeuCauHoanTra> sang List<YeuCauHoanTraDTO>
                var yeuCauHoanTraDTOs = yeuCauHoanTraList.Select(y => new YeuCauHoanTraDTO
                {
                    MaYC = y.MaYC,
                    MaHDKhamBenh = y.MaHDKhamBenh,
                    TenBenhVien = y.TenBenhVien,
                    SoTienDaKham = y.SoTienDaKham,
                    Benh = y.Benh,
                    ThoiGianTao = y.ThoiGianTao,
                    TinhTrang = y.TinhTrang,
                    MaGoiBHApDung = y.MaGoiBHApDung,
                    SoTienHoanTra = y.SoTienHoanTra,
                    MaKH = y.MaKH,
                    MaNV = y.MaNV,
                    ThoiGianDuyet = y.ThoiGianDuyet
                }).ToList();


                return Ok(yeuCauHoanTraDTOs);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }


        [HttpGet("GetYCHTByUs/{username}")]
        public IActionResult GetYCHTByUs(string username)
        {
            var maKH = userDbContext.KhachHang
            .Where(u => u.username == username)
            .Select(u => u.MaKH)
            .FirstOrDefault();

            if (maKH == 0)
            {
                return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {username}");
            }

            // Lấy danh sách Ma yeu cau
            var maYCHTs = userDbContext.YeuCauHoanTra
                .Where(d => d.MaKH == maKH)
                .Select(d => d.MaYC)
                .ToList();

            if (maYCHTs == null || !maYCHTs.Any())
            {
                return NotFound($"Không có danh sách hoàn trả");
            }
            var MaYCEntities = userDbContext.YeuCauHoanTra
                .Where(h => maYCHTs.Contains(h.MaYC))
                .ToList();

            if (MaYCEntities == null || !MaYCEntities.Any())
            {
                return NotFound($"Người dùng {maYCHTs} không có 2");
            }
            var YeuCauHoanTraDTOs = MaYCEntities.Select(h => new YeuCauHoanTraDTO
            {
                MaYC = h.MaYC,
                MaHDKhamBenh = h.MaHDKhamBenh,
                TenBenhVien = h.TenBenhVien,
                Benh = h.Benh,
                SoTienDaKham = h.SoTienDaKham,
                ThoiGianTao = h.ThoiGianTao,
                TinhTrang = h.TinhTrang,
                MaGoiBHApDung = h.MaGoiBHApDung,
                SoTienHoanTra = h.SoTienHoanTra,
                MaKH = h.MaKH,
                MaNV = h.MaNV,
                ThoiGianDuyet = h.ThoiGianDuyet,

            }).ToList();

            return Ok(YeuCauHoanTraDTOs);
        }
        [HttpPost("TaoYeuCauHoanTra")]
        public IActionResult TaoYeuCauHoanTra([FromBody] AddYeuCauHoanTraDTO yeuCauDTO)
        {
            try
            {
                // Lấy thông tin MaKH từ bảng KhachHang
                var khachHang = userDbContext.KhachHang
                    .Where(u => u.username == yeuCauDTO.username)
                    .FirstOrDefault();

                if (khachHang == null)
                {
                    return NotFound($"Không tìm thấy thông tin khách hàng của người dùng {yeuCauDTO.username}");
                }

                // Tạo đối tượng YeuCauHoanTra từ DTO
                var yeuCauHoanTra = new YeuCauHoanTra
                {
                    MaHDKhamBenh = yeuCauDTO.MaHDKhamBenh,
                    TenBenhVien = yeuCauDTO.TenBenhVien,
                    SoTienDaKham = yeuCauDTO.SoTienDaKham,
                    Benh = yeuCauDTO.Benh,
                    MaGoiBHApDung = yeuCauDTO.MaGoiBHApDung,
                    ThoiGianTao = DateTime.Now,
                    TinhTrang = "Chờ duyệt",
                    MaKH = khachHang.MaKH,
                    ThoiGianDuyet = null,
                    MaNV = null,
                    SoTienHoanTra = yeuCauDTO.SoTienHoanTra
                };

                // Thêm vào context và lưu vào database
                userDbContext.YeuCauHoanTra.Add(yeuCauHoanTra);
                userDbContext.SaveChanges();

                return Ok("Yêu cầu hoàn trả đã được tạo thành công");
            }
            catch (DbUpdateException ex)
            {
                if (ex.InnerException is SqlException sqlException && sqlException.Number == 2601)
                {
                    // Lỗi 2601 là lỗi unique constraint
                    // Xử lý lỗi unique constraint ở đây
                    return StatusCode(400, "Mã hóa đơn khám bệnh đã tồn tại.");
                }
                else
                {
                    // Xử lý các trường hợp khác của DbUpdateException
                    return StatusCode(500, "Lỗi: " + ex.InnerException?.Message);
                }
            }
            catch (Exception ex)
            {
                // Xử lý các ngoại lệ khác
                return StatusCode(500, "Lỗi: " + ex.Message);
            }

        }

    




        /*
        [HttpGet]
        [Route("GetYCHTByUs/{username}")]
        public IActionResult GetGoiBHByUsername(string username)
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

            // Lấy danh sách Ma Goi BH từ bảng DonDangKy
            var maGoiBHs = userDbContext.DonDangKy
                .Where(d => (d.MaKH == maKH && d.TinhTrang == "Đã kích hoạt"))
                .Select(d => d.MaGoiBH)
                .ToList();

            if (maGoiBHs == null || !maGoiBHs.Any())
            {
                return NotFound($"Người dùng {username} không có Goi Bao Hiem");
            }

            // Lấy thông tin Benh từ bảng Benh
            var GoiBHEntities = userDbContext.GoiBaoHiem
                .Where(h => maGoiBHs.Contains(h.MaGoiBH))
                .ToList();

            if (GoiBHEntities == null || !GoiBHEntities.Any())
            {
                return NotFound();
            }
            // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
            var GoiBHDTOs = GoiBHEntities.Select(h => new GoiBaoHiemDTO
            {
                MaGoiBH = h.MaGoiBH,
                TenGoiBH = h.TenGoiBH,
                MotaGoiBH = h.MotaGoiBH,
                Gia = h.Gia,
                TiLeHoanTien = h.TiLeHoanTien,
                ThoiHanBaoVe = h.ThoiHanBaoVe

        }).ToList();

            return Ok(GoiBHDTOs);
        }
        */

        /*
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<GoiBaoHiemController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<GoiBaoHiemController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<GoiBaoHiemController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<GoiBaoHiemController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }*/
    }
}
