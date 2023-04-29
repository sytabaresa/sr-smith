

export const projectSchema = {
    title: 'sr-smith schema',
    version: 0,
    primaryKey: 'id',
    type: 'object',
    properties: {
        id: {
            type: 'string',
            maxLength: 100 // <- the primary key must have set maxLength
        },
        name: {
            type: 'string'
        },
        data: {
            type: 'string'
        },
        description: {
            type: 'string'
        },
        isPublic: {
            type: 'boolean'
        },
        role: {
            type: 'string'
        },
        metadata: {
            type: 'object'
        },
        userId: {
            type: 'string',
            maxLength: 100
        }
    },
    required: ['name', 'userId', 'isPublic'],
    indexes: ['userId']
}
