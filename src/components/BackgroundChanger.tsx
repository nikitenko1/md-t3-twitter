import React from "react";
import { useLocalStorage } from "usehooks-ts";

const BackgroundChanger = () => {
  const [theme, setTheme] = useLocalStorage("theme", "default");

  const onThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(e.target.value);
  };
  return (
    <div className="space-y-2">
      <p className="text-start text-xs font-semibold text-gray-400">
        Background
      </p>
      <div className="flex items-center rounded-3xl bg-base-300 px-4 py-2 md:h-20">
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-x-4 gap-y-4 md:w-1/2 md:flex-row md:justify-center">
          <button className="flex h-full w-full flex-1 whitespace-nowrap rounded-md bg-white px-2 py-1 text-black">
            <div className="flex items-center gap-x-4">
              <input
                type="radio"
                name="background"
                // daisyui.com/components/radio/
                className="radio-primary radio"
                checked={theme === "default"}
                value="default"
                onChange={onThemeChange}
              />
              <p className="text-sm font-semibold">Default</p>
            </div>
          </button>
          <button className="flex h-full w-full flex-1 items-center whitespace-nowrap rounded-md bg-[#15202B] px-2 py-1 text-white">
            <div className="flex items-center  gap-x-4">
              <input
                type="radio"
                name="background"
                // daisyui.com/components/radio/
                className="radio-primary radio"
                checked={theme === "dim"}
                value="dim"
                onChange={onThemeChange}
              />
              <p className="text-sm font-semibold">Dim</p>
            </div>
          </button>
          <button className="flex h-full w-full flex-1 items-center whitespace-nowrap rounded-md bg-black px-2 py-1 text-white">
            <div className="flex items-center gap-x-4">
              <input
                type="radio"
                name="background"
                // daisyui.com/components/radio/
                className="radio-primary radio"
                checked={theme === "dark"}
                value="dark"
                onChange={onThemeChange}
              />
              <p className="text-sm font-semibold">Lights out</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BackgroundChanger;
