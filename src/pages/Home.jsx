import React, { useEffect, useState } from "react";
import DemoComponent from "../components/DemoComponent";
import * as _ from "lodash";
import Container from "@mui/material/Container";
import CustomizedSwitches from "../components/toggleButton";
import DynamicTable from "../components/DynamicTable";
import { useTheme } from "@mui/material/styles";
import { Paper } from "@mui/material";
import PageHeader from "../components/PageHeader";
import { connect } from "react-redux";

const Home = ({ comboBox, getItemInformation, itemData }) => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [tableData, setTableData] = useState(itemData);

  const itemList = [
    { fldId: "R001", fldName: "Ring" },
    { fldId: "N002", fldName: "Necklace" },
  ];
  const initialRows = [
    {
      itemCode: "R001",
      description: "Gold Ring",
      quantity: 2,
      grossWeight: "5g",
      unitPrice: "50",
      purity: "22K",
    },
    {
      itemCode: "N002",
      description: "Gold Necklace",
      quantity: 1,
      grossWeight: "30g",
      unitPrice: "150",
      purity: "24K",
    },
  ];
  useEffect(() => {
    if (selectedId) {
      getItemInformation({
        CompanyId: 1,
        ItemCode: selectedId,
      });
    }
  }, [selectedId]);
  console.log(comboBox, selectedId, itemData, "combobox");
  return (
    <>
      <PageHeader />
      <div className="main-section">
        <div class="MuiGrid-root MuiGrid-item css-14d127i">
          <h2 class="MuiTypography-root MuiTypography-h2 css-eb60i0">
            Gold Retail Sales Invoice
          </h2>
        </div>
        <Paper
          className="custom-card_001"
          bgcolor={theme.palette.background.default}
          sx={{
            // padding: theme.spacing(2),
            maxWidth: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <DynamicTable
            rows={rows}
            setRows={setRows}
            itemList={comboBox.items}
            tableData={tableData}
            setSelectedId={setSelectedId}
          />
        </Paper>
      </div>
    </>
  );
};
const mapStateToProps = ({ auth = {}, demo = {} }) => ({
  comboBox: _.get(auth, "comboBox", []),
  itemData: _.get(demo, "itemData", []),
});

const mapDispatchToProps = (dispatch) => ({
  getItemInformation: (data) =>
    dispatch({ type: "getItemInformationcalled", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
