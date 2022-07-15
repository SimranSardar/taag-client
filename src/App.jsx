import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import { Home, Login, NewCampaign } from "./pages/";
import { MainLayout } from "./layouts";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<MainLayout component={<Home />} />} />
        <Route
          path="/new-campaign"
          element={<MainLayout component={<NewCampaign />} />}
        />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;
