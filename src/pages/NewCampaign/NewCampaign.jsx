import styles from "./NewCampaign.module.scss";
import { Button, InputField, InputSelect, RadioButton } from "../../components";
import { useState } from "react";
import clsx from "clsx";
import { MainLayout } from "../../layouts";
import axios from "axios";

const sectorOptions = [
  {
    name: "Lifestyle",
    value: "lifestyle",
  },
  {
    name: "Option 2",
    value: "option 2",
  },
  {
    name: "Option 3",
    value: "option 3",
  },
  {
    name: "Option 4",
    value: "option 4",
  },
];

const AddCampaign = () => {
  const [progress, setProgress] = useState(30);
  const [value, setValue] = useState("");
  const [values, setValues] = useState({});

  function handleChange(e) {
    const { id, value, name } = e.target;
    console.log(e);
    setValues((prev) => {
      return {
        ...prev,
        [name ? name : id]: value,
      };
    });
  }

  async function submitHandler(e) {
    //use "values" for form data
    e.preventDefault();
    let campaign = {
      name: values.name || "Test",
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
      selectedInfluencers: [],
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
    console.log({ campaign });
    const res = await axios.post(
      "http://localhost:5000/campaigns/create",
      campaign
    );

    console.log({ res });
  }

  return (
    <MainLayout
      classes={[styles.container]}
      navbarProps={{
        titleProps: {
          title: "New Campaign",
          isEditIconVisible: true,
          isBackIconVisible: true,
        },
        progress,
      }}
    >
      <form onSubmit={submitHandler}>
        <FormSection sectionName={"Brand / Agency"} sectionNumber={1}>
          <section className={styles.inputs}>
            <InputField
              required
              onChange={handleChange}
              id="brandName"
              value={values?.brandName}
              label={"Brand Name"}
            />
            <InputField
              required
              onChange={handleChange}
              id="brandSector"
              value={values?.brandSector}
              label={"Sector"}
            />
            <InputField
              required
              onChange={handleChange}
              id="website"
              value={values?.website}
              label={"Website"}
            />
            <div className={styles.personInContact}>
              <InputField
                required
                onChange={handleChange}
                id="PICId"
                value={values?.PICId}
                label={"Person in Contact ID"}
              />
              <InputField
                required
                onChange={handleChange}
                id="PICPosition"
                value={values?.PICPosition}
                label={"Position"}
              />
              <InputField
                required
                onChange={handleChange}
                id="PICEmail"
                value={values?.PICEmail}
                type="email"
                label={"Email Id"}
              />
              <InputField
                required
                onChange={handleChange}
                id="PICContact"
                value={values?.PICContact}
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
              options={sectorOptions}
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
        <Button type="submit">Continue</Button>
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
