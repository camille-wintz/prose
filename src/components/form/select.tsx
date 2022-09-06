import { MdKeyboardArrowDown } from "react-icons/md";
import styles from "@/components/form/select.module.scss";
import { useRef, useState } from "react";
import { useClickOutside } from "@react-hookz/web";

export const Select = <T extends any>({
  options,
  value,
  onChange,
  label,
  renderOption = (o) => o as string,
  className = "",
}: {
  options: T[];
  value?: T;
  label: string;
  onChange: (val: T) => void;
  renderOption?: (o: T) => React.ReactNode;
  className?: string;
}) => {
  const container = useRef(null);
  const [opened, setOpened] = useState(false);

  useClickOutside(container, () => setTimeout(() => setOpened(false), 100));

  return (
    <div className={`${styles.container} ${className}`} ref={container}>
      <div className={styles.value} onClick={() => setOpened(true)}>
        {value ? renderOption(value) : label} <MdKeyboardArrowDown />
      </div>
      <div className={`${styles.list} ${opened ? styles.opened : ""}`}>
        {options.map((o) => (
          <div onClick={() => onChange(o)}>{renderOption(o)}</div>
        ))}
      </div>
    </div>
  );
};
