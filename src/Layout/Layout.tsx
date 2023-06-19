import { FC } from "react";

type TLayoutProps = {
  children: React.ReactElement;
};

export const Layout: FC<TLayoutProps> = ({ children }) => {
  return <div className="container">{children}</div>;
};
