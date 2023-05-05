export interface listData {
    completed: number;
    uncompleted: number;
    inProgress: number;
}


export interface List {
    name: string;
    category: string;
    isCompleted: boolean;
    isInProgress: boolean;
    fullDescription: string;
    emoji: string;
    id: number
}