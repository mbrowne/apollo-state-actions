import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { actions } from './state'
import './Counter.css'

const countQuery = gql`
    {
        counter @client {
            count
        }
    }
`

const Counter: React.SFC = () => (
    <Query query={countQuery}>
        {({ data, loading, error }) => {
            if (loading) {
                return 'Loading...'
            }
            if (error) {
                throw error
            }
            const { counter } = data
            return (
                <div className="Counter">
                    <p>Counter: {counter.count}</p>
                    <button onClick={actions.counter.increment}>+</button>
                    <button onClick={actions.counter.decrement}>-</button>
                </div>
            )
        }}
    </Query>
)

export default Counter
