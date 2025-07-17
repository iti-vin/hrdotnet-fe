/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Checkbox, Flex, Stack } from "@mantine/core";
import { ResponsiveContainer } from "recharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";
import Container from "@/layout/main/container";
import "../index.css";
import { useCalendarContext } from "../context";
import { CalendarApi } from "@fullcalendar/core";
import renderEventContent from "../components/Event";
import { useCalendarStore } from "../store";
import dayjs from "dayjs";
import DateDetails from "../dialog/DateDetails";
import RequestDetails from "../dialog/RequestDetails";

export default function Personal() {
  const { fetchCalendar } = useCalendarContext();
  const { calendarEvents, setType, date, setDate, dialog, setDialog, isRestDayShow, setIsRestDayShow, isHolidayShow, setIsHolidayShow } = useCalendarStore();
  const calendarRef = useRef<FullCalendar>(null);
  const api = calendarRef!.current?.getApi() as CalendarApi;

  useEffect(() => {
    fetchCalendar(date);
  }, [isRestDayShow, isHolidayShow, date]);

  const handleViewChange = () => {
    if (api) {
      setType(api.view.type);
      const currentDate = api.getDate();
      const date = dayjs(currentDate).format("YYYYMMDD");
      handleDateChange(date);
    }
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    fetchCalendar(newDate);
  };

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setDialog("DateDetails");
  };

  return (
    <Container>
      <Stack className=" w-full h-full rounded-lg select-none">
        <ResponsiveContainer height="95%">
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
            events={calendarEvents}
            eventContent={renderEventContent}
            dayHeaderClassNames="custom-header"
            allDayClassNames="custom-all-day"
            eventClassNames="custom-event"
            initialView="dayGridMonth"
            dayMaxEvents={true}
            dateClick={handleDateClick}
          />
        </ResponsiveContainer>
        <Stack className="w-full h-auto p-0">
          <Flex className="w-full flex flex-row justify-evenly">
            <Checkbox defaultChecked classNames={{ label: "text-[#1E8449] font-semibold" }} label="Shift Schedule" color="#1E8449" />
            <Checkbox defaultChecked classNames={{ label: "text-[#ED8028] font-semibold" }} label="Logs" color="#ED8028" />
            <Checkbox defaultChecked classNames={{ label: "text-[#7E7E7E] font-semibold" }} label="Missing Logs" color="#7E7E7E" />
            <Checkbox defaultChecked classNames={{ label: "text-[#967BB6] font-semibold" }} label="Leave" color="#967BB6" />
            <Checkbox defaultChecked classNames={{ label: "text-[#967BB6] font-semibold" }} label="CTO" color="#967BB6" />
            <Checkbox defaultChecked classNames={{ label: "text-[#2F78D1] font-semibold" }} label="Official Business" color="#2F78D1" />
            <Checkbox defaultChecked classNames={{ label: "text-[#5D9FEF] font-semibold" }} label="Overtime" color="#5D9FEF" />
            <Checkbox
              defaultChecked
              checked={isRestDayShow}
              onChange={(e) => setIsRestDayShow(e.currentTarget.checked)}
              classNames={{ label: "text-[#A738FF] font-semibold" }}
              label="Rest Day"
              color="#A738FF"
            />
            <Checkbox
              defaultChecked
              checked={isHolidayShow}
              onChange={(e) => setIsHolidayShow(e.currentTarget.checked)}
              classNames={{ label: "text-[#FF4B34] font-semibold" }}
              label="Holiday"
              color="#FF4B34"
            />
          </Flex>
        </Stack>
      </Stack>

      <DateDetails opened={dialog === "DateDetails"} onClose={() => setDialog("")} buttonClose={() => setDialog("")} date={selectedDate} />

      <RequestDetails opened={dialog === "RequestDetails"} onClose={() => setDialog("")} buttonClose={() => setDialog("DateDetails")} />
    </Container>
  );
}
