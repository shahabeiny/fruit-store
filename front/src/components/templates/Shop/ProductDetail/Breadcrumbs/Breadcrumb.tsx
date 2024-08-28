import Link from "next/link";
import styles from "./Breadcrumb.module.css";
import Icon from "@/components/modules/Icon/Icon";
import { FC } from "react";

type BreadcrumbProps = {
  title?: string;
  nameIcon?: string;
  link?: string;
};

const Breadcrumb: FC<BreadcrumbProps> = ({ title, nameIcon, link }) => {
  return (
    <div className={styles.breadcrumb__item}>
      {link ? (
        <Link href={link} className={styles.breadcrumb__link}>
          {nameIcon ? (
            <Icon nameIcon={nameIcon} className="!size-5" />
          ) : (
            <span>{title}</span>
          )}
        </Link>
      ) : (
        <span className={styles.breadcrumb__link}>{title}</span>
      )}
    </div>
  );
};

export default Breadcrumb;
