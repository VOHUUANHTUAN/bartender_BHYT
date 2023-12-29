using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BaoHiemYTe.Controllers;
using BaoHiemYTe.Domain;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KhachHangController : ControllerBase
    {
        private readonly UserDbContext userDbContext;
        private readonly TokenService tokenService;

        public KhachHangController(UserDbContext userDbContext, TokenService tokenService)
        {
            this.userDbContext = userDbContext;
            this.tokenService = tokenService;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                var tokenService = new TokenService();
                var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username_))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }


                //Kiểm tra xem username có tồn tại trong bảng KhachHang hay không
                var existingKhachHang = userDbContext.KhachHang.FirstOrDefault(kh => kh.username == username_);

                if (existingKhachHang != null)
                {
                    // Return information for the found user
                    var khachHangDTO = new KhachHangDTO
                    {
                        MaKH = existingKhachHang.MaKH,
                        HoTen = existingKhachHang.HoTen,
                        DiaChi = existingKhachHang.DiaChi,
                        SDT = existingKhachHang.SDT,
                        Email = existingKhachHang.Email   ,
                        SoDu = existingKhachHang.SoDu,
                        username = username_
                    };

                    return Ok(khachHangDTO);
                }
                else
                {
                    return NotFound($"Không tìm thấy thông tin cho người dùng có username: {username_}");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }

        [HttpPost]
        public IActionResult Post([FromBody] KhachHangDTO khachHangDTO)
        {
            try
            {

                var tokenService = new TokenService();
                var username_ = tokenService.GetUsernameFromToken(HttpContext.Request);

                if (string.IsNullOrEmpty(username_))
                {
                    return Unauthorized("Unauthorized: Token is missing or invalid");
                }

                // Kiểm tra xem username có tồn tại trong bảng KhachHang hay không
                var existingKhachHang = userDbContext.KhachHang.FirstOrDefault(kh => kh.username == username_);

                if (existingKhachHang != null)
                {
                    // Nếu đã có, cập nhật thông tin
                    existingKhachHang.HoTen = khachHangDTO.HoTen;
                    existingKhachHang.DiaChi = khachHangDTO.DiaChi;
                    existingKhachHang.SDT = khachHangDTO.SDT;
                    existingKhachHang.Email = khachHangDTO.Email;
                    userDbContext.SaveChanges();
                    return Ok("Cập nhật thông tin thành công");
                }
                else
                {
                    // Nếu không tìm thấy username, tạo dòng mới
                    var newKhachHang = new KhachHang
                    {
                        HoTen = khachHangDTO.HoTen,
                        DiaChi = khachHangDTO.DiaChi,
                        SDT = khachHangDTO.SDT,
                        SoDu = 5000000,
                        Email = khachHangDTO.Email,
                        username = username_
                    };
                    userDbContext.KhachHang.Add(newKhachHang);
                    userDbContext.SaveChanges();
                }

                var currentUser = userDbContext.Users.FirstOrDefault(u => u.username == username_);
                if (currentUser != null)
                {
                    currentUser.FirstLogin = false;
                }

                userDbContext.SaveChanges();

                return Ok("Thêm thông tin thành công");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }
        // PUT api/<KhachHangController>/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE api/<KhachHangController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
        [HttpGet("GetAllKhachHang")]
        public IActionResult GetAllKhachHang()
        {
            try
            {
                var khachHangList = userDbContext.KhachHang
                    .Select(kh => new KhachHangDTO
                    {
                        MaKH = kh.MaKH,
                        HoTen = kh.HoTen,
                        DiaChi = kh.DiaChi,
                        SDT = kh.SDT,
                        Email = kh.Email,
                        SoDu = kh.SoDu,
                        username = kh.username
                    })
                    .ToList();

                if (khachHangList != null && khachHangList.Any())
                {
                    return Ok(khachHangList);
                }
                else
                {
                    return NotFound("Không có khách hàng nào trong hệ thống.");
                }
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình xử lý: {ex.Message}");
            }
        }

    }
}
