import { UserProfile } from '../type';
export declare function useProfile(): {
    data: UserProfile | undefined;
    isPending: boolean;
    error: Error | null;
};
