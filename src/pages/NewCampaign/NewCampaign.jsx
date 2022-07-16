import styles from "./NewCampaign.module.scss";
import {
  Button,
  InputField,
  InputSelect,
  Navbar,
  RadioButton,
} from "../../components";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MainLayout } from "../../layouts";

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
  useEffect(() => {
    console.log(value);
  });

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
      <form>
        <FormSection sectionName={"Brand / Agency"} sectionNumber={1}>
          <section className={styles.inputs}>
            <InputField label={"Brand Name"} />
            <InputField label={"Sector"} />
            <InputField label={"Website"} />
            <div className={styles.personInContact}>
              <InputField label={"Person in Contact ID"} />
              <InputField label={"Position"} />
              <InputField type="email" label={"Email Id"} />
              <InputField type="tel" label={"Contact"} />
            </div>
          </section>
        </FormSection>
        <FormSection sectionName={"Platform"} sectionNumber={2}>
          <section className={styles.inputs}>
            <div className={styles.radioButtonGroup}>
              <RadioButton
                group={"Platform"}
                label={"Youtube"}
                value={"youtube"}
                setValue={setValue}
              />
              <RadioButton
                group={"Platform"}
                label={"Instagram"}
                value={"instagram"}
                setValue={setValue}
              />
              <InputSelect
                label={"Sector"}
                value={value}
                setValue={setValue}
                options={sectorOptions}
              />
            </div>
            <InputSelect
              label={"Sector"}
              value={value}
              setValue={setValue}
              options={sectorOptions}
            />
          </section>
        </FormSection>
        <FormSection sectionName={"Brief"} sectionNumber={3}>
          <section className={styles.inputs}>
            <InputField
              variant="large"
              placeholder={"Enter Brief for Influencer"}
            />
          </section>
        </FormSection>
        <Button type="button">Continue</Button>
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
