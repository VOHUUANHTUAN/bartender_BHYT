import React, { memo, useState, useEffect } from 'react';
import { getDonDangKyByID, getNhanVienByID, putDonDangKyByID } from '../../../api/connect';
import { useParams } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";

const DetailPage = () => {
    const [loading, setLoading] = useState(true);
    const [donDangKy, setDonDangKy] = useState([]);
    const [nhanVien, setNhanVien] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [maNV, SetmaNV] = useState('');
    const [thoiGianBD, setThoiGianBD] = useState('');
    const [thoiGianHetHan, setThoiGianHetHan] = useState('')
    const [diaChi, SetDiaChi] = useState('');
    const [hoTen, SetHoTen] = useState('')
    const [email, SetEmail] = useState('')
    const [sdt, setSdt] = useState('')
    const today = new Date()

    const params = useParams();
    const { user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (params.id) {
                    const data = await getDonDangKyByID(params.id);
                    setDonDangKy(data);

                } else {
                    console.error('No selected ID found.');
                }
            } catch (error) {
                console.error('Error fetching Don Dang Ky data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [params.id]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user.username) {
                    const data = await getNhanVienByID(user.username);
                    setNhanVien(data);
                    SetmaNV(data.maNV);
                    setThoiGianBD(today);
                    const oneYearLater = new Date(today);
                    oneYearLater.setFullYear(today.getFullYear() + 1);
                    setThoiGianHetHan(oneYearLater);
                    SetDiaChi(data.diaChi);
                    SetEmail(data.email);
                    SetHoTen(data.hoTen);
                    setSdt(data.sdt)
                } else {
                    console.error('No username found.');
                }
            } catch (error) {
                console.error('Error fetching Nhan Vien data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user.username]);

    const updateStatus = async () => {
        try {
            // Send a request to the backend to update the status
            await putDonDangKyByID(params.id, {
                tinhTrang: selectedStatus,
                maNV,
                thoiGianBD,
                diaChi,
                email,
                hoTen,
                sdt,
                thoiGianHetHan,

            });
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    return (
        <div className="container__body">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <h2>Details for Don Dang Ky {params.id}</h2>
                    <p>Ma Don DK: {donDangKy.maDonDK}</p>
                    <label htmlFor="status">Select Status:</label>
                    <select id="status" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
                        <option value="Chờ Duyệt">Chờ Duyệt</option>
                        <option value="Hết Hạn">Hết Hạn</option>
                        <option value="Đã kích hoạt">Kích Hoạt</option>
                        <option value="Bị từ chối">Bị từ chối</option>


                        {/* Add more options as needed */}
                    </select>
                    {/* Displaying information from goiBaoHiem */}
                    <h3>Goi Bao Hiem Information:</h3>
                    {donDangKy.goiBaoHiem ? (
                        <>
                            <p>Gia: {donDangKy.goiBaoHiem.gia}</p>
                            <p>Ten Goi BH: {donDangKy.goiBaoHiem.tenGoiBH}</p>
                            <p>Mota Goi BH: {donDangKy.goiBaoHiem.motaGoiBH}</p>
                            {/* Add more properties as needed */}
                        </>
                    ) : (
                        <p>Goi Bao Hiem information not available.</p>
                    )}

                    {/* Displaying information from khachHang */}
                    <h3>Khach Hang Information:</h3>
                    {donDangKy.khachHang ? (
                        <>
                            <p>Ho Ten: {donDangKy.khachHang.hoTen}</p>
                            <p>Dia Chi: {donDangKy.khachHang.diaChi}</p>
                            {/* Add more properties as needed */}
                        </>
                    ) : (
                        <p>Khach Hang information not available.</p>
                    )}

                </div>

            )}
            <div>
                <label htmlFor="status">Selected Status: {selectedStatus}</label>
                <button onClick={updateStatus}>Update Status</button>
            </div>
        </div>
    );
};

export default memo(DetailPage);
