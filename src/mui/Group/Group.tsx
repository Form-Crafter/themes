import { createComponentModule, FormCrafterComponentProps, OptionsBuilderOutput } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { isNotEmpty } from '@form-crafter/utils'
import { Box, Typography } from '@mui/material'
import { forwardRef, memo } from 'react'

const optionsBuilder = builders.group({
    title: builders.input().label('Заголовок').nullable(),
})

type ComponentProps = FormCrafterComponentProps<'container', OptionsBuilderOutput<typeof optionsBuilder>>

const Group = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ renderTitle, GridComponent, childNodes, meta, properties }, ref) => {
        return (
            <Box ref={ref} gap={2}>
                {renderTitle?.({ meta, properties }) || <Typography variant="h6">{properties.title}</Typography>}
                {isNotEmpty(childNodes) && <GridComponent childNodes={childNodes} />}
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
