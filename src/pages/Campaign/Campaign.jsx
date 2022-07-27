import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CustomTable } from "../../components";
import { MainLayout } from "../../layouts";
import { CampaignContext } from "../../utils/contexts/CampaignContext";
import styles from "./Campaign.module.scss";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { Box, Tab, styled } from "@mui/material";
import { TabIcon } from "../../assets";
import { CurrentContext } from "../../utils/contexts";
import { KMBFormatter } from "../../utils";

const Campaign = () => {
  // const [campaign, setCampaign] = useState({});
  const { tabIndex, setTabIndex, table, setCampaignId } =
    useContext(CurrentContext);
  const handleTabsChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const { campaign } = useContext(CurrentContext);
  const { id } = useParams();

  useEffect(() => {
    setCampaignId(id);
  }, [id]);

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
        {tabIndex && (
          <TabContext value={tabIndex}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <StyledTabList
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
              </StyledTabList>
            </Box>
          </TabContext>
        )}
        <div className={styles.tableContainer}>
          <CustomTable
            columns={table?.columns || []}
            data={table?.data || []}
          />
        </div>
      </div>
    </MainLayout>
  );
};

const StyledTabList = styled(TabList)(() => {
  return {
    ".MuiTabs-indicator": {
      backgroundColor: "var(--clr-primary)",
    },
  };
});

export default Campaign;
