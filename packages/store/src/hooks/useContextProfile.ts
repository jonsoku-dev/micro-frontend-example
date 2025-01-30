import { useContext } from "react";
import { ProfileContext } from "../context/profileContext";

export function useContextProfile() {
    const { profile, setProfile } = useContext(ProfileContext);

    return {
        profile,
        setProfile
    }
}