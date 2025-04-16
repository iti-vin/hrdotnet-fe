/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Node Modules
import { Stack, Checkbox, Flex, ScrollArea } from "@mantine/core";
//--- Layouts
import Modal from "@/layout/main/dialog/Modal";
//--- Shared
import { ModalProps } from "@shared/assets/types/Modal";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef } from "react";
import "../index.css";
import { useCalendarContext } from "../context";
import { CalendarApi, EventInput } from "@fullcalendar/core";
import renderEventContent from "../components/Event";
import { useCalendarStore } from "../store";
import dayjs from "dayjs";

interface TeamCalendarI extends ModalProps {
  name?: string;
}

export default function TeamCalendar({ opened, onClose, buttonClose, name }: TeamCalendarI) {
  const { fetchCalendar } = useCalendarContext();
  const { calendarEvents, setType, setDate } = useCalendarStore();
  const calendarRef = useRef<FullCalendar>(null);
  const api = calendarRef!.current?.getApi() as CalendarApi;

  useEffect(() => {
    fetchCalendar();
  }, []);

  const handleViewChange = () => {
    if (api) {
      setType(api.view.type);
      const currentDate = api.getDate();
      const date = dayjs(currentDate).format("YYYYMMDD");
      handleDateChange(date);
    }
  };

  const filteredEvents: EventInput[] = calendarEvents;

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    fetchCalendar(newDate).then((res) => {
      console.log("New date fetch:", res);
    });
  };

  //   const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateClick = (arg: { dateStr: string }) => {
    // setSelectedDate(arg.dateStr);
    console.log(arg);
    // setDialog("DateDetails");
  };

  return (
    <Modal isIconsActionsRequired title={name} size="70%" opened={opened} onClose={onClose} buttonClose={buttonClose}>
      <ScrollArea
        className="flex flex-col gap-5 mt-3 w-full text-[#6d6d6d] relative"
        h={650}
        styles={{ scrollbar: { display: "none" } }}>
        <Stack className="mb-4 w-full h-[650px] rounded-lg select-none">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{
              left: " prev,next, today",
              center: "title",
              right: "dayGridMonth,timeGridDay,listWeek",
            }}
            themeSystem="bootstrap5"
            datesSet={handleViewChange}
            dayHeaderFormat={{ weekday: "long" }}
            events={filteredEvents}
            eventContent={renderEventContent}
            dayHeaderClassNames="custom-header"
            allDayClassNames="custom-all-day"
            eventClassNames="custom-event"
            initialView="dayGridMonth"
            dayMaxEvents={true}
            dateClick={handleDateClick}
          />
          <Stack className="w-full h-auto p-0">
            <Flex className="w-full flex flex-row justify-evenly">
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#1E8449] font-semibold" }}
                label="Shift Schedule"
                color="#1E8449"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#ED8028] font-semibold" }}
                label="Logs"
                color="#ED8028"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#7E7E7E] font-semibold" }}
                label="Missing Logs"
                color="#7E7E7E"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#967BB6] font-semibold" }}
                label="Leave"
                color="#967BB6"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#967BB6] font-semibold" }}
                label="CTO"
                color="#967BB6"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#2F78D1] font-semibold" }}
                label="Official Business"
                color="#2F78D1"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#5D9FEF] font-semibold" }}
                label="Overtime"
                color="#5D9FEF"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#A738FF] font-semibold" }}
                label="Rest Day"
                color="#A738FF"
              />
              <Checkbox
                defaultChecked
                classNames={{ label: "text-[#FF4B34] font-semibold" }}
                label="Holiday"
                color="#FF4B34"
              />
            </Flex>
          </Stack>
        </Stack>
      </ScrollArea>
    </Modal>
  );
}
