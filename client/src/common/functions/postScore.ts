import axios from "axios"

export const postScore = async (quizId: string | undefined, player: string, score: number) => {
    console.log(quizId, player, score)
    axios.post(`/api/quiz/${quizId}/scores`, {
        score,
        player
    })
}