/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//---
import { create } from "zustand";
//--- Model Response
import { ChangeSchedule, CosItems } from "../models/response";
//--- Types
import { Schedules } from "../assets/Types";
//---
import { ChangeScheduleValues, Items, SchedulesValues } from "../assets/Values";

type Type = {
  data: ChangeSchedule;
  setData(data: ChangeSchedule): void;
  items: CosItems[];
  setItems(items: CosItems[]): void;

  page: number;
  setPage(page: number): void;
  time: string;
  setTime(time: string): void;

  scheduleItems: Schedules;
  setScheduleItems(items: Schedules): void;

  onNewRequest: boolean;
  setOnNewRequest(add: boolean): void;
  onEditRequest: boolean;
  setOnEditRequest(edit: boolean): void;
  onCancelRequest: boolean;
  setOnCancelRequest(edit: boolean): void;

  updateAlert: boolean;
  setUpdateAlert(update: boolean): void;
  cancelAlert: boolean;
  setCancelAlert(cancel: boolean): void;
  createAlert: boolean;
  setCreateAlert(create: boolean): void;
};

const useRequestCosStore = create<Type>((set) => ({
  // --- Data Arrays
  data: ChangeScheduleValues,
  setData: (data: ChangeSchedule) => set({ data: data }),
  items: [Items],
  setItems: (items: CosItems[]) => set({ items: items }),

  page: 1,
  setPage: (page: number) => set({ page: page }),
  time: "0",
  setTime: (time: string) => set({ time: time }),

  // --- Schedule Array
  scheduleItems: SchedulesValues,
  setScheduleItems: (items: Schedules) => set({ scheduleItems: items }),

  // --- Modals
  onNewRequest: false,
  setOnNewRequest: (add: boolean) => set({ onNewRequest: add }),
  onEditRequest: false,
  setOnEditRequest: (edit: boolean) => set({ onEditRequest: edit }),
  onCancelRequest: false,
  setOnCancelRequest: (cancel: boolean) => set({ onCancelRequest: cancel }),

  // Alert Handle
  updateAlert: false,
  setUpdateAlert: (update: boolean) => set({ updateAlert: update }),
  cancelAlert: false,
  setCancelAlert: (cancel: boolean) => set({ cancelAlert: cancel }),
  createAlert: false,
  setCreateAlert: (create: boolean) => set({ createAlert: create }),
}));

export default useRequestCosStore;
