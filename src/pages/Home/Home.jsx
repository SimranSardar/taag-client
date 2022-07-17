import { Button, CustomTable, InputField, InputSelect } from "../../components";
import styles from "./Home.module.scss";
// import "antd/dist/antd.css";
import { MainLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const data = [
  {
    id: "1",
    name: "John Brown",
    link: "https://google.com",
    followers: "20k",
    avgViews: "100k",
    deliverable: "YouTube",
    commercialCreator: "150k",
  },
  {
    id: "2",
    name: "John Brown",
    link: "https://google.com",
    followers: "20k",
    avgViews: "100k",
    deliverable: "YouTube",
    commercialCreator: "150k",
  },
];

const sortingOptions = [
  {
    name: "Week",
    value: "week",
  },
  {
    name: "Month",
    value: "month",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({});

  function handleChange(e) {
    const { id, value, name } = e.target;
    setFilters((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  const columns = [
    {
      headerName: "Name",
      field: "name",
      key: "name",
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      headerName: "Link",
      field: "link",
      key: "link",
      renderCell: (row) => (
        <a target="_blank" rel="noreferrer" href={row.value}>
          {row.value}
        </a>
      ),
      // width: "20%",
      // ...getColumnSearchProps("age"),
    },
    {
      headerName: "Followers",
      field: "followers",
      key: "age",
      // width: "20%",
      // ...getColumnSearchProps("age"),
      // sorter: (a, b) => a - b,
      // sortDirections: ["descend", "ascend"],
    },
    {
      headerName: "Avg. Views",
      field: "avgViews",
      key: "avgViews",
      // sorter: (a, b) => a - b,
      // sortDirections: ["descend", "ascend"],
    },
    {
      headerName: "Deliverable",
      field: "deliverable",
      key: "deliverable",
      // width: "20%",
      // ...getColumnSearchProps("deliverable"),
    },
    {
      headerName: "Commercial Creator",
      field: "commercialCreator",
      key: "commercialCreator",
      // width: "20%",
      // ...getColumnSearchProps("commerciaCreator"),
    },
  ];

  return (
    <MainLayout
      classes={[styles.container]}
      navbarProps={{
        titleProps: {
          title: "Campaigns",
        },
      }}
    >
      <div className={styles.header}>
        <InputField
          id="search"
          type="search"
          value={filters?.search ? filters.search : ""}
          onChange={handleChange}
          placeholder={"Search Campaign"}
        />
        <div>
          <InputSelect
            label={"Sort By: Week/Month"}
            name={"sortBy"}
            onChange={handleChange}
            options={sortingOptions}
            value={filters?.sortBy ? filters.sortBy : ""}
          />
          <Button
            onClick={() => {
              navigate("/new-campaign");
            }}
          >
            New Campaign +
          </Button>
        </div>
      </div>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} data={data} />
      </div>
    </MainLayout>
  );
};

export default Home;
