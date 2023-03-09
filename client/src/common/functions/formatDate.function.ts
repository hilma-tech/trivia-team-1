export function formatDate(date: string) {
    const newDate = new Date(date);
    return `${(newDate.getMonth() + 1).toString().padStart(2, '0')}/${newDate.getDate().toString().padStart(2, '0')}/${newDate.getFullYear().toString().slice(-2)}`;
}