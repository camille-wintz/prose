import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "../Styles/Modal.module.scss";

export const Modal = ({
  title,
  children,
  show,
}: {
  title: string;
  children: ReactNode;
  show: boolean;
}) => {
  return (
    <CSSTransition
      timeout={500}
      in={show}
      mountOnEnter
      unmountOnExit
      classNames={{
        enterActive: styles.modalEnter,
        enterDone: styles.modalEnterActive,
        exitActive: styles.modalExit,
        exitDone: styles.modalExitActive,
      }}
    >
      <div className="z-10 fixed h-screen w-screen left-0 top-0 flex items-center justify-center">
        <div className="fixed dark-blue-to-purple cursor-pointer w-screen h-screen opacity-95"></div>
        <div
          className={`bg-dark1 relative text-white p-8 rounded-md shadow-lg w-450`}
        >
          <h2 className="font-display text-center text-xl mb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
