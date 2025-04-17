import {ReportRecord} from "@/app/types";
import {SortProps} from "@chumsinc/sortable-tables";

export const reportCompare = (field: keyof ReportRecord) =>
    (a: ReportRecord, b: ReportRecord) => {
        switch (field) {
            case 'id':
            case 'changed':
            case "data_type":
                return a.id - b.id;
            case 'month_days':
            case 'week_days':
                return a[field].join(',') > b[field].join(',') ? 1 : -1;
            case 'enabled':
                return Number(a[field]) - Number(b[field]);
            default:
                return (a[field] || '').toLowerCase() > (b[field] || '').toLowerCase() ? 1 : -1
        }
    }

export const reportSorter = (sort: SortProps<ReportRecord>) =>
    (a: ReportRecord, b: ReportRecord): number => {
        const {field, ascending} = sort;
        return (
            a[field] === b[field]
                ? a.id - b.id
                : reportCompare(field)(a, b)
        ) * (ascending ? 1 : -1);
    }
