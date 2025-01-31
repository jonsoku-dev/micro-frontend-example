import { UserProfile } from "../type";
export type EventListener = () => void;
export declare const profileStore: {
    getProfile(): UserProfile;
    setProfile(userProfile: UserProfile): void;
    subscribe(listener: EventListener): () => void;
    getSnapshot(): UserProfile;
};
