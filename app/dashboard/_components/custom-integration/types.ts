export type Condition = {
    id: string
    field: string
    operator: string
    value: string
}

export type Step = {
    id: string
    type: 'trigger' | 'action'
    platform: string
    event: string
    dataMapping: { [key: string]: string }
    conditions: Condition[]
}