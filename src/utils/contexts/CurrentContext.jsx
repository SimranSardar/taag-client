import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { tableData } from "../constants";
import { CampaignContext } from "./CampaignContext";

export const CurrentContext = createContext({});

const CurrentContextProvider = ({ children }) => {
  const location = useLocation();
  const [table, setTable] = useState({
    columns: [],
    data: [],
  });
  const [campaignId, setCampaignId] = useState("");
  const [tabIndex, setTabIndex] = useState("1");
  const [campaignMain, setCampaignMain] = useState([]);
  const [campaignInfo, setCampaignInfo] = useState([]);
  const [campaignContact, setCampaignContact] = useState([]);
  const [campaignInvoice, setCampaignInvoice] = useState([]);
  const [campaignAnalytics, setCampaignAnalytics] = useState([]);

  const { fetchCampaign } = useContext(CampaignContext);

  useEffect(() => {
    async function fetchData() {
      const temp = await fetchCampaign(campaignId);
      console.log({ temp });
      setCampaignMain(
        temp.data.selectedArtists.map((item) => ({
          name: item.name,
          link: item.link || "",
          followers: item.followers,
          averageViews: item.averageViews,
          deliverable: temp.data.deliverable,
          commercialCreator: item.commercialCreator || 0,
          brandCommercial: item.brandCommercial || 0,
          cpvBrand: item.cpvBrand || 0,
          agencyFees:
            item.agencyFees ||
            parseInt(item.brandCommercial) - parseInt(item.commercialCreator) ||
            0,
        }))
      );
      setCampaignInfo(
        temp.data.selectedArtists.map((item) => ({
          name: item.name,
          gender: item.gender,
          location: item.location,
          languages: item.languages,
          categories: item.categories,
          type: item.type,
        }))
      );
      setCampaignContact(
        temp.data.selectedArtists.map((item) => ({
          name: item.name,
          agencyName: item.agencyName,
          manager: item.manager,
          contact: item.contact,
          email: item.email,
        }))
      );
      setCampaignInvoice(
        temp.data.selectedArtists.map((item) => ({
          name: item.name,
          invoice: item.invoice,
          date: item.date,
          note: item.note,
        }))
      );
      setCampaignAnalytics(
        temp.data.selectedArtists.map((item) => ({
          name: item.name,
          link: item.link || "",
          views: item.views || "loading...",
          comments: item.comments || "loading...",
          roi: item.roi,
        }))
      );
      handleTable(location);
    }
    if (campaignId) {
      fetchData();
    }
  }, [campaignId, fetchCampaign]);

  function handleTable(location) {
    let newTable = {};

    if (location?.pathname === "/campaigns/" + campaignId) {
      switch (tabIndex) {
        case "1": {
          newTable.data = campaignMain;
          newTable.columns = tableData.campaign.main.columns;
          console.log(newTable);
          break;
        }
        case "2": {
          newTable.data = campaignInfo;
          newTable.columns = tableData.campaign.info.columns;
          break;
        }
        case "3": {
          newTable.data = campaignContact;
          newTable.columns = tableData.campaign.phone.columns;
          break;
        }
        default:
          newTable.data = [];
          newTable.columns = [];
      }
    } else if (
      location?.pathname ===
      "/campaigns/" + campaignId + "/commercials"
    ) {
      newTable.columns = tableData.campaign_commercials.columns;
      newTable.data = campaignInvoice;
    } else if (
      location?.pathname ===
      "/campaigns/" + campaignId + "/analytics"
    ) {
      newTable.columns = tableData.campaign_analytics.columns;
      newTable.data = campaignAnalytics;
    }
    setTable(newTable);
  }

  useEffect(() => {
    if (location?.pathname === "/campaigns/" + campaignId) setTabIndex("1");
    else setTabIndex(undefined);
  }, [location, campaignId]);

  useEffect(() => {
    handleTable(location);
    console.log(tabIndex);
  }, [tabIndex, location]);

  // useEffect(() => {
  //   console.log({ table, location, tabIndex, campaignId });
  // });

  useEffect(() => {
    async function fetchData() {
      const data = await axios.get("http://localhost:5000/youtube/getLikes", {
        params: {
          videoId: "dkdXCbwWKHY",
        },
      });
      console.log({ data });
    }
    fetchData();
  }, []);

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
