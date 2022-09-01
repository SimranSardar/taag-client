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
import { useNavigate } from "react-router-dom";
import { Dropdown, Button as AButton, Menu } from "antd";
import { DownOutlined, LogoutOutlined } from "@ant-design/icons";
import clsx from "clsx";

const { bell, editing, back } = icons;
const { profile } = images;

const Navbar = ({ titleProps, progress, prevRoute,brandName }) => {
  const navigate = useNavigate();
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <Logo />
          <Title
            id={titleProps?.id}
            disabled={titleProps?.disabled}
            name={titleProps?.name}
            onChange={titleProps?.onChange}
            isEditIconVisible={titleProps?.isEditIconVisible}
            isBackIconVisible={titleProps?.isBackIconVisible}
            brandName={brandName}
            prevRoute={prevRoute}
          />
          
        </div>
        <div className={styles.right}>
          {/* <BellButton newNotifications={true} /> */}
          <ProfileButton
          brandName={brandName}
            onClick={handleLogout}
            handleClickLogout={handleLogout}
          />
        </div>
      </div>
      {progress ? <MUILinearProgress progress={progress} /> : ""}
    </div>
  );
};

const ProfileButton = ({ brandName,handleClickLogout, ...remaining }) => {
  function handleClickProfile(e) {
    if (e.key === "logout") {
      handleClickLogout();
    }
  }

  const menu = (
    <Menu
      onClick={handleClickProfile}
      items={[
        {
          label: "Logout",
          key: "logout",
          icon: <LogoutOutlined />,
        },
      ]}
    />
  );

  return (
    <div  className={clsx(styles.flexRow,styles.profile)}>
      
      <Dropdown overlay={menu}>
        <AButton
          icon={<img src={profile} alt="Profile" />}
          className="ant-icon-btn"
        >
          {/* Logout
          <DownOutlined /> */}
        </AButton>
      </Dropdown>
    </div>
  );
};

const BellButton = ({ newNotifications, ...remaining }) => {
  return (
    <div className={styles.bellButton}>
      <IconButton {...remaining}>
        <img src={bell} alt="Bell" />
        {newNotifications && <span className={styles.newNotifications}></span>}
      </IconButton>
    </div>
  );
};

const Title = ({
  id,
  name,
  isEditIconVisible,
  isBackIconVisible,
  brandName,
  onChange,
  disabled,
  prevRoute,
  ...remaining
}) => {
  console.log(remaining);
  return (
    <div
      style={brandName ? { alignSelf: "flex-end" } : {}}
      className={styles.title}
    >
      <div className={styles.top}>
        <div
          className={styles.fixedWidth}
          style={{ width: !isBackIconVisible ? 0 : "50px" }}
        >
          {isBackIconVisible && <Breadcrumb prevRoute={prevRoute} />}
        </div>
        <input
          id={id}
          value={name}
          type="text"
          placeholder="Enter Campaign Name"
          disabled={disabled}
          onChange={onChange}
          {...remaining}
        />
        <label htmlFor={id} className={styles.fixedWidth}>
          {isEditIconVisible && <img src={editing} alt="Editing" />}
        </label>
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
