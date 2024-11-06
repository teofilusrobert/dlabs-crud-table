export type TUser = {
    id: number;
    name: string;
    email: string;
    age: number;
    isActive: boolean;
};

export type TUserFormData = {
    name: string;
    email: string;
    age: number | '';
    isActive: boolean;
};