import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { tableData } from "../constants";

export const CurrentContext = createContext({});

const CurrentContextProvider = ({ children }) => {
  const location = useLocation();
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });
  const [campaignId, setCampaignId] = useState("");
  const [tabIndex, setTabIndex] = useState("1");

  function handleTable(location) {
    let newTable = {};

    if (location?.pathname === "/campaigns/" + campaignId) {
      switch (tabIndex) {
        case "1": {
          newTable = tableData.campaign.main;
          console.log(newTable);
          break;
        }
        case "2": {
          newTable = tableData.campaign.info;
          break;
        }
        case "3": {
          newTable = tableData.campaign.phone;
          break;
        }
        default:
          newTable = {};
      }
    } else if (
      location?.pathname ===
      "/campaigns/" + campaignId + "/commercials"
    ) {
      console.log("hello");
      newTable = tableData.campaign_commercials;
    } else if (
      location?.pathname ===
      "/campaigns/" + campaignId + "/analytics"
    ) {
      newTable = tableData.campaign_analytics;
    }
    setTable(newTable);
  }

  useEffect(() => {
    handleTable(location);
    if (location?.pathname === "/campaigns/" + campaignId) setTabIndex("1");
    else setTabIndex(undefined);
  }, [location]);

  useEffect(() => {
    handleTable(location);
    console.log(tabIndex);
  }, [tabIndex, campaignId]);

  useEffect(() => {
    console.log({ table, location, tabIndex, campaignId });
  });
  return (
    <CurrentContext.Provider
      value={{
        table,
        setTable,
        campaignId,
        setCampaignId,
        setTabIndex,
        tabIndex,
      }}
    >
      {children}
    </CurrentContext.Provider>
  );
};

export default CurrentContextProvider;
