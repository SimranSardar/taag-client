import styles from "./UploadArtists.module.scss";
import { Button, InputField, InputSelect, RadioButton } from "../../components";
import { MainLayout } from "../../layouts";
import Dropzone from "react-dropzone";
import axios from "axios";
import { showAlert } from "../../utils";

const UploadArtists = () => {
  async function onSubmit(acceptedFiles) {
    const formData = new FormData();
    formData.append("file", acceptedFiles[0]);
    console.log({ acceptedFiles });
    const response = await axios.post(
      `${process.env.REACT_APP_API_URI}/artist/bulk`,
      formData,
      {
        headers: {
          AccessKey: localStorage.getItem("token"),
        },
      }
    );
    if (response.status.toString().includes("20")) {
      showAlert("success", "Artists uploaded successfully");
    }
    console.log({ response });
  }

  return (
    <MainLayout classes={[styles.container]}>
      <div>
        <h3>
          Upload Artists (xlsx){" "}
          <a
            href="https://docs.google.com/spreadsheets/d/1jSqCSslvup7ngy8Kcd-49zv18N-2EcUmN2a2JLZPqPg/edit#gid=0"
            target="blank"
          >
            View Sample
          </a>{" "}
        </h3>
      </div>
      <Dropzone onDrop={(acceptedFiles) => onSubmit(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </section>
        )}
      </Dropzone>
    </MainLayout>
  );
};

export default UploadArtists;
