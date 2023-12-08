--CREATE DATABASE BaoHiemYTe
--AS
USE BaoHiemYTe
GO


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


