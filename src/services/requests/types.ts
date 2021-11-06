// authentication
export interface ObtainTokenProps {
    email: string;
    password: string;
}
export interface LogoutTokenProps {
    refreshToken: string;
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

// Accident
export interface AccidentsProps {
    nameAccidents: string;
    status: string;
    content: string;
    locationName: string;
    latitude: string;
    longitude: string;
    user: string;
    people: string;
}
export interface UrgentProps {
    locationName?: string;
    latitude: string;
    longitude: string;
    user?: string;
}

// update User info
export interface EditUserProps {
    name: string;
    identityCard: string;
    numberPhone: string;
    address: string;
    //sex: string;
    // dob: Date;
}

// change passwork
export interface ChangePassProps {
    password: string;
}
