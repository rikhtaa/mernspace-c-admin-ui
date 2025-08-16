export type Credentails={
    email: string
    password: string
}

export type User = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
    tenant: Tenant | null;
};

export type Tenant = {
    id: number;
    name: string;
    address: string;
};