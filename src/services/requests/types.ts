export interface ObtainTokenProps {
    email: string;
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
