import { Add } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import { Navbar, Button } from "../../components";
import styles from "./Home.module.scss";
import "antd/dist/antd.css";
import { SearchOutlined } from "@ant-design/icons";
import { Button as AntButton, Input, Space, Table } from "antd";

import Highlighter from "react-highlight-words";
const data = [
  {
    key: "1",
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
  },
  {
    key: "2",
    name: "Joe Black",
    age: 42,
    address: "London No. 1 Lake Park",
  },
  {
    key: "3",
    name: "Jim Green",
    age: 32,
    address: "Sidney No. 1 Lake Park",
  },
  {
    key: "4",
    name: "Jim Red",
    age: 32,
    address: "London No. 2 Lake Park",
  },
];

const Home = () => {
  const [progress, setProgress] = useState(30);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);

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

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // width: "30%",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Link",
      dataIndex: "age",
      key: "age",
      // width: "20%",
      ...getColumnSearchProps("age"),
    },
    {
      title: "Followers",
      dataIndex: "followers",
      key: "age",
      // width: "20%",
      // ...getColumnSearchProps("age"),
      sorter: (a, b) => a - b,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Avg. Views",
      dataIndex: "avgView",
      key: "avgView",
      sorter: (a, b) => a - b,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Deliverable",
      dataIndex: "deliverable",
      key: "deliverable",
      // width: "20%",
      ...getColumnSearchProps("deliverable"),
    },
    {
      title: "Commercial Creator",
      dataIndex: "commerciaCreator",
      key: "commerciaCreator",
      // width: "20%",
      ...getColumnSearchProps("commerciaCreator"),
    },
  ];

  return (
    <div className={styles.container}>
      <Navbar
        titleProps={{
          title: "Campaigns",
          // isEditIconVisible: true,
          // isBackIconVisible: true,
          // brandName: "Nike",
        }}
        //   progress={progress}
      />
      <div className={styles.tableContainer}>
        <Table columns={columns} dataSource={data} />
      </div>
    </div>
  );
};

export default Home;
