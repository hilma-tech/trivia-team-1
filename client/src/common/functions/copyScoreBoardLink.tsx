export const copyScoreBoardLink = (quizId: number | undefined, userName: string | undefined ) => {
    if(!quizId || !userName) throw new Error('quizId or username is undefined');
    navigator.clipboard.writeText(`localhost:3000/${userName}/quiz/${quizId}/scores`);
    console.log('hsduhdash');
    
    alert('הקישור ללוח התוצאות הועתק בהצלחה!');
}