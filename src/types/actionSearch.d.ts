interface UserListRepoObj {
    id:number;
    name:string;
    description:string;
}



interface ListUsers {
    login: string;
    id: number;
    repoList?: UserListRepoObj[]
}

interface ListUserRes{
    total_count:number;
    incomplete_results:boolean;
    items: ListUsers[];
}

interface ListUserInitialState{
    userListData?: ListUserRes,
    error?: string,
    isLoading: boolean
}

interface ListUserAction{
    type: string,
    isLoading?: boolean
    data?: extends<ListUserRes | UserListRepoObj[]>
    error?: string
    name?: string
}


type DispatchType = (args: extends<ListUserAction>) => ListUserAction
