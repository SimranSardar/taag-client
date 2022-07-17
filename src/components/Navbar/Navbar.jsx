import styles from "./Navbar.module.scss";
import { Logo } from "../";
import {
  IconButton,
  Box,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { Breadcrumb } from "../";
import { styled } from "@mui/system";
import { icons, images } from "../../assets";
import { useEffect, useState } from "react";

const { bell, editing, back } = icons;
const { profile } = images;

const Navbar = ({ titleProps, progress }) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logo />
          <Title
            id={titleProps?.id}
            title={titleProps?.title}
            onChange={titleProps?.onChange}
            isEditIconVisible={titleProps?.isEditIconVisible}
            isBackIconVisible={titleProps?.isBackIconVisible}
            brandName={titleProps?.brandName}
          />
        </div>
        <div className={styles.right}>
          <BellButton newNotifications={true} />
          <ProfileButton />
        </div>
      </div>
      {progress ? <MUILinearProgress progress={progress} /> : ""}
    </div>
  );
};

const ProfileButton = () => {
  return (
    <div className={styles.profile}>
      <IconButton>
        <img src={profile} alt="Profile" />
      </IconButton>
    </div>
  );
};

const BellButton = ({ newNotifications }) => {
  return (
    <div className={styles.bellButton}>
      <IconButton>
        <img src={bell} alt="Bell" />
        {newNotifications && <span className={styles.newNotifications}></span>}
      </IconButton>
    </div>
  );
};

const Title = ({
  id,
  title,
  isEditIconVisible,
  isBackIconVisible,
  brandName,
  onChange,
}) => {
  return (
    <div
      style={brandName ? { alignSelf: "flex-end" } : {}}
      className={styles.title}
    >
      <div className={styles.top}>
        <div className={styles.fixedWidth}>
          {isBackIconVisible && <Breadcrumb />}
        </div>
        <input id={id} value={title} type="text" onChange={onChange} />
        <div className={styles.fixedWidth}>
          {isEditIconVisible && <img src={editing} alt="Editing" />}
        </div>
      </div>
      <p style={brandName ? { marginBottom: "6px" } : {}}>{brandName}</p>
    </div>
  );
};

const MUILinearProgress = ({ progress }) => {
  return (
    <Box sx={{ width: "100%" }}>
      <StyledMUILinearProgress variant="determinate" value={progress} />
    </Box>
  );
};

const StyledMUILinearProgress = styled(LinearProgress)(() => {
  return {
    [`& .${linearProgressClasses.bar}`]: {
      backgroundColor: "#643ad9",
    },
  };
});

export default Navbar;
