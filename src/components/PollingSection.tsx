import usePolling from "hooks/usePolling";
import { useChoices, useOpenPolling } from "lib/zustand";
import React from "react";
import { IoMdAdd } from "react-icons/io";

const PollingSection = () => {
  const { choices, handleChange } = usePolling();

  const { setIsOpen } = useOpenPolling();
  const { incChoices } = useChoices();

  return (
    <div className="space-y-4 rounded-xl border border-base-300 p-4">
      {choices.map((choice, i: number) => (
        <div className="flex items-center gap-x-2" key={i}>
          <input
            onChange={(e) => handleChange(e, i)}
            placeholder={`Choice ${i + 1}`}
            className="input-primary  input w-full max-w-xs"
          />
          {i === choices.length - 1 ? (
            <IoMdAdd
              onClick={incChoices}
              className="cursor-pointer text-xl hover:text-primary"
            />
          ) : null}
        </div>
      ))}
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="w-full rounded-xl p-4 text-center text-red-600 transition-all"
      >
        Close polling
      </button>
    </div>
  );
};

export default PollingSection;
