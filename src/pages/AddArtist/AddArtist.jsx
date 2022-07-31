import styles from "./AddArtist.module.scss";
import {
  Button,
  CreatableSelect,
  InputField,
  InputSelect,
  RadioButton,
} from "../../components";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MainLayout } from "../../layouts";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const sectorOptions = [
  {
    name: "Vlog",
    value: "vlog",
  },
  {
    name: "Makeup",
    value: "makeup",
  },
  {
    name: "Genz",
    value: "genz",
  },
  {
    name: "Skincare",
    value: "skincare",
  },
  {
    name: "Fitness",
    value: "fitness",
  },
  {
    name: "Couple",
    value: "couple",
  },
  {
    name: "Dance",
    value: "dance",
  },
  {
    name: "Comedy",
    value: "comedy",
  },
  {
    name: "Music",
    value: "music",
  },
];

const genderOptions = [
  {
    name: "Male",
    value: "male",
  },
  {
    name: "Female",
    value: "female",
  },
  {
    name: "Other",
    value: "other",
  },
];

const typeOptions = [
  {
    name: "Macro",
    value: "macro",
  },
  {
    name: "Mini",
    value: "mini",
  },
  {
    name: "Mega",
    value: "mega",
  },
];

const languageOptions = [
  {
    name: "Hindi",
    value: "hindi",
  },
  {
    name: "English",
    value: "english",
  },
  {
    name: "Marathi",
    value: "marathi",
  },
];

const AddArtist = () => {
  const totalNoOfFields = 13;
  const [progress, setProgress] = useState(0.000001);
  const [value, setValue] = useState("");
  const [categories, setCategories] = useState([]);
  const [values, setValues] = useState({});
  useEffect(() => {
    console.log(categories);
  });
  const navigate = useNavigate();

  async function handleAddLanguage(valueToAdd) {
    console.log(valueToAdd);
  }

  function handleChange(e) {
    const { id, value, name } = e.target;
    setValues((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  function handleProgress() {}

  useEffect(() => {
    setProgress(
      (Object.values(values).filter((item) => item).length / totalNoOfFields) *
        100 || 0.0000001
    );
  }, [values]);

  async function submitHandler(e) {
    e.preventDefault();
    let campaign = {
      name: values.name || "Add ",
      brand: {
        name: values.brandName,
        sector: values.brandSector, // Beauty | Fashion | Health
        website: values.website, // URL
        poc: {
          id: values.PICId,
          position: values.PICPosition,
          email: values.PICEmail,
          contact: values.PICContact, // +91xxxxxxxxxx
        },
      },
      platform: values.platform, // youtube | instagram
      sector: values.sector, // Beauty | Fashion | Health | Lifestyle
      deliverable: values.deliverable, // video | image
      brief: values.brief,
      // validity: {
      //   from: { type: String, required: true }, //  ISOString
      //   to: { type: String, required: true }, //  ISOString
      // },
      selectedArtists: [],
      brandAmount: 0,
      currency: "INR", // INR | USD
      agencyFee: 0,
      totalCreators: 0,
      totalAverageViews: 0,
      status: "draft", // draft | locked | finished
      sharedWith: [],
      createdAt: new Date().toISOString(), // ISOString
      updatedAt: new Date().toISOString(), // ISOString
    };
    const res = await axios.post(
      `${process.env.REACT_APP_API_URI}/campaigns/create`,
      campaign
    );

    if (res.status.toString().includes("20")) {
      navigate(`/campaigns/${res.data.data._id}/select-artists`);
    }
  }

  return (
    <MainLayout
      classes={[styles.container]}
      isSideMenuVisible
      navbarProps={{
        titleProps: {
          disabled: true,
          id: "name",
          name: "Add Artist",
          isBackIconVisible: true,
        },
        progress,
      }}
    >
      <form onSubmit={submitHandler}>
        <section className={styles.inputs}>
          <InputField
            required
            onChange={handleChange}
            id="artistName"
            value={values?.artistName}
            label={"Artist Name"}
          />
          <CreatableSelect
            value={categories}
            setValue={setCategories}
            label={"Categories"}
            id="categories"
            onAddOptionSubmit={handleAddLanguage}
            options={sectorOptions}
          />
          <InputField
            required
            onChange={handleChange}
            id="followers"
            value={values?.followers}
            label={"Followers"}
          />
          <InputSelect
            required
            name="categories"
            label={"Categories"}
            value={values?.categories}
            onChange={handleChange}
            options={sectorOptions}
          />
          <InputSelect
            required
            name="languages"
            label={"Languages"}
            value={values?.languages}
            onChange={handleChange}
            options={languageOptions}
          />
          <InputSelect
            required
            name="type"
            label={"Type"}
            value={values?.type}
            onChange={handleChange}
            options={typeOptions}
          />
          <InputSelect
            required
            name="gender"
            label={"Gender"}
            value={values?.gender}
            onChange={handleChange}
            options={genderOptions}
          />
          <InputField
            required
            onChange={handleChange}
            id="type"
            value={values?.link}
            label={"Social Link"}
          />
          <InputField
            required
            onChange={handleChange}
            id="Location"
            value={values?.location}
            label={"Location"}
          />
          <InputField
            required
            onChange={handleChange}
            id="agencyName"
            value={values?.agencyName}
            label={"Agency Name"}
          />
          <InputField
            required
            onChange={handleChange}
            id="averageViews"
            value={values?.averageViews}
            type="tel"
            label={"Average Views"}
          />
          <InputField
            required
            onChange={handleChange}
            id="manager"
            value={values?.manager}
            type="tel"
            label={"Manager"}
          />
          <InputField
            required
            onChange={handleChange}
            id="contact"
            value={values?.contact}
            type="tel"
            label={"Contact"}
          />
          <InputField
            required
            onChange={handleChange}
            id="email"
            value={values?.email}
            type="email"
            label={"Email"}
          />
        </section>
        <Button disabled={progress < 1} type="submit">
          Continue
        </Button>
      </form>
    </MainLayout>
  );
};

const FormSection = ({ sectionName, children, sectionNumber }) => {
  return (
    <div className={styles.formSection}>
      <div className={clsx(styles.fontG500, styles.header)}>
        <div className={styles.sectionNumber}>{sectionNumber}</div>
        <div className={styles.sectionName}>{sectionName}</div>
      </div>
      <div className={styles.children}>{children}</div>
    </div>
  );
};

export default AddArtist;
