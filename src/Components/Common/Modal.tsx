import React, { ReactNode } from "react";
import { CSSTransition } from "react-transition-group";
import styles from "@/components/common/modal.module.scss";
import PlantsImageSource from "@/assets/plants.svg";

export const Modal = ({
  title,
  children,
  show,
  onDismiss,
}: {
  title?: string;
  children: ReactNode;
  show: boolean;
  onDismiss: () => void;
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
        <div className={styles.backdrop} onClick={() => onDismiss()}>
          <div className={styles.plants}>
            <img src={PlantsImageSource} alt="Plants" />
          </div>
        </div>

        <div className={styles.modal}>
          {title ? (
            <h2 className="font-display text-center text-xl mb-4">{title}</h2>
          ) : null}
          <div>{children}</div>
        </div>
      </div>
    </CSSTransition>
  );
};

export const ModalButtons = ({ children }: { children: React.ReactNode }) => {
  return <footer className={styles.footer}>{children}</footer>;
};
