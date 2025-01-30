import { UserProfile } from "../type";

export type EventListener = () => void;

let profile: UserProfile;
let listeners: EventListener[] = [];

export const profileStore = {
  getProfile() {
    if (!profile) {
      profile = {
        id: crypto.randomUUID(),
        name: 'Joe User'
      }
    }
    return profile;
  },
  setProfile(userProfile: UserProfile) {
    profile = {
      ...userProfile
    };
    emitChange();
  },
  subscribe(listener: EventListener) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },
  getSnapshot() {
    return profile;
  }
};

function emitChange() {
  for (let listener of listeners) {
    listener();
  }
}
