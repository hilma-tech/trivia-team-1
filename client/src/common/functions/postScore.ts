import axios from "axios"

export const postScore = async (quizId: string | undefined, player: string, score: number) => {
    axios.post(`/api/quiz/${quizId}/scores`, {
        score,
        player
    })
}