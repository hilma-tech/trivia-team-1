import axios from "axios"

export const postScore = async (quizId: number | null | undefined | string, player: string, score: number) => {
    axios.post(`/api/quiz/${quizId}/scores`, {
        score,
        player
    })
}