import { useCallback, useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Search } from "./IconsNav/Search";

const components = [
  {
    keyBind: (e: KeyboardEvent) => e.key === "f" && (e.metaKey || e.ctrlKey),
    icon: (props: any) => <FaSearch {...props} />,
    render: () => <Search />,
  },
];

export const IconsNav = () => {
  const [opened, setOpened] = useState(-1);

  const keyBinds = useCallback((e: KeyboardEvent) => {
    components.forEach((c, i) => {
      if (c.keyBind(e)) {
        setOpened(i);
      }
    });
    if (e.key === "Escape") {
      setOpened(() => -1);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyBinds);

    return () => document.removeEventListener("keydown", keyBinds);
  }, []);

  return (
    <div className="relative">
      <div
        className="bg-dark0 absolute shadow transition-all w-52 p-6"
        style={{
          opacity: opened === -1 ? 0 : 1,
          right: opened === -1 ? 0 : "100%",
        }}
      >
        {opened === -1 ? null : components[opened].render()}
      </div>
      <div className="bg-dark1">
        {components.map((c, i) =>
          c.icon({
            className: `transition-all h-6 w-6 ${
              opened === 0 ? "text-white" : "text-label"
            } hover:text-white m-6`,
            onClick: () => setOpened(i),
          })
        )}
      </div>
    </div>
  );
};
