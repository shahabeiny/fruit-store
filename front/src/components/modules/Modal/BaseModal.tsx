"use client";

import React from "react";
import { useRef, useEffect } from "react";
import Icon from "../Icon/Icon";

type Props = {
  title: string;
  onHide: () => void;
  children: React.ReactNode;
};

export default function Dialog({ onHide, title, children }: Props) {
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  useEffect(() => {
    dialogRef.current?.showModal();
    const checkKey = (event: KeyboardEvent) => {
      if (event.keyCode === 27) {
        dialogRef.current?.close();
        onHide();
      }
    };
    window.addEventListener("keydown", checkKey);
    return () => window.removeEventListener("keydown", checkKey);
  });

  return (
    <dialog className="flex-center fixed inset-0 z-50  w-full h-screen bg-modal">
      <div className="w-[320px] sx:w-[350px] xs:max-w-[400px]  bg-white dark:bg-zinc-800 text-zinc-700 rounded-2xl flex flex-col overflow-hidden">
        <div className="relative max-h-[82vh]  md:max-h-[92vh] h-full overflow-auto shadow-normal p-2  dark:text-white">
          <div className="flex-x-center justify-start gap-x-2 mt-2 mb-4">
            <Icon
              nameIcon="HiMiniXMark"
              className="cursor-pointer hover:text-red-500"
              onClick={() => onHide()}
            />
            <span className="text-2xl text-zinc-700 dark:text-white">
              {title}
            </span>
          </div>

          {children}
        </div>
      </div>
    </dialog>
  );
}
