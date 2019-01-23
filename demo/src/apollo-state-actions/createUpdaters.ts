import { ApolloClient } from 'apollo-client'
import { ApolloCache } from 'apollo-cache'
import gql from 'graphql-tag'

export interface ActionHandlers {
    [name: string]: ActionHandler
}

export type ActionHandler = (state: any, ...args: any[]) => any

export interface ActionExecuters {
    [name: string]: ActionExecuter
}

export type ActionExecuter = (...actionArgs: any[]) => any

const updateStateMutation = gql`
    mutation($path: String!, $newState: NewState) {
        apolloStateActions_updateState(path: $path, newState: $newState) @client
    }
`

export function createUpdaters(
    client: ApolloClient<any>,
    actions: { [path: string]: ActionHandlers }
) {
    const allUpdaters: { [path: string]: ActionExecuters } = {}
    Object.entries(actions).forEach(([path, actionHandlers]) => {
        const updaters: ActionExecuters = {}
        Object.entries(actionHandlers).forEach(([actionName, handler]) => {
            updaters[actionName] = (...actionArgs: any[]) => {
                const currentState = getStateSlice(client.cache, path)
                const updates = handler.apply(undefined, [
                    currentState,
                    ...actionArgs
                ])
                const newState = { ...currentState, ...updates }
                client.mutate({
                    mutation: updateStateMutation,
                    variables: { path, newState }
                })
            }
        })
        allUpdaters[path] = updaters
    })
    return allUpdaters
}

function getStateSlice(cache: ApolloCache<any>, path: string) {
    // @FIXME
    const cacheData = (cache as any)['data']
    // @TODO nested paths
    return cacheData.data['$ROOT_QUERY.' + path]
}
