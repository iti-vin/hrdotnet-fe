/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { NavLink } from "react-router-dom";
//--- Mantine Modules
import { AppShell, Divider, Flex, Image, ScrollArea, Text, TextInput, Transition } from "@mantine/core";
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

import { iconMap } from "../components/sidebar/IconMap";
import { useState } from "react";

export default function Sidebar({ toggle }: SidebarProps) {
  const { isLogowordVisible, toggleLogos } = useLogoWidth();
  const [searchFilter, setSearchFilter] = useState<string>("");

  const filteredMain = sidebar.main.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredMenu = sidebar.menu.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filtered201 = sidebar["201  FILES"].filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredTK = sidebar.TIMEKEEPING.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredPayroll = sidebar.PAYROLL.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));
  const filteredReports = sidebar.REPORTS.filter((link) => link.label.toLowerCase().includes(searchFilter.toLowerCase()));

  return (
    <AppShell.Navbar>
      {/* Icon and Logo Section */}
      <AppShell.Section px="md" pt={15} display="flex" className="flex flex-row justify-center items-center">
        <Image src={`/images/new_logoword.png`} hiddenFrom="sm" className="logo" onClick={toggle} />
        <Transition transition="scale" exitDuration={3} enterDelay={5} mounted={true}>
          {(styles) => {
            if (isLogowordVisible === true) return <Image src={`/images/new_logoword.png`} visibleFrom="sm" onClick={toggleLogos} style={styles} h={35} w="auto" className="" />;
            else return <Image src={`/images/new_logoicon.png`} h={35} w={35} visibleFrom="sm" onClick={toggleLogos} style={styles} />;
          }}
        </Transition>
      </AppShell.Section>

      {/* Search Section */}
      <AppShell.Section px="md" mt="lg">
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" gap={10}>
          {isLogowordVisible ? (
            <TextInput
              leftSection={<Search color="#559CDA" />}
              placeholder="Search Menu...."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.currentTarget.value)}
              styles={{
                input: {
                  borderColor: "#559CDA",
                  borderWidth: 2,
                  borderRadius: 10,
                  color: "#559CDA",
                },
              }}
              className="w-full"
            />
          ) : (
            <div className="text-center mt-2">
              <Search size={20} color="black" />
            </div>
          )}
        </Flex>
      </AppShell.Section>

      {/* Modules List Section */}
      <AppShell.Section my="xs" p="md" component={ScrollArea}>
        {/* Main Section */}
        <AppShell.Section>{filteredMain.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "Dashboard" : <Divider my="md" />}</div>}</AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={10} gap={10}>
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

        {/* Menu Section */}
        <AppShell.Section mt={10}>{filteredMenu.length != 0 && <div className="text-menuText text-xs">{isLogowordVisible ? "Menu" : <Divider my="md" />}</div>}</AppShell.Section>
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
