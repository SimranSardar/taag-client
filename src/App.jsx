import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { Home, Login, NewCampaign } from "./pages/";
import { MainLayout } from "./layouts";
import Campaigns from "./pages/Campaigns/Campaigns";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-campaign" element={<NewCampaign />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
