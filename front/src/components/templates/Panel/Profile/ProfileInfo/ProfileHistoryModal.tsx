import BaseModal from '@/components/modules/Modal/BaseModal';
import { UserHistoryModel } from '@/models/UserModel';
import { formatDate } from '@/utils/formatDate';
import { FC } from 'react';

type ProfileHistoryModalProps = {
  onHide: () => void;
  histories: UserHistoryModel[]|null;
};

const ProfileHistoryModal:FC<ProfileHistoryModalProps> = ({ histories, onHide }) => {
  return (
    <BaseModal onHide={onHide} title='تاریخچه ورود'>
    <div className='px-3'>
      {histories?.map((history) => (
        <div className="flex flex-col items-center  text-zinc-700 dark:text-white w-full py-2  border-b border-b-gray-200 dark:border-b-slate-500 last-of-type:border-none" key={history._id}>
          <div className='flex flex-col items-center gap-y-2'>
          <span className="text-xl/[32px] ">{formatDate(history.createdAt ?? '')}</span>
          <span className="text-base">({`آی پی : ${history.ip}`})</span>
          </div>
          <div className="flex items-center justify-between w-full mt-4 text-lg">
            <span className="" title={history.versionBrowser}>
              {history.browser??''}
            </span>
            <span  title={history.versionOs}>
              {history.os??''}  {history.versionOs??''}
            </span>
          </div>
        </div>
      ))}
    </div>
  </BaseModal>
  )
}

export default ProfileHistoryModal