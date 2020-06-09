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

export interface IGlobalLatestTransformed {
    date: string;
    result: ICommonProps[];
    createdOn?: string;
}

export interface ICommonProps {
    confirmed?: number;
    deaths?: number;
    recovered?: number;
}

export interface ICountry {
    name: string;
    "alpha-2": string;
    "alpha-3": string;
    "country-code": string;
    "iso_3166-2": string;
    region: string;
}