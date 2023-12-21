import React, { memo, useState, useEffect } from 'react';
import { getDonDangKyList } from '../../../api/connect';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';


import "./style.scss"

const ListDonDangKy = () => {
  const [loading, setLoading] = useState(true);
  const [donDangKyList, setDonDangKyList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDonDangKyList();
        setDonDangKyList(data);
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

  const rows = donDangKyList.map((item, index) => ({
    id: index + 1,
    maDonDK: item.maDonDK,
    maGoiBH: item.maGoiBH,
    thoiGianDK: item.thoiGianDK,
    thoiGianBD: item.thoiGianBD,
    thoiGianHetHan: item.thoiGianHetHan,
    tinhTrang: item.tinhTrang,
    luaChonThanhToan: item.luaChonThanhToan,
    tongGia: item.tongGia,
    maKH: item.maKH,
    maNV: item.maNV,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'maDonDK', headerName: 'Mã Đơn ĐK', width: 90 },
    { field: 'maGoiBH', headerName: 'Mã Gói BH', width: 80 },
    { field: 'thoiGianDK', headerName: 'Thời Gian ĐK', width: 180 },
    { field: 'thoiGianBD', headerName: 'Thời Gian Bắt Đầu', width: 180 },
    { field: 'thoiGianHetHan', headerName: 'Thời Gian Hết Hạn', width: 180 },
    { field: 'luaChonThanhToan', headerName: 'Lựa Chọn Thanh Toán', width: 180 },
    { field: 'tongGia', headerName: 'Tổng Giá' },
    { field: 'maKH', headerName: 'Mã KH', width: 80 },
    { field: 'maNV', headerName: 'Mã NV', width: 80 },
    {
      field: 'tinhTrang',
      headerName: 'Tình Trạng',
      width: 180,
      cellClassName: (params) => `status-cell ${params.value.replace(/\s/g, '').toLowerCase()}`,
      renderCell: (params) => (
        <div className={`bordered-cell ${params.value.replace(/\s/g, '').toLowerCase()}`}>
          {params.value}
        </div>
      ),
    },

  ];

  return (
    <Box sx={{ padding: "100px", height: 800, width: '100%' }}>
      <DataGrid
        rows={rows}
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

export default memo(ListDonDangKy);
