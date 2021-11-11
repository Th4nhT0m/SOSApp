// authentication
export interface ObtainTokenProps {
    email: string;
    password: string;
}
export interface LogoutTokenProps {
    refreshToken: string;
}

// token forgot password
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

export interface Accidents {
    id: string;
    nameAccident: string;
    description: string;
    latitude: string;
    longitude: string;
    created_by: string;
    modified_by: string;
    accidentType: string;
    timeStart: Date;
}

export interface DetailAccidents {
    id: string;
    user: string;
    accident: string;
    status: string;
    latitude: string;
    longitude: string;
    content: string;
    timeOut: Date;
}
export interface patchDetailProps {
    status: string;
    content: string;
    timeOut: string;
    latitude: string;
    longitude: string;
}

export interface DetailAccidentsProps {
    accident: string;
    user: string;
    latitude: string;
    longitude: string;
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

/// Create Hepler

export interface HelpProps {
    accident: string;
    user: string;
    helperLatitude: string;
    helperLongitude: string;
    accidentLatitude: string;
    accidentLongitude: string;
}
//Patch Helper
export interface PatchHelper {
    status: string;
    timeOut: Date;
    helperLatitude: string;
    helperLongitude: string;
    accidentLatitude: string;
    accidentLongitude: string;
}
//get Helper

export interface Helper {
    id: string;
    user: string;
    accident: string;
    status: string;
    helperLatitude: string;
    helperLongitude: string;
    accidentLatitude: string;
    accidentLongitude: string;
    content: string;
    timeOut: Date;
}
