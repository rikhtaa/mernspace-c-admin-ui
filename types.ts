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
    tenant: Tenant | null
};

export type CreateUserData ={
    email: string
    firstName: string
    lastName: string;
    password: string
    role: string
    tenantId: number
}

export type Tenant = {
    id: string;
    name: string;
    address: string;
};

export type CreateTenant ={
    name: string;
    address: string;
}

export type FieldData = {
    name: string[]
    value?: string
}
