import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import { icons } from "../../assets";
import { useNavigate, useLocation } from "react-router-dom";

const { back } = icons;

const Breadcrumb = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const [previousRoute, setPreviousRoute] = useState("");
  useEffect(() => {
    let newRoute = pathname.split("/").filter((elm) => elm);
    newRoute.pop();
    setPreviousRoute(newRoute.join("/"));
  }, []);
  return (
    <div>
      <IconButton onClick={() => navigate("/" + previousRoute)}>
        <img src={back} alt="Back" />
        {pathname}
      </IconButton>
    </div>
  );
};

export default Breadcrumb;
