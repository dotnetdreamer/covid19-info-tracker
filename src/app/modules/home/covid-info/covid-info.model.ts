export interface IGlobalInfo {
    count?: number;
    date?: string;
    result: { 
        confirmed: number, 
        deaths: number, 
        recovered: number,
        total: number
    };
    confirmed?: number;
    deaths?: number;
    recovered?: number;
    createdOn?: string
}

export interface IGlobalLatest {
    date: string;
    result: Array<Map<string, ICommonProps>>;
    createdOn?: string;
}

export interface ICommonProps {
    confirmed?: number;
    deaths?: number;
    recovered?: number;
}