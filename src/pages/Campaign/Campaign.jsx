import React, { useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, CustomTable } from "../../components";
import { MainLayout } from "../../layouts";
import { CampaignContext } from "../../utils/contexts/CampaignContext";
import styles from "./Campaign.module.scss";
// import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab, Tabs, styled, Skeleton } from "@mui/material";
import { TabIcon } from "../../assets";
import { CurrentContext } from "../../utils/contexts";
import {
  formatIndianCurrency,
  getCommercial,
  getROI,
  KMBFormatter,
  showAlert,
} from "../../utils";
import { tableData } from "../../utils/constants";
import SelectArtists from "./SelectArtists";
import NewColumn from "./NewColumn";

function newSelectionArist(item, campaign) {
  console.log({ item });
  const commercial = getCommercial(campaign.deliverable, item);
  const brandCommercial =
    item.brandCommercial || commercial + (20 * commercial) / 100 || "NA";
  console.log({ itBr: item.brandCommercial, brandCommercial });
  let newArtist = {
    ...item,
    key: item._id,
    _id: item._id,
    name: item.name,
    link: campaign.deliverable?.includes("YT")
      ? item.youtube?.link
      : campaign.deliverable?.includes("IG")
      ? item.instagram?.link
      : "NA",
    followers: campaign.deliverable?.includes("YT")
      ? item.youtube?.subscribers
      : item.instagram
      ? item.instagram.followers
      : "NA",
    averageViews: campaign.deliverable?.includes("YT")
      ? item.youtube?.averageViews
      : campaign.deliverable?.includes("IG")
      ? item.instagram?.averageViews
      : 0,
    deliverable: item.deliverable || campaign.deliverable || "NA",
    commercialCreator: commercial,
    brandCommercial,
    cpvBrand: (parseInt(brandCommercial) / parseInt(item.views) || 0).toFixed(
      2
    ),
    agencyFees:
      item.agencyFees || parseInt(brandCommercial) - parseInt(commercial) || 0,
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
    comments: item.comments || "NA",
    roi: getROI(item, brandCommercial),
  };
  if (campaign.extras?.length) {
    campaign.extras.forEach((it) => {
      newArtist[it.dataIndex] = item[it.dataIndex] || ".";
    });
  }

  return newArtist;
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
  const { updateCampaign, updateArtistsGlobal } = useContext(CampaignContext);
  const handleTabsChange = (event, newValue) => {
    setTabIndex(newValue);
    setTab(newValue);
  };

  const [selRows, setSelRows] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [newColOpen, setNewColOpen] = useState(false);
  const [mainCols, setMainCols] = useState(tableData.campaign.main.columns);
  const [totalAvgViews, setTotalAvgViews] = useState(0);
  const [totalViews, setTotalViews] = useState(2);
  const [totalComments, setTotalComments] = useState(3);
  const [totalAgencyFees, setTotalAgencyFees] = useState(0);
  const [totalBrandAmount, setTotalBrandAmount] = useState(0);

  const location = useLocation();

  const [tab, setTab] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  function handleClose() {
    setModalOpen(false);
  }

  const {
    campaign,
    campaignMain,
    campaignInfo,
    campaignContact,
    campaignInvoice,
    campaignAnalytics,
  } = useContext(CurrentContext);
  const { id } = useParams();

  useEffect(() => {
    setCampaignId(id);
    console.log("set id");
  }, [id]);

  useEffect(() => {
    console.log({ campaign });
    if (campaign.extras?.length) {
      setMainCols([
        ...tableData.campaign.main.columns,
        ...campaign.extras.map((item) => ({
          ...item,
          searchable: true,
          editable: true,
        })),
      ]);
    }
    if (campaign?.selectedArtists) {
      console.log({ selected: campaign.selectedArtists });
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

  useEffect(() => {
    if (selectedRows.length) {
      let tAvgViews = 0;
      let tAgencyFees = 0;
      let tBrandAmount = 0;
      let tViews = 0;
      let tComments = 0;
      selectedRows.forEach((item) => {
        tAvgViews += parseInt(item.averageViews || 0);
        tAgencyFees += parseInt(item.agencyFees || 0);
        tBrandAmount += parseInt(item.brandCommercial || 0);
        tViews += parseInt(item.views) || 0;
        tComments += parseInt(item.comments) || 0;
      });
      setTotalAvgViews(tAvgViews);
      setTotalAgencyFees(tAgencyFees);
      setTotalBrandAmount(tBrandAmount);
      setTotalViews(tViews);
      setTotalComments(tComments);
    }
  }, [selectedRows]);

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

  function handleSaveSelectedArtists(rows) {
    setSelectedRows(rows?.map((item) => newSelectionArist(item, campaign)));
    let newCampaign = {
      ...campaign,
      totalAverageViews: totalAvgViews || 0,
      selectedArtists: rows?.map((item) => newSelectionArist(item, campaign)),
    };
    console.log({ newCampaign });

    updateCampaign(newCampaign);
    // setCampaign({
    //   ...campaign,
    //   selectedArtiss: rows?.map((item) => newSelectionArist(item, campaign)),
    // });
  }

  function handleClickSave() {
    let newCampaign = {
      ...campaign,
      totalAverageViews: totalAvgViews || 0,
      selectedArtists: selectedRows?.map((item) =>
        newSelectionArist(item, campaign)
      ),
    };

    updateCampaign(newCampaign);
    showAlert("success", "Campaign Updated");
  }

  async function handleSaveGlobal(selectedRows) {
    let res = await updateArtistsGlobal(
      selectedRows.map((item) => ({
        _id: item._id,
        youtube: { ...item.youtube, commercial: item.commercialCreatorYT },
        instagram: {
          ...item.instagram,
          reelCommercial: item.commercialCreatorIGReel,
          storyCommercial: item.commercialCreatorIGStory,
        },
      }))
    );
    showAlert("success", "Updated Artist(s) Successfully");
  }

  function handleClickShare() {
    updateCampaign({ ...campaign, isSharedWithBrand: true });
    showAlert("success", "Campaign shared with brand");
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

        onClickAdd: () => setNewColOpen(true),
        onClickShare: handleClickShare,
        ...(location.pathname.includes("analytics")
          ? {
              totalViews: KMBFormatter(totalViews),
              totalComments: KMBFormatter(totalComments),
            }
          : {
              agencyFees: formatIndianCurrency(totalAgencyFees) || 0,
              brandAmount: formatIndianCurrency(totalBrandAmount) || 0,
              totalAverageViews: KMBFormatter(totalAvgViews || 0),
              totalCreator: campaign?.selectedArtists?.length.toString() || "0",
              averageROI: "0.4",
            }),
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
              <Button onClick={() => setModalOpen(true)}>Add Artists</Button>

              <Button onClick={handleClickSave}>Save</Button>
            </div>
            {selectedRows?.length > 0 && (
              <CustomTable
                columns={tableData.campaign_commercials.columns}
                data={selectedRows}
                // isSelectable
                setData={setSelectedRows}
                onRowSelect={handleSelectRow}
                selectedRows={campaign?.selectedArtists || []}
                campaign={campaign}
              />
            )}
          </div>
        )}
        {location.pathname.includes("analytics") && (
          <div className={styles.tableContainer}>
            <div className={styles.flexRow}>
              <Button onClick={() => setModalOpen(true)}>Add Artists</Button>

              <Button onClick={handleClickSave}>Save</Button>
            </div>
            {selectedRows.length && (
              <CustomTable
                columns={tableData.campaign_analytics.columns}
                data={selectedRows}
                // isSelectable
                setData={setSelectedRows}
                onRowSelect={handleSelectRow}
                selectedRows={campaign?.selectedArtists || []}
                campaign={campaign}
              />
            )}
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
                <div>
                  <Button onClick={() => setModalOpen(true)}>
                    Add Artists
                  </Button>
                  &nbsp; &nbsp; &nbsp; &nbsp;
                  <Button onClick={handleClickSave}>Save</Button>
                </div>
              </div>

              {/* </Box> */}
              {/* )} */}
              <TabPanel value={tab} index={0}>
                <div className={styles.tableContainer}>
                  {selectedRows?.length > 0 ? (
                    <CustomTable
                      columns={mainCols}
                      data={selectedRows}
                      setData={setSelectedRows}
                      onRowSelect={handleSelectRow}
                      selectedRows={campaign?.selectedArtists || []}
                      campaign={campaign}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  )}
                </div>
              </TabPanel>
              <TabPanel value={tab} index={1}>
                <div className={styles.tableContainer}>
                  {selectedRows?.length > 0 ? (
                    <CustomTable
                      columns={tableData.campaign.info.columns}
                      data={selectedRows}
                      setData={setSelectedRows}
                      onRowSelect={handleSelectRow}
                      selectedRows={campaign?.selectedArtists || []}
                      campaign={campaign}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  )}
                </div>
              </TabPanel>
              <TabPanel value={tab} index={2}>
                <div className={styles.tableContainer}>
                  {selectedRows?.length > 0 ? (
                    <CustomTable
                      columns={tableData.campaign.phone.columns}
                      data={selectedRows}
                      setData={setSelectedRows}
                      onRowSelect={handleSelectRow}
                      selectedRows={campaign?.selectedArtists || []}
                      campaign={campaign}
                    />
                  ) : (
                    <Skeleton variant="rectangular" width="100%" height={200} />
                  )}
                </div>
              </TabPanel>
            </>
          )}
        <br />
      </div>
      <SelectArtists
        open={modalOpen}
        handleClose={handleClose}
        handleSave={handleSaveSelectedArtists}
        handleSaveGlobal={handleSaveGlobal}
      />
      <NewColumn open={newColOpen} handleClose={() => setNewColOpen(false)} />
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
