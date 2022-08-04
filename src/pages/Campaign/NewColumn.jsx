import { Drawer } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { Button, InputField } from "../../components";
import { CampaignContext, CurrentContext } from "../../utils/contexts";
import styles from "./Campaign.module.scss";

const NewColumn = ({ open, handleClose }) => {
  const onClose = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    handleClose();
  };

  const [name, setName] = useState("");
  const [type, setType] = useState("text");

  const { campaign } = useContext(CurrentContext);

  async function handleSubmit(e) {
    e.preventDefault();
    const newCampaign = { ...campaign };
    newCampaign.extras = [
      ...newCampaign.extras,
      {
        name,
        type,
      },
    ];
    const res = await axios.patch(
      `${process.env.REACT_APP_API_URI}/campaigns/update`,
      newCampaign
    );
    console.log({ res });
  }

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit} className={styles.newColDrawer}>
        <h3>Add New Column</h3>
        <InputField
          value={name}
          placeholder="Column Name"
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          value={type}
          placeholder="Column Type"
          onChange={(e) => setType(e.target.value)}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Drawer>
  );
};

export default NewColumn;
