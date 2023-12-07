using BaoHiemYTe.Data;
using BaoHiemYTe.DTOs;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

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
                var users = userDbContext.Users.ToList();

                if (users.Count == 0)
                {
                    return NotFound("Không tìm thấy bất kỳ user nào.");
                }

                return Ok(users);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }

        [HttpGet("{username}")]
        public IActionResult GetByUsername(string username)
        {
            try
            {
                var user = userDbContext.Users.FirstOrDefault(u => u.username == username);

                if (user == null)
                {
                    return NotFound("Không tìm thấy username");
                }

                var userDTO = new UserDTO
                {
                    username = user.username,
                    password = user.password,
                    role = user.role,
                    FirstLogin = user.FirstLogin
                };

                return Ok(userDTO);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi trong quá trình lấy dữ liệu: {ex.Message}");
            }
        }
    }
}
