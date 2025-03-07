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

//--- Public Images
import logoword from "@shared/assets/images/logoword.webp";
import logoicon from "@shared/assets/images/icon.webp";
//--- Sidebar Components
import TooltipIcon from "./sidebar/TooltipIcon";
//--- Assets
import { SidebarProps } from "../assets/types";
import sidebar from "../assets/menu.json";
import "../assets/styles.css";

import { iconMap } from "../components/sidebar/IconMap";

export default function Sidebar({ toggle }: SidebarProps) {
  const { isLogowordVisible, toggleLogos } = useLogoWidth();

  return (
    <AppShell.Navbar>
      {/* Icon and Logo Section */}
      <AppShell.Section px="md" pt={10} display="flex" className="flex-row justify-between items-center">
        <Image src={logoword} hiddenFrom="sm" className="logo" onClick={toggle} />
        <Transition transition="scale" exitDuration={3} enterDelay={5} mounted={true}>
          {(styles) => {
            if (isLogowordVisible === true) return <Image src={logoword} visibleFrom="sm" onClick={toggleLogos} style={styles} h={40} className="" />;
            else return <Image src={logoicon} h={35} w={35} visibleFrom="sm" onClick={toggleLogos} style={styles} />;
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

      {/* Menu Section */}
      <AppShell.Section my="md" p="md" component={ScrollArea}>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={10} gap={10}>
          {sidebar.main.map((item) => {
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

        <AppShell.Section mt={10}>
          <div className="text-menuText text-xs">{isLogowordVisible ? "Menu" : <Divider my="md" />}</div>
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={10} gap={10}>
          {sidebar.menu.map((item) => {
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

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">{isLogowordVisible ? "201  FILES" : <Divider my="md" />}</div>
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {sidebar["201  FILES"].map((item) => {
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

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">{isLogowordVisible ? "TIMEKEEPING" : <Divider my="md" />}</div>
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {sidebar["TIMEKEEPING"].map((item) => {
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

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">{isLogowordVisible ? "PAYROLL" : <Divider my="md" />}</div>
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {sidebar["PAYROLL"].map((item) => {
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

        <AppShell.Section mt={10} w="auto">
          <div className="text-menuText text-xs">{isLogowordVisible ? "REPORTS" : <Divider my="md" />}</div>
        </AppShell.Section>
        <Flex justify="flex-start" align={isLogowordVisible ? "flex-start" : "center"} direction="column" wrap="wrap" mt={20} gap={10}>
          {sidebar["REPORTS"].map((item) => {
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
