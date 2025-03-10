/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Main Layout
import Container from "@/layout/main/container";
import Header from "@/layout/main/container/header";
import { IconCircleCheck } from "@tabler/icons-react";

export default function Filings() {
  return (
    <Container>
      <Header
        title="Change of Schedule"
        buttonLabel="Endorse"
        buttonLabel2="New Filing"
        buttonClick={() => {}}
        buttonClick2={() => {}}
        buttonIcon={<IconCircleCheck size={25} stroke={2} />}
      />
    </Container>
  );
}
