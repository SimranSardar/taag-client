import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import Home from "./pages/Home/Home";

const App = () => {
  return (
    <Router basename="/">
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <Home />
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
