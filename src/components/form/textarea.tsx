import styles from "@/components/form/textarea.module.scss";

export const Textarea = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (val: string) => void;
}) => {
  return (
    <textarea
      className={styles.textarea}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};
