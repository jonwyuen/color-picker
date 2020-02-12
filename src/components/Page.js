import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../styles/Page.css";

const Page = ({ children, location }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <section className="page">{children}</section>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default Page;
