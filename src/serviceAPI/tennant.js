import { getAuthToken } from "./cookies";
import { apiError, appendQueryParams, responseValidator, URL } from "./helper";

export const uploadFiles = async (file) => {
    const sanitizedBaseUrl = URL.replace(/\/admin$/, "");
    const endpoint = `${sanitizedBaseUrl}/upload/files`;
    const token = await getAuthToken();

    // Prepare form data
    const formData = new FormData();
    formData.append("files", file);

    const requestOptions = {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`, 
        },
        body: formData,
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        console.log("response",response)
        return responseValidator(response);
    } catch (error) {
        return apiError(error);
    }
};


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

export const getUsersIssue = async (payload) => {
    let endpoint = `${URL}/contact-us/all`;
    if(payload){
        const queryParams = appendQueryParams(payload);
        endpoint += queryParams;
    }
    

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

export const getOneUserIssue = async (id) => {
    let endpoint = `${URL}/contact-us/request/${id}`;
   
    

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

export const addNewCategory = async (payload) => {
    const endpoint = `${URL}/admin/tracker/strength-content`;
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        return responseValidator(response,true);
    } catch (error) {
        return apiError(error);
    }
};


export const getAllHabits = async () => {
    let endpoint = `${URL}/admin/tracker/habits`;
   
    

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

export const addNewHabit = async (payload) => {
    const endpoint = `${URL}/admin/tracker/habits`;
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        return responseValidator(response,true);
    } catch (error) {
        return apiError(error);
    }
};

export const deleteOneHabit = async (id) => {
    let endpoint = `${URL}/admin/tracker/habits/${id}`
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow"
    };


    try {
        const response = await fetch(`${endpoint}`, requestOptions);
        // console.log("RES--->",response)
        return responseValidator(response,true)

    } catch (error) {
        return apiError(error)
    }

}

export const editHabitName = async (payload,id) => {
    const endpoint = `${URL}/admin/tracker/habits/${id}`;
    const token = await getAuthToken();
    
    // Set up headers with authorization
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json"); // Specify JSON content type for PATCH requests

    // Define request options for PATCH
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(payload), // Convert `userData` to JSON for the body
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        console.log("Response",response)
        return responseValidator(response,true); // Validate response or handle accordingly
    } catch (error) {
        return apiError(error); // Handle API error
    }
};

export const getStrengthContent = async () => {
    let endpoint = `${URL}/admin/tracker/strength-content`;
   
    

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

export const addStrengthContent = async (payload) => {
    const endpoint = `${URL}/admin/tracker/strength-content`;
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json");

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(payload),
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        return responseValidator(response,true);
    } catch (error) {
        return apiError(error);
    }
};
// /admin/tracker/delete/excercise/67728c98e73f3a3931611fc2
export const deleteStrengthContent = async (id) => {
    let endpoint = `${URL}/admin/tracker/delete/excercise/${id}`
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow"
    };


    try {
        const response = await fetch(`${endpoint}`, requestOptions);
        // console.log("RES--->",response)
        return responseValidator(response,true)

    } catch (error) {
        return apiError(error)
    }

}

export const getSpecificStrengthContent = async (id) => {
    let endpoint = `${URL}/admin/tracker/category/${id}`;
   
    

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

export const editStrengthContent = async (payload) => {
    const endpoint = `${URL}/admin/tracker/update/muscle`;
    const token = await getAuthToken();
    
    // Set up headers with authorization
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json"); // Specify JSON content type for PATCH requests

    // Define request options for PATCH
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: JSON.stringify(payload), // Convert `userData` to JSON for the body
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        console.log("Response",response)
        return responseValidator(response,true); // Validate response or handle accordingly
    } catch (error) {
        return apiError(error); // Handle API error
    }
};

export const softDeleteMuscle = async (id) => {
    let endpoint = `${URL}/admin/tracker/delete/muscle/${id}`
    const token = await getAuthToken();
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
        method: "PUT",
        headers: myHeaders,
        redirect: "follow"
    };


    try {
        const response = await fetch(`${endpoint}`, requestOptions);
        // console.log("RES--->",response)
        return responseValidator(response,true)

    } catch (error) {
        return apiError(error)
    }

}
