import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotifications, addNotification } from "../components/NotificationContext"
import { createAnecdote } from "../services/anecdotes"

const AnecdoteForm = () => {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const queryClient = useQueryClient()
  const { dispatch } = useNotifications()

  
  const mutation = useMutation({
    mutationFn: (newAnecdote) => {
      return fetch('http://localhost:3001/anecdotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAnecdote),
      }).then(res => res.json())
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch(addNotification('Anecdote created successfully!', false))

      setContent('')
      setError('')
    },
    onError: (error) => {
      dispatch(addNotification('Something went wrong while creating the anecdote!', true))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()

    if (content.length < 5) {
      setError('Content must be at least 5 characters')

      dispatch(addNotification('Content must be at least 5 characters', true))
      return
    }

    const newAnecdote = { id: Date.now(), content, votes: 0 }
    mutation.mutate(newAnecdote) 
  }

  return (
    <div>
      <h3>Create New Anecdote</h3>
      <form onSubmit={onCreate}>
        <input 
          name='anecdote' 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <button type="submit" disabled={mutation.isLoading}>Create</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {mutation.isLoading && <p>Adding new anecdote...</p>}
      {mutation.isError && <p style={{ color: 'red' }}>Error: {mutation.error.message}</p>}
      
    </div>
  )
}

export default AnecdoteForm
