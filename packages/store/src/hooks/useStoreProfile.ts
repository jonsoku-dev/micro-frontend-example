import { useSyncExternalStore } from "react";
import { profileStore } from "../lib/store";

export function useStoreProfile() {
    useSyncExternalStore(profileStore.subscribe, profileStore.getSnapshot);
    return {
        get: profileStore.getProfile,
        set: profileStore.setProfile
    }
}