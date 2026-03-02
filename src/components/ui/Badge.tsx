import { ReactNode } from "react";
import styles from "./Badge.module.css";

interface BadgeProps {
  variant?: "solid" | "outline" | "filled";
  children: ReactNode;
}

export default function Badge({ variant = "outline", children }: BadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]}`}>
      {children}
    </span>
  );
}
