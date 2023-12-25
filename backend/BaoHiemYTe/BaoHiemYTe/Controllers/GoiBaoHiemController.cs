using BaoHiemYTe.Data;
using BaoHiemYTe.Domain;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoiBaoHiemController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;

        public GoiBaoHiemController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var goiBH = userDbContext.GoiBaoHiem.ToList();
            return Ok(goiBH);
        }
        [HttpGet]
        [Route("{id}")]
        public IActionResult GetGoiBHById(int id)
        {
            var goiBH = userDbContext.GoiBaoHiem.FirstOrDefault(x => x.MaGoiBH == id);
            if (goiBH == null)
            {
                return NotFound();
            }
            var goiBHDTO = new GoiBaoHiemDTO();
            goiBHDTO.MaGoiBH = goiBH.MaGoiBH;
            goiBHDTO.TenGoiBH = goiBH.TenGoiBH;
            goiBHDTO.MotaGoiBH = goiBH.MotaGoiBH;
            goiBHDTO.Gia = goiBH.Gia;
            goiBHDTO.TiLeHoanTien = goiBH.TiLeHoanTien;
            goiBHDTO.ThoiHanBaoVe = goiBH.ThoiHanBaoVe;
            return Ok(goiBHDTO);
        }
        [HttpGet]
        [Route("GetGoiBHByUs/{username}")]
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

        [HttpPut("{MaGoiBH}/update")]
        public IActionResult ChangeGoiBaoHiem(int MaGoiBH, [FromBody] UpdateGoiBaoHiemDTO updateGoiBaoHiemDTO)
        {
            try
            {
                var goiBH = userDbContext.GoiBaoHiem.FirstOrDefault(u => u.MaGoiBH == MaGoiBH);

                if (goiBH == null)
                {
                    return NotFound("Không tìm thấy gói bảo hiểm");
                }
                
                goiBH.TenGoiBH = updateGoiBaoHiemDTO.TenGoiBH;
                goiBH.MotaGoiBH = updateGoiBaoHiemDTO.MotaGoiBH;
                goiBH.Gia = updateGoiBaoHiemDTO.Gia;
                goiBH.TiLeHoanTien = updateGoiBaoHiemDTO.TiLeHoanTien;
                goiBH.ThoiHanBaoVe = updateGoiBaoHiemDTO.ThoiHanBaoVe;
                userDbContext.SaveChanges();
                var update_GBH_dto = new GoiBaoHiemDTO
                {
                    MaGoiBH = goiBH.MaGoiBH,
                    TenGoiBH = goiBH.TenGoiBH,
                    MotaGoiBH = goiBH.MotaGoiBH,
                    Gia = goiBH.Gia,
                    TiLeHoanTien = goiBH.TiLeHoanTien,
                    ThoiHanBaoVe = goiBH.ThoiHanBaoVe
                };

                return Ok("Đổi thông tin gói bảo hiểm thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }

        [HttpPost("add")]
        public IActionResult AddGoiBaoHiem([FromBody] AddGoiBaoHiemDTO goiBaoHiemDTO)
        {
            try
            {
                var goiBaoHiem = new GoiBaoHiem
                {
                    TenGoiBH = goiBaoHiemDTO.TenGoiBH,
                    MotaGoiBH = goiBaoHiemDTO.MotaGoiBH,
                    Gia = goiBaoHiemDTO.Gia,
                    TiLeHoanTien = goiBaoHiemDTO.TiLeHoanTien,
                    ThoiHanBaoVe = goiBaoHiemDTO.ThoiHanBaoVe
                };

                // Thêm vào context và lưu vào database
                userDbContext.GoiBaoHiem.Add(goiBaoHiem);
                userDbContext.SaveChanges();

                return Ok("Gói Bảo Hiểm được tạo thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi: {ex.Message}");
            }
        }
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
