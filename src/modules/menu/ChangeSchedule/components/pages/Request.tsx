/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Main Layout
import Container from "@/layout/main/container";
import Header from "@/layout/main/container/header";

export default function Request() {
  return (
    <Container>
      <Header title="Change of Schedule" buttonLabel="New Request" buttonClick={() => {}} />
    </Container>
  );
}
