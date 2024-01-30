import React from "react";
import { router } from "./router";
import { router as adminRouter } from "./router_admin";
import { RouterProvider } from "react-router-dom";
import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

function App() {
  // let host = window.location.hostname;
  // let protocol = window.location.protocol;
  // let parts = host.split(".");
  // let subdomain = "";
  // // If we get more than 3 parts, then we have a subdomain
  // // INFO: This could be 4, if you have a co.uk TLD or something like that.
  // if (parts.length >= 2) {
  //   subdomain = parts[0];
  //   console.log(subdomain);
  //   // Remove the subdomain from the parts list
  //   // parts.splice(0, 1);
  //   // Set the location to the new url
  //   // window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
  // }
  return (
    <div>
      <ReactNotifications />
      <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />
    </div>
  );
}
  // subdomain === "admin" ? (
  //   <div>
  //     <ReactNotifications />
  //     <RouterProvider
  //       router={adminRouter}
  //       fallbackElement={<p>Loading...</p>}
  //     />
  //   </div>
  // ) :
  

export default App;
