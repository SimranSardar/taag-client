import styles from "./NewCampaign.module.scss";
import {
  Button,
  CreatableMultipleSelect,
  InputField,
  InputSelect,
  RadioButton,
} from "../../components";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MainLayout } from "../../layouts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CreatableSingleSelect } from "../../components";

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

const deliverableOptions = [
  {
    name: "IG Video",
    value: "IGVideo",
  },
  {
    name: "IG Static",
    value: "IGStatic",
  },
  {
    name: "IG Story",
    value: "IGStory",
  },
  {
    name: "YT Video",
    value: "YTVideo",
  },
  {
    name: "YT Shorts",
    value: "YTShorts",
  },
];

const brandOptions = [
  {
    name: "Nike",
    value: "nike",
  },
  {
    name: "Hello Kitty",
    value: "helloKitty",
  },
  {
    name: "Rolex",
    value: "rolex",
  },
];

const AddCampaign = () => {
  const totalNoOfFields = 11; //12 considering campaign name
  const [progress, setProgress] = useState(0.000001);
  const [value, setValue] = useState("");
  const [values, setValues] = useState({});
  const [brand, setBrand] = useState("");
  const [brandOptions, setBrandOptions] = useState([]);
  const [sector, setSector] = useState([]);

  const navigate = useNavigate();

  function handleChange(e) {
    const { id, value, name } = e.target;
    // console.log(id, value, name);
    setValues((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  async function createBrand(brandData) {
    console.log(brandData);
    const { name, sector, website, picName, position, contact, email } =
      brandData;
    const finalData = {
      name,
      sector, // Beauty | Fashion | Health
      website, // URL
      poc: {
        name: picName,
        position,
        contact, // +91xxxxxxxxxx
        email,
      },
      campaigns: [],
    };
    let temp = await axios.post(
      `${process.env.REACT_APP_API_URI}/brand/create`,
      finalData
    );
    console.log({ res: temp });
  }

  async function getBrands() {
    let temp = await axios.get(`${process.env.REACT_APP_API_URI}/brand/all`);
    setBrandOptions(temp.data);
  }
  useEffect(() => {
    getBrands();
  }, []);

  async function handleAddBrand(valueToAdd) {
    const temp = await createBrand(valueToAdd);
    console.log(temp);
  }

  function handleAddSector(newValue) {
    console.log(newValue);
  }

  function handleProgress() {}

  useEffect(() => {
    setProgress(
      (Object.values(values).filter((item) => item).length / totalNoOfFields) *
        100 || 0.0000001
    );
  }, [values]);

  useEffect(() => {
    console.log(progress);
  });

  async function submitHandler(e) {
    e.preventDefault();
    console.log({ brand });
    let campaign = {
      name: values.name || "Test",
      brand: {
        name: brand.name,
        sector: brand.sector, // Beauty | Fashion | Health
        website: brand.website, // URL
        poc: {
          id: brand.poc.name,
          position: brand.poc.position,
          email: brand.poc.email,
          contact: brand.poc.contact, // +91xxxxxxxxxx
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
    // console.log({ campaign });
    const res = await axios.post(
      `${process.env.REACT_APP_API_URI}/campaigns/create`,
      campaign
    );

    console.log({ res });

    if (res.status.toString().includes("20")) {
      navigate(`/campaigns/${res.data.data._id}`);
    }
  }

  return (
    <MainLayout
      classes={[styles.container]}
      // isSideMenuVisible
      navbarProps={{
        titleProps: {
          id: "name",
          name: values?.name || "New Campaign",
          onChange: handleChange,
          isEditIconVisible: true,
          isBackIconVisible: true,
        },
        progress,
      }}
    >
      <form onSubmit={submitHandler}>
        <FormSection sectionName={"Brand / Agency"} sectionNumber={1}>
          <section className={styles.inputs}>
            <CreatableSingleSelect
              required
              name="brandName"
              label={"Brand Name"}
              id="brandName"
              value={brand}
              setValue={setBrand}
              options={brandOptions}
              onAddModalSubmit={handleAddBrand}
            />
            <CreatableMultipleSelect
              required
              options={sectorOptions}
              setValue={setSector}
              id="brandSector"
              value={sector}
              label={"Sector"}
              onAddModalSubmit={handleAddSector}
            />
            <InputField
              required
              onChange={handleChange}
              id="website"
              value={values?.website ?? brand?.website}
              label={"Website"}
            />
            <div className={styles.personInContact}>
              <InputField
                required
                onChange={handleChange}
                id="PICName"
                value={values?.PICName ?? brand?.poc?.name}
                label={"Person in Contact Name"}
              />
              <InputField
                required
                onChange={handleChange}
                id="PICPosition"
                value={values?.PICPosition ?? brand?.poc?.position}
                label={"Position"}
              />
              <InputField
                required
                onChange={handleChange}
                id="PICEmail"
                value={values?.PICEmail ?? brand?.poc?.email}
                type="email"
                label={"Email Id"}
              />
              <InputField
                required
                onChange={handleChange}
                id="PICContact"
                value={values?.PICContact ?? brand?.poc?.contact}
                type="tel"
                label={"Contact"}
              />
            </div>
          </section>
        </FormSection>
        <FormSection sectionName={"Platform"} sectionNumber={2}>
          <section className={styles.inputs}>
            <div className={styles.radioButtonGroup}>
              <RadioButton
                required
                name="platform"
                label={"Youtube"}
                value={"youtube"}
                onChange={handleChange}
              />
              <RadioButton
                required
                name="platform"
                label={"Instagram"}
                value={"instagram"}
                onChange={handleChange}
              />
              <InputSelect
                required
                name="sector"
                label={"Sector"}
                value={values?.sector}
                onChange={handleChange}
                options={sectorOptions}
              />
            </div>
            <InputSelect
              required
              name="deliverable"
              label={"Deliverable"}
              value={values?.deliverable}
              onChange={handleChange}
              options={deliverableOptions}
            />
          </section>
        </FormSection>
        <FormSection sectionName={"Brief"} sectionNumber={3}>
          <section className={styles.inputs}>
            <InputField
              required
              id="brief"
              value={values?.brief}
              variant="large"
              onChange={handleChange}
              placeholder={"Enter Brief for Influencer"}
            />
          </section>
        </FormSection>
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

export default AddCampaign;
