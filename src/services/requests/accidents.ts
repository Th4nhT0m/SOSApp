import { axiosInstance } from '../../../../SOSApp/src/services/axios-config.service';
import { AccidentsPros } from '../../../../SOSApp/src/services/requests/types';
import { UrgentPros } from './types';

async function creatAccident(props: AccidentsPros) {
    return await axiosInstance
        .post('/accidents', {
            nameAccidents: props.nameAccidents,
            status: props.status,
            content: props.content,
            locationName: props.locationName,
            latitude: props.latitude,
            longitude: props.longitude,
            user: props.user,
            people: props.people,
        })
        .catch((error) => {
            return error;
        });
}
async function creatUrgentAccident(props: UrgentPros) {
    return await axiosInstance
        .post('/accidents/Urgent', {
            locationName: props.locationName,
            latitude: props.latitude,
            longitude: props.longitude,
            user: props.user,
        })
        .catch((error) => {
            return error;
        });
}

export const AccidentsRequest = {
    creatAccident,
    creatUrgentAccident,
};
