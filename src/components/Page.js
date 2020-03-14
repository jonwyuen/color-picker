import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "../styles/Page.css";

const Page = ({ children }) => {
  const location = useLocation();
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <section className="page">{children}</section>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Page;
