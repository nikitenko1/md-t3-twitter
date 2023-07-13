import React from "react";
import Image from "next/legacy/image";

interface IProps {
  image: string;
  height: number;
  width: number;
}
const Avatar = ({ image, height, width }: IProps) => {
  return (
    <Image
      alt="profile-image"
      className="cursor-pointer rounded-full"
      src={image}
      width={width}
      height={height}
      objectFit="cover"
    />
  );
};

export default Avatar;
