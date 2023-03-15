import Axios from "axios";
const URL = process.env.REACT_APP_API_URL;

class PlaneService {
    get() {
        return Axios.get(`${URL}/getPlanes`).then(response => {
            if(response.status === 200){
                return response.data;
            }
            else{
                throw new Error(response.statusText);
            }
        })
    }

    handleSimulator(isActivated) {
        return Axios.put(`${URL}/handleSimulator`, {isActivated});
    }

    handleDeadlock() {
        return Axios.get(`${URL}/handleDeadlock`);
    }
}
export default PlaneService;
