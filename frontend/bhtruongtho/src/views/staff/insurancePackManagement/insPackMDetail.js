import React, { memo, useState, useEffect } from 'react';
import { getBenhByMaGBH, getYCHTByUsername, updateInsPack, getGoiBHByMaGBH, getAllBenh, addBenhForGBH, deleteBenhFromBGH } from "../../../api/connect";
import { useParams } from 'react-router-dom';
import { useUser } from "../../../context/UserContext";
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
  const [refundAmount, setRefundAmount] = useState('');
  const [diseases, setDiseases] = useState([]);
  const [insurancePackages, setInsurancePackages] = useState([]);
  const [selectedHospitalName, setSelectedHospitalName] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [selectedInsurancePackage, setSelectedInsurancePackage] = useState('');
  const [requestList, setRequestList] = useState([]);

  //Cấu hình cho tab
  const [value, setValue] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };
   // Function to handle input changes
   const handleInputChange = (e, fieldName) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: e.target.value,
    }));
    //regex cho ten
    if (e.target.name === "Ten") {
      const tenRegex = /^[a-zA-Z0-9\s&.'-]{3,50}$/;
      setTenError(!tenRegex.test(e.target.value));
    }
    //regex cho mo ta goi bao hiem
    if (e.target.name === "MoTa") {
      const moTaRegex = /^[a-zA-Z0-9\s&.'-]{3,255}$/;
      setMoTaError(!moTaRegex.test(e.target.value));
    }
    //regex cho số tiền
    if (e.target.name === "Gia") {
      const giaRegex = /^\d+(\.\d{1,2})?$/;
      setGiaError(!giaRegex.test(e.target.value));
    }
    //regex cho ti le hoan tien
    if (e.target.name === "TiLeHoanTien") {
      const tiLeRegex = /^(?:100|[1-9]?[0-9])$/;
      setTiLeHoanTienError(!tiLeRegex.test(e.target.value));
    }
    //regex cho thoi han bao ve
    if (e.target.name === "ThoiHanBaoVe") {
      const thoiHanRegex = /^(1[0-9]|20|[1-9])$/;
      setThoiHanBaoVeError(!thoiHanRegex.test(e.target.value));
    }
  };
  //Dữ liệu nhập cần validate
  const [formData, setFormData] = useState({
    Ten: '',
    Mota: '',
    Gia: '',
    TiLeHoanTien: '',
    ThoiHanBaoVe: ''
    // ... other fields
  });
  const fieldNames = {
    Ten: 'Tên',
    Mota: 'Mô Tả',
    Gia: 'Giá',
    TiLeHoanTien: 'Tỉ Lệ Hoàn Tiền',
    ThoiHanBaoVe: 'Thời Hạn Bảo Vệ',

  };
  //thông báo lỗi
  const [tenError, setTenError] = useState(false);
  const [moTaError, setMoTaError] = useState(false);
  const [giaError, setGiaError] = useState(false);
  const [tiLeHoanTienError, setTiLeHoanTienError] = useState(false);
  const [thoiHanBaoVeError, setThoiHanBaoVeError] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const getError = (fieldName) => {
    switch (fieldName) {
      case "Ten":
        return tenError;
      case "MoTa":
        return moTaError;
      case "Gia":
        return giaError;
      case "TiLeHoanTien":
        return tiLeHoanTienError;
      case "ThoiHanBaoVe":
        return thoiHanBaoVeError;
      default:
        return false;
    }
  };
  
  const getErrorMessage = (fieldName) => {
    switch (fieldName) {
      case "Ten":
        return "Tên không hợp lệ"; // Replace with the actual error message
      case "MoTa":
        return "Mô tả chứa kí tự không hợp lệ"; // Replace with the actual error message
      case "Gia":
        return "Giá tiền chỉ chứa số"; // Replace with the actual error message
      case "TiLeHoanTien":
        return "Tỉ lệ là 1 số trong khoảng 1-100"; // Replace with the actual error message
      case "ThoiHanBaoVe":
        return "Thời hạn bảo về là 1 số khoảng 1-20"; // Replace with the actual error message
      default:
        return "";
    }
  };
  //handle tab thông báo
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };


  //validate cho các trường trong form
  const validateForm = () => {
    if (!formData.Ten) {
      return "Ten không được để trống";
    }
    if (!formData.Mota) {
      return "Mo ta không được để trống";
    }
    if (!formData.Gia) {
      return "Gia không được để trống";
    }
    if (!formData.TiLeHoanTien) {
      return "Ti le không được để trống";
    }
    if (!formData.ThoiHanBaoVe) {
      return "Thoi han không được để trống";
    }
    if (tenError || moTaError || giaError || tiLeHoanTienError || thoiHanBaoVeError) {
      return "Thông tin chưa hợp lệ";
    }
    return null; // Validation passed
  };
  //handle cho nút Tạo yêu cầu
  const handleUpdateInsPackSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    //gọi hàm validate
    const validationError = validateForm();
    if (validationError) {
      setSnackbarMessage(validationError);
      setSnackbarOpen(true);
      return;
    }
    // Handle form submission logic here
    setLoading(true);
    const updateData = {
      // Populate with the necessary data
      tenGoiBH: formData.Ten,
      motaGoiBH: formData.Mota,
      gia: formData.Gia,
      tiLeHoanTien: formData.TiLeHoanTien,
      thoiHanBaoVe: formData.ThoiHanBaoVe
    };

    const currentBenhList = dataBenhByGBH.map((item) => item.tenBenh);
    const newBenhs = selectedValues.filter(value => !currentBenhList.includes(value));
  
    const removedBenhs = currentBenhList.filter(benh => !selectedValues.includes(benh));

    // Lấy mã bệnh cho các tên bệnh được chọn
    const newBenhsValues = newBenhs.map(mapTenBenhToMaBenh);
    const removedBenhsValues = removedBenhs.map(mapTenBenhToMaBenh);

    try {
      //gọi api post
      const responseData = await updateInsPack(params.id, updateData)
         // Thực hiện gọi API thêm bệnh cho từng bệnh mới được chọn
    for (const newBenh of newBenhsValues) {
      console.log(params.id)
      await addBenhForGBH(params.id, newBenh);
    }

    // Thực hiện gọi API xóa bệnh cho từng bệnh không còn được chọn
    for (const removedBenh of removedBenhsValues) {
      await deleteBenhFromBGH(params.id, removedBenh);
    }
      //thông báo thành công
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
        const allBenhData = await getAllBenh()
        setAllBenh(allBenhData);
        // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm
        const benhData = await getBenhByMaGBH(params.id);
        setDataBenhByGBH(benhData);


        //API cho tab2
        //Gọi API để lấy yêu cầu hoàn trả theo username
        const yCHTByUs = await getYCHTByUsername(user.username);
        setRequestList(yCHTByUs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); //những thuộc tính nếu thay đôi sẽ gọi lại useEffect

  const handleInsurancePackageChange = (e) => {
    setSelectedInsurancePackage(e.target.value);
  };
  // Hàm để lấy tên gói bảo hiểm dựa trên MaGoiBH
  const getInsurancePackageName = (maGoiBHApDung) => {
    const foundPackage = insurancePackages.find((packageItem) => packageItem.maGoiBH === maGoiBHApDung);
    return foundPackage ? foundPackage.tenGoiBH : 'Unknown';
  };
  //hàm lấy tên bệnh dựa trên mã bệnh
  const getDiseaseName = (maBenh) => {
    const foundPackage = diseases.find((packageItem) => packageItem.maBenh === maBenh);
    return foundPackage.tenBenh;
  };
  //hàm lấy tên bệnh viện dựa trên mã bệnh viện
  const getHospitalName = (maBenhVien) => {
    const foundPackage = hospitalNameList.find((packageItem) => packageItem.maBV === maBenhVien);
    return foundPackage.tenBV;
  };



  //Số thứ tự cho đơn yêu cầu
  let idCounter = 1; // Initialize a counter
  // Function to generate unique ids
  const generateUniqueId = () => {
    return idCounter++;
  };
  //hàm format định dạng thời gian Output: 04/10/2023 08:30
  function formatDateTime(dateTimeString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const date = new Date(dateTimeString);
    const formattedDate = date.toLocaleDateString('en-GB', options);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;
    return `${formattedDate} ${formattedTime}`;
  }
  //đổ dữ liệu vào rows trong datagrid
  const rows = requestList.map((row) => ({
    id: generateUniqueId(),
    maHDKhamBenh: row.maHDKhamBenh,
    tenBenhVien: row.tenBenhVien,
    soTienDaKham: row.soTienDaKham,
    benh: row.benh,
    thoiGianTao: formatDateTime(row.thoiGianTao),
    tinhTrang: row.tinhTrang,
    tenGoiBHApDung: getInsurancePackageName(row.maGoiBHApDung),
    soTienHoanTra: row.soTienHoanTra
  }));

  //tạo columnn cho datagrid
  const columns = [
    { field: 'id', headerName: 'STT', width: 50 },
    { field: 'maHDKhamBenh', headerName: 'Mã HĐ Khám Bệnh', width: 150 },
    { field: 'tenBenhVien', headerName: 'Tên Bệnh Viện', width: 250 },
    { field: 'benh', headerName: 'Bệnh', width: 150 },
    { field: 'tenGoiBHApDung', headerName: 'Gói BH Áp Dụng', width: 200 },
    { field: 'soTienDaKham', headerName: 'Số Tiền Đã Khám', type: 'number', width: 150 },
    { field: 'soTienHoanTra', headerName: 'Số Tiền Hoàn Trả', type: 'number', width: 150 },
    {
      //một chút màu sắc cho cột tình trạng
      field: 'tinhTrang', headerName: 'Tình Trạng', width: 100,
      renderCell: (params) => {
        const tinhTrangValue = params.value;
        let cellColor;
        // Set colors based on tinhTrangValue
        switch (tinhTrangValue) {
          case 'Đã hoàn tiền':
            cellColor = 'green';
            break;
          case 'Chờ duyệt':
            cellColor = 'orange';
            break;
          case 'Không đủ điều kiện':
            cellColor = 'red';
            break;
          // Add more cases as needed
          default:
            cellColor = 'black';
        }
        return <div style={{ color: cellColor }}>{tinhTrangValue}</div>;
      },
    },
    { field: 'thoiGianTao', headerName: 'Thời Gian Tạo', width: 200 },
  ];

  

  

  const [selectedValues, setSelectedValues] = useState([]);

  useEffect(() => {
    // Set the initial selected values only on mount
    const initialSelectedValues = dataBenhByGBH.map((item) => item.tenBenh);
    setSelectedValues(initialSelectedValues);

  }, [dataBenhByGBH]);

  const handleSelectChange = (event, values) => {
        // Kiểm tra xem người dùng đã chọn ít nhất một bệnh hay chưa
    if (values.length === 0) {
          setSnackbarMessage('Vui lòng chọn ít nhất một bệnh');
          setSnackbarOpen(true);
          return;
        }
    setSelectedValues(values);
  };
  // Hàm ánh xạ từ tên bệnh sang mã bệnh
  const mapTenBenhToMaBenh = (tenBenh) => {
    const benh = allBenh.find((item) => item.tenBenh === tenBenh);
    return benh ? benh.maBenh : null;
  };



  return (
    <Container component="main" maxWidth="lg">
      <Paper
        elevation={3}
        style={{ padding: "20px", marginTop: "120px", marginBottom: "100px" }}
      >
        <div>
          <Tabs value={value} onChange={handleChangeTab}>
            <Tab label="Cập nhật gói bảo hiểm" />
            <Tab label="Vô hiệu gói bảo hiểm" />
          </Tabs>
          {/* Nội dung tương ứng với từng tab */}
          {value === 0 && <div style={{ padding: "20px", marginTop: "20px" }}>
          <Grid container spacing={2}>
      <Grid item xs={12} sm={5}>
        <Paper elevation={3} style={{padding: 16 }}>
        {dataGoiBH ? (
          <>
            <Typography variant="h5" gutterBottom>
              {dataGoiBH.tenGoiBH}
            </Typography>
            <Typography>Mô tả: {dataGoiBH.motaGoiBH}</Typography>
            <Typography>Giá: {dataGoiBH.gia} VND</Typography>
            <Typography>Tỉ lệ hoàn tiền: {dataGoiBH.tiLeHoanTien}%</Typography>
            <Typography>Thời hạn bảo vệ: {dataGoiBH.thoiHanBaoVe} năm</Typography>
          </>
        ) : (
          <Typography variant="body1">Loading...</Typography>
        )}
        </Paper>

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
        </Grid>

<Grid item xs={12} sm={7}>
    <Paper elevation={3} style={{ padding: 16 }}>
            <Typography component="h1" variant="h5">
              Cập nhật gói bảo hiểm
            </Typography>
            <form onSubmit={(e) => {
              e.preventDefault();
              handleUpdateInsPackSubmit(e);
            }}>
                   <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
 
            <TableRow>
            <StyledTableCell style={{ width: '30%' }}></StyledTableCell>
                          <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.entries(formData).map(([fieldName, value]) => (
              <StyledTableRow key={fieldName}>
                <StyledTableCell component="th" scope="row">
                {fieldNames[fieldName]}
                </StyledTableCell>
                <StyledTableCell align="right">
                <TextField
                    variant="outlined"
                    fullWidth
                    name={fieldName}
                    value={value}
                    onChange={(e) => handleInputChange(e, fieldName)}
                    error={getError(fieldName)}
                    helperText={getError(fieldName) && getErrorMessage(fieldName)}
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Autocomplete
        multiple
        id="tags-outlined"
        options={allBenh.map((option) => option.tenBenh)}

        value={selectedValues}
        onChange={handleSelectChange}
        filterSelectedOptions
        freeSolo
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant="outlined" label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chọn bệnh"
            placeholder="Tên bệnh"
          />
        )}
      />
      <Button variant="contained" color="primary" type="submit">
        Cập nhật gói bảo hiểm
      </Button>
    </div>

            </form> </Paper>      </Grid>
    </Grid></div>}
            
          {value === 1 &&
            <div style={{ padding: "20px", marginTop: "20px" }}>
              <Box sx={{ height: 400, width: '100%' }}>
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
                  disableRowSelectionOnClick
                  getRowId={(row) => row.id}
                />
              </Box>
            </div>}
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
