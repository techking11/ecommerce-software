import httpClient from "./httpclient";

const END_POINT = "/api/users";

export const login = ( payload ) => {
    httpClient.post(END_POINT + "/login", payload, {
        headers: {
            "Content-Type": "application/json",
        },
    })
};

export const register = ( payload ) => {
    httpClient.post(END_POINT + "/register", payload, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}