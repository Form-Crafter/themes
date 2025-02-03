import { createComponentModule, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { Box, Typography } from '@mui/material'
import { forwardRef, memo } from 'react'

const optionsBuilder = builders.group({
    title: builders.input().label('Заголовок').nullable(),
})

type ComponentProps = FormCrafterComponentProps<'container', typeof optionsBuilder>

const Group = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ renderTitle, children, GridComponent, properties: { title } }, ref) => {
        return (
            <Box ref={ref} gap={2}>
                {renderTitle?.({ title }) || <Typography variant="h6">{title}</Typography>}
                <GridComponent viewTree={children} />
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
