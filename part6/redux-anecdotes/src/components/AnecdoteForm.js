import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { displayAddedNotification, removeNotification } from "../reducers/notificationReducer"


const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(displayAddedNotification(content))
        setTimeout(() => {
          dispatch(removeNotification())
        }, 5000);
      }


    return (
      <div>
        <h2>create new</h2>
          <form onSubmit={addAnecdote}>
              <div><input name="anecdote"/></div>
              <button>create</button>
          </form>
      </div>
    )
}

export default AnecdoteForm