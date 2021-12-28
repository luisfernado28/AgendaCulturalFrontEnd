import { Filter } from "../redux/types";

export const buildQueryParams = (filter: Filter): string => {
    let res: string = '$filter=(';
    for (const field in filter) {
        const currentRule = buildRule(field, filter);
        res = res + currentRule + ' or ';
    }
    res = res.slice(0, -4);
    return res + ')';
}

const buildRule = (rule: string, ruleArray: any): string => {
    return 'contains(' + rule + ', \'' + ruleArray[rule] + '\')';
}


export const buildOrderBy = (orderByFilters: string[]): string => {
    let filter = '$orderby='
    orderByFilters.forEach((field: string)=>{
        filter = filter +' '+ field + ', ' 
    })
    filter= filter.slice(0,-2);
    return filter;
}