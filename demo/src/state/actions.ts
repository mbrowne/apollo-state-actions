import { createUpdaters } from '../apollo-state-actions'
import client from '../apolloClient'

export const actions = createUpdaters(client, {
    counter: {
        increment: ({ count }) => ({
            count: ++count
        }),
        decrement: ({ count }) => ({
            count: --count
        })
    },
    currentUser: {
        changeName: (state, newName: string) => ({
            name: newName
        })
    }
})
