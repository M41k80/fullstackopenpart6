import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const getId = () => Math.floor(Math.random() * 1000000)



export const fetchAnecdotes = createAsyncThunk('anecdotes/fetchAnecdotes', async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
})

export const createAnecdote = createAsyncThunk('anecdotes/createAnecdote', async (content) => {
  const newAnecdote = {
    content,
    votes: 0,
    id: getId(),
  }
  const response = await axios.post('http://localhost:3001/anecdotes', newAnecdote)
  return response.data
})

export const voteAnecdote = createAsyncThunk('anecdotes/voteAnecdote', async (id) => {
  const response = await axios.get(`http://localhost:3001/anecdotes/${id}`)
  const updatedAnecdote = response.data

  updatedAnecdote.votes += 1

  const updatedResponse = await axios.put(`http://localhost:3001/anecdotes/${id}`, updatedAnecdote)

  return updatedResponse.data
})

const initialState = []



const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    voteForAnecdote(state, action) {
      const anecdote = state.find(anecdote => anecdote.id === action.payload)
      if (anecdote) {
        anecdote.votes++
      }
      state.sort((a, b) => b.votes - a.votes)
    },
    newAnecdote(state, action) {
      const newAnecdote = {
        content: action.payload,
        id: getId(),
        votes: 0
      }
      state.push(newAnecdote)
      state.sort((a, b) => b.votes - a.votes)
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAnecdotes.fulfilled, (state, action) => {
      return action.payload
    })
    .addCase(createAnecdote.fulfilled, (state, action) => {
      state.push(action.payload)
      state.sort((a, b) => b.votes - a.votes)
    })
    .addCase(voteAnecdote.fulfilled, (state, action) => {
      const updatedAnecdote = action.payload
      const index = state.findIndex(anecdote => anecdote.id === updatedAnecdote.id)
      if (index!== -1) {
        state[index] = updatedAnecdote
      }
      state.sort((a, b) => b.votes - a.votes)
    })
  }

})

export const { voteForAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

