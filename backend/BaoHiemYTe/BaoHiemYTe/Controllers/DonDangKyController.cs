using BaoHiemYTe.Data;
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

        public DonDangKyController(UserDbContext dbContext)
        {
            _dbContext = dbContext;
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
                LuaChonThanhToan = d.LuaChonThanhToan,
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
                LuaChonThanhToan = donDangKy.LuaChonThanhToan,
                TongGia = donDangKy.TongGia,
                MaKH = donDangKy.MaKH,
                MaNV = donDangKy.MaNV,
                KhachHang = donDangKy.KhachHang,
                GoiBaoHiem = donDangKy.GoiBaoHiem,
                NhanVien = donDangKy.NhanVien
            };

            return Ok(donDangKyDTO);
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
