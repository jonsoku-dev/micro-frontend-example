
    export type RemoteKeys = 'products/RemoteButton' | 'products/Types';
    type PackageType<T> = T extends 'products/Types' ? typeof import('products/Types') :T extends 'products/RemoteButton' ? typeof import('products/RemoteButton') :any;