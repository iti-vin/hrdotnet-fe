/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { NavLink } from "react-router-dom";
//--- Mantine Modules
import { ActionIcon, AppShell, Divider, Flex, Image, ScrollArea, Text, TextInput, Tooltip, Transition } from "@mantine/core";
//--- Icon Modules
import { Search } from "lucide-react";

//--- Shared Hooks
import { useLogoWidth } from "@shared/hooks/useWidth";

//--- Sidebar Components
import TooltipIcon from "./sidebar/TooltipIcon";
//--- Assets
import { SidebarProps } from "../assets/types";
import sidebar from "../assets/menu.json";
import "../assets/styles.css";

import { useEffect, useState } from "react";
import SwitchCompany from "./sidebar/SwitchCompany";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { iconMap } from "@shared/ui/display/IconDisplay";

export default function Sidebar({ toggle }: SidebarProps) {
  const { isLogowordVisible, toggleLogos } = useLogoWidth();
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const filteredMain = sidebar.main.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredRecords = sidebar.records.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredMenu = sidebar.menu.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filtered201 = sidebar["201 FILES"].filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredTK = sidebar.TIMEKEEPING.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredPayroll = sidebar.PAYROLL.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredReports = sidebar.REPORTS.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));

  useEffect(() => {
    const handleKeyToggle = (event: KeyboardEvent) => {
      const targetTag = (event.target as HTMLElement).tagName;
      // Avoid triggering input that accepts the  "[" and  "]"
      if (["INPUT", "TEXTAREA"].includes(targetTag)) return;

      if (event.key === "[" && isLogowordVisible === true) {
        toggleLogos();
      } else if (event.key === "]" && isLogowordVisible === false) {
        toggleLogos();
      }
    };

    window.addEventListener("keydown", handleKeyToggle);
    return () => {
      window.removeEventListener("keydown", handleKeyToggle);
    };
  }, [isLogowordVisible]);

  return (
    <AppShell.Navbar className="select-none">
      {/* Icon and Logo Section */}
      <AppShell.Section
        px="md"
        pt={15}
        display="flex"
        className="flex flex-row justify-center items-center border-b-2 py-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <Flex>
          <Image src={`/images/new_logoicon.png`} h={35} w={35} hiddenFrom="sm" onClick={toggleLogos} />
          <Image src={`/images/new_logoword.png`} hiddenFrom="sm" className="logo" onClick={toggle} />
        </Flex>
        <Transition transition="scale" exitDuration={3} enterDelay={5} mounted={true}>
          {(styles) => {
            if (isLogowordVisible === true)
              return (
                <Flex>
                  <Image src={`/images/new_logoicon.png`} h={35} w={35} visibleFrom="sm" />
                  <Image src={`/images/new_logoword.png`} visibleFrom="sm" style={styles} h={35} w="auto" className="" />
                </Flex>
              );
            else return <Image src={`/images/new_logoicon.png`} h={35} w={35} visibleFrom="sm" style={styles} />;
          }}
        </Transition>
        {/* <IconChevronRight size={20} stroke={1.5} color="#6d6d6d" className="absolute border-[1px] bg-white rounded-full right-[-12px]" /> */}

        <Transition mounted={isHovered} transition="scale" duration={200} timingFunction="ease" enterDelay={5} exitDuration={3}>
          {(styles) => (
            <ActionIcon variant="white" aria-label="Toggle" className="absolute border-[1px] border-[#6d6d6d] rounded-full right-[-12px]">
              {isLogowordVisible ? (
                <Tooltip
                  label={
                    <Flex gap={10} align="center">
                      <Text fz={12}>Collapse</Text>
                      <Text fz={10} bg="#6d6d6d" w="17" className="text-center" py={2}>{`[`}</Text>
                    </Flex>
                  }
                  position="right"
                  offset={{ mainAxis: 20, crossAxis: 0 }}>
                  <IconChevronLeft
                    style={{ ...styles, width: "780%", height: "70%" }}
                    stroke={2}
                    color="#6d6d6d"
                    onClick={() => {
                      toggleLogos();
                      setIsHovered(false);
                    }}
                  />
                </Tooltip>
              ) : (
                <Tooltip
                  label={
                    <Flex gap={10} align="center">
                      <Text fz={12}>Expand</Text>
                      <Text fz={10} bg="#6d6d6d" w="17" className="text-center" py={2}>{`]`}</Text>
                    </Flex>
                  }
                  position="right"
                  offset={{ mainAxis: 20, crossAxis: 0 }}>
                  <IconChevronRight style={{ ...styles, width: "70%", height: "70%" }} stroke={2} color="#6d6d6d" onClick={toggleLogos} />
                </Tooltip>
              )}
            </ActionIcon>
          )}
        </Transition>
      </AppShell.Section>

      {/* Switch Company Section */}
      <AppShell.Section px="md" mt="lg">
        <SwitchCompany />
      </AppShell.Section>

      {/* Search Section */}
      <AppShell.Section px="md" mt="md">
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" gap={10}>
          {isLogowordVisible ? (
            <TextInput
              leftSection={<Search color="#6d6d6d" />}
              placeholder="Search..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.currentTarget.value)}
              styles={{
                input: {
                  borderColor: "#6d6d6d",
                  borderWidth: 1,
                  borderRadius: 5,
                  color: "#6d6d6d",
                },
              }}
              classNames={{
                input: "poppins",
              }}
              className="w-full"
            />
          ) : (
            <div className="text-center mt-1">
              <Search size={20} color="black" />
            </div>
          )}
        </Flex>
      </AppShell.Section>

      {/* Modules List Section */}
      <AppShell.Section p="md" component={ScrollArea}>
        {/* Main Section */}
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" gap={10}>
          {filteredMain.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        {/* Records Section */}
        <AppShell.Section mt={10}>
          {filteredRecords.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "Records" : <Divider my="md" />}</div>}
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={10} gap={10}>
          {filteredRecords.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        {/* Menu Section */}
        <AppShell.Section mt={10}>
          {filteredMenu.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "Applications" : <Divider my="md" />}</div>}
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={10} gap={10}>
          {filteredMenu.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        {/* 201 Section */}
        <AppShell.Section mt={10}>
          {filtered201.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "201  FILES" : <Divider my="md" />}</div>}
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {filtered201.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        {/* Timekeeping Section */}
        <AppShell.Section mt={10}>
          {filteredTK.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "TIMEKEEPING" : <Divider my="md" />}</div>}
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {filteredTK.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        {/* Payroll Section */}
        <AppShell.Section mt={10}>
          {filteredPayroll.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "PAYROLL" : <Divider my="md" />}</div>}
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {filteredPayroll.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>

        {/* Reports Section */}
        <AppShell.Section mt={10} w="auto">
          {filteredReports.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "REPORTS" : <Divider my="md" />}</div>}
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {filteredReports.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap];
            return (
              <NavLink key={item.id} to={item.path} className={({ isActive }) => (isActive ? "module-active w-full rounded-lg" : "w-full text-menuText")}>
                <Flex justify={isLogowordVisible ? "flex-start" : "center"} className={`module flex-menu ${isLogowordVisible && "pl-4 font-regular rounded-lg"}`}>
                  {isLogowordVisible ? <Icon size={22} /> : <TooltipIcon label={item.label} icon={<Icon size={22} />} />}
                  {isLogowordVisible && <Text className="no-underline  text-sm">{item.label}</Text>}
                </Flex>
              </NavLink>
            );
          })}
        </Flex>
      </AppShell.Section>
    </AppShell.Navbar>
  );
}
