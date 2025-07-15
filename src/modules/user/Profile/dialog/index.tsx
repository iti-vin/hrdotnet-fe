/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import React from "react";
import Personal from "./modal/Personal";
import Address from "./modal/Address";
import Identification from "./modal/Identification";
import OtherInfo from "./modal/OtherInfo";
import Contacts from "./modal/Contacts";
import Dependents from "./modal/Dependents";
import Educational from "./modal/Educational";
import Employment from "./modal/Employment";
import Files from "./modal/201Files";
import OtherFiles from "./modal/OtherFiles";
import { useProfileStore } from "../store";

export default function Modals() {
  const { openModal, setOpenModal } = useProfileStore();
  return (
    <React.Fragment>
      <Personal
        opened={openModal === "Personal"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <Address opened={openModal === "Address"} onClose={() => setOpenModal("")} buttonClose={() => setOpenModal("")} />
      <Identification
        opened={openModal === "Identification"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <OtherInfo
        opened={openModal === "OtherInfo"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <Contacts
        opened={openModal === "Contacts"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <Dependents
        opened={openModal === "Dependants"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <Educational
        opened={openModal === "Educational"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <Employment
        opened={openModal === "Employment"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
      <Files opened={openModal === "Files"} onClose={() => setOpenModal("")} buttonClose={() => setOpenModal("")} />
      <OtherFiles
        opened={openModal === "OtherFiles"}
        onClose={() => setOpenModal("")}
        buttonClose={() => setOpenModal("")}
      />
    </React.Fragment>
  );
}
