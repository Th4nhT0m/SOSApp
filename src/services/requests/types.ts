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
    nameAccident?: string;
    accidentType?: string;
    description?: string;
    latitude: string;
    longitude: string;
}

export interface UrgentProps {
    locationName?: string;
    latitude: string;
    longitude: string;
    user?: string;
}
export interface AccidentsPatch {
    status: string;
    latitude: string;
    longitude: string;
}

export interface Accidents {
    id: string;
    status?: string;
    nameAccident: string;
    description: string;
    accidentType: string;
    latitude: string;
    longitude: string;
    created_by?: HelperByUserId;
    modified_by?: string;
    createTime?: Date;
    UpdateTime?: Date;
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

/// Create Helper
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
export interface HelperByUserId {
    id: string;
    numberPhone: string;
    name: string;
    address: string;
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

//get Helper
export interface Helpers {
    id: string;
    user?: HelperByUserId;
    accident: string;
    status: string;
    helperLatitude: string;
    helperLongitude: string;
    accidentLatitude: string;
    accidentLongitude: string;
    content: string;
    timeOut: Date;
    createTime: Date;
    UpdateTime: Date;
}

// get handbook
export interface Handbook {
    id: string;
    content: string;
    nameHandbook: string;
    severity: string;
    icon: string;
    utensil: string;
}
