import { Stack, Tabs } from "@mantine/core";
import { cosTab } from "../../constant/cosTab";
import { tabListStyle, tabStack, tabStyles, tabTabStyles } from "../../styles/tabStyles";

export const CustomTab = () => {
  return (
    <Tabs defaultValue="request" className={tabStyles}>
      <Tabs.List className={tabListStyle}>
        {cosTab.map((item) => (
          <Tabs.Tab unstyled key={item.value} value={item.value} className={tabTabStyles}>
            {item.label}
          </Tabs.Tab>
        ))}
      </Tabs.List>

      {cosTab.map((item) => (
        <Tabs.Panel key={item.value} value={item.value}>
          <Stack className={tabStack}>{item.panel}</Stack>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
