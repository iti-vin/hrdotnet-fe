//--- Mantine Modules
import { AppShell, Stack } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

//--- App Layout
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Main from "./components/Main";

import { useLogoWidth } from "@shared/hooks/useWidth";

export default function index() {
  const [opened, { toggle }] = useDisclosure();
  const { isLogowordVisible } = useLogoWidth();
  return (
    <AppShell
      layout="alt"
      header={{ height: 70 }}
      navbar={{ width: isLogowordVisible ? 250 : 70, breakpoint: "md", collapsed: { mobile: !opened } }}
      padding="md">
      <Stack className="bg-red-200 w-full h-screen">
        <Header toggle={toggle} opened={opened} />
        <Sidebar toggle={toggle} />
        <Main />
      </Stack>
    </AppShell>
  );
}
