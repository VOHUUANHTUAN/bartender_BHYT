import React, { memo, useState, useEffect } from 'react';
import { getGoiBHAPI } from '../../../api/connect';
import { Link } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment,
  Tabs,
  Tab,
  Snackbar,
} from "@mui/material";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';


import "./style.scss"

const InsurancePack = () => {
  const [loading, setLoading] = useState(true);
  const [goiBaoHiemList, setGoiBaoHiemList] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGoiBHAPI();
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
    thoiHanBaoVe: item.thoiHanBaoVe 
  }));

  const columns = [
    { field: 'maGoiBH', headerName: 'Mã Gói BH', width: 100 },
    { field: 'tenGoiBH', headerName: 'Tên Gói BH', width: 150 },
    { field: 'motaGoiBH', headerName: 'Mô Tả Gói BH', width: 250 },
    { field: 'gia', headerName: 'Giá', width: 100 },
    { field: 'tiLeHoanTien', headerName: 'Tỉ lệ Hoàn Tiền', width: 150 },
    { field: 'thoiHanBaoVe', headerName: 'Thời Hạn Bảo Vệ', width: 150 }
  ];
  const handleButtonClick = () => {
    // Handle button click logic here
    console.log('Button Clicked');
  };
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
      {/* <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      /> */}
    </Container>
  );
};

export default memo(InsurancePack);
