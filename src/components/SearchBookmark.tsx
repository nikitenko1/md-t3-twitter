import { useDebouncedBookmarks } from "lib/zustand";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useDebounce } from "usehooks-ts";

interface IProps {
  placeholder: string;
}

const SearchBookmark = ({ placeholder }: IProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const router = useRouter();

  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce<string>(value, 500);
  const { setBookmark } = useDebouncedBookmarks();

  useEffect(() => {
    // Do fetch here...
    // refetch();

    setBookmark(debouncedValue);
  }, [debouncedValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <form
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      className={`${
        isFocused ? "border-2 border-primary" : null
      } bg- flex w-full items-center gap-x-4 rounded-full px-2 py-1 text-sm text-gray-500
      md:px-4 md:py-2 md:text-base`}
    >
      <BiSearch />
      <input
        onChange={handleChange}
        type="text"
        className="w-full bg-transparent outline-none"
        placeholder={placeholder}
      />
    </form>
  );
};

export default SearchBookmark;
