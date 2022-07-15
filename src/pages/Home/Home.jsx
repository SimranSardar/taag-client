import { Add } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Navbar, Button, RadioButton, InputField } from "../../components";
import styles from "./Home.module.scss";

const Home = () => {
  const [progress, setProgress] = useState(30);

  return (
    <div className={styles.container}>
      <Navbar
        titleProps={{
          title: "Campaigns",
          // isEditIconVisible: true,
          // isBackIconVisible: true,
          // brandName: "Nike",
        }}
        //   progress={progress}
      />
      <div style={{ display: "flex" }}>
        <RadioButton label={"Checking"} group={"Platform"} value={"Youtube"} />
        <RadioButton
          label={"Instagram"}
          group={"Platform"}
          value={"Instagram"}
        />
      </div>

      <Button rightIcon={<Add />}>Home</Button>
      <InputField label="Hello"></InputField>
    </div>
  );
};

export default Home;
