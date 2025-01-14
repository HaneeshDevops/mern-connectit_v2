import React, { useState, useEffect } from "react";

import { useHistory, useLocation } from "react-router-dom";
import Chat from "../../../Chat/chat";

import "./leftSideProfilePage.css";

const LeftSideProfilePage = () => {
  const history = useHistory();

  const isChatPage = useLocation().pathname === "/chats";

  const [isScreenBelowMd, setIsScreenBelowMd] = useState(false);
  const [winHeight, setWinHeight] = useState(window.outerHeight);
  const [winWidth, setWinWidth] = useState(window.outerWidth);

  // Get the Win Height & Width when the Win size changes
  // and remove the event - resize when page is unmounted
  useEffect(() => {
    const handleResize = () => {
      setWinHeight(window.outerHeight);
      setWinWidth(window.outerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Set the boolean if the Win size is reduced below md
  useEffect(() => {
    if (winHeight <= 1080 && winWidth <= 758) {
      setIsScreenBelowMd(true);
    } else {
      setIsScreenBelowMd(false);
    }
  }, [winHeight, winWidth]);

  // set spanProps in the Message span tag only if Win size is above sm
  let spanProps = {};
  if (!isScreenBelowMd)
    spanProps = {
      "data-bs-toggle": "offcanvas",
      "data-bs-target": "#offcanvasWithBothOptions",
      "aria-controls": "offcanvasWithBothOptions",
    };

  const handleHome = () => {
    history.push("/");
  };

  const handleSearch = () => {
    history.push("/search");
  };

  const handleMessages = () => {
    // Push to path only if not a Chat page and Win is below md
    isChatPage || (isScreenBelowMd && history.push("/chats"));
  };

  const handleNotification = () => {
    history.push("/notification");
  };

  const handleSettings = () => {
    history.push("/profile/settings");
  };

  return (
    <>
      <div className="">
        <div className="nav flex-sm-row flex-md-column justify-content-between customMargin2 customFontSideNav">
          <li className="nav-item p-2 text-dark">
            <span onClick={handleHome} className="sideNavButton">
              <i className="bi bi-house-door-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Home
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span
              className="sideNavButton"
              data-bs-toggle="modal"
              data-bs-target="#createModal"
            >
              <i className="bi bi-plus-circle-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Create
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleSearch} className="sideNavButton">
              <i className="bi bi-search"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Search
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span
              className="sideNavButton"
              {...(isChatPage || spanProps)}
              onClick={handleMessages}
            >
              <i className="bi bi-chat-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Messages
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleNotification} className="sideNavButton">
              <i className="bi bi-bell-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Notification
              </h6>
            </span>
          </li>
          <li className="nav-item p-2 text-dark">
            <span onClick={handleSettings} className="sideNavButton">
              <i className="bi bi-gear-fill"></i>{" "}
              <h6 className="d-lg-inline-block d-none d-sm-none d-md-none">
                Settings
              </h6>
            </span>
          </li>
        </div>
      </div>
      <Chat handleMessages={handleMessages} />
    </>
  );
};

export default LeftSideProfilePage;
