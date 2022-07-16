import React from "react";
import MainLayout from "../../layouts/MainLayout/MainLayout";

const Campaigns = () => {
  return (
    <MainLayout
      navbarProps={{
        titleProps: {
          title: "Campaigns",
        },
      }}
    >
      Campaigns
    </MainLayout>
  );
};

export default Campaigns;
