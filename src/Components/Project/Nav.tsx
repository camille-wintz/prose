import { Subtitle } from "../Common/Typography";
import { useProject } from "../../Hooks/useProject";
import { Chapters } from "./Chapters";
import { ProjectFiles } from "./ProjectFiles";
import { FiLayout } from "react-icons/fi";
import { useCurrentFile } from "../../Hooks/useCurrentFile";
import { NavLink } from "./NavComponents";
import styles from "./Nav.module.scss";

export const Nav = () => {
  const { openFile } = useCurrentFile();
  const { main } = useProject();

  return (
    <nav className={styles.container}>
      <h1 className={`text-2xl mb-1`}>Storms over Daggers</h1>
      <Subtitle className="text-white text-sm font-semibold text-content-1">
        {(main?.wordCount || 0) > 1000
          ? Math.round((main?.wordCount || 0) / 1000) + "k"
          : main?.wordCount}{" "}
        words
      </Subtitle>
      <section className="grow flex flex-col">
        <Chapters />
      </section>
      <section>
        <h2>
          <span>Story</span>
        </h2>
        <NavLink onClick={() => openFile("/Story Grid.storygrid")}>
          <FiLayout className="text-grey-4 mr-2" />
          Story Grid
        </NavLink>
      </section>
      <section className="grow flex flex-col">
        <ProjectFiles />
      </section>
    </nav>
  );
};
