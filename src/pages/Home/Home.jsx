import { Button, CustomTable } from "../../components";
import styles from "./Home.module.scss";
// import "antd/dist/antd.css";
import { MainLayout } from "../../layouts";
import { useNavigate } from "react-router-dom";

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

const Home = () => {
  const navigate = useNavigate();
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
        <Button
          onClick={() => {
            console.log("hehe");
            navigate("/new-campaign");
          }}
        >
          New Campaign +
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} data={data} />
      </div>
    </MainLayout>
  );
};

export default Home;
