/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//---
import { create } from "zustand";
//--- Model Response
import { ChangeSchedule, CosItems } from "../models/response";
//---
import { ChangeScheduleValues, Items } from "../assets/Values";

type Type = {
  data: ChangeSchedule;
  setData(data: ChangeSchedule): void;
  items: CosItems[];
  setItems(items: CosItems[]): void;

  page: number;
  setPage(page: number): void;
  time: string;
  setTime(time: string): void;

  onBatchApprove: boolean;
  setOnBatchApprove(batch: boolean): void;
  onBatchCancel: boolean;
  setOnBatchCancel(batch: boolean): void;
};

const useApprovalCosStore = create<Type>((set) => ({
  // --- Fetch Arrays
  data: ChangeScheduleValues,
  setData: (data: ChangeSchedule) => set({ data: data }),
  items: [Items],
  setItems: (items: CosItems[]) => set({ items: items }),

  page: 1,
  setPage: (page: number) => set({ page: page }),
  time: "0",
  setTime: (time: string) => set({ time: time }),

  // --- Modal
  onBatchApprove: false,
  setOnBatchApprove: (batch: boolean) => set({ onBatchApprove: batch }),
  onBatchCancel: false,
  setOnBatchCancel: (batch: boolean) => set({ onBatchCancel: batch }),
}));

export default useApprovalCosStore;
