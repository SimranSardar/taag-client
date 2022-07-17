import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainLayout } from "../../layouts";
import { CampaignContext } from "../../utils/contexts/CampaignContext";

const Campaign = () => {
  const [campaign, setCampaign] = useState({});

  const { fetchCampaign } = useContext(CampaignContext);
  const { id } = useParams();

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

  return <MainLayout>This is {campaign?.name}</MainLayout>;
};

export default Campaign;
