import { ReactNode } from "react";
import styles from "./SectionHeading.module.css";

interface SectionHeadingProps {
  children: ReactNode;
  subtitle?: string;
  size?: "md" | "lg" | "xl";
  className?: string;
}

export default function SectionHeading({
  children,
  subtitle,
  size = "md",
  className,
}: SectionHeadingProps) {
  return (
    <div className={`${styles.wrap} ${className ?? ""}`}>
      <h2 className={`${styles.heading} ${styles[size]}`}>{children}</h2>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
