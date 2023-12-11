using BaoHiemYTe.Domain;
using Microsoft.EntityFrameworkCore;

namespace BaoHiemYTe.Data
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {

        }
        public DbSet<User> Users { get; set; }
        public DbSet<KhachHang>  KhachHang{ get; set; }
        public DbSet<NhanVien> NhanVien { get; set; }
        public DbSet<GoiBaoHiem> GoiBaoHiem { get; set; }
        public DbSet<Benh> Benh { get; set; }
        public DbSet<ChinhSach> ChinhSach { get; set; }
        //Ràng buộc 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ChinhSach>()
                .HasKey(cs => new { cs.MaGoiBH, cs.MaBenh });

            // Điều này chỉ định rằng MaGoiBH là khóa ngoại trỏ đến GoiBaoHiem
            modelBuilder.Entity<ChinhSach>()
                .HasOne(cs => cs.GoiBaoHiem)
                .WithMany()
                .HasForeignKey(cs => cs.MaGoiBH)
                .OnDelete(DeleteBehavior.Restrict);

            // Tương tự cho MaBenh
            modelBuilder.Entity<ChinhSach>()
                .HasOne(cs => cs.Benh)
                .WithMany()
                .HasForeignKey(cs => cs.MaBenh)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<TinhTrangBenh>()
               .HasKey(tt => new { tt.MaDonDK, tt.MaBenh });

            modelBuilder.Entity<TinhTrangBenh>()
                .HasOne(tt => tt.DonDangKy)
                .WithMany()
                .HasForeignKey(tt => tt.MaDonDK)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<TinhTrangBenh>()
                .HasOne(tt => tt.Benh)
                .WithMany()
                .HasForeignKey(tt => tt.MaBenh)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<BenhVien>()
                .HasIndex(bv => bv.TenBV)
                .IsUnique();
            modelBuilder.Entity<DonDangKy>()
                .HasOne(d => d.NhanVien)
                .WithMany()
                .HasForeignKey(d => d.MaNV)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<DonDangKy>()
                .HasOne(d => d.KhachHang)
                .WithMany()
                .HasForeignKey(d => d.MaKH)
                .OnDelete(DeleteBehavior.Restrict);
            modelBuilder.Entity<YeuCauHoanTra>()
                .HasOne(y => y.NhanVien)
                .WithMany()
                .HasForeignKey(y => y.MaNV)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<YeuCauHoanTra>()
                .HasOne(y => y.KhachHang)
                .WithMany()
                .HasForeignKey(y => y.MaKH)
                .OnDelete(DeleteBehavior.Restrict);

        }

        public DbSet<DonDangKy> DonDangKy { get; set; }
        public DbSet<TinhTrangBenh> TinhTrangBenh { get; set; }
        public DbSet<HoaDonThanhToanDK> HoaDonThanhToanDK { get; set; }
        public DbSet<BenhVien> BenhVien { get; set; }
        public DbSet<YeuCauHoanTra> YeuCauHoanTra { get; set; }
        public DbSet<HoaDonHoanTra> HoaDonHoanTra { get; set; }


    }
}
