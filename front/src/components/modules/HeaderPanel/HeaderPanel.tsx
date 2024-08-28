"use client";
import { FC } from "react";
import LightToggleHeader from "../LightToggleHeader/LightToggleHeader";
import { selectCurrentUser } from "@/redux/store/auth/authSlice";
import { useAppSelector } from "@/hooks/useReduxhook";
import Avatar from "../Avatar/Avatar";

type HeaderPanelProps = {
  className?: string;
};

const HeaderPanel: FC<HeaderPanelProps> = ({ className }) => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <header
      className={`hidden  md:flex items-center justify-between h-18 dark:bg-transparent bg-transparent mb-10 ${
        className || ""
      }`}
    >
      <h3 className="block font-DanaDemiBold text-2xl text-zinc-700 dark:text-white">
        <span className="hidden lg:inline-block">
          {user?.username ?? ""} عزیز؛{" "}
        </span>
        <span>خوش اومدی 🎉</span>
      </h3>

      <div className="flex gap-x-7">
        <div className="toggle-theme flex items-center justify-center size-14 rounded-full bg-white dark:bg-zinc-800 cursor-pointer transition-colors">
          <LightToggleHeader
            className="py-0 flex-center"
            iconClassName="size-8 dark:text-orange-300"
          />
        </div>
        {/* <!-- User Links Dropdown --> */}
        <div className="relative group flex-x-center" id="user-profile">
          {/* <!-- User Picture --> */}
          <div className="user-profile">
            <Avatar
              src={user?.avatar ?? ""}
              alt={user?.username}
              className={`size-14`}
            />
          </div>
          {/* <!-- When Click Box Showing --> */}
          <div
            className="hide absolute left-0 top-full pt-4 z-10 transition-all"
            id="user-profile-dropdown"
          ></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderPanel;
