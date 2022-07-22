import styles from "./SelectArtists.module.scss";
import { MainLayout } from "../../layouts";
import { Button, CustomTable } from "../../components";
import { useContext, useEffect, useState } from "react";
import { CampaignContext } from "../../utils/contexts";
import clsx from "clsx";
import axios from "axios";

const SelectArtists = () => {
  const columns = [
    {
      headerName: "Name",
      field: "name",
      key: "name",
      // width: "30%",
      // ...getColumnSearchProps("name"),
    },
    {
      headerName: "Link",
      field: "link",
      key: "link",
      renderCell: (row) => (
        <a target="_blank" rel="noreferrer" href={row.value}>
          {row.value}
        </a>
      ),
      // width: "20%",
      // ...getColumnSearchProps("age"),
    },
    {
      headerName: "Followers",
      field: "followers",
      key: "age",
      // width: "20%",
      // ...getColumnSearchProps("age"),
      // sorter: (a, b) => a - b,
      // sortDirections: ["descend", "ascend"],
    },
    {
      headerName: "Avg. Views",
      field: "avgViews",
      key: "avgViews",
      // sorter: (a, b) => a - b,
      // sortDirections: ["descend", "ascend"],
    },
    {
      headerName: "Deliverable",
      field: "deliverable",
      key: "deliverable",
      // width: "20%",
      // ...getColumnSearchProps("deliverable"),
    },
    {
      headerName: "Commercial Creator",
      field: "commercialCreator",
      key: "commercialCreator",
      // width: "20%",
      // ...getColumnSearchProps("commerciaCreator"),
    },
  ];

  const { artists } = useContext(CampaignContext);
  const [selectedArtists, setSelectedArtists] = useState([]);

  function handleRowClick(row) {
    const selected = selectedArtists.find((artist) => artist.id === row.row.id);
    if (selected) {
      setSelectedArtists(
        selectedArtists.filter((artist) => artist.id !== row.row.id)
      );
    } else {
      setSelectedArtists([...selectedArtists, row.row]);
    }
  }

  async function onClickContinue() {
    console.log({ selectedArtists });
    const res = axios.post(
      `${process.env.REACT_APP_API_URL}/campaigns/update`,
      {
        selectedArtists,
      }
    );
    console.log({ res });
  }

  return (
    <MainLayout classes={[styles.container]}>
      <div className={clsx(styles.header, styles.flexRow)}>
        <h3>Select Artists</h3>
        <Button onClick={onClickContinue}>Save & Continue</Button>
      </div>
      <div className={styles.tableContainer}>
        <CustomTable
          columns={columns}
          data={artists || []}
          onRowClick={handleRowClick}
        />
      </div>
    </MainLayout>
  );
};

export default SelectArtists;
