import { create } from 'zustand'

export const useAuthStore = create((set) => ({
    auth: {
        userName: '',
    },
    setUserName: (name) => set((state) => ({ auth: { ...state.auth, userName: name } })),
}))

// export const useShopStore = create((set) => ({
//     auth: {
//         userName: '',
//     },
//     setUserName: (name) => set((state) => ({ auth: { ...state.auth, userName: name } }))
// }))