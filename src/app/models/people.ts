

// it will store all the interface used in the app, not just interface for people


export interface People {
    _id: number;
    name: string;
    signed: boolean | null;
    signature: string | any;
}

export interface Address {
    _id: string;
    address: string;
    username: string;
    password?: string;

}
