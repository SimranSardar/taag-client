import { Add } from "@mui/icons-material";
import React from "react";
import Button from "../../components/Button/Button";

const Home = () => {
  return (
    <div>
      <Button rightIcon={<Add />}>Home</Button>
    </div>
  );
};

export default Home;
