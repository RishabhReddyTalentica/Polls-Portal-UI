import { Poll } from "../models/Poll";
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

export async function createPoll(pollData: Poll) {
    const response1 = await fetch(`${FIREBASE_DOMAIN}/Polls.json`, {
        method: "POST",
        body: JSON.stringify(pollData),
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

export async function updatePoll(pollData: Poll) {
    const polls: any = await fetchAllPolls();
    const index = polls.findIndex((poll: Poll) => {
        return poll.id === pollData.id
    });
    polls[index].status = "closed";
    const response1 = await fetch(`${FIREBASE_DOMAIN}/Polls.json`, {
        method: "PUT",
        body: JSON.stringify(polls),
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

export async function userPollSubmitted(submittedData: any) {
    const response1 = await fetch(`${FIREBASE_DOMAIN}/UsersPollsSubmitted.json`, {
        method: "POST",
        body: JSON.stringify(submittedData),
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

export async function fetchUserSubmittedPolls(userId: any) {
    const response = await fetch(`${FIREBASE_DOMAIN}/UsersPollsSubmitted.json`);
    const data = await response.json();
    if (!response.ok) {
        return "error";
    }
    let submittedPolls: any[] = [];
    for (const key in data) {
        if (data[key]["user"] === userId) {
            submittedPolls.push(data[key]);
        }
    }
    return submittedPolls;
}

export async function fetchClosedPolls(pollId: any) {
    const response = await fetch(`${FIREBASE_DOMAIN}/UsersPollsSubmitted.json`);
    const data = await response.json();
    if (!response.ok) {
        return "error";
    }
    let closedPolls: any[] = [];
    for (const key in data) {
        if (data[key]["poll"] === pollId) {
            closedPolls.push(data[key]);
        }
    }
    return closedPolls;
}

export async function fetchAllPolls(): Promise<Poll[] | string> {
    const response = await fetch(`${FIREBASE_DOMAIN}/Polls.json`);
    const data = await response.json();
    if (!response.ok) {
        return "error";
    }
    let polls: Poll[] = [];
    for (const key in data) {
        let pollObject: Poll =
        {
            questions: data[key]["questions"],
            id: data[key].id ? data[key].id : key,
            title: data[key]["title"],
            status: data[key]["status"],
        }
        polls.push(pollObject);
    }
    return polls;

}
