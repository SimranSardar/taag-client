import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Navbar, Button } from "../../components";
import styles from "./Home.module.scss";

const Home = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Navbar
        titleProps={{
          title: "New Campaign",
          isEditIconVisible: true,
          isBackIconVisible: true,
          brandName: "Nike",
        }}
        progress={progress}
      />
      <Button rightIcon={<Add />}>Home</Button>
    </div>
  );
};

export default Home;
