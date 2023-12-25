import React, { useState, useEffect } from 'react';
import { getAllYeuCauHoanTra } from '../../../api/connect';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'; // Assuming you are using Material-UI
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import Box from '@mui/material/Box';

const ListYeuCauHoanTra = () => {
    const [yeuCauHoanTraList, setYeuCauHoanTraList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllYeuCauHoanTra();

                // Map the data to include 'id' property
                const formattedData = data.map(item => ({
                    ...item,
                    id: item.maYC.toString(), // Assuming maYC is a unique identifier
                }));

                setYeuCauHoanTraList(formattedData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);
    const handleProceedApproval = () => {
        if (selectedIds.length > 0) {
            const selectedId = selectedIds[0];
            console.log(selectedId);
        }
    };


    const columns = [
        { field: 'maYC', headerName: 'Mã Yêu Cầu', flex: 1 },
        { field: 'maHDKhamBenh', headerName: 'Mã Hồ Sơ Khám Bệnh', flex: 1 },
        { field: 'tenBenhVien', headerName: 'Tên Bệnh Viện', flex: 1 },
        { field: 'soTienDaKham', headerName: 'Số Tiền Đã Khám', flex: 1 },
        { field: 'benh', headerName: 'Bệnh', flex: 1 },
        { field: 'thoiGianTao', headerName: 'Thời Gian Tạo', flex: 1 },
        { field: 'tinhTrang', headerName: 'Tình Trạng', flex: 1 },
        { field: 'maGoiBHApDung', headerName: 'Mã Gói BH Áp Dụng', flex: 1 },
        { field: 'soTienHoanTra', headerName: 'Số Tiền Hoàn Trả', flex: 1 },
        { field: 'maKH', headerName: 'Mã Khách Hàng', flex: 1 },
        { field: 'maNV', headerName: 'Mã Nhân Viên', flex: 1 },
        { field: 'thoiGianDuyet', headerName: 'Thời Gian Duyệt', flex: 1 },
    ];

    return (
        <Box sx={{ padding: "100px", height: 800, width: '100%' }}>
            <DataGrid
                rows={yeuCauHoanTraList}
                columns={columns}
                pageSize={5}
                checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setSelectedIds(newRowSelectionModel);
                }}
                rowSelectionModel={selectedIds}
            />
            <div>
                {selectedIds.length > 0 && (
                    <Button component={Link} to={`detail/${selectedIds[0]}`} variant="contained" color="primary">
                        Xem
                    </Button>)}
            </div>
        </Box>
    );
};

export default ListYeuCauHoanTra;
