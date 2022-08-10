import { useClickOutside } from "@react-hookz/web";
import React, { useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

export const DotsMenu = ({ children }: { children: React.ReactNode }) => {
  const container = useRef(null);
  const [opened, setOpened] = useState(false);

  useClickOutside(container, () => setTimeout(() => setOpened(false), 100));

  return (
    <div ref={container} className="relative">
      <FiMoreVertical
        onClick={() => setOpened(!opened)}
        className="text-pink h-6 w-6 ml-auto cursor-pointer hover:text-blue transition-all"
      />
      <div
        className={`absolute transition-all shadow-sm rounded-sm overflow-hidden top-0 right-0 ${
          opened ? "w-[280px] opacity-100" : "w-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

DotsMenu.Item = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <div
      className="px-6 py-2 bg-white hover:bg-grey1 cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
