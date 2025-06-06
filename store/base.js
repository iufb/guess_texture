
import { create } from 'zustand'
import { AppStates } from '../consts'

export const useLocation = create((set) => ({
    location: {
        base: AppStates.main,
        params: ""
    },
    setLocation: (newLocation, params) => set((state) => ({ location: { base: newLocation, params: params ? params : state.params } }))
}))
