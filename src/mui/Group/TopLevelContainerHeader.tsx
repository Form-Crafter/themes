import { ContainerComponentProps } from '@form-crafter/core'
import { useComponentDepth, useDynamicContainerContext, useRowListIndex } from '@form-crafter/generator'
import { isNotEmpty, Nullable } from '@form-crafter/utils'
import { Box, Button, Typography } from '@mui/material'
import { memo } from 'react'

type Props = Pick<ContainerComponentProps, 'id' | 'parentId' | 'rowId'> & {
    title?: Nullable<string>
}

export const TopLevelContainerHeader = memo<Props>(({ title, id, parentId, rowId }) => {
    const index = useRowListIndex(parentId, rowId)
    const deep = useComponentDepth(id)

    console.log('deep: ', deep)

    const { onRemoveRow } = useDynamicContainerContext()

    return (
        <Box gap={2} display="flex" justifyContent="space-between">
            {isNotEmpty(title) && (
                <Typography variant="h6">
                    {title} {index + 1}
                </Typography>
            )}
            <Button onClick={() => onRemoveRow({ rowId })}>Remove</Button>
        </Box>
    )
})

TopLevelContainerHeader.displayName = 'TopLevelContainerHeader'
