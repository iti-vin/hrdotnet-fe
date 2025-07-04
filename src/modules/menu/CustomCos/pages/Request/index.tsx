import { Group, Stack } from "@mantine/core";
import dayjs from "dayjs";
import { CustomTitle } from "../../component/CustomTitle";
import { NewRequestBtn } from "../../component/buttons/NewRequestBtn";
import { FilterValues, useFilterStore } from "../../store/useFilterStore";
import { Filters } from "../../component/Filters";
import { CustomTable } from "../../component/CustomTable";
import { requestTableHeaders } from "../../constant/tableHeaders";
import { tableStatusBadge } from "../../constant/tableStatusBadge";
import { IconFileText } from "@tabler/icons-react";
import { PaginationFooter } from "../../component/Footer";
import { requestElement, requestTableData } from "../../data/tableData";

const filterData = (data: requestElement[], filters: FilterValues): requestElement[] => {
  return data.filter((row) => {
    if (
      filters.documentNo &&
      String(row["Document No."]).toLowerCase().includes(filters.documentNo.toLowerCase()) === false
    )
      return false;
    if (filters.schedule && row["Requested Schedule"] !== filters.schedule) return false;
    if (filters.cosFrom && dayjs(row["COS From"]).isBefore(dayjs(filters.cosFrom))) return false;
    if (filters.cosTo && dayjs(row["COS To"]).isAfter(dayjs(filters.cosTo))) return false;
    if (filters.txnFrom && dayjs(row["Transaction Date"]).isBefore(dayjs(filters.txnFrom))) return false;
    if (filters.txnTo && dayjs(row["Transaction Date"]).isAfter(dayjs(filters.txnTo))) return false;
    if (
      filters.processedBy &&
      String(row["Processed By"]).toLowerCase().includes(filters.processedBy.toLowerCase()) === false
    )
      return false;
    return true;
  });
};

const Request = () => {
  const { filters } = useFilterStore();
  const filteredData = filterData(requestTableData, filters);

  return (
    <Stack>
      <Group justify="space-between">
        <CustomTitle />
        <NewRequestBtn />
      </Group>
      <Filters />
      <CustomTable
        headers={Array.from(requestTableHeaders)}
        data={filteredData}
        renderRow={(row) =>
          requestTableHeaders.map((header) =>
            header === "Status" ? (
              tableStatusBadge(String(row[header]))
            ) : header === "Attachment" ? (
              <IconFileText size={18} />
            ) : (
              row[header]
            )
          )
        }
      />
      <PaginationFooter totalItems={filteredData.length} />
    </Stack>
  );
};

export default Request;
