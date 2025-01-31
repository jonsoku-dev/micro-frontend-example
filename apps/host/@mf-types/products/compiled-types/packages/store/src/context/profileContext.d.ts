import { ReactNode } from 'react';
import { UserProfile } from '../type';
type ProfileContextType = {
    profile: UserProfile | null;
    setProfile: (profile: UserProfile) => void;
};
export declare const ProfileContext: import("react").Context<ProfileContextType>;
export declare function ProfileProvider({ children }: {
    children: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export {};
