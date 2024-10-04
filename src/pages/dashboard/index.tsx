import { useTitle } from "@/hooks/useTitle";
import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  useTitle("Dashboard");
  return <div>Dashboard</div>;
};

export default React.memo(Dashboard);
