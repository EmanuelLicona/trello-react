import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore/lite'
import { deleteDoc } from 'firebase/firestore/lite'
import { FirebaseDB } from '../firebase/config'
import { StoreRootState } from '../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { IWorkspace } from '../interfaces/IWorkspace'
import { addNewWorkspace, deleteWorkspace, setCurrentWorkspace, setWorkspaces } from '../store/workspace/workspaceSlice'

export const useWorkspaceStore = () => {

  const dispatch = useDispatch()
  const { currentWorkspace, workspaces } = useSelector((state: StoreRootState) => state.workspace)
  const { user } = useSelector((state: StoreRootState) => state.auth)

  const saveNewWorkspace = async (title: string, description: string) => {
    try {

      const { uid } = user

      const workspace = {
        title,
        description,
        createdAt: new Date().getTime(),
        updateAt: new Date().getTime()
      }

      const newDoc = doc(collection(FirebaseDB, `${uid}/app/workspaces`)) // Reference
      await setDoc(newDoc, workspace)

      dispatch(addNewWorkspace({ ...workspace, workspaceId: newDoc.id }))

    } catch (error) {
      console.log(error)
    }
  }

  const startLoadingWorkspace = async () => {
    try {
      const { uid } = user
      if (!uid) throw new Error('User not logged in')

      const collectionRef = collection(FirebaseDB, `${uid}/app/workspaces`)
      const docs = await getDocs(collectionRef)

      const workspaces: IWorkspace[] = []
      docs.forEach(doc => {
        const { title, description, createdAt, updateAt, boards = [] } = doc.data()
        workspaces.push({ workspaceId: doc.id, title, description, createdAt, updateAt, boards })
      })


      dispatch(setWorkspaces(workspaces))

    } catch (error) {
      console.log(error)
    }
  }

  const startDeleteWorkspace = async (workspaceId: string) => {
    try {

      const { uid } = user
      if (!uid) throw new Error('User not logged in')

      const docRef = doc(FirebaseDB, `${uid}/app/workspaces/${workspaceId}`)
      await deleteDoc(docRef)

      dispatch(deleteWorkspace(workspaceId))
    } catch (error) {
      console.log(error)
    }
  }

  const selectCurrentWorkspace = (workspaceId: string) => {
    const workspace = workspaces.find(workspace => workspace.workspaceId === workspaceId)
    if (!workspace) throw new Error('Workspace not found')
    dispatch(setCurrentWorkspace({ ...workspace }))
  }

  const startUpdateWorkspace = async (workspace: IWorkspace) => {
    try {
      const { uid } = user
      if (!uid) throw new Error('User not logged in')

      const docRef = doc(FirebaseDB, `${uid}/app/workspaces/${workspace.workspaceId}`)
      await updateDoc(docRef, { ...workspace})

    } catch (error) {
      console.log(error)
    }
  }

  return {
    workspaces,
    currentWorkspace,

    startLoadingWorkspace,
    saveNewWorkspace,
    startDeleteWorkspace,

    selectCurrentWorkspace,
    startUpdateWorkspace
  }
}