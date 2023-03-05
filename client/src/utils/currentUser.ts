export interface CurrentUser {
    userId: number;
    username: string;
}

export type User = Required<CurrentUser>;



