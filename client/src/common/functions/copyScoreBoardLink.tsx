export const copyScoreBoardLink = (quizId: number | undefined, userName: string | undefined ) => {
    if(quizId === undefined || userName === undefined) throw new Error('quizId or username is undefined');
    navigator.clipboard.writeText(`localhost:3000/${userName}/quiz/${quizId}/scores`);
    alert('הקישור ללוח התוצאות הועתק בהצלחה!')
}