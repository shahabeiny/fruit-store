"use client";
import Loading from "@/components/modules/Loadings/Loading/Loading";
import SectionTitle from "@/components/modules/SectionTitle/SectionTitle";
import UserModel from "@/models/UserModel";
import { useState, FC } from "react";
import dynamic from "next/dynamic";

const BaseModal = dynamic(
  () => import("@/components/modules/Modal/BaseModal"),
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

type props = {
  className?: string;
  user: UserModel | undefined;
};

const OrderItemUserModal: FC<props> = ({ className, user }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div
        className={`${className || ""}  flex-x-center`}
        onClick={() => setShowModal(true)}
      >
        <SectionTitle
          title="اطلاعات کاربر"
          className="text-basic md:text-lg cursor-pointer text-slate-400"
        />
      </div>

      {showModal && (
        <BaseModal title="اطلاعات خریدار" onHide={() => setShowModal(false)}>
          <div className="flex flex-col items-start gap-y-4 p-4">
            <SectionTitle
              nameIcon="HiOutlineUser"
              title={user?.username ?? ""}
              iconClassName="text-orange-300"
            />
            <SectionTitle
              nameIcon="HiOutlinePhone"
              title={user?.mobile ?? ""}
              iconClassName="text-orange-300 rotate-[270deg] "
            />
            <SectionTitle
              nameIcon="HiOutlineEnvelope"
              title={user?.email ?? ""}
              iconClassName="text-orange-300"
            />
            <SectionTitle
              nameIcon="HiOutlineMapPin"
              title={user?.address ?? ""}
              iconClassName="text-orange-300"
            />
          </div>
        </BaseModal>
      )}
    </>
  );
};

export default OrderItemUserModal;
