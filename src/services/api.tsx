import { UserData } from "../models/UserData";





const FIREBASE_DOMAIN = "https://testingreact-ec899-default-rtdb.firebaseio.com";


export async function userSignUp(userInfo: UserData) {
    const response = await fetch(`${FIREBASE_DOMAIN}/PollUsers.json`);
    const data = await response.json();
    for (const key in data) {
        if (data[key]["email"] === userInfo.email) {
            return "exists";
        }
    };

    const response1 = await fetch(`${FIREBASE_DOMAIN}/PollUsers.json`, {
        method: "POST",
        body: JSON.stringify(userInfo),
        headers: {
            "Content-Type": "application/json",
        },
    });
    //const data1 = await response1.json();

    if (!response1.ok) {
        return "error";
    }

    return "success";
}

export async function userLogin(loginInfo: any): Promise<any> {
    const response = await fetch(`${FIREBASE_DOMAIN}/PollUsers.json`);
    const data = await response.json();
    for (const key in data) {
        if (data[key]["email"] === loginInfo.email && data[key]["password"] === loginInfo.password) {
            let userDataObject: UserData = {
                email: data[key]["email"],
                id: key,
                firstName: data[key]["firstName"],
                lastName: data[key]["lastName"],
                role: data[key]["role"],
            }
            return { userDataObject };
        }
    };
    return "not found";
}
