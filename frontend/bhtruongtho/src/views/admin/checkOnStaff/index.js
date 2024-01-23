import React, { useState, useEffect } from 'react';
import { getAllNhanVien } from "../../../api/connect";
import { DataGrid } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';



const NhanVienList = () => {
    const [nhanVienList, setNhanVienList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllNhanVien(localStorage.getItem('token'));
                console.log(response)
                // Add a unique 'id' property to each row
                const enhancedData = response.map((row, index) => ({ ...row, id: index + 1 }));
                console.log(enhancedData)
                setNhanVienList(enhancedData);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const columns = [
        { field: 'maNV', headerName: 'Mã NV', width: 100 },
        { field: 'hoTen', headerName: 'Họ Tên', width: 150 },
        { field: 'diaChi', headerName: 'Địa Chỉ', width: 200 },
        { field: 'sdt', headerName: 'Số Điện Thoại', width: 150 },
        { field: 'email', headerName: 'Email', width: 200 },
    ];

    return (
        <Box sx={{ padding: '100px', margin: 'auto', height: 800, width: '80%' }}>

            <DataGrid
                rows={nhanVienList}
                columns={columns}
                pageSize={5}
                showFooter={false}
                hideFooterSelectedRowCount
                hideFooterPagination

            />
            <Button component={Link} to="/admin" variant="contained" color="secondary" style={{ marginTop: '20px' }}>
                Quay lại
            </Button>
        </Box>
    );
};

export default NhanVienList;
