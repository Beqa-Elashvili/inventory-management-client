"use client";

import React, { useState } from "react";
import Header from "@/app/(components)/Header/Header";
import { Switch } from "antd";
import { useAppDispatch, useAppSelector } from "../redux";
import { setIsDarkMode } from "@/state";

type userSettingsProps = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const Settings = () => {
  const dispatch = useAppDispatch();
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

  const mockSettings: userSettingsProps[] = [
    { label: "Username", value: "john_doe", type: "text" },
    { label: "Email", value: "john@example.com", type: "text" },
    { label: "Notification", value: true, type: "toggle" },
    { label: "Dark Mode", value: isDarkMode, type: "toggle" },
    { label: "Languge", value: "English", type: "text" },
  ];

  const [userSettings, setUsetSettings] =
    useState<userSettingsProps[]>(mockSettings);

  const hanldeToggleChange = (index: number) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUsetSettings(settingsCopy);
  };

  const toggleDarkMode = () => {
    dispatch(setIsDarkMode(!isDarkMode));
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Settings
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4 ">{setting.label}</td>
                <td className="py-2 px-4 ">
                  {setting.type === "toggle" ? (
                    <>
                      {setting.label === "Dark Mode" ? (
                        <Switch
                          className="bg-gray-500"
                          checked={isDarkMode}
                          onChange={toggleDarkMode}
                        />
                      ) : (
                        <Switch
                          className="bg-gray-500"
                          checked={setting.value as boolean}
                          onChange={() => hanldeToggleChange(index)}
                        />
                      )}
                    </>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingCopy = [...userSettings];
                        settingCopy[index].value = e.target.value;
                        setUsetSettings(settingCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
