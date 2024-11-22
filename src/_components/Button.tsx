import React from "react";
import styles from "../styles/pages/movieList.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,

  type,
  ...props
}) => {
  return (
    <button
      className={`${styles["btn"]} ${styles["btn--animated"]}`}
      onClick={onClick}
      {...props}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
