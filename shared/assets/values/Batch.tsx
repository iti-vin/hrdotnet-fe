import { Batch } from "../types/Global";

export const BatchDataFiling = (data: any[]): Batch => {
  return {
    filings: data.map((item) => ({
      recordId: item.filing.id,
      employeeId: item.id,
      companyId: item.companyId,
      documentNo: item.filing.documentNo,
    })),
  };
};
