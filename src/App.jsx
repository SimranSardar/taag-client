import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { Home, Login, NewCampaign } from "./pages/";
import Campaign from "./pages/Campaign/Campaign";
import Campaigns from "./pages/Campaigns/Campaigns";
import AuthContextProvider from "./utils/auth/AuthContext";
import CampaignContextProvider from "./utils/contexts/CampaignContext";

const App = () => {
  return (
    <Router basename="/">
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
        <CampaignContextProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-campaign" element={<NewCampaign />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/campaign/:id" element={<Campaign />} />
          </Routes>
        </CampaignContextProvider>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
