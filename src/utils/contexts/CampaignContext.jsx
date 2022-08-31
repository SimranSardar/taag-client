import axios from "axios";
import { useState, useEffect, createContext, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export const CampaignContext = createContext({});

const CampaignContextProvider = ({ children }) => {
  const [campaigns, setCampaigns] = useState([]);
  const [artists, setArtists] = useState([]);

  const { currentUser } = useContext(AuthContext);
useEffect(() => {console.log({currentUser})}, [currentUser])
  async function fetchCampaigns(status = "all") {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URI}/campaigns/all-by-user`,
      {
        params: {
          status,
          userId: currentUser.id,
        },
      }
    );
    setCampaigns(
      res.data?.map((campaign) => {
        let newObj = { ...campaign };
        newObj.id = newObj._id;
        delete newObj._id;
        return newObj;
      })
    );
    console.log("Yahi hai sab kuch", res.data);
    const art = await axios.get(`${process.env.REACT_APP_API_URI}/artist/all`);

    setArtists(art.data);
  }

  async function fetchCampaign(id) {
    console.log({ id });
    return await axios.get(
      `${process.env.REACT_APP_API_URI}/campaigns/single/`,
      {
        params: { id },
      }
    );
  }

  async function updateCampaign(campaign) {
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URI}/campaigns/update/`,
      campaign
    );

    return res;
  }

  async function updateBrand(brandEmail,campaignId) {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URI}/brand/push-campaign/`,
      {campaignId,email:brandEmail}
    );

    return res;
  }

  async function updateArtistsGlobal(artists) {
    return await axios.patch(
      `${process.env.REACT_APP_API_URI}/artist/update/bulk`,
      artists
    );
  }

  useEffect(() => {
    fetchCampaigns();
  }, [currentUser]);

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        fetchCampaign,
        artists,
        updateCampaign,
        updateArtistsGlobal,
        updateBrand,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContextProvider;
