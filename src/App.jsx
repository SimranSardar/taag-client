import { Add } from "@mui/icons-material";
import styles from "./App.module.scss";
import Button from "./components/Button/Button";

const App = () => {
  return (
    <div className={styles.container}>
      <Button rightIcon={<Add />}>New Campaign</Button>
    </div>
  );
};

export default App;
