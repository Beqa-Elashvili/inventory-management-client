import React from "react";

type HeaderProps = {
  name: string;
};

const Header: React.FC<HeaderProps> = ({ name }) => {
  return <div className="text-2xl font-semibold text-gray-700 ">{name}</div>;
};

export default Header;
