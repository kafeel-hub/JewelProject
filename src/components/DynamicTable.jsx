import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
  Alert,
  Grid
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';

import { CustomInput,TableInput } from "./Customcomponents/CustomInputs";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";

const DynamicTable = ({ tableData = [] ,rows,setRows}) => {
  const theme = useTheme();

  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState(null); 
  const [showSnackbar, setShowSnackbar] = useState(false); 

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      fontWeight: "bold",
      textAlign: "center",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      textAlign: "center",
      wordWrap: "break-word",
      border:"none",
      padding:"10px 2px 0 2px"
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // "&:nth-of-type(odd)": {
    //   backgroundColor: theme.palette.action.hover,
    // },
    "& td": {
        border:"none",
      borderBottom: "1px solid lightgray",
    },
  }));

  const handleRowChange = (id, field, value) => {
    const newValue = 
      field === "qty" ||
      field === "price" ||
      field === "grossWeight" ||
      field === "stoneWeight" ||
      field === "netWeight" ||
      field === "goldPrice" ||
      field === "mcPerGram" ||
      field === "unitPricePerGram" ||
      field === "stoneAmount"
        ? (value === "" ? "" : parseFloat(value) || 0) 
        : value;
  
    setRows((prevRows) =>
      prevRows.map((row) =>
        row.id === id
          ? {
              ...row,
              [field]: newValue,
              amount:
                (field === "price" || field === "qty")
                  ? (row.qty || 0) * (row.price || 0)
                  : row.amount,
            }
          : row
      )
    );
  };
  
  

  const handleAddRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        id: prevRows.length + 1,
        itemCode: "",
        description: "",
        purity: "",
        qty: 1,
        grossWeight: 0,
        stoneWeight: 0,
        netWeight: 0,
        goldPrice: 0,
        mcPerGram: 0,
        unitPricePerGram: 0,
        stoneAmount: 0,
        amount: 0,
      },
    ]);
  };
  const handleDeleteRow = () => {
    if (deleteTarget !== null) {
      setRows((prevRows) => prevRows.filter((row) => row.id !== deleteTarget));
      setDeleteTarget(null);
      setShowSnackbar(true); // Show success message
    }
  };

  const subTotal = rows.reduce((sum, row) => sum + (row.amount || 0), 0);
  const discountAmount = (subTotal * discount) / 100;
  const taxAmount = ((subTotal - discountAmount) * tax) / 100;
  const grandTotal = subTotal - discountAmount + taxAmount;

  return (
    <div>
      <TableContainer>
        <Table 
        aria-label="dynamic table">
          <TableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Item Code</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Purity</StyledTableCell>
              <StyledTableCell>Qty</StyledTableCell>
              <StyledTableCell>Gross Wt</StyledTableCell>
              <StyledTableCell>Stone Wt</StyledTableCell>
              <StyledTableCell>Net Wt</StyledTableCell>
              <StyledTableCell>Gold Price</StyledTableCell>
              <StyledTableCell>MC/gm</StyledTableCell>
              <StyledTableCell>Unit Price/gm</StyledTableCell>
              <StyledTableCell>Stone Amount</StyledTableCell>
              <StyledTableCell>Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell>{index + 1}</StyledTableCell>
                <StyledTableCell>
                  {/* <CustomInput
                    value={row.itemCode}
                    onChange={(e) => handleRowChange(row.id, "itemCode", e.target.value)}
                    type="number"
                  /> */}
                      <TableInput
                    value={row.itemCode}
                    onChange={(e) => handleRowChange(row.id, "itemCode", e.target.value)}
                    type="text"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    value={row.description}
                    onChange={(e) => handleRowChange(row.id, "description", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    value={row.purity}
                    onChange={(e) => handleRowChange(row.id, "purity", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.qty}
                    onChange={(e) => handleRowChange(row.id, "qty", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.grossWeight}
                    onChange={(e) => handleRowChange(row.id, "grossWeight", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.stoneWeight}
                    onChange={(e) => handleRowChange(row.id, "stoneWeight", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.netWeight}
                    onChange={(e) => handleRowChange(row.id, "netWeight", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.goldPrice}
                    onChange={(e) => handleRowChange(row.id, "goldPrice", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.mcPerGram}
                    onChange={(e) => handleRowChange(row.id, "mcPerGram", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.unitPricePerGram}
                    onChange={(e) => handleRowChange(row.id, "unitPricePerGram", e.target.value)}
                  />
                </StyledTableCell>

                <StyledTableCell>
                  <CustomInput
                    type="number"
                    value={row.stoneAmount}
                    onChange={(e) => handleRowChange(row.id, "stoneAmount", e.target.value)}
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <IconButton onClick={() => setDeleteTarget(row.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <CustomButton onClick={handleAddRow} text=" Add Item" theme={theme} fullWidth sx={{ mt: 2 }} variantType="dark" type="submit" /> */}
      <Button onClick={handleAddRow} variant="outlined" sx={{ mt: 2 }} startIcon={<AddIcon />}>

        Add Item
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
      >
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting this item will remove it from the list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button
            onClick={handleDeleteRow}
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Success Message */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Item deleted successfully!
        </Alert>
      </Snackbar>



      <div style={{ marginTop: "20px" }}>

      <Grid container spacing={2}  sx={{ my: 2 }} alignItems="center">

        <Grid item xs={2}>
                <CustomInput
                type="number"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                label="Discount (%)"
                />
        </Grid>

        <Grid item xs={2}>

        <CustomInput
          type="number"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
          label="Tax (%)"
        />
        </Grid>
</Grid>

        <div>
          <p>Sub Total: ${subTotal.toFixed(2)}</p>
          <p>Discount: ${discountAmount.toFixed(2)}</p>
          <p>Tax: ${taxAmount.toFixed(2)}</p>
          <p>Grand Total: ${grandTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default DynamicTable;
