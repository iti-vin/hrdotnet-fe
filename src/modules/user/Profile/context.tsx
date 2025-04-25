/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { createContext, PropsWithChildren } from "react";

interface ProfileI {}

const ProfileContext = createContext<ProfileI>({});

export const ProfileProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <ProfileContext.Provider value={{}}>{children}</ProfileContext.Provider>;
};
