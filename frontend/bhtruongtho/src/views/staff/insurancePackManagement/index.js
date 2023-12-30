import React, { memo, useState, useEffect } from 'react';
import { getGoiBHByNV } from '../../../api/connect';
import { Link } from 'react-router-dom';
import {
  Container,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar  } from '@mui/x-data-grid';


const InsurancePack = () => {
  const [loading, setLoading] = useState(true);
  const [goiBaoHiemList, setGoiBaoHiemList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGoiBHByNV(localStorage.getItem("token"));
        setGoiBaoHiemList(data);
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

  const rows = goiBaoHiemList.map((item, index) => ({
    id: index + 1,
    maGoiBH: item.maGoiBH,
    tenGoiBH: item.tenGoiBH,
    motaGoiBH: item.motaGoiBH,
    gia: item.gia,
    tiLeHoanTien: item.tiLeHoanTien,
    thoiHanBaoVe: item.thoiHanBaoVe,
    tinhTrang: item.tinhTrang
  }));

  const columns = [
    { field: 'maGoiBH', headerName: 'Mã Gói BH', width: 100 },
    { field: 'tenGoiBH', headerName: 'Tên Gói BH', width: 150 },
    { field: 'motaGoiBH', headerName: 'Mô Tả Gói BH', width: 250 },
    { field: 'gia', headerName: 'Giá', width: 100 },
    { field: 'tiLeHoanTien', headerName: 'Tỉ lệ Hoàn Tiền', width: 150 },
    { field: 'thoiHanBaoVe', headerName: 'Thời Hạn Bảo Vệ', width: 150 },
    {  //một chút màu sắc cho cột tình trạng
      field: "tinhTrang",
      headerName: "Tình Trạng",
      width: 180,
      renderCell: (params) => {
          const tinhTrangValue = params.value;
          let cellColor;
          // Set colors based on tinhTrangValue
          switch (tinhTrangValue) {
              case "Đang cung cấp":
                  cellColor = "green";
                  break;
              // Add more cases as needed
              default:
                  cellColor = "gray";
          }
          return <div style={{ color: cellColor }}>{tinhTrangValue}</div>;
      },}
  ];
  
  return (
    <Container component="main" maxWidth="lg">
    <Paper
      elevation={3}
      style={{ padding: "20px", marginTop: "120px", marginBottom: "100px" }}
    >
      <div>
    <Box>
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
        <Typography component="h1" variant="h5">
          Danh sách gói bảo hiểm
        </Typography>
        <Button variant="outlined"  component={Link} to={`add`} style={{ marginLeft: 'auto' }}>
          Thêm gói bảo hiểm
        </Button>
      </div>
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
          },
        }}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setSelectedIds(newRowSelectionModel);
        }}
        rowSelectionModel={selectedIds}
      />
      <div>
        {selectedIds.length > 0 && (
          <Button component={Link} to={`detail/${selectedIds[0]}`} variant="contained" color="primary">
            Xem chi tiết
          </Button>)}
      </div>
    </Box>
    </div>
    </Paper>
    </Container>
  );
};

export default memo(InsurancePack);
