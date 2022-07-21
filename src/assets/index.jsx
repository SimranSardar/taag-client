import logo from "./icons/logo.svg";
import bell from "./icons/bell.svg";
import editing from "./icons/editing.svg";
import profile from "./images/profile.png";
import back from "./icons/back.svg";
import papers from "./icons/papers.svg";
import speaker from "./icons/speaker.svg";
import eye from "./icons/eye.svg";
import addIcon from "./icons/add.svg";
import searchIcon from "./icons/search.svg";
import purplePerson from "./icons/purplePerson.svg";
import info from "./icons/info.svg";
import phone from "./icons/phone.svg";
import purpleBrandPlaceholder from "./icons/purpleBrandPlaceholder.svg";
import brandPlaceholder from "./icons/brandPlaceholder.svg";
import purpleCoin from "./icons/purpleCoin.svg";
import purpleEye from "./icons/purpleEye.svg";
import purpleInfo from "./icons/info.svg";
import purplePhone from "./icons/phone.svg";

export const icons = {
  logo,
  bell,
  editing,
  back,
  papers,
  speaker,
  eye,
  addIcon,
  searchIcon,
  purplePerson,
  purpleCoin,
  purpleEye,
  purpleBrandPlaceholder,
  brandPlaceholder,
  info,
  phone,
};

export const images = {
  profile,
};

export const TabIcon = ({ filled, value }) => {
  console.log(filled);
  if (value === "0" && !filled)
    return <img src={brandPlaceholder} alt="Brands" />;
  if (value === "0" && filled)
    return <img src={purpleBrandPlaceholder} alt="Brands" />;
  if (value === "1" && !filled) return <img src={info} alt="Information" />;
  if (value === "1" && filled)
    return <img src={purpleInfo} alt="Information" />;
  if (value === "2" && !filled) return <img src={phone} alt="Phone" />;
  if (value === "2" && filled) return <img src={purplePhone} alt="Phone" />;

  return <div>Hello</div>;
};
