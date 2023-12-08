using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class User
    {
        [Key]
        public string username { get; set; }
        public string Username { get; internal set; }
        public string password { get; set; }
        public string Password { get; internal set; }
        public string role { get; set; }
        public bool FirstLogin { get; set; }
    }
}
