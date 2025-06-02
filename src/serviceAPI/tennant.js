import { getAuthToken } from "./cookies";
import { apiError, appendQueryParams, responseValidator, URL } from "./helper";

export const forgotPassword = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };
  
    try {
      const response = await fetch(URL + `/admin/forgot-password`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };
  
  //reset-password
  export const resetPassword = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");
  
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };
  
    try {
      const response = await fetch(URL + `/admin/reset-password`, requestOptions);
      return responseValidator(response, true);
    } catch (e) {
      return apiError(e);
    }
  };

  export const deactivateUser = async (userId) => {
    const endpoint = `${URL}/admin/users/status/${userId}?action=block&`;
    const token = await getAuthToken();
    
    // Set up headers with authorization
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json"); // Specify JSON content type for PATCH requests

    // Define request options for PATCH
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
       // Convert `userData` to JSON for the body
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        console.log("Response",response)
        return responseValidator(response,false); // Validate response or handle accordingly
    } catch (error) {
        return apiError(error); // Handle API error
    }
};
export const deleteIssue = async (id) => {
    let endpoint = `${URL}/contact-us/delete/${id}`
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
export const suspendUser = async (userId) => {
    const endpoint = `${URL}/admin/users/status/${userId}?action=softDelete&`;
    const token = await getAuthToken();
    
    // Set up headers with authorization
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json"); // Specify JSON content type for PATCH requests

    // Define request options for PATCH
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
       // Convert `userData` to JSON for the body
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        console.log("Response",response);
        return responseValidator(response,false); // Validate response or handle accordingly
    } catch (error) {
        return apiError(error); // Handle API error
    }
};
export const verify = async (userId,verifyType) => {
    const endpoint = `${URL}/admin/users/verify/${userId}?verifyType=${verifyType}`;
    const token = await getAuthToken();
    
    // Set up headers with authorization
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json"); // Specify JSON content type for PATCH requests

    // Define request options for PATCH
    const requestOptions = {
        method: "PATCH",
        headers: myHeaders,
       // Convert `userData` to JSON for the body
        redirect: "follow"
    };

    try {
        const response = await fetch(endpoint, requestOptions);
        console.log("Response",response);
        return responseValidator(response,false); // Validate response or handle accordingly
    } catch (error) {
        return apiError(error); // Handle API error
    }
};
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

export const registerNewUser = async (payload) => {
    const endpoint = `${URL}/auth/register-user`;
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

export const getMetrices = async () => {
    let endpoint = `${URL}/admin/dashboard/user-stats`;
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
export const getSubsStat = async () => {
    let endpoint = `${URL}/admin/dashboard/subscription-stats`;
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
export const getUsersSubscribed = async (payload) => {
    let endpoint = `${URL}/admin/dashboard/user-subscriptions`;
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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
export const getAllSubscription = async () => {
    let endpoint = `${URL}/admin/dashboard/subscriptionDetails`;
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

export const getHabitStat = async () => {
    let endpoint = `${URL}/admin/dashboard/habbit-stats`;
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

export const getExerciseStats = async () => {
    let endpoint = `${URL}/admin/dashboard/excercise-activity`;
    // const queryParams = appendQueryParams(payload);
    // endpoint += queryParams;

    const token = await getAuthToken();
    
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

export const getUserSignupStats = async (payload) => {
    let endpoint = `${URL}/admin/dashboard/signup-summary`;
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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

export const getTimeSpentStats = async (payload) => {
    let endpoint = `${URL}/admin/dashboard/user-activity`;
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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

export const getAgeGenderStats = async () => {
    let endpoint = `${URL}/admin/dashboard/age-gender-distribution`;
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


export const getUsersOverview = async (payload) => {
    let endpoint = `${URL}/admin/users/overview`;
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
//admin/users/user/677e4dffdb67cb2b6b222f72

export const getUserDetails = async (userId) => {
    let endpoint = `${URL}/admin/users/user/${userId}`;
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

export const getSessionDetails = async (userId,payload) => {
    let endpoint = `${URL}/admin/users/session/${userId}`;
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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
export const getUsersAccount = async (payload) => {
    let endpoint = `${URL}/admin/users/management`;
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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

export const getPrevIssue = async (userId) => {
    let endpoint = `${URL}/contact-us/prevcomplaints?userId=${userId}`;
    // if(payload){
    //     const queryParams = appendQueryParams(payload);
    //     endpoint += queryParams;
    // }
    

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
export const postReply = async (payload,id) => {
    const endpoint = `${URL}/contact-us/reply/${id}`;
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


export const getAllHabits = async (payload) => {
    let endpoint = `${URL}/admin/tracker/habits`;
   
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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
    let endpoint = `${URL}/admin/tracker/delete/${id}`
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
        return responseValidator(response,false)

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

export const addMuscleForCategory = async (payload) => {
    const endpoint = `${URL}/admin/tracker/add-muscle`;
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

export const addExcerciseForAMuscle = async (payload) => {
    const endpoint = `${URL}/admin/tracker/muscle/exercise`;
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

export const deleteExcercise = async (id) => {
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
export const deleteMuscle = async (id) => {
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

export const getAllContent = async () => {
    let endpoint = `${URL}/content`;
   
    

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

export const getContentById = async(id) => {
    let endpoint = `${URL}/content/${id}`;
   
    

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
}

export const updateContent = async (id,payload) => {
    const endpoint = `${URL}/content/${id}`;
    const token = await getAuthToken();
    
    // Set up headers with authorization
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    myHeaders.append("Content-Type", "application/json"); // Specify JSON content type for PATCH requests

    // Define request options for PATCH
    const requestOptions = {
        method: "PUT",
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

export const getNotification = async (payload) => {
    let endpoint = `${URL}/notification`;
    const queryParams = appendQueryParams(payload);
    endpoint += queryParams;

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

export const addNewNotification = async (payload) => {
    const endpoint = `${URL}/notification`;
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

export const deleteNotification = async (id) => {
    let endpoint = `${URL}/notification/${id}`
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

