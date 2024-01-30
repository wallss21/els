import React from "react";
import { IoMenu } from "react-icons/io5";
import { ButtonToolbar, Drawer, IconButton, Nav, Placeholder } from "rsuite";

import GearCircleIcon from "@rsuite/icons/legacy/GearCircle";
import DashboardIcon from "@rsuite/icons/Dashboard";
import GroupIcon from "@rsuite/icons/legacy/Group";
import MagicIcon from "@rsuite/icons/legacy/Magic";
import { Link } from "react-router-dom";

function MyDrawer() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = (key) => {
    setOpen(true);
  };
  return (
    <div className=" lg:hidden ">
      <ButtonToolbar>
        <IconButton
          icon={<IoMenu size={20} />}
          onClick={() => handleOpen("left")}
        ></IconButton>
      </ButtonToolbar>
      <Drawer
        className="w-full"
        placement={"left"}
        open={open}
        size={"full"}
        onClose={() => setOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Drawer Title</Drawer.Title>
          <Drawer.Actions></Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body className="w-full bg-slate-50 px-0 mx-0">
          <Link>Users</Link>
          <Nav className="flex flex-col w-full ">
            <Nav.Item eventKey="1" active icon={<DashboardIcon />}>
              Dashboard
            </Nav.Item>
            <Nav.Item eventKey="2" icon={<GroupIcon />}>
              User Group
            </Nav.Item>
          </Nav>
        </Drawer.Body>
      </Drawer>
    </div>
  );
}

export default MyDrawer;
