

// it will store all the interface used in the app, not just interface for people


export interface People {
    id: number;
    name: string;
    signed: boolean | null;
    signature: string;
}

export interface Address {
    _id: string;
    address: string;
    username: string;
    password?: string;

}
