import { FETCH_USER_REPOSITORY, FETCH_USER_REPOSITORY_ERROR, FETCH_USER_REPOSITORY_SUCCESS, SEARCH_USERNAME, SEARCH_USERNAME_ERROR, SEARCH_USERNAME_SUCCESS } from "../constants/actionTypes"
import { getUserRepoList, searchUsername } from "../services/request"
import { AppDispatch } from "../store/store"

export async function searchUser(value: string,dispatch:AppDispatch){
    try {
        dispatch({type:SEARCH_USERNAME,isLoading:true})
        const { status, data = {} } = await searchUsername(value)
        if(status === 200){
            dispatch({type:SEARCH_USERNAME_SUCCESS, data})
        }
        else {
            dispatch({type:SEARCH_USERNAME_ERROR, error:'No results found'}) 
        }
    }
    catch(err){
        dispatch({type:SEARCH_USERNAME_ERROR,error:'Something went wrong'})
    }
}

export async function getUserRepo(username: string, dispatch:AppDispatch){
    console.log(username)
    try {
        dispatch({type:FETCH_USER_REPOSITORY,isLoading:true})
        const { status, data = {} } = await getUserRepoList(username)
        console.log(status,data)
        if(status === 200){
            dispatch({type:FETCH_USER_REPOSITORY_SUCCESS, data, name: username})
        }
        else {
            dispatch({type:FETCH_USER_REPOSITORY_ERROR, error:'No results found'}) 
        }
    }
    catch(err){
        dispatch({type:FETCH_USER_REPOSITORY_ERROR,error:'Something went wrong'})
    }
}

