import { useSelector } from 'react-redux'
import { StoreRootState } from '../store/store'

export const useWorkspaceStore = () => {

  // const dispatch = useDispatch()
  const {currentWorkspace} = useSelector((state: StoreRootState) => state.workspace)

  return {
    currentWorkspace
  }
}