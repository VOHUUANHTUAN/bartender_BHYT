﻿// Controllers/AuthController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BaoHiemYTe.DTOs;
using BaoHiemYTe.Data;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly UserDbContext userDbContext;

    public AuthController(UserDbContext userDbContext)
    {
        this.userDbContext = userDbContext;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest model)
    {
        try
        {
            if (model == null)
            {
                return BadRequest("Dữ liệu đăng nhập không hợp lệ");
            }

            // Kiểm tra tên người dùng và mật khẩu từ cơ sở dữ liệu
            var isValid = CheckUserCredentials(model.Username, model.Password);

            if (!isValid)
            {
                return BadRequest("Dữ liệu đăng nhập không hợp lệ");
            }

            // Tạo token
            var token = GenerateJwtToken(model.Username);

            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.StackTrace);
            return StatusCode(500, $"Lỗi trong quá trình xác thực: {ex.Message}");
        }

    }
    [HttpGet("userinfo")]
    public IActionResult GetUserInfo()
    {
        try
        {
            // Lấy mã thông báo từ tiêu đề Authorization
            var authorizationHeader = HttpContext.Request.Headers["Authorization"].FirstOrDefault();

            if (string.IsNullOrEmpty(authorizationHeader) || !authorizationHeader.StartsWith("Bearer "))
            {
                return Unauthorized("Unauthorized: Token is missing or invalid");
            }

            var token = authorizationHeader.Substring("Bearer ".Length);

            // Validate and decode the token
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = false,  // Đặt giá trị này theo Issuer của bạn nếu có
                ValidateAudience = false,  // Đặt giá trị này theo Audience của bạn nếu có
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-should-be-at-least-128-bits"))
            };

            var handler = new JwtSecurityTokenHandler();
            var principal = handler.ValidateToken(token, tokenValidationParameters, out var securityToken);

            // Lấy username từ thông tin xác thực
            var username = principal.Identity?.Name;

            // Sử dụng hàm GetByUsername để lấy thông tin người dùng
            var user = GetUserByUsername(username);

            if (user == null)
            {
                return NotFound("Người dùng không tồn tại");
            }

            return Ok(user);
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.StackTrace);
            return StatusCode(500, $"Lỗi trong quá trình kiểm tra thông tin người dùng: {ex.Message}");
        }
    }

    private UserDTO GetUserByUsername(string username)
    {
        try
        {
            var user = userDbContext.Users.FirstOrDefault(u => u.username == username);

            if (user == null)
            {
                return null;
            }

            var userDTO = new UserDTO
            {
                username = user.username,
                role = user.role,
                FirstLogin = user.FirstLogin
                // Bạn có thể thêm các thông tin khác cần thiết vào đây
            };

            return userDTO;
        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.StackTrace);
            return null;
        }
    }


    private bool CheckUserCredentials(string username, string password)
    {
        // Thực hiện kiểm tra tên người dùng và mật khẩu trong cơ sở dữ liệu
        var user = this.userDbContext.Users.FirstOrDefault(u => u.username == username && u.password == password);
        return user != null;
    }

    private string GenerateJwtToken(string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("your-secret-key-should-be-at-least-128-bits"));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            claims: new[] { new Claim(ClaimTypes.Name, username) },
            expires: DateTime.UtcNow.AddHours(1),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
