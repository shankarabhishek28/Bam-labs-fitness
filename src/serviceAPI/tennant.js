import { getAuthToken } from "./cookies";
import { apiError, appendQueryParams, responseValidator, URL } from "./helper";

export const getUsersOverview = async () => {
    let endpoint = `${URL}/admin/users/overview`;
    // const queryParams = appendQueryParams(payload);
    // endpoint += queryParams;

    const token = await getAuthToken();
    console.log("Token",token)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        return responseValidator(response);
    } catch (error) {
        return apiError(error);
    }
};

export const getUsersAccount = async () => {
    let endpoint = `${URL}/admin/users/management`;
    // const queryParams = appendQueryParams(payload);
    // endpoint += queryParams;

    const token = await getAuthToken();
    console.log("Token",token)
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        return responseValidator(response);
    } catch (error) {
        return apiError(error);
    }
};