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
    public class ChinhSachController : ControllerBase
    {
        // GET: api/<GoiBaoHiemController>
        private readonly UserDbContext userDbContext;

        public ChinhSachController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var chinhSach = userDbContext.ChinhSach.ToList();
            return Ok(chinhSach);
        }
        [HttpGet]
        [Route("{MaGoiBH}")]
        public IActionResult GetChinhSachByGoiBH(int MaGoiBH)
        {
            // Lấy thông tin chinh sach theo ma goi BH
            var chinhSachEntities = userDbContext.ChinhSach
                .Where(c => c.MaGoiBH == MaGoiBH)
                .ToList();

            if (chinhSachEntities == null || !chinhSachEntities.Any())
            {
                return NotFound("Khong co chinh sach nao duoc tim thay");
            }
            // Chuyển đổi từ List<HoaDonThanhToanDK> sang List<HoaDonThanhToanDKDTO>
            var chinhSachDTOs = chinhSachEntities.Select(h => new ChinhSachDTO
            {
                MaGoiBH = h.MaGoiBH,
                MaBenh = h.MaBenh,
            }).ToList();

            return Ok(chinhSachDTOs);
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddChinhSach(ChinhSachDTO chinhSachDTO)
        {
            try
            {
                var chinhSach = new ChinhSach
                {
                    MaGoiBH = chinhSachDTO.MaGoiBH,
                    MaBenh = chinhSachDTO.MaBenh
                };
                // Thêm vào context và lưu vào database
                userDbContext.ChinhSach.Add(chinhSach);
                userDbContext.SaveChanges();

                return Ok("Chinh sach duoc them thành công");
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }
        }

        [HttpDelete]
        [Route("{maGoiBH}/{maBenh}/delete")]
        public IActionResult DeleteChinhSach(int maGoiBH, int maBenh)
        {
            try
            {
                var chinhSach = userDbContext.ChinhSach
                .FirstOrDefault(cs => cs.MaBenh == maBenh && cs.MaGoiBH == maGoiBH) ?? throw new ArgumentException($"ChinhSach with MaBenh {maBenh} and MaGoiBH {maGoiBH} not found");
                userDbContext.ChinhSach.Remove(chinhSach);
                userDbContext.SaveChanges();

                return Ok("Chinh sach voi MaBenh {maBenh} and MaGoiBH {maGoiBH} duoc xoa thành công");
            }

            catch (Exception ex)
            {
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
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
