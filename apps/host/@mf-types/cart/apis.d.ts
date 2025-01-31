
    export type RemoteKeys = 'cart/Types' | 'cart/CartRouter' | 'cart/CartPage';
    type PackageType<T> = T extends 'cart/CartPage' ? typeof import('cart/CartPage') :T extends 'cart/CartRouter' ? typeof import('cart/CartRouter') :T extends 'cart/Types' ? typeof import('cart/Types') :any;