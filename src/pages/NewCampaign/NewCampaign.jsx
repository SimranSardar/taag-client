import styles from "./NewCampaign.module.scss";
import { InputField, Navbar } from "../../components";
import { useState } from "react";
import clsx from "clsx";
import { MainLayout } from "../../layouts";

const AddCampaign = () => {
  const [progress, setProgress] = useState(30);
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
