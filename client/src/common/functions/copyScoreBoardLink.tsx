export const copyScoreBoardLink = (quizId: number) => {
    if (!quizId) throw new Error('quizId cannot be undefined');
    navigator.clipboard.writeText(`localhost:3000/quiz/${quizId}/scores`);
    alert('הקישור ללוח התוצאות הועתק בהצלחה!');
}