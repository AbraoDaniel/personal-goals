export async function deleteGoalCompletion(goalCompletionId: string) {
  await fetch('http://localhost:3333/delete_completion', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      goalCompletionId,
    }),
  })
}
