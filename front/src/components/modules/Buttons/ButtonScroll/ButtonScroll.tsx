"use client";

import { useEffect, useState } from "react";
import ButtonCircle from "../ButtonCircle/ButtonCircle";

const ButtonScroll = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (
        window.scrollY > 120 &&
        !(
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 650
        )
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
  };

  return (
    <ButtonCircle
      onClick={scrollToTop}
      nameIcon={"HiMiniChevronUp"}
      className={`size-12 z-50
    bg-gray-300 dark:bg-zinc-900  ${isVisible ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default ButtonScroll;
