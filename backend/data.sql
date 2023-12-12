--Create database BaoHiemYTe
--go 
--use BaoHiemYTe
--go
-- Thay đổi cột để cho phép giá trị NULL
ALTER TABLE DonDangKy
ALTER COLUMN MaNV INT NULL;
ALTER TABLE YeuCauHoanTra
ALTER COLUMN MaNV INT NULL;
ALTER TABLE YeuCauHoanTra
ALTER COLUMN MaGoiBHApDung INT NULL;

insert into Users values('khachhang','123456',N'Khách hàng',0)
insert into Users values('anhtuan','123456',N'Khách hàng',0)
insert into Users values('thuha','123456',N'Khách hàng',0)
insert into Users values('quyetvang','123456',N'Khách hàng',0)
insert into Users values('baochau','123456',N'Khách hàng',0)
insert into Users values('minhtien','123456',N'Khách hàng',0)
insert into Users values('admin','123',N'Nhân viên',0)
insert into Users values('nhanvien','123',N'Nhân viên',0)

insert into KhachHang values(N'Lê Thị Hàng','TPHCM','0123123111','hang@gmail.com',5000000,'khachhang')
insert into KhachHang values(N'Mai Quyết Vang','TPHCM','0123123124','vang@gmail.com',5000000,'quyetvang')
insert into KhachHang values(N'Lê Thị Thu Hà','TPHCM','0123123125','ha@gmail.com',5000000,'thuha')
insert into KhachHang values(N'Võ Hữu Anh Tuấn','TPHCM','0123123126','tuan@gmail.com',5000000,'anhtuan')
insert into KhachHang values(N'Đinh Hoàng Bảo Châu','TPHCM','0123123127','chau@gmail.com',5000000,'baochau')
insert into KhachHang values(N'Lê Minh Tiến','TPHCM','0123123123','tien@gmail.com',5000000,'minhtien')


insert into NhanVien values(N'Nguyễn Văn An','TPHCM','0123456789','nguyenvanan@gmail.com','admin')
insert into NhanVien values(N'Nguyễn Thị Hoa','TPHCM','0123456788','nguyenthihoa@gmail.com','nhanvien')

