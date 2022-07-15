import styles from "./NewCampaign.module.scss";
import { InputField, Navbar } from "../../components";
import { useState } from "react";
import clsx from "clsx";

const AddCampaign = () => {
  const [progress, setProgress] = useState(30);
  return (
    <div className={styles.container}>
      <Navbar
        titleProps={{
          title: "New Campaign",
          isEditIconVisible: true,
          isBackIconVisible: true,
          // brandName: "Nike",
        }}
        progress={progress}
      />
      <form action="">
        <FormSection sectionName={"Brand / Agency"} sectionNumber={1}>
          <section className={styles.inputs}>
            <InputField label={"Brand Name"} />
          </section>
        </FormSection>
        <FormSection sectionName={"Platform"} sectionNumber={2}>
          <section className={styles.inputs}>
            <InputField label={"Brand Name"} />
          </section>
        </FormSection>
        <FormSection sectionName={"Brief"} sectionNumber={3}>
          <section className={styles.inputs}>
            <InputField label={"Brand Name"} />
          </section>
        </FormSection>
      </form>
    </div>
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
