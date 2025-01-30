import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { UserProfile } from '../type';

type ProfileContextType = {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
}

export const ProfileContext = createContext<ProfileContextType>({
    profile: null,
    setProfile: () => { }
});

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfileState] = useState<UserProfile>(() => ({
        id: crypto.randomUUID(),
        name: 'Joe User'
    }));

    const setProfile = useCallback((newProfile: UserProfile) => {
        setProfileState({
            ...newProfile
        });
    }, []);

    return (
        <ProfileContext.Provider value={{ profile, setProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}