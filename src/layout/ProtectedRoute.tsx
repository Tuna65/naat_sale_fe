import { Outlet } from "react-router";
interface Props {}

const ProtectedRoute = (props: Props) => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default ProtectedRoute;
