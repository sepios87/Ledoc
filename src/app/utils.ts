export const convertStringToDate = (str: string): Date => {
    return new Date(str.replace(/(\d+[/])(\d+[/])/, '$2$1'));
}

export const formatDate = (date: Date): string => {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('/');
}

const padTo2Digits = (num: number): string => {
    return num.toString().padStart(2, '0');
}