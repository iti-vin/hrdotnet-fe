/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//-- Full Calendar
import { EventContentArg } from "@fullcalendar/core/index.js";
//--- Mantine Components
import { Container, Text } from "@mantine/core";

export default function renderEventContent(eventInfo: EventContentArg) {
  const eventDetails = eventInfo.event?._def;
  return (
    <Container
      bg={eventInfo.backgroundColor}
      // bg={eventDetails.title === "Rest Day" ? "violet" : "blue"}
      className={`flex flex-row overflow-hidden h-4 pl-3 hover:overflow-visible w-full rounded-md truncate cursor-pointer`}>
      <Text c="white" size="12px" fw={500} py={2} ta="center">
        {eventDetails.title}
      </Text>
    </Container>
  );
}
