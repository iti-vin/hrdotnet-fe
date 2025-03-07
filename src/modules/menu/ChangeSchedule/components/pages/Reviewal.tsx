/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Main Layout
import Container from "@/layout/main/container";
import Header from "@/layout/main/container/header";
import { IconFolderPlus } from "@tabler/icons-react";

export default function Reviewal() {
  return (
    <Container>
      <Header title="Change of Schedule" buttonLabel="Endorse" buttonClick={() => {}} buttonIcon={<IconFolderPlus size={25} stroke={2} />} />
    </Container>
  );
}
