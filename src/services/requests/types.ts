

export interface ObtainTokenProps {
    email: string;
    password: string;
}
export interface LogoutTokenProps {
    token: string;
}
export interface ForgotPasswordProps {
    email: string;
}

export interface ResetPasswordProps {
    password: string;
}

export interface SignUpProps {
    name: string;
    email: string;
    password: string;
    identityCard: string;
    numberPhone: string;
    address: string;
    sex: string;
    dob: Date;
}
export interface LoginInProps {
    email: string;
    password: string;
}

export interface AccidentsPros {
    nameAccidents: string;
    status: string;
    content: string;
    locationName: string;
    latitude: string;
    longitude: string;
    user: string;
    people: string;
}
export interface UrgentPros {
    locationName: string;
    latitude: string;
    longitude: string;
    user: string;
}
