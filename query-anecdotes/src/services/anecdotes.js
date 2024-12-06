

export const getAnecdotes = async () => {
    const response = await fetch('http://localhost:3001/anecdotes')
    if (!response.ok) throw new Error('Network response was not ok')
    return response.json()
  }
  
  export const createAnecdote = async (newAnecdote) => {
    const response = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAnecdote),
    })
    if (!response.ok) throw new Error('Failed to create anecdote')
    return response.json()
  }
  
  export const voteAnecdote = async (updatedAnecdote) => {
    const response = await fetch(`http://localhost:3001/anecdotes/${updatedAnecdote.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedAnecdote),
    })
    if (!response.ok) throw new Error('Failed to update anecdote vote')
    return response.json()
  }