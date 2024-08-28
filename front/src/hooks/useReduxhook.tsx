import { AppDispatch, AppStore, RootState } from '@/redux/store'
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux'


// export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()