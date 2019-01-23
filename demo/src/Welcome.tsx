import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { actions } from './state'

const userQuery = gql`
    {
        currentUser @client {
            name
        }
    }
`

function onChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    actions.currentUser.changeName(e.target.value)
}

const Welcome: React.SFC = () => (
    <Query query={userQuery}>
        {({ data, loading, error }) => {
            const user = data.currentUser
            if (loading) {
                return 'Loading...'
            }
            if (error) {
                throw error
            }
            return (
                <div>
                    <p>Welcome, {user.name}</p>
                    <p>
                        Change name:
                        <br />
                        <input
                            type="text"
                            value={user.name}
                            onChange={onChangeName}
                        />
                    </p>
                </div>
            )
        }}
    </Query>
)

export default Welcome
