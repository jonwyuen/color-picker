import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import "../styles/Page.css";

const Page = ({ location, children }) => {
  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={500}>
        <section className="page">{children}</section>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default React.memo(Page);
