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