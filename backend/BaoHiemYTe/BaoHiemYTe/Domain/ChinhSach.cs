using System.ComponentModel.DataAnnotations;

namespace BaoHiemYTe.Domain
{
    public class ChinhSach
    {
        [Key]
        public int MaCS { get; set; }
        public string MucDoBenh { get; set; }
        
        public GoiBaoHiem GoiBaoHiem { get; set; }
        public  Benh Benh { get; set; }

    }
}
