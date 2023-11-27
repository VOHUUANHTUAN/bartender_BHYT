using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BaoHiemYTe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserDbContext userDbContext;

        public UserController(UserDbContext userDbContext)
        {
            this.userDbContext = userDbContext;
        }
        //====================================================READ============================================
        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                // Kết nối với cơ sở dữ liệu và lấy danh sách tất cả User.
                var Users = userDbContext.Users.ToList();
            
                if (Users.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ user nào.");
                }
                return Ok(Users);
            }
            catch (Exception ex)
            {
                // Xử lý ngoại lệ nếu có lỗi xảy ra (ví dụ: lỗi kết nối cơ sở dữ liệu).
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }

        [HttpGet]
        [Route("{username}")]
        public IActionResult GetByUsername(string username)
        {
            try
            {
                // Tìm User trong cơ sở dữ liệu theo username.
                var user_ = userDbContext.Users.FirstOrDefault(g => g.username == username);
                // Kiểm tra nếu không tìm thấy User với username cung cấp.
                if (user_ == null)
                {
                    return NotFound("Không tìm thấy username");
                }
                // Chuyển dữ liệu sách thành dạng DTO để trả về cho người dùng.
                UserDTO dto = new UserDTO();
                dto.username = user_.username;
                dto.password = user_.password;
                dto.role= user_.role;
                dto.FirstLogin = user_.FirstLogin;
                return Ok(dto);
            }
            catch (Exception ex)
            {
                // Xử lý lỗi nếu có lỗi xảy ra và trả về mã trạng thái 500 (Internal Server Error) cùng với thông báo lỗi.
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }
    }
}
