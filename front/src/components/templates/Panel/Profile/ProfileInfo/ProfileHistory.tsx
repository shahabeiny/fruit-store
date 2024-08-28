import { memo, FC, useState } from "react";
import Icon from "@/components/modules/Icon/Icon";
import { useLazyGetLoginHistoriesQuery } from "@/redux/store/user/userSlice";
import Loading from "@/components/modules/Loadings/Loading/Loading";
import dynamic from "next/dynamic";

const ProfileHistoryModal = dynamic(() => import("./ProfileHistoryModal"), {
  ssr: false,
  loading: () => <Loading />,
});

const ProfileHistory: FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [trigger, { data = [], isLoading }, lastPromiseInfo] =
    useLazyGetLoginHistoriesQuery();

  return (
    <>
      <div className="absolute left-1.5 top-6 flex-x-center gap-x-2 cursor-pointer z-5">
        <Icon nameIcon="HiMiniArrowsRightLeft" className="!size-5" />
        <span
          onClick={() => {
            trigger();
            setShowModal(true);
          }}
        >
          تاریخچه ورود
        </span>
      </div>

      {data && showModal && (
        <ProfileHistoryModal
          histories={data}
          onHide={() => setShowModal(false)}
        />
      )}
    </>
  );
};

export default memo(ProfileHistory);
