import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, CustomTable } from "../../components";
import { MainLayout } from "../../layouts";
import { CampaignContext } from "../../utils/contexts/CampaignContext";
import styles from "./Campaign.module.scss";
// import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab, Tabs, styled } from "@mui/material";
import { TabIcon } from "../../assets";
import { CurrentContext } from "../../utils/contexts";
import { KMBFormatter } from "../../utils";
import { tableData } from "../../utils/constants";
import SelectArtists from "./SelectArtists";

function newSelectionArist(item, campaign) {
  return {
    ...item,
    key: item._id,
    _id: item._id,
    name: item.name,
    link: item.link || "",
    followers: item.followers,
    averageViews: item.averageViews,
    deliverable: item.deliverable || campaign.deliverable || "NA",
    commercialCreator: item.commercialCreator || 0,
    brandCommercial: item.brandCommercial || 0,
    cpvBrand: item.cpvBrand || 0,
    agencyFees:
      item.agencyFees ||
      parseInt(item.brandCommercial) - parseInt(item.commercialCreator) ||
      0,
    gender: item.gender,
    location: item.location,
    languages: item.languages,
    categories: item.categories,
    type: item.type,
    agencyName: item.agencyName,
    manager: item.manager,
    contact: item.contact,
    email: item.email,
    invoice: item.invoice,
    date: item.date,
    note: item.note || ".",
    deliverableLink: item.deliverableLink || "NA",
    views: item.views || "NA",
    comments: item.comments,
    roi: item.roi,
  };
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Campaign = () => {
  // const [campaign, setCampaign] = useState({});
  const { tabIndex, setTabIndex, table, setCampaignId } =
    useContext(CurrentContext);
  const { updateCampaign } = useContext(CampaignContext);
  const handleTabsChange = (event, newValue) => {
    setTabIndex(newValue);
    setTab(newValue);
  };

  const [selRows, setSelRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const location = useLocation();

  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
  }

  const {
    campaign,
    setCampaign,
    campaignMain,
    campaignInfo,
    campaignContact,
    campaignInvoice,
    campaignAnalytics,
    setCampaignMain,
    setCampaignInfo,
    setCampaignContact,
    setCampaignInvoice,
    setCampaignAnalytics,
  } = useContext(CurrentContext);
  const { id } = useParams();

  useEffect(() => {
    setCampaignId(id);
    console.log("set id");
  }, [id]);

  useEffect(() => {
    console.log({ campaign });
    if (campaign?.selectedArtists) {
      setSelectedRows(
        campaign.selectedArtists.map((item) =>
          newSelectionArist(item, campaign)
        )
      );
    }
  }, [campaign]);

  useEffect(() => {
    console.log({
      campaignMain,
      campaignInfo,
      campaignContact,
      campaignInvoice,
      campaignAnalytics,
    });
  }, [
    campaignMain,
    campaignInfo,
    campaignContact,
    campaignInvoice,
    campaignAnalytics,
  ]);

  // useEffect(() => {
  //   async function fetchData() {
  //     const temp = await fetchCampaign(id);
  //     setCampaign(temp.data);
  //     console.log({ temp });
  //   }
  //   if (id) {
  //     fetchData();
  //   }
  // }, [id]);

  function handleSelectRow(rows) {
    // setCampaign({ ...campaign, selectedArtists: rows });
    setSelRows(rows);
  }

  function handleSave(rows) {
    setSelectedRows(rows?.map((item) => newSelectionArist(item, campaign)));
    updateCampaign({
      ...campaign,
      selectedArtists: rows?.map((item) => newSelectionArist(item, campaign)),
    });
    // setCampaign({
    //   ...campaign,
    //   selectedArtiss: rows?.map((item) => newSelectionArist(item, campaign)),
    // });
  }

  function handleClickSave() {
    updateCampaign({
      ...campaign,
      selectedArtists: selectedRows?.map((item) =>
        newSelectionArist(item, campaign)
      ),
    });
  }

  // useEffect(() => {
  //   setSelectedRows();
  // }, [selRows]);

  return (
    <MainLayout
      classes={[styles.container]}
      isSideMenuVisible
      campaignId={id}
      navbarProps={{
        titleProps: {
          id: "name",
          disabled: true,
          isBackIconVisible: true,
          name: campaign?.name,
        },
        prevRoute: "/",
      }}
      moreInformationProps={{
        isVisible: true,
        agencyFees: campaign?.agencyFee,
        brandAmount: campaign?.brandAmount,
        totalAverageViews: KMBFormatter(campaign?.totalAverageViews || 0),
        totalCreator: campaign?.selectedArtists?.length.toString() || "0",
        averageROI: "0.4",
      }}
    >
      <div className={styles.tablesContainer}>
        {/* <TabContext value={tab}> */}
        {/* {tabIndex && ( */}
        {/* <Box sx={{ borderBottom: 1, borderColor: "divider" }}> */}

        {/* </TabContext> */}

        {location.pathname.includes("commercials") && (
          <div className={styles.tableContainer}>
            <div className={styles.flexRow}>
              <Button onClick={handleClickSave}>Save</Button>
            </div>
            <CustomTable
              columns={tableData.campaign_commercials.columns}
              data={selectedRows}
              isSelectable
              setData={setSelectedRows}
              onRowSelect={handleSelectRow}
              selectedRows={campaign?.selectedArtists || []}
            />
          </div>
        )}
        {location.pathname.includes("analytics") && (
          <div className={styles.tableContainer}>
            <div className={styles.flexRow}>
              <Button onClick={handleClickSave}>Save</Button>
            </div>
            <CustomTable
              columns={tableData.campaign_analytics.columns}
              data={selectedRows}
              isSelectable
              setData={setSelectedRows}
              onRowSelect={handleSelectRow}
              selectedRows={campaign?.selectedArtists || []}
            />
          </div>
        )}
        {!location.pathname.includes("commercials") &&
          !location.pathname.includes("analytics") && (
            <>
              <div className={styles.tabs}>
                <Tabs value={tab} onChange={handleTabsChange} aria-label="Tabs">
                  <Tab
                    icon={<TabIcon filled={tabIndex === 0} value={0} />}
                    // value={0}
                    aria-label="Overview"
                  />
                  <Tab
                    icon={<TabIcon filled={tabIndex === 1} value={1} />}
                    // value={1}
                  />
                  <Tab
                    icon={<TabIcon filled={tabIndex === 2} value={2} />}
                    // value={2}
                  />
                </Tabs>
                <Button onClick={handleClickSave}>Save</Button>
              </div>

              {/* </Box> */}
              {/* )} */}
              <TabPanel value={tab} index={0}>
                <div className={styles.tableContainer}>
                  <CustomTable
                    columns={tableData.campaign.main.columns}
                    data={selectedRows}
                    setData={setSelectedRows}
                    onRowSelect={handleSelectRow}
                    selectedRows={campaign?.selectedArtists || []}
                  />
                </div>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <div className={styles.tableContainer}>
                  <CustomTable
                    columns={tableData.campaign.info.columns}
                    data={selectedRows}
                    setData={setSelectedRows}
                    onRowSelect={handleSelectRow}
                    selectedRows={campaign?.selectedArtists || []}
                  />
                </div>
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <div className={styles.tableContainer}>
                  <CustomTable
                    columns={tableData.campaign.phone.columns}
                    data={selectedRows}
                    setData={setSelectedRows}
                    onRowSelect={handleSelectRow}
                    selectedRows={campaign?.selectedArtists || []}
                  />
                </div>
              </TabPanel>
            </>
          )}
        <br />
        <Button onClick={() => setModalOpen(true)}>Add Artists</Button>
      </div>
      <SelectArtists
        open={modalOpen}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </MainLayout>
  );
};

// const StyledTabList = styled(TabList)(() => {
//   return {
//     ".MuiTabs-indicator": {
//       backgroundColor: "var(--clr-primary)",
//     },
//   };
// });

export default Campaign;