INSERT INTO GoiBaoHiem (TenGoiBH, MotaGoiBH, Gia, TiLeHoanTien, ThoiHanBaoVe)
VALUES
	(N'Gói Bảo Hiểm Tiêu Chuẩn', N'Bảo vệ toàn diện với mức phí hợp lý. Sự lựa chọn phổ biến cho sự an tâm và bảo vệ tốt nhất.', 450000, 25, 1),
	(N'Gói Bảo Hiểm Cơ Bản', N'An toàn và bảo vệ gia đình của bạn với chi phí phải chăng. Bảo hiểm cơ bản cho mọi người.', 1200000, 30, 3),
	(N'Gói Bảo Hiểm VIP', N'Đặc quyền và chăm sóc cao cấp. Sự chọn lựa cho những người đòi hỏi sự đẳng cấp và phục vụ tận tâm.', 1500000, 35, 3),
	(N'Gói Bảo Hiểm Premium', N'Lựa chọn cho sự đảm bảo tối đa và lợi ích cao cấp. Bảo vệ tốt nhất cho bạn và gia đình.', 3000000, 40, 5),
	(N'Gói Bảo Hiểm Platinum', N'Đẳng cấp và sự sang trọng. Bảo vệ với các lợi ích cao cấp và đặc quyền riêng biệt.', 4500000, 50, 5),
	(N'Gói Bảo Hiểm Học Sinh - Sinh Viên', N'Tự do học tập mà không lo lắng. Bảo vệ toàn diện cho học sinh và sinh viên với chi phí hợp lý.', 1200000, 40, 3),
	(N'Gói Bảo Hiểm Doanh Nhân', N'Đối tác chiến lược cho sự phát triển kinh doanh. Bảo hiểm cho doanh nhân thông thái.', 1800000, 40, 3),
	(N'Gói Bảo Hiểm Gia Đình', N'Bảo vệ toàn diện cho mọi thành viên trong gia đình. Hòa mình trong sự ấm áp và an toàn.', 2100000, 40, 3),
	(N'Gói Bảo Hiểm Cá Nhân', N'Lựa chọn linh hoạt cho nhu cầu cá nhân. An tâm với sự bảo vệ phù hợp với bạn.', 2700000, 35, 3),
	(N'Gói Bảo Mạo Hiểm', N'Tối ưu hóa bảo vệ với phí cao cấp. Lựa chọn dành cho những người thích khám phá thế giới tốt nhất.', 3300000, 60, 3),
	(N'Gói Bảo Hiểm Lao Động Cơ Bản', N'Bảo vệ quan trọng cho người lao động. An toàn và chăm sóc sức khỏe cơ bản.', 2700000, 35, 2),
	(N'Gói Bảo Hiểm Lao Động Nâng Cao', N'Tăng cường bảo vệ cho sức khỏe lao động. Lựa chọn đáng tin cậy cho công nhân lao động chuyên nghiệp.', 4500000, 50, 2),
    (N'Gói Bảo Hiểm Cho Mẹ Bầu', N'Bảo vệ toàn diện cho bà bầu với chi phí hợp lý. Tăng cường chăm sóc sức khỏe của mẹ và thai nhi.', 1200000, 50, 1),
    (N'Gói Bảo Hiểm Cho Bé', N'An tâm với bảo vệ toàn diện cho sức khỏe của trẻ. Đảm bảo tốt nhất cho tình yêu thương nhỏ bé.', 1200000, 50, 1),
    (N'Gói Bảo Hiểm Cho Mẹ Và Bé', N'An tâm với bảo vệ toàn diện cho cả mẹ và bé. Sự lựa chọn hoàn hảo cho sức khỏe gia đình.', 1800000, 50, 1);
INSERT INTO Benh (TenBenh, MoTa) VALUES
    (N'Bệnh xương khớp', N'Viêm khớp, Gout, Bệnh thoái hóa cột sống'),
    (N'Bệnh tim mạch', N'Bệnh đau thắt ngực, Đau tim và nhồi máu cơ tim, Loạn nhịp tim, Bệnh mạch vành'),
    (N'Bệnh thần kinh', N'Đau thần kinh, Đau đầu và Migraine, Đau thị giác, Đau thần kinh toàn thân, Rối loạn tâm thần'),
    (N'Bệnh hô hấp', N'Bệnh hen suyễn, Viêm phế quản, Viêm phổi, Bệnh tắc nghẽn đường hô hấp'),
    (N'Bệnh nội tiết', N'Bệnh tiểu đường, Tăng/giảm hoạt động tuyến yên'),
    (N'Bệnh tiêu hóa', N'Viêm đại tràng, Bệnh Crohn, Dạ dày và thực quản, Bệnh gan nhiễm mỡ'),
    (N'Bệnh truyền nhiễm', N'HIV/AIDS, Viêm gan, Bệnh Lyme, Cúm và các bệnh truyền nhiễm khác'),
    (N'Bệnh ung thư', N'Ung thư vú, Ung thư phổi, Ung thư ruột kết, Ung thư da'),
    (N'Bệnh ngoại khoa', N'Bệnh chấn thương, Bệnh đau mạn tính, Các vấn đề liên quan đến da liễu'),
    (N'Bệnh lao động', N'Đau lưng và cột sống, Chấn thương do vận động và thể thao'),
    (N'Bệnh thai nghén', N'Trong thai độc, Đau lưng khi mang thai, Sẩy thai'),
    (N'Bệnh mẹ bầu', N'Suy dinh dưỡng thai nghén, Nôn mửa thai nghén, Đau bụng dưới thai nghén, Huyết áp thai nghén, Tiểu đường thai nghén'),
    (N'Bệnh sơ sinh', N'Bệnh bẩm sinh, Sỏi thận ở trẻ sơ sinh, Tiểu đường sơ sinh'),
    (N'Bệnh nhi đồng', N'Sổ mũi, Viêm họng, Cảm cúm, Viêm tai, Đau bụng, Viêm ruột');

INSERT INTO ChinhSach VALUES
(1,1),
(1,2),
(1,3),
(1,4),
(2,2),
(2,3),
(2,4),
(2,5),
(3,1),
(3,5),
(3,6),
(3,7),
(3,8),
(3,9),
(4,1),
(4,5),
(4,6),
(4,7),
(4,8),
(4,9),
(5,1),
(5,5),
(5,6),
(5,7),
(5,8),
(5,9),
(6,1),
(6,5),
(6,6),
(7,1),
(7,5),
(7,6),
(7,7),
(8,4),
(8,5),
(8,6),
(8,7),
(8,8),
(9,1),
(9,2),
(9,3),
(9,6),
(9,7),
(10,1),
(10,2),
(10,3),
(10,4),
(10,5),
(11,1),
(11,2),
(11,3),
(11,4),
(11,5),
(11,6),
(12,1),
(12,2),
(12,3),
(12,4),
(12,5),
(12,6),
(12,7),
(12,8),
(13,11),
(13,12),
(14,13),
(14,14),
(15,11),
(15,12),
(15,13),
(15,14);


-- Thêm dữ liệu cho bảng DonDangKy
-- Mỗi MaKH từ 1 đến 5
-- Mỗi MaGoiBH từ 1 đến 11
-- MaNV để NULL
INSERT INTO DonDangKy (MaGoiBH, ThoiGianDK, ThoiGianBD, ThoiGianHetHan, TinhTrang, LuaChonThanhToan, TongGia, MaKH, MaNV)
VALUES
    (1, '2023-01-01 08:00:00', '2023-02-01 09:30:00', '2024-02-01 09:30:00', N'Đã kích hoạt',N'Trọn gói', 450000, 1, 1),
    (2, '2023-02-01 10:15:00', '2023-03-01 14:20:00', '2026-03-01 14:20:00',  N'Đã kích hoạt', N'Mỗi năm', 1200000, 2, 1),
    (3, '2023-03-01 11:45:00', '2023-04-01 15:10:00', '2026-04-01 15:10:00',  N'Đã kích hoạt', N'Trọn gói', 1500000, 3, 1),
    (4, '2023-04-01 14:30:00', '2023-05-01 16:45:00', '2028-05-01 16:45:00', N'Đã kích hoạt', N'Trọn gói', 3000000, 4, 2),
    (5, '2023-05-01 16:00:00', '2023-06-01 18:30:00', '2028-06-01 18:30:00', N'Đã kích hoạt',N'Trọn gói', 4500000, 5, 2),
    (11, '2023-11-20 08:00:00', '2023-11-20 09:30:00', '2025-11-20 09:30:00', N'Chờ thanh toán',N'Trọn gói', 2700000, 1, 1),
    (5, '2023-02-01 10:15:00', NULL, NULL, N'Bị từ chối', N'Trọn gói', 4500000, 2, 1),
    (4, '2023-03-01 11:45:00', NULL, NULL,  N'Bị từ chối', N'Trọn gói', 3000000, 3, 1),
    (3, '2023-04-01 14:30:00', NULL, NULL,  N'Bị từ chối', N'Trọn gói', 1500000, 4, 1),
    (2, '2020-05-01 16:00:00', '2020-06-01 18:30:00', '2023-06-01 18:30:00', N'Hết hạn', N'Trọn gói', 1200000, 5, 1),
	(2, '2023-12-02 08:00:00', '2023-12-02 09:30:00', '2026-12-02 09:30:00', N'Chờ thanh toán', N'Mỗi năm', 1200000, 1, 1),
	(3, '2023-11-25 08:00:00', '2023-11-25 09:30:00', '2026-11-25 09:30:00', N'Chờ thanh toán', N'Trọn gói', 1500000, 1, 1),
    (4, '2023-11-26 08:00:00', '2023-11-26 09:30:00', '2028-11-26 09:30:00', N'Chờ thanh toán', N'Trọn gói', 3000000, 1, 2),
    (5, '2023-11-27 08:00:00', '2023-11-27 09:30:00', '2028-11-27 09:30:00', N'Chờ thanh toán',N'Trọn gói', 4500000, 1, 2),
	(6, '2023-06-01 09:45:00', NULL, NULL, N'Chờ duyệt', N'Mỗi năm', 1200000, 1, NULL),
    (7, '2023-07-01 13:20:00', NULL, NULL, N'Chờ duyệt', N'Trọn gói', 1800000, 2, NULL),
    (8, '2023-08-01 17:00:00', NULL, NULL, N'Chờ duyệt', N'Mỗi năm',2100000, 3, NULL),
    (9, '2023-09-01 20:15:00', NULL, NULL, N'Chờ duyệt', N'Trọn gói',2700000, 4, NULL),
    (10, '2023-10-01 22:30:00', NULL, NULL, N'Chờ duyệt', N'Trọn gói', 3300000, 5, NULL);
	
INSERT INTO HoaDonThanhToanDK (SoTien, ThoiGianHetHan, HanKy, TinhTrangThanhToan, ThoiGianThanhToan, MaDonDK)
VALUES
    (450000, '2023-02-02 09:30:00', N'Trọn gói', N'Đã thanh toán', '2023-02-02 09:30:00', 1),
    (600000, '2023-04-01 14:20:00', 'Năm 1', N'Đã thanh toán', '2023-03-01 14:20:00', 2),
	(600000, '2024-04-01 14:20:00', 'Năm 2', N'Chưa thanh toán', NULL, 2),
    (1500000, '2023-05-01 15:10:00', N'Trọn gói', N'Đã thanh toán', '2023-03-03 15:10:00', 3),
    (3000000, '2023-06-01 20:20:00', N'Trọn gói', N'Đã thanh toán', '2023-05-05 20:20:00', 4),
    (4500000, '2023-07-01 18:30:00', N'Trọn gói', N'Đã thanh toán', '2023-06-06 18:30:00', 5),
    (2700000, '2023-12-20 09:30:00',N'Trọn gói', N'Chưa thanh toán', NULL,6 ),
    (600000, '2024-01-02 09:30:00', 'Năm 1', N'Chưa thanh toán', NULL, 11),
    (600000, '2025-01-02 09:30:00', 'Năm 2', N'Chưa thanh toán', NULL, 11),
	(1500000, '2023-11-25 09:30:00', N'Trọn gói', N'Chưa thanh toán', NULL, 12),
	(3000000, '2023-12-26 09:30:00', N'Trọn gói', N'Chưa thanh toán', NULL, 13),
	(4500000, '2023-12-27 09:30:00', N'Trọn gói', N'Chưa thanh toán', NULL, 14);
	

Insert into TinhTrangBenh (MaDonDK,MaBenh,TinhTrang) values
(15,1,N'Không'),
(15,5,N'Không'),
(15,6,N'Không'),
(16,1,N'Không'),
(16,5,N'Không'),
(16,6,N'Không'),
(16,7,N'Không'),
(17,4,N'Không'),
(17,5,N'Không'),
(17,6,N'Không'),
(17,7,N'Không'),
(17,8,N'Không'),
(18,1,N'Không'),
(18,2,N'Không'),
(18,3,N'Không'),
(18,6,N'Không'),
(18,7,N'Không'),
(19,1,N'Không'),
(19,2,N'Không'),
(19,3,N'Có'),
(19,4,N'Không'),
(19,5,N'Không');

INSERT INTO BenhVien(TenBV) values
	(N'Bệnh viện đa khoa Thủ Đức'),
	(N'Bệnh viện Chợ Rẫy'),
	(N'Bệnh viện Nhân dân Gia Định'),
	(N'Trung tâm Truyền máu huyết học'),
	(N'Bệnh viện Gò Vấp'),
	(N'Trung tâm Y tế Nhà Bè'),
	(N'Trung tâm Sức khỏe Tâm Thần'),
	(N'Bệnh viện Thống Nhất'),
	(N'Trung tâm Ung Bướu'),
	(N'Bệnh viện Nhi đồng 1'),
	(N'Bệnh viện Nhi đông 2'),
	(N'Bệnh viện Nhân dân 115');
--Tình trạng: 
--1.Chờ duyệt :là chờ đã đủ điều kiện áp dụng chính sách, 
--chỉ chờ nhân viên bấm nút duyệt, để đổi sang trạng thái Đã hoàn tiền
--2.Không đủ điều kiện: là sau khi khách hàng nhập các thông tin, hoàn tiền, 
--nhưng hệ thống tính toán được bệnh đó k có gói BH nào của khách hàng hỗ trợ
--3.Đã hoàn tiền: Nhân viên bấm duyệt đổi từ trạng thái Chờ duyệt-> Đã hoàn tiền, 
--hệ thống tạo hóa đơn hoàn trả
INSERT INTO YeuCauHoanTra (MaHDKhamBenh, TenBenhVien, SoTienDaKham, Benh, ThoiGianTao, TinhTrang, MaGoiBHApDung, SoTienHoanTra, MaKH, MaNV, ThoiGianDuyet)
VALUES 
  ('HDKB001', N'Bệnh viện Nhân dân 115', 1000000, N'Bệnh thần kinh', '2023-07-04 10:30:00', 'Đã hoàn tiền', 1, 250000, 1, 2,  '2023-07-04 10:30:00'),
  ('HDKB002', N'Bệnh viện Nhân dân 115', 1000000, N'Bệnh hô hấp', '2023-10-04 08:30:00', 'Đã hoàn tiền', 2, 300000, 2, 2, '2023-10-04 08:30:00'),
  ('HDKB003',N'Bệnh viện Nhân dân 115', 1000000, N'Bệnh thần kinh', '2023-11-04 09:30:00', 'Đã hoàn tiền', 2, 300000, 2, 1, '2023-11-08 08:30:00'),
  ('HDKB004', N'Bệnh viện đa khoa Thủ Đức', 1200000, N'Bệnh tim mạch', '2023-11-05 08:30:00', N'Đã hoàn tiền', 1, 300000, 1, 1, '2023-11-08 09:30:00'),
  ('HDKB005',N'Bệnh viện đa khoa Thủ Đức', 2000000, N'Bệnh nội tiết', '2023-11-12 08:30:00', N'Không đủ điều kiện', NULL, NULL, 1, NULL, NULL),
  ('HDKB006', N'Bệnh viện đa khoa Thủ Đức', 1600000, N'Bệnh hô hấp', '2023-12-01 09:30:00', N'Chờ duyệt', 1, 400000, 1, NULL, NULL),
  ('HDKB007', N'Bệnh viện đa khoa Thủ Đức', 1200000, N'Bệnh tim mạch', '2023-12-03 08:30:00', N'Chờ duyệt', 1, 300000, 1, NULL, NULL),
  ('HDKB008', N'Bệnh viện đa khoa Thủ Đức', 2000000, N'Bệnh xương khớp', '2023-12-05 08:30:00', N'Chờ duyệt', 2, 600000, 2, NULL, NULL);
  
INSERT INTO HoaDonHoanTra (SoTien,ThoiGianTao,MaYC)
VALUES 
(250000,'2023-07-04 10:30:00',1),
(30000,'2023-10-04 08:30:00',2),
(30000,'2023-11-08 08:30:00',3),
(30000,'2023-11-08 09:30:00',4);
