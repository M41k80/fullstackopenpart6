import { useMutation, useQuery } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, createAnecdote, voteAnecdote } from './services/anecdotes'
import { useNotifications, addNotification } from './components/NotificationContext'

const App = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
  })
  const { dispatch } = useNotifications()

  const { mutate: addAnecdote } = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      refetch()
      dispatch(addNotification('Anecdote created successfully!'))
    },
    onError: (error) => {
      dispatch(addNotification('Something went wrong while creating the anecdote!', true))
    }
  })

  const { mutate: voteAnecdoteMutation } = useMutation({
    mutationFn: voteAnecdote,
    onSuccess: () => {
      refetch() 
      dispatch(addNotification('Vote registered successfully!'))
    },
    onError: (error) => {
      dispatch(addNotification('Something went wrong while voting!', true))
    }
  })

  const handleVote = (anecdote) => {
    voteAnecdoteMutation({ ...anecdote, votes: anecdote.votes + 1 })
  }



  const handleCreate = (newAnecdote) => {
    addAnecdote(newAnecdote)
  }

  if (isLoading) return <p>Loading...</p>

  if (isError) {
    return (
      <div>
        <h2>Error: cannot load anecdotes</h2>
        <p>anecdote service not available due to problems in server</p>
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      {/* Mostrar notificación si existe */}
      <Notification />

      <AnecdoteForm onCreate={handleCreate} />

      {data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>Vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
