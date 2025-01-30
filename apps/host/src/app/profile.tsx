import { useContextProfile, useProfile, useStoreProfile, } from '@custom-mfe/store';

export default function UserProfile() {
    const { data } = useProfile();
    const { get, set } = useStoreProfile();
    const { profile, setProfile } = useContextProfile();

    const storeProfile = get();

    return (
        <>
            <div>User Profile: {JSON.stringify(data)}</div>
            <div>Store User Profile: {JSON.stringify(storeProfile)}</div>
            <div>Context User Profile: {JSON.stringify(profile)}</div>
            <button type="button" onClick={() => {
                set({
                    id: crypto.randomUUID(),
                    name: 'Store Joe User'
                })
                setProfile({
                    id: crypto.randomUUID(),
                    name: 'Context Joe User'
                })
            }}>Mutate Store Profile</button>
        </>)
}
