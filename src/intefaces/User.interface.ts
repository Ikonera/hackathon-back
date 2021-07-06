export interface UserI {
    _id: string;
    name: string;
    email: string;
    password?: string;
    token?: string;
    happyFacesNumber: number;
    createdAt: string;
    updatedAt: string;
    __v?: number;
}
