using BaoHiemYTe.Domain;
using Microsoft.EntityFrameworkCore;
using System;

namespace BaoHiemYTe.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<KhachHang>  KhachHangs{ get; set; }
        public DbSet<GoiBaoHiem> GoiBaoHiems { get; set; }
        public DbSet<Benh> Benhs { get; set; }
        public DbSet<ChinhSach> ChinhSachs { get; set; }
    }
}
