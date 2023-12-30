import React, { memo, useState, useEffect } from 'react';
import { getBenhByMaGBH, updateInsPack, getGoiBHByMaGBH } from "../../../api/connect";
import { useParams } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";
import { ROUTERS } from "../../../utils/router";
import { Link } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${theme.palette.mode === 'light' ? 'head' : 'body'}`]: {
    backgroundColor: theme.palette.mode === 'light' ? theme.palette.common.black : theme.palette.common.white,
    color: theme.palette.mode === 'light' ? theme.palette.common.white : theme.palette.common.black,
  },
  fontSize: 14,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const InsPackDetailPage = () => {
  //user context
  const { user } = useUser();

  const params = useParams();
  //error và loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  //khai báo các biến
  const [dataGoiBH, setDataGoiBH] = useState(null);
  const [dataBenhByGBH, setDataBenhByGBH] = useState([]);
  const [allBenh, setAllBenh] = useState([]);

  const [hospitalNameList, setHospitalNameList] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [insurancePackages, setInsurancePackages] = useState([]);
  const [requestList, setRequestList] = useState([]);

  //thông báo lỗi
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  //handle tab thông báo
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  //handle cho nút Tạo yêu cầu
  const handleVoHieuKichHoat = async() => {
    try {
   //goi api thay doi tinh trang goi bao hiem
      const responseData = await updateInsPack(localStorage.getItem("token"), params.id);
      setSnackbarMessage(responseData);
      setSnackbarOpen(true);
    } catch (error) {
      // Xử lý các lỗi khác (ví dụ: mất kết nối)
      //thông báo lỗi
      setSnackbarMessage(error.response.data);
      setSnackbarOpen(true);
  } finally {
      setLoading(false);
  }
  };
  //xử lý gọi api
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //API cho tab1
        // Gọi API để lấy dữ liệu về gói Bảo hiểm
        const goiBHData = await getGoiBHByMaGBH(params.id);
        setDataGoiBH(goiBHData);

        // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm
        const benhData = await getBenhByMaGBH(params.id);
        setDataBenhByGBH(benhData);

      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [dataGoiBH]); //những thuộc tính nếu thay đôi sẽ gọi lại useEffect

  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        style={{ padding: "20px", marginTop: "120px", marginBottom: "100px" }}
      >
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
          <Typography component="h1" variant="h5" color="primary">
            Chi tiết gói bảo hiểm
          </Typography>
        </div>
        <div>
          {/* <Grid container spacing={2}> */}
          <Grid item xs={12} sm={5}>
            {dataGoiBH ? (
              <Paper elevation={3} style={{ padding: 16}}>
                <Typography variant="h5" gutterBottom>
                  {dataGoiBH.tenGoiBH}
                </Typography>
                <Typography>Mô tả: {dataGoiBH.motaGoiBH}</Typography>
                <Typography>Giá: {dataGoiBH.gia} VND</Typography>
                <Typography>Độ tuổi: {dataGoiBH.doTuoi}</Typography>
                <Typography>Tỉ lệ hoàn tiền: {dataGoiBH.tiLeHoanTien}%</Typography>
                <Typography>Thời hạn bảo vệ: {dataGoiBH.thoiHanBaoVe} năm</Typography>
                <Typography>Tình trạng: {dataGoiBH.tinhTrang}</Typography>
              </Paper>
            ) : (
              <Typography variant="body1">Loading...</Typography>
            )}

            {dataGoiBH && (
              <>
                <Paper elevation={3} style={{ marginTop: 16, padding: 16 }}>
                  <Typography variant="h5" gutterBottom>
                    Bệnh được áp dụng hoàn tiền
                  </Typography>
                  <List>
                    {dataBenhByGBH.map((benhItem, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={`${benhItem.tenBenh}`} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                  <Button variant="outlined" onClick={handleVoHieuKichHoat} style={{ marginRight: '10px' }}>
                      {dataGoiBH.tinhTrang === 'Đang cung cấp' ? 'Vô hiệu gói bảo hiểm' : 'Kích hoạt gói bảo hiểm'}
                  </Button>
                  <Button variant="outlined" component={Link} to={`../${ROUTERS.USER.INSURANCEPACKM}`}>
                    Quay lại
                  </Button>
                </div>
              </>
            )}
          </Grid>
        </div>

      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
};

export default memo(InsPackDetailPage);
