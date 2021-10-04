export interface ObtainTokenProps {
    email: string;
    password: string;
}
export interface LogoutTokenPors {
    token: string;
}
export interface Email {
    email: string;
}

export interface Password {
    password: string;
}

export interface SignUpProps {
    name: string;
    email: string;
    password: string;
    identityCard: string;
    numberPhone: string;
    address: string;
    sex: 'male' | 'female' | 'other';
    dob: Date;
}
export interface LoginInProps {
    email: string;
    password: string;
}
