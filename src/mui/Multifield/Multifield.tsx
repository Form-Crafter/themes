import { createComponentModule, FormCrafterComponentProps, OptionsBuilderOutput } from '@form-crafter/core'
import { RowsList } from '@form-crafter/generator'
import { builders } from '@form-crafter/options-builder'
import { isNotEmpty } from '@form-crafter/utils'
import { Box, Button, Typography } from '@mui/material'
import { forwardRef, memo } from 'react'

import { initialAddButtonText } from '_consts'

const optionsBuilder = builders.group({
    title: builders.input().label('Заголовок').nullable(),
    addButtonText: builders.input().label('Текст кнопки добавления').nullable(),
})

type ComponentProps = FormCrafterComponentProps<'dynamic-container', OptionsBuilderOutput<typeof optionsBuilder>>

const Multifield = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ rows, onAddRow, properties: { title, addButtonText } }, ref) => {
        const finalAddButtonText = addButtonText || initialAddButtonText

        return (
            <Box ref={ref} gap={4}>
                <Box gap={2} display="flex" justifyContent="space-between">
                    {title && <Typography variant="h5">{title}</Typography>}
                    <Button onClick={onAddRow}>{finalAddButtonText}</Button>
                </Box>
                {isNotEmpty(rows) && <RowsList rows={rows} />}
            </Box>
        )
    }),
)

Multifield.displayName = 'Multifield'

export const multifieldModule = createComponentModule({
    name: 'multifield',
    label: 'Multifield',
    type: 'dynamic-container',
    optionsBuilder,
    Component: Multifield,
})
