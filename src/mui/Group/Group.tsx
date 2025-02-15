import { createComponentModule, FormCrafterComponentProps, OptionsBuilderOutput } from '@form-crafter/core'
import { RowsList, useIsDynamicContainer } from '@form-crafter/generator'
import { builders } from '@form-crafter/options-builder'
import { isNotEmpty } from '@form-crafter/utils'
import { Box, Typography } from '@mui/material'
import { forwardRef, memo } from 'react'

import { TopLevelContainerHeader } from './TopLevelContainerHeader'

const optionsBuilder = builders.group({
    title: builders.input().label('Заголовок').nullable(),
})

type ComponentProps = FormCrafterComponentProps<'container', OptionsBuilderOutput<typeof optionsBuilder>>

const Group = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ rows, properties, ...props }, ref) => {
        const isTopLevelContainer = useIsDynamicContainer(props.parentId)

        const header = isTopLevelContainer ? (
            <TopLevelContainerHeader {...props} title={properties.title} />
        ) : (
            isNotEmpty(properties.title) && <Typography variant="h6">{properties.title}</Typography>
        )

        return (
            <Box ref={ref} gap={2}>
                {header}
                {isNotEmpty(rows) && <RowsList rows={rows} />}
            </Box>
        )
    }),
)

Group.displayName = 'Group'

export const groupModule = createComponentModule({
    name: 'group',
    label: 'Group',
    type: 'container',
    optionsBuilder,
    Component: Group,
})
