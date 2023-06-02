import { SEARCH_USERNAME, SEARCH_USERNAME_ERROR, SEARCH_USERNAME_SUCCESS,FETCH_USER_REPOSITORY, FETCH_USER_REPOSITORY_SUCCESS, FETCH_USER_REPOSITORY_ERROR } from "../constants/actionTypes";
const initialState: ListUserInitialState = {
    userListData: { total_count: 0, incomplete_results: false, items: []},
    error:'',
    isLoading: false,
}

const searchUserreducer = (
    state: ListUserInitialState = initialState,
    action: ListUserAction
): ListUserInitialState => {
    switch(action.type) {
        case SEARCH_USERNAME:
            return {
                ...state,
                isLoading: true,
                error:'',
                userListData: { total_count: 0, incomplete_results: false, items: []}
            }
        case SEARCH_USERNAME_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error:'',
                userListData: action.data
            }
        case SEARCH_USERNAME_ERROR:
            return {
                ...state,
                isLoading: false,
                error: action.error,
                userListData: { total_count: 0, incomplete_results: false, items: []}
            }
        case FETCH_USER_REPOSITORY: 
            return {
                ...state,
                isLoading: true,
                error: '',
                userListData: state.userListData
            }
        case FETCH_USER_REPOSITORY_SUCCESS:
            const tempUserListData  = state.userListData as ListUserRes
            const index = tempUserListData.items.findIndex((v) => v.login === action.name)
            tempUserListData.items[index].repoList = action.data
            return {
                ...state,
                isLoading: false,
                error: '',
                userListData: tempUserListData
            }
        case FETCH_USER_REPOSITORY_ERROR:
            return {
                ...state,
                isLoading: false,
                error:'',
                userListData: state.userListData
            }            
        default:
            return state            
    }
}

export default searchUserreducer