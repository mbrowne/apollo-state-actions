import { ApolloCache } from 'apollo-cache'

interface UpdateStateVariables {
    path: string
    newState: any
}

interface Context {
    cache: ApolloCache<any>
}

export let DEBUG = true

export const resolvers = {
    Mutation: {
        apolloStateActions_updateState(
            _: any,
            { path, newState }: UpdateStateVariables,
            { cache }: Context
        ) {
            if (DEBUG) {
                console.log(`Updating '${path}' with new state:`, newState)
            }

            // TODO nested paths
            const typename = path
            return cache.writeData({
                data: {
                    [typename]: newState
                }
            })
        }
    }
}
