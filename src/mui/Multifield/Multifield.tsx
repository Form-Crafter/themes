import { createComponentModule, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { Maybe } from '@form-crafter/utils'
import { Box, Button, Typography } from '@mui/material'
import { forwardRef, memo, useCallback } from 'react'

import { initialAddButtonText } from '_consts'

const optionsBuilder = builders.group({
    title: builders.input().label('Заголовок').nullable(),
    addButtonText: builders.input().label('Текст кнопки добавления').nullable(),
})

type ComponentProps = FormCrafterComponentProps<'dynamic-container', typeof optionsBuilder>

const Multifield = memo(
    forwardRef<HTMLDivElement, ComponentProps>(
        ({ GridComponent, ResolverComponent, onAddChild, onRemoveChild, children, properties: { title, addButtonText } }, ref) => {
            const finalAddButtonText = addButtonText || initialAddButtonText

            const renderTitle = useCallback(
                ({ index, title }: { index: number; title: Maybe<string> }) => (
                    <Box gap={2} display="flex" justifyContent="space-between">
                        {title && (
                            <Typography variant="h6">
                                {title} {index + 1}
                            </Typography>
                        )}
                        <Button onClick={() => onRemoveChild({ index })}>Remove</Button>
                    </Box>
                ),
                [onRemoveChild],
            )

            return (
                <Box ref={ref} gap={4}>
                    <Box gap={2} display="flex" justifyContent="space-between">
                        {title && <Typography variant="h5">{title}</Typography>}
                        <Button onClick={onAddChild}>{finalAddButtonText}</Button>
                    </Box>
                    <GridComponent viewTree={children}>
                        {/* TODO remove this */}
                        {(componentSchema, index) => <ResolverComponent {...componentSchema} renderTitle={({ title }: any) => renderTitle({ index, title })} />}
                    </GridComponent>
                </Box>
            )
        },
    ),
)

Multifield.displayName = 'Multifield'

export const multifieldModule = createComponentModule({
    name: 'multifield',
    label: 'Multifield',
    type: 'dynamic-container',
    optionsBuilder,
    Component: Multifield,
})
