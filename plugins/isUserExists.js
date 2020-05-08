import axios from "axios";

export default username => {
    return new Promise(resolve => {
        axios
            .get(
                `https://asia-northeast1-savannah-app.cloudfunctions.net/isUserExixts?username=${encodeURI(
          username
        )}`
            )
            .then(res => {
                resolve(res.data);
            });
    });
};