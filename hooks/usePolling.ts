import { useEffect } from "react";
import { useChoices, useDisableTweet } from "lib/zustand";

const usePolling = () => {
  const { choices, setChoices } = useChoices();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, i: number) => {
    const updatedState = [...choices];
    updatedState[i] = { choice: e.target.value };

    setChoices(updatedState);
  };
  const { setIsDisabled } = useDisableTweet();

  useEffect(() => {
    if (choices[0]?.choice === "" || choices[1]?.choice === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [choices]);

  return { choices, handleChange, setChoices };
};

export default usePolling;
