import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomTable } from "../../components";
import { MainLayout } from "../../layouts";
import { CampaignContext } from "../../utils/contexts/CampaignContext";
import styles from "./Campaign.module.scss";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import { TabIcon } from "../../assets";

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

const Campaign = () => {
  const [campaign, setCampaign] = useState({});
  const [tabIndex, setTabIndex] = React.useState("1");

  const handleTabsChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const { fetchCampaign } = useContext(CampaignContext);
  const { id } = useParams();

  function handleChange(e) {
    const { id, value, name } = e.target;
    // console.log(id, value, name);
    setCampaign((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }
  useEffect(() => {
    console.log({ tabIndex });
  });
  useEffect(() => {
    async function fetchData() {
      const temp = await fetchCampaign(id);
      setCampaign(temp);
      console.log({ temp });
    }
    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <MainLayout
      classes={[styles.container]}
      isSideMenuVisible
      navbarProps={{
        titleProps: {
          id: "name",
          name: "Women's Day",
          isEditIconVisible: true,
          isBackIconVisible: true,
          name: campaign?.name || "New Campaign",
          onChange: handleChange,
        },
      }}
      moreInformationProps={{
        isVisible: true,
        agencyFees: "1,50,000",
        brandAmount: "4,00,000",
        totalAverageViews: "100K",
        totalCreator: "4",
        averageROI: "0.4",
      }}
    >
      <div className={styles.tablesContainer}>
        <TabContext value={tabIndex}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList
              value={tabIndex}
              onChange={handleTabsChange}
              aria-label="Tabs"
            >
              <Tab
                icon={
                  <TabIcon
                    filled={tabIndex === "1" ? true : false}
                    value={"1"}
                  />
                }
                value={"1"}
              />
              <Tab
                icon={
                  <TabIcon
                    filled={tabIndex === "2" ? true : false}
                    value={"2"}
                  />
                }
                value={"2"}
              />
              <Tab
                icon={
                  <TabIcon
                    filled={tabIndex === "3" ? true : false}
                    value={"3"}
                  />
                }
                value={"3"}
              />
            </TabList>
          </Box>
          <TabPanel value={"1"}>
            <div className={styles.tableContainer}>
              {" "}
              <CustomTable columns={columns} data={data} />
            </div>
          </TabPanel>
          <TabPanel value={"2"}>
            <div className={styles.tableContainer}>
              {" "}
              <CustomTable columns={columns} data={data} />
            </div>
          </TabPanel>
          <TabPanel value={"3"}>
            <div className={styles.tableContainer}>
              {" "}
              <CustomTable columns={columns} data={data} />
            </div>
          </TabPanel>
        </TabContext>
      </div>
    </MainLayout>
  );
};

export default Campaign;
