import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotificationWithTimeout } from '../reducers/notifiacionReducer'


const AnecdoteList = () => {
  const filter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const dispatch = useDispatch()




  const filteredAnecdotes = filter 
    ? anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    : anecdotes
  



  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotificationWithTimeout(`You voted for "${content}"`, 3 ))

  }

  return (
    <div>
    {filteredAnecdotes.length === 0 ? (
      <div>No anecdotes match your search</div> 
    ) : (
      filteredAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>has {anecdote.votes}</div>
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      )
    )}
  </div>
  )
}

export default AnecdoteList
