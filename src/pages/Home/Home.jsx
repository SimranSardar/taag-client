import { Button, CustomTable, InputField, InputSelect } from "../../components";
import styles from "./Home.module.scss";
// import "antd/dist/antd.css";
import { MainLayout } from "../../layouts";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  CampaignContext,
  CampgaignContext,
} from "../../utils/contexts/CampaignContext";

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
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const { campaigns } = useContext(CampaignContext);

  function debounce(func, timeout) {
    let timer;
    return (...args) => {
      if (!timer) {
        func.apply(this, args);
      }
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
      }, timeout);
    };
  }

  function onSearch(e) {
    const { value } = e.target;
    setData(
      campaigns?.filter((campaign) =>
        campaign.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }

  function handleChange(e) {
    const { id, value, name } = e.target;

    if (id === "search") {
      debounce(onSearch, 500)(e);
    }

    setFilters((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  // const columns = [
  //   {
  //     headerName: "Name",
  //     field: "name",
  //     key: "name",
  //     // width: "30%",
  //     // ...getColumnSearchProps("name"),
  //   },
  //   {
  //     headerName: "Link",
  //     field: "link",
  //     key: "link",
  //     renderCell: (row) => (
  //       <a target="_blank" rel="noreferrer" href={row.value}>
  //         {row.value}
  //       </a>
  //     ),
  //     // width: "20%",
  //     // ...getColumnSearchProps("age"),
  //   },
  //   {
  //     headerName: "Followers",
  //     field: "followers",
  //     key: "age",
  //     // width: "20%",
  //     // ...getColumnSearchProps("age"),
  //     // sorter: (a, b) => a - b,
  //     // sortDirections: ["descend", "ascend"],
  //   },
  //   {
  //     headerName: "Avg. Views",
  //     field: "avgViews",
  //     key: "avgViews",
  //     // sorter: (a, b) => a - b,
  //     // sortDirections: ["descend", "ascend"],
  //   },
  //   {
  //     headerName: "Deliverable",
  //     field: "deliverable",
  //     key: "deliverable",
  //     // width: "20%",
  //     // ...getColumnSearchProps("deliverable"),
  //   },
  //   {
  //     headerName: "Commercial Creator",
  //     field: "commercialCreator",
  //     key: "commercialCreator",
  //     // width: "20%",
  //     // ...getColumnSearchProps("commerciaCreator"),
  //   },
  // ];

  useEffect(() => {
    setData(campaigns);
  }, [campaigns]);

  const columns = [
    {
      headerName: "Date",
      field: "createdAt",
      key: "date",
      renderCell: (row) => (
        <span>{new Date(row.value).toLocaleDateString()}</span>
      ),
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      headerName: "Brand Name",
      field: "brand",
      key: "brandName",
      renderCell: (brand) => <span>{brand.value.name}</span>,
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      headerName: "Campaign Name",
      field: "name",
      key: "name",
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      headerName: "Amount",
      field: "brandAmount",
      key: "brandAmount",
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      headerName: "Status",
      field: "status",
      key: "status",
      renderCell: (row) => (
        <span style={{ textTransform: "capitalize " }}>{row.value}</span>
      ),
      // width: "20%",
      // ...getColumnSearchProps("age"),
    },
    {
      headerName: "View",
      field: "id",
      key: "open",
      renderCell: (row) => <Link to={`/campaigns/${row.value}`}>View</Link>,
      // width: "20%",
      // ...getColumnSearchProps("age"),
    },
  ];

  return (
    <MainLayout
      classes={[styles.container]}
      navbarProps={{
        titleProps: {
          name: "Campaigns",
          disabled: true,
        },
      }}
    >
      {/* <Header
        filters={filters}
        handleChange={handleChange}
        navigate={navigate}
      /> */}
      <div className={styles.header}>
        <InputField
          id="search"
          type="search"
          value={filters.search || ""}
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

// const Header = ({ filters, handleChange, navigate }) => {
//   return (

//   );
// };

export default Home;
