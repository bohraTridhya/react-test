import { Octokit } from "octokit";
import { FETCH_USER_REPOSITORY_URL, SEARCH_USERNAME_URL } from "../constants/actionTypes";

const octokit = new Octokit({
    auth: process.env.ACCESS_TOKEN,
})

export async function searchUsername(username:string): Promise<{status:number,data: {}}> {
    const { status, data } = await octokit.request(`${SEARCH_USERNAME_URL}?q=${username}`,{
        headers:{
            'X-GitHub-Api-Version': '2022-11-28' 
        }
    })

    return {status,data}
}

export async function getUserRepoList(username:string): Promise<{status:number,data: {}}>{
    const { status, data } = await octokit.request(`${FETCH_USER_REPOSITORY_URL}${username}/repos`,{
        username: username,
        headers:{
            'X-GitHub-Api-Version': '2022-11-28' 
        }
    })

    return {status,data}
}