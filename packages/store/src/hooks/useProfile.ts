import { useQuery } from '@tanstack/react-query';
import { storeQueryClient } from '../lib/react-query';
import { UserProfile } from '../type';

async function fetchProfile() {
    return new Promise<UserProfile>((resolve, reject) => {
        resolve({
            id: crypto.randomUUID(),
            name: 'Joe User'
        } satisfies UserProfile);
    })
}

export function useProfile() {
    const { data, isPending, error } = useQuery({ queryKey: ['profile'], queryFn: fetchProfile }, storeQueryClient);

    return {
        data,
        isPending,
        error
    }
}