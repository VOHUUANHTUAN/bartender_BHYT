import React, { memo, useState, useEffect } from 'react';
import {getBenhByMaGBH, getGoiBHByMaGBH, getAllBenh, addBenhForGBH, deleteBenhFromBGH, addInsPack } from "../../../api/connect";
import { useUser } from "../../../context/UserContext";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
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


const AddInsPack = () => {
  //user context
  const { user } = useUser();
  //error và loading
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
    //khai báo các biến
    const [dataGoiBH, setDataGoiBH] = useState(null);
    const [dataBenhByGBH, setDataBenhByGBH] = useState([]);
    const [allBenh, setAllBenh] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);
  // Define the custom table component
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
 //xử lý gọi api
 useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      //API cho tab1
      const allBenhData = await getAllBenh()
      setAllBenh(allBenhData);
      // Gọi API để lấy dữ liệu về bệnh dựa trên mã gói Bảo hiểm
      // const benhData = await getBenhByMaGBH(params.id);
      // setDataBenhByGBH(benhData);


    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []); //những thuộc tính nếu thay đôi sẽ gọi lại useEffect

  // Function to submit data to API
  const handleSubmitAddIns =  async (e) => {
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
    const addData = {
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
      //const responseData = await updateInsPack(params.id, updateData)
      const responseData = await addInsPack(addData)


      // Thực hiện gọi API thêm bệnh cho từng bệnh mới được chọn
      // for (const newBenh of newBenhsValues) {
      //   console.log(params.id)
      //   await addBenhForGBH(params.id, newBenh);
      // }

      // // Thực hiện gọi API xóa bệnh cho từng bệnh không còn được chọn
      // for (const removedBenh of removedBenhsValues) {
      //   await deleteBenhFromBGH(params.id, removedBenh);
      // }
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
  // Replace the above console.log with the actual API call

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
  <Container component="main" maxWidth="md">
    <Paper
      elevation={3}
      style={{ padding: "20px", marginTop: "120px", marginBottom: "100px" }}
    >
                  <Typography component="h1" variant="h5">
              Tạo gói bảo hiểm
            </Typography>
      <div>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleSubmitAddIns(e);
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
              Tạo
            </Button>
          </div>

        </form>
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
}
export default memo(AddInsPack);