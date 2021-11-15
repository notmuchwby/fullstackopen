import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { displayVoteNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdote)
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(addVote(id))
    }

    const displayVotedAnecdote = (content) => {
        dispatch(displayVoteNotification(content))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }

    return (
      <div>
          {anecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => {
                    vote(anecdote.id)
                    displayVotedAnecdote(anecdote.content)
                    }}>vote</button>
            </div>
            </div>
            )}
      </div>
    )
}

export default AnecdoteList