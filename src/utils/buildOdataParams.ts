import { Filter } from "../redux/types";

export const buildQueryParams = (filter: Filter): string => {
    let res: string = '?$filter=(';
    const filterArray: string[] = [];
    for (const field in filter) {
        const currentRule = buildRule(field, filter);
        console.log(currentRule);
        filterArray.push(currentRule)
    }
    for (var i = 0;i < filterArray.length;i++){
        res = res+ filterArray[0];
        if(i< filterArray.length-1){
            res = res + ' or ';
        }
    }
    console.log(res+ ')')
    return res + ')';
    // return '';
}

const buildRule = (rule: string, ruleArray: any): string => {
    return 'contains(' + rule + ', \'' + ruleArray[rule] + '\')';
}
