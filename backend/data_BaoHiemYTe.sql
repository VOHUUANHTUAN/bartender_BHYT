CREATE DATABASE BaoHiemYTe
go
USE BaoHiemYTe
go


insert into Users values ('leminhtien','123456',N'Khách Hàng','True')
insert into Users values ('maiquyetvang','123456',N'Khách Hàng','True')
insert into Users values ('khachhang1','123456',N'Khách Hàng','True')
insert into Users values ('khachhang2','123456',N'Khách Hàng','True')
insert into Users values ('khachhang3','123456',N'Khách Hàng','True')

insert into KhachHangs values ('Tien','TP HCM','0123456789','tien@gmail.com',1000000,'leminhtien')
insert into KhachHangs values ('Vang','TP HCM','0123456788','vang@gmail.com',1000000,'maiquyetvang')
insert into KhachHangs values ('Van A','TP HCM','0123456787','a@gmail.com',1000000,'khachhang1')
insert into KhachHangs values ('Thi B','TP HCM','0123456786','b@gmail.com',1000000,'khachhang2')
insert into KhachHangs values ('Van C','TP HCM','0123456785','c@gmail.com',1000000,'khachhang3')

Insert into Benhs values(N'Cảm cúm', N'Cảm cúm là một bệnh truyền nhiễm gây ra bởi virus')
Insert into Benhs values(N'Viêm họng', N'Viêm họng là một tình trạng viêm nhiễm ở họng')
Insert into Benhs values(N'Đau đầu', N'Đau đầu thường là triệu chứng của nhiều bệnh khác nhau')
Insert into Benhs values(N'Tiêu chảy', N'Tiêu chảy là tình trạng tăng cường sản xuất phân và tiêu thụ nước')
Insert into Benhs values(N'Dị ứng', N'Dị ứng là phản ứng cơ thể đối với một chất gây kích thích')
Insert into Benhs values(N'Bệnh tim mạch', N'Bệnh tim mạch liên quan đến các vấn đề về tim và mạch máu')
Insert into Benhs values(N'Tiểu đường', N'Tiểu đường là một bệnh lý liên quan đến sự không cân bằng insulin')
Insert into Benhs values(N'Ung thư', N'Ung thư là một loại bệnh có sự phát triển không kiểm soát của tế bào')
Insert into Benhs values(N'Bệnh Parkinson', N'Bệnh Parkinson là một rối loạn thần kinh liên quan đến cảm nhận và chuyển động')
Insert into Benhs values(N'Thiếu máu', N'Thiếu máu là tình trạng giảm đáng kể số lượng hồng cầu trong máu')
Insert into Benhs values(N'Cao huyết áp', N'Cao huyết áp là tình trạng mức áp lực máu ở mức cao hơn bình thường')
Insert into Benhs values(N'Viêm khớp', N'Viêm khớp là sự viêm nhiễm của các khớp trong cơ thể')
Insert into Benhs values(N'Bệnh celiac', N'Bệnh celiac liên quan đến không thể tiêu hóa gluten')
Insert into Benhs values(N'Đau lưng', N'Đau lưng là một triệu chứng phổ biến có thể xuất phát từ nhiều nguyên nhân')
Insert into Benhs values(N'Mệt mỏi', N'Mệt mỏi có thể là dấu hiệu của nhiều tình trạng khác nhau')
Insert into Benhs values(N'Trầm cảm', N'Trầm cảm là một rối loạn tâm thần ảnh hưởng đến tâm trạng và tư duy')
Insert into Benhs values(N'Loạn thần kinh thực vật', N'Loạn thần kinh thực vật ảnh hưởng đến hệ thống thần kinh tự động')
Insert into Benhs values(N'Đau dạ dày', N'Đau dạ dày thường xuất hiện sau khi ăn hoặc do nhiều nguyên nhân khác nhau')
Insert into Benhs values(N'Bệnh Crohn', N'Bệnh Crohn là một loại viêm nhiễm đường ruột')
Insert into Benhs values(N'Bệnh đái tháo đường', N'Bệnh đái tháo đường liên quan đến sự không cân bằng insulin và đường huyết')




INSERT INTO GoiBaoHiems (TenGoiBH, Gia, TiLeHoanTien)
VALUES
    (N'Gói Bảo Hiểm Cơ Bản', 1000000, 30),
    (N'Gói Bảo Hiểm Premium', 1500000, 35),
    (N'Gói Bảo Hiểm Platinum', 2000000, 40),
    (N'Gói Bảo Hiểm VIP', 2500000, 50),
    (N'Gói Bảo Hiểm Tiêu Chuẩn', 1500000, 25),
    (N'Gói Bảo Hiểm Học Sinh - Sinh Viên', 1200000, 40),
    (N'Gói Bảo Hiểm Doanh Nhân', 1800000, 40),
    (N'Gói Bảo Hiểm Gia Đình', 2200000, 40),
    (N'Gói Bảo Hiểm Cá Nhân', 2700000, 35),
    (N'Gói Bảo Hiểm Khám Phá Thế Giới', 3200000, 60);

INSERT INTO ChinhSachs (MucDoBenh, GoiBaoHiemMaGoiBH, BenhMaBenh)
VALUES
    (N'nặng', 1, 1),
    (N'nhẹ', 2, 2),
    (N'không', 3, 3),
    (N'nặng', 4, 4),
    (N'nhẹ', 5, 5),
    (N'không', 6, 6),
    (N'nặng', 7, 7),
    (N'nhẹ', 8, 8),
    (N'không', 9, 9),
    (N'nặng', 10, 10),
    
    (N'nặng', 1, 11),
    (N'nhẹ', 2, 12),
    (N'không', 3, 13),
    (N'nặng', 4, 14),
    (N'nhẹ', 5, 15),
    (N'không', 6, 16),
    (N'nặng', 7, 17),
    (N'nhẹ', 8, 18),
    (N'không', 9, 19),
    (N'nặng', 10, 20),

    (N'nặng', 1, 1),
    (N'nhẹ', 2, 2),
    (N'không', 3, 3),
    (N'nặng', 4, 4),
    (N'nhẹ', 5, 5),
    (N'không', 6, 6),
    (N'nặng', 7, 7),
    (N'nhẹ', 8, 8),
    (N'không', 9, 9),
    (N'nặng', 10, 10);


	-- Gói Bảo Hiểm Cơ Bản
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo vệ cơ bản với chính sách quan trọng: Bảo hiểm y tế, tai nạn, tử vong, và hoàn tiền.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Cơ Bản';

-- Gói Bảo Hiểm Premium
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo vệ cao cấp với lợi ích nâng cao: Bảo hiểm y tế toàn diện, tai nạn, mất cơ hội làm việc, và hoàn tiền cao.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Premium';

-- Gói Bảo Hiểm Platinum
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Gói bảo hiểm siêu cao cấp với đặc quyền độc đáo: Phủ sóng toàn diện mọi chi phí y tế và phòng mổ, bảo hiểm tai nạn và bệnh nặng, hỗ trợ tài chính khi mất khả năng làm việc, và bảo hiểm mất cơ hội làm việc và mất khả năng tự chăm sóc.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Platinum';

-- Gói Bảo Hiểm VIP
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Gói bảo hiểm VIP dành cho người đòi hỏi cao với các ưu đãi độc quyền: Phục vụ y tế cá nhân 24/7, bảo hiểm tai nạn và bệnh nặng với mức chi trả cực cao, bảo hiểm mất cơ hội làm việc và mất khả năng tự chăm sóc, chi trả phí y tế quốc tế và dịch vụ y tế chất lượng cao.'
WHERE TenGoiBH = N'Gói Bảo Hiểm VIP';

-- Gói Bảo Hiểm Tiêu Chuẩn
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo vệ tiêu chuẩn với điều kiện linh hoạt: Bảo hiểm y tế cơ bản, tai nạn cung cấp chi trả nhỏ khi gặp tai nạn, tử vong và mất khả năng làm việc cơ bản.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Tiêu Chuẩn';

-- Gói Bảo Hiểm Học Sinh - Sinh Viên
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo hiểm đặc biệt cho học sinh và sinh viên: Bảo hiểm y tế cơ bản, tai nạn với mức chi trả cao, mất khả năng học tập và chi trả học phí khi gặp sự cố.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Học Sinh - Sinh Viên';

-- Gói Bảo Hiểm Doanh Nhân
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo hiểm đa dạng cho doanh nhân: Bảo hiểm y tế doanh nhân với các lựa chọn linh hoạt, bảo hiểm mất khả năng làm việc và chi trả doanh nghiệp khi gặp rủi ro, bảo hiểm tai nạn và bệnh nặng cho doanh nhân sáng tạo.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Doanh Nhân';

-- Gói Bảo Hiểm Gia Đình
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo vệ toàn diện cho gia đình: Bảo hiểm y tế gia đình với mức chi trả cao, bảo hiểm tai nạn cho mọi thành viên trong gia đình, bảo hiểm mất khả năng làm việc và mất khả năng tự chăm sóc.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Gia Đình';

-- Gói Bảo Hiểm Cá Nhân
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo vệ cá nhân với các lựa chọn đa dạng: Bảo hiểm y tế cao cấp với sự lựa chọn của bạn, bảo hiểm tai nạn và bệnh nặng với mức chi trả linh hoạt, bảo hiểm mất khả năng làm việc và chi trả một phần lương khi gặp sự cố.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Cá Nhân';

-- Gói Bảo Hiểm Khám Phá Thế Giới
UPDATE GoiBaoHiems
SET MoTaGoiBH = N'Bảo hiểm dành cho những người thích khám phá: Bảo hiểm y tế toàn cầu cho mọi chuyến đi, bảo hiểm tai nạn và chi trả khẩn cấp khi ở nước ngoài, bảo hiểm mất cơ hội làm việc và chi trả chi phí vận chuyển về nước nếu cần thiết.'
WHERE TenGoiBH = N'Gói Bảo Hiểm Khám Phá Thế Giới';