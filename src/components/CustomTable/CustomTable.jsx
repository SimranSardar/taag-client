import React, { useEffect, useRef, useState } from "react";
import { Button as AntButton, Input, Space, Table } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
// import "antd/dist/antd.css";
import styles from "./CustomTable.module.scss";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { useDemoData } from "@mui/x-data-grid-generator";
import "antd/dist/antd.css";

// const StyledGridOverlay = styled("div")(({ theme }) => ({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   justifyContent: "center",
//   height: "100%",
//   "& .ant-empty-img-1": {
//     fill: "#262626",
//   },
//   "& .ant-empty-img-2": {
//     fill: "#595959",
//   },
//   "& .ant-empty-img-3": {
//     fill: "#434343",
//   },
//   "& .ant-empty-img-4": {
//     fill: "#1c1c1c",
//   },
//   "& .ant-empty-img-5": {
//     fillOpacity: "0.08",
//     fill: "#fff",
//   },
// }));

// function CustomNoRowsOverlay() {
//   return (
//     <StyledGridOverlay>
//       <svg
//         width="120"
//         height="100"
//         viewBox="0 0 184 152"
//         aria-hidden
//         focusable="false"
//       >
//         <g fill="none" fillRule="evenodd">
//           <g transform="translate(24 31.67)">
//             <ellipse
//               className="ant-empty-img-5"
//               cx="67.797"
//               cy="106.89"
//               rx="67.797"
//               ry="12.668"
//             />
//             <path
//               className="ant-empty-img-1"
//               d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
//             />
//             <path
//               className="ant-empty-img-2"
//               d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
//             />
//             <path
//               className="ant-empty-img-3"
//               d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
//             />
//           </g>
//           <path
//             className="ant-empty-img-3"
//             d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
//           />
//           <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
//             <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
//             <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
//           </g>
//         </g>
//       </svg>
//       <Box sx={{ mt: 1 }}>No Data</Box>
//     </StyledGridOverlay>
//   );
// }

const CustomTable = ({ columns, data, onRowSelect }) => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    setDataSource(
      data?.map((item) => ({ ...item, key: item.id || item._id || item.name }))
    );
  }, [data]);

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const [cols, setCols] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys, rows) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
    onRowSelect(rows);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <AntButton
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </AntButton>
          <AntButton
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </AntButton>
          <AntButton
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </AntButton>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  useEffect(() => {
    setCols(
      columns?.map((col) => ({
        ...col,
        ...(col.searchable ? getColumnSearchProps(col.dataIndex) : {}),
      }))
    );
  }, [columns]);

  return (
    // <StyledDataGrid
    //   className={styles.table}
    //   components={{
    //     NoRowsOverlay: CustomNoRowsOverlay,
    //   }}
    //   rows={dataSource}
    //   columns={columns}
    //   checkboxSelection
    //   onRowClick={onRowClick}
    // />
    <Table
      columns={cols}
      dataSource={dataSource}
      rowSelection={rowSelection}
      scroll={{
        x: 1500,
        y: 800,
      }}
    />
  );
};

const StyledDataGrid = styled(DataGrid)(() => {
  return {
    border: "none",
    borderRadius: "25px",
    ".MuiTableHead-root .MuiTableRow-root .MuiTableCell-head": {
      fontWeight: "bold",
      resize: "horizontal",
      overflowX: "overlay",
      overflowY: "hidden",
      borderRight: "1px solid",
    },
    ".MuiDataGrid-cellCheckbox": {
      outline: "none",
      "&:focus-within": {
        outline: "none",
      },
    },
    ".MuiDataGrid-columnHeaders": {
      borderRadius: "25px",
      border: "none",
    },
    ".MuiDataGrid-cell": {
      "&:focus": {
        outline: "none",
      },
    },
    ".MuiDataGrid-row.Mui-selected": {
      background: "rgba(255,255,255,0.1)",
      "&:hover": {
        background: "rgba(255,255,255,0.2)",
      },
    },
  };
});

export default CustomTable;
