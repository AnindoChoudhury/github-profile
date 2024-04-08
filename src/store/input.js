import { atom } from "recoil"
const storedUsernameInLocaleStorage = window.localStorage.getItem("username")
export const usernameAtom = atom({
    key : "usernameAtom",
    default : storedUsernameInLocaleStorage
})