using BaoHiemYTe.Data;
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
