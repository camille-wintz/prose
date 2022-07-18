import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "@/Components/Modal.module.scss";

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
      appear={true}
      mountOnEnter
      unmountOnExit
      classNames={styles}
    >
      <div className="opacity-1 z-10 fixed h-screen w-screen left-0 top-0 flex items-center justify-center transition-all">
        <div className={styles.backdrop}></div>
        <div className={styles.modal}>
          <h2 className="font-display text-center text-xl mb-4">{title}</h2>
          <div>{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};
