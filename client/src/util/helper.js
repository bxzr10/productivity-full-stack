export const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const capitalize = (word) => {
    return word[0].toUpperCase().concat(word.slice(1));
}

export const firstOfMonth = (monthName) => {
    return new Date(`${monthName} ${new Date().getFullYear()}`);
}

// export const formatInputDate = (dateStr) => {
//     return new Date(dateStr?.replaceAll('-', '/'));
// }

export const formatProjectDate = (dateStr) => {
    const isoDate = new Date(Number(dateStr)).toISOString();
    const formatIsoDate = isoDate.split('T')[0];
    return formatIsoDate;
}