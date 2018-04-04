

// it will store all the interface used in the app, not just interface for people


export interface People {
    _id: number;
    name: string;
    present: boolean | null;
    sign: string | any;
    note?:string;
}

export interface Address {
    _id: string;
    address: string;
    username: string;
    password?: string;

}

export interface Teacher {
    _id: string;
    teacher: string;
    username: string;
    password?: string;

}
