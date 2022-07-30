const { Generator } = require('@paljs/generator')

new Generator(
    {
        name: 'sdl',
        schemaPath: './prisma/schema.prisma'
    },
    {
        javaScript: true,
        excludeQueriesAndMutations: [
            'aggregate',
            // 'deleteMany',
            // 'deleteOne',
            // 'updateMany',
        ],
        models: ['Schedule', 'Branch', 'Organization', 'Good', 'Order'], 
    }
).run()
