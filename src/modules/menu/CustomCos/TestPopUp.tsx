import { TextInput } from "@mantine/core";
import { Popover } from "@shared/ui/popover";
import { BookAIcon } from "lucide-react";
import { useState } from "react";

export function TestPopUp() {
  const [openProfile, setProfile] = useState(false);
  const [openSettings, setSettings] = useState(false);
  const [openStandard, setStandard] = useState(false);
  const [openSmall, setSmall] = useState(false);

  return (
    <>
      <div className="flex flex-row gap-4">
        <button onClick={() => setProfile(true)} className="py-2 px-4 bg-blue-400 rounded-full text-white">
          profile
        </button>
        <button onClick={() => setSettings(true)} className="py-2 px-4 bg-orange-400 rounded-full text-white">
          settings
        </button>
        <button onClick={() => setStandard(true)} className="py-2 px-4 bg-blue-400 rounded-full text-white">
          standard
        </button>
        <button onClick={() => setSmall(true)} className="py-2 px-4 bg-orange-400 rounded-full text-white">
          small
        </button>
      </div>

      <Popover
        open={openProfile}
        onClose={() => setProfile(false)}
        position="top"
        size="profile"
        header="Profile"
        subHeader="this is subheader"
        body={
          <div className="flex flex-col gap-3">
            {[
              { label: "Dashboard", icon: <BookAIcon /> },
              { label: "My Account", icon: <BookAIcon /> },
              { label: "Billing", icon: <BookAIcon /> },
              { label: "Notifications", icon: <BookAIcon /> },
              { label: "Logout", icon: <BookAIcon /> },
            ].map((item, index) => (
              <button
                key={index}
                className="flex items-center gap-3 px-4 py-2 rounded-md hover:bg-[var(--color-primary)] hover:text-white transition-colors text-left">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        }
      />
      <Popover
        open={openSettings}
        onClose={() => setSettings(false)}
        size="settings"
        position="right"
        header="Settings"
        subHeader="this is subheader"
        body={
          <div className="flex flex-col gap-4 px-2">
            <div>
              <p className="text-sm font-semibold mb-1">Theme</p>
              <select className="w-full px-2 py-1 border rounded">
                <option>Light</option>
                <option>Dark</option>
                <option>System Default</option>
              </select>
            </div>
            <div>
              <p className="text-sm font-semibold mb-1">Language</p>
              <select className="w-full px-1 py-1 border rounded">
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <button className="w-full mt-2 px-4 py-1 bg-[var(--color-primary)] text-white rounded hover:opacity-90">
              Save Settings
            </button>
          </div>
        }
      />
      <Popover
        open={openStandard}
        onClose={() => setStandard(false)}
        size="standard"
        position="bottom"
        header="sample Standard"
        body={
          <form className="flex flex-col gap-4 px-4 py-2 max-h-[700px] overflow-y-auto">
            <TextInput label="First Name" placeholder="John" />
            <TextInput label="Last Name" placeholder="Doe" />
            <TextInput label="Email Address" placeholder="john@example.com" />
            <TextInput label="Phone Number" placeholder="+63 912 345 6789" />
            <TextInput label="Address" placeholder="123 Main St" />
            <TextInput label="City" placeholder="Manila" />
            <TextInput label="ZIP Code" placeholder="1000" />
            <button
              type="submit"
              className="mt-4 w-full py-2 bg-[var(--color-primary)] text-white rounded hover:opacity-90">
              Submit
            </button>
          </form>
        }
        showCloseButton
      />
      <Popover
        open={openSmall}
        onClose={() => setSmall(false)}
        showCloseButton
        size="small"
        position="bottom"
        header="Small Pop"
        subHeader="this is subheader"
        body={
          <div className="flex flex-col items-center justify-center gap-4 text-center px-6 py-4">
            <BookAIcon className="w-10 h-10 text-[var(--color-primary)]" />
            <p className="text-base font-semibold">Are you sure you want to delete this item?</p>
            <div className="flex gap-4">
              <button
                onClick={() => alert("Canceled")}
                className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-100">
                Cancel
              </button>
              <button
                onClick={() => alert("Confirmed")}
                className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600">
                Confirm
              </button>
            </div>
          </div>
        }
      />
    </>
  );
}
