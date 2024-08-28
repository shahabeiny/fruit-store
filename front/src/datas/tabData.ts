import { TabModel } from "../models/TabModel";


export const tabOrderDatas: TabModel[] = [
  { id: '1', name: 'جاری', nameEng: 'not_delivered', icon: 'HiOutlineTruck' },
  { id: '2', name: 'تحویل شده', nameEng: 'delivered', icon: 'HiOutlineCheckBadge' },
  { id: '3', name: 'تایید نشده', nameEng: 'not_confirmed', icon: 'HiOutlineArrowPath' },
  { id: '4', name: 'کنسل شده', nameEng: 'canceled', icon: 'HiOutlineArchiveBoxXMark' }
];

export const tabUserDatas: TabModel[] = [
  { id: '1', name: 'غیر مسدود', nameEng: 'nonbanned', icon: 'TbUserCheck' },
  { id: '2', name: 'مسدود شده', nameEng: 'banned', icon: 'RiUserForbidLine' },
  { id: '3', name: 'تایید نشده', nameEng: 'inactive', icon: 'LiaUserTimesSolid' },
];