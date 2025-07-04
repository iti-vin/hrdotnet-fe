import { Badge } from "@mantine/core";

export const tableStatusBadge = (status: string) => {
  switch (status) {
    case "Filed":
      return <Badge color="grape">{status}</Badge>;
    case "Reviewed":
      return <Badge color="orange">{status}</Badge>;
    case "Cancelled":
      return <Badge color="red">{status}</Badge>;
    case "Approve":
      return <Badge color="green">{status}</Badge>;
    default:
      return <Badge color="grape">{status}</Badge>;
  }
};
