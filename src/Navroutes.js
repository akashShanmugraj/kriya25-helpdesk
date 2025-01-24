import { FiUserPlus } from "react-icons/fi";
import { TfiWrite } from "react-icons/tfi";
import ListKit from "./pages/ListKit";
import OnSpotRegistration from "./pages/OnSpotRegistration";
import ProvideKit from "./pages/ProvideKit";

const NavRoutes = [
  {
    title: "Register On Spot",
    icon: <FiUserPlus />,
    href: "/register-on-spot",
    element: <OnSpotRegistration />,
  },
  {
    title: "Provide Kit",
    icon: <TfiWrite />,
    href: "/provide-kit",
    element: <ProvideKit />,
  },
  {
    title: "Kit Provided List",
    icon: <TfiWrite />,
    href: "/kit-list",
    element: <ListKit />,
  },
];

export default NavRoutes;
