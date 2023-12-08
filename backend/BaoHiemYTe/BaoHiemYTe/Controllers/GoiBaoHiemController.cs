using BaoHiemYTe.Data;
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
            var goiBH = userDbContext.GoiBaoHiems.FirstOrDefault(x => x.MaGoiBH == id);
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
            return Ok(goiBHDTO);
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
