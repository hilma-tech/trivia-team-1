export function formatDate(date: string) {
    const newDate = new Date(date);
    const formattedDate = `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getDate().toString().padStart(2, '0')}/${newDate.getFullYear().toString().slice(-2)}`;
    return formattedDate;
}