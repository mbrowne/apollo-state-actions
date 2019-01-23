import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { resolvers as stateResolvers } from './apollo-state-actions'

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.empty(),
    initializers: {
        counter: () => ({
            __typename: 'counter',
            count: 0
        }),
        currentUser: () => ({
            __typename: 'currentUser',
            name: 'Guest'
        })
    },
    resolvers: {
        Mutation: stateResolvers.Mutation
    }
})

export default client
