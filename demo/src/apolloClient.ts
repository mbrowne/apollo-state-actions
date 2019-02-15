import ApolloClient from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import { resolvers as stateResolvers } from './apollo-state-actions'

const cache = new InMemoryCache()

const client = new ApolloClient({
    cache,
    link: ApolloLink.empty(),
    resolvers: {
        Mutation: stateResolvers.Mutation
    }
})

cache.writeData({
    data: {
        counter: {
            __typename: 'counter',
            count: 0
        },
        currentUser: {
            __typename: 'currentUser',
            name: 'Guest'
        }
    }
})

export default client
