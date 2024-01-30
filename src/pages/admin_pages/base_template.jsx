import React from "react";
import { Table, Button } from "rsuite";
import { CustomNavbar } from "./navbar";
import {
  Container,
  Header,
  Sidebar,
  Sidenav,
  Content,
  Navbar,
  Nav,
} from "rsuite";
import AngleLeftIcon from "@rsuite/icons/legacy/AngleLeft";
import AngleRightIcon from "@rsuite/icons/legacy/AngleRight";
import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { Outlet } from "react-router-dom";

const headerStyles = {
  padding: 18,
  fontSize: 16,
  height: 56,
  //   background: "#34c3ff",
  color: " #fff",
  whiteSpace: "nowrap",
  overflow: "hidden",
};

const { Column, HeaderCell, Cell } = Table;
const data = [
  {
    name: "Hayes Fernandez",
    phone: "(444) 553-4446",
    email: "venenatis.a@outlook.org",
    postalZip: "90243",
    country: "Italy",
    address: "294-869 Tristique Av.",
    region: "Manitoba",
  },
  {
    name: "Bernard Joyner",
    phone: "(624) 551-6700",
    email: "neque@protonmail.couk",
    postalZip: "1469",
    country: "Italy",
    address: "8845 Class Av.",
    region: "Namen",
  },
  {
    name: "Ebony Crane",
    phone: "1-463-937-4686",
    email: "sagittis.duis@icloud.ca",
    postalZip: "19375",
    country: "India",
    address: "263-4472 Malesuada Road",
    region: "Lorraine",
  },
  {
    name: "Galvin Shelton",
    phone: "(398) 444-5526",
    email: "integer.sem@google.ca",
    postalZip: "946526",
    country: "Colombia",
    address: "2259 Mollis Rd.",
    region: "Pondicherry",
  },
  {
    name: "Harriet Romero",
    phone: "1-954-241-6822",
    email: "orci.luctus@aol.net",
    postalZip: "27784-54610",
    country: "Spain",
    address: "P.O. Box 709, 6772 Torquent St.",
    region: "Västra Götalands län",
  },
];

const NavToggle = ({ expand, onChange }) => {
  return (
    <Navbar appearance="subtle" className="nav-toggle">
      <Nav pullRight>
        <Nav.Item onClick={onChange} style={{ width: 56, textAlign: "center" }}>
          {expand ? <AngleLeftIcon /> : <AngleRightIcon />}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

function BaseTemplate() {
  const [expand, setExpand] = React.useState(false);

  return (
    <div className=" overflow-hidden">
      <div className="flex flex-col">
        <Container>
          <Sidebar
            className="bg-slate-200 h-[100vh] hidden lg:flex flex-col sticky top-0"
            width={expand ? 260 : 56}
            collapsible
          >
            <Sidenav.Header>
              <div style={headerStyles} className="bg-[#282828]">
                <span style={{ marginLeft: 12 }}> BRAND</span>
              </div>
            </Sidenav.Header>
            <Sidenav
              expanded={expand}
              defaultOpenKeys={["3"]}
              appearance="subtle"
            >
              <Sidenav.Body>
                <Nav>
                  <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
                    Dashboard
                  </Nav.Item>
                  <Nav.Item eventKey="2" icon={<GroupIcon />}>
                    User Group
                  </Nav.Item>
                  <Nav.Menu
                    eventKey="3"
                    trigger="hover"
                    title="Advanced"
                    icon={<MagicIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item eventKey="3-1">Geo</Nav.Item>
                    <Nav.Item eventKey="3-2">Devices</Nav.Item>
                    <Nav.Item eventKey="3-3">Brand</Nav.Item>
                    <Nav.Item eventKey="3-4">Loyalty</Nav.Item>
                    <Nav.Item eventKey="3-5">Visit Depth</Nav.Item>
                  </Nav.Menu>
                  <Nav.Menu
                    eventKey="4"
                    trigger="hover"
                    title="Settings"
                    icon={<GearCircleIcon />}
                    placement="rightStart"
                  >
                    <Nav.Item eventKey="4-1">Applications</Nav.Item>
                    <Nav.Item eventKey="4-2">Websites</Nav.Item>
                    <Nav.Item eventKey="4-3">Channels</Nav.Item>
                    <Nav.Item eventKey="4-4">Tags</Nav.Item>
                    <Nav.Item eventKey="4-5">Versions</Nav.Item>
                  </Nav.Menu>
                </Nav>
              </Sidenav.Body>
            </Sidenav>
            <NavToggle expand={expand} onChange={() => setExpand(!expand)} />
          </Sidebar>
          <Container className="overflow-x-auto ">
            <Header className="w-full">
              <CustomNavbar />
            </Header>

            <div className="overflow-x-auto   max-h-[90vh] lg:py-6 flex justify-center items-start">
              <Outlet />
            </div>
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default BaseTemplate;
