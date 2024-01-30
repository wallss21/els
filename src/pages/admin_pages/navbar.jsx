import { Navbar, Nav } from "rsuite";
import HomeIcon from "@rsuite/icons/legacy/Home";
import CogIcon from "@rsuite/icons/legacy/Cog";
import { BiUser } from "react-icons/bi";
import MyDrawer from "./drawer";
import { Link } from "react-router-dom";

export const CustomNavbar = ({ onSelect, activeKey, ...props }) => {
  return (
    <Navbar {...props}>
      <div className="lg:px-10  px-5 flex justify-between items-center w-full max-w-full shadow-md">
        <MyDrawer />
        <Nav
          className="hidden lg:block"
          onSelect={onSelect}
          activeKey={activeKey}
        >
          <Nav.Item eventKey="1" icon={<HomeIcon />}>
            Home
          </Nav.Item>
          <Nav.Item eventKey="2">Orders</Nav.Item>
          <Nav.Item eventKey="3">
            <Link className="p-3 " to={"/products"}>
              Products
            </Link>
          </Nav.Item>
          <Nav.Item eventKey="4">
            <Link className="p-3" to={"/users"}>
              Users
            </Link>
          </Nav.Item>
        </Nav>
        <Nav pullRight>
          <a
            className="p-3 no-underline visited:no-underline active:no-underline"
            rel="noreferrer"
            target="_blank"
            href={"http://localhost:3000/"}
          >
            Visit Site
          </a>

          <div className="hidden lg:inline-block">
            <Nav.Menu title="About">
              <Nav.Item eventKey="4">Company</Nav.Item>
              <Nav.Item eventKey="5">Team</Nav.Item>
              <Nav.Item eventKey="6">Contact</Nav.Item>
            </Nav.Menu>
          </div>

          <Nav.Menu
            noCaret
            openDirection="end"
            placement="bottomEnd"
            trigger="click"
            title={<BiUser size={30} strokeWidth={0.1} />}
          >
            <Nav.Item>Profile</Nav.Item>
            <Nav.Item>Sign out</Nav.Item>
          </Nav.Menu>
        </Nav>
      </div>
    </Navbar>
  );
};
