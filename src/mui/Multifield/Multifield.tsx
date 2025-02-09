import { ContainerComponentProps, createComponentModule, FormCrafterComponentProps, GridComponentProps, OptionsBuilderOutput } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { isNotEmpty } from '@form-crafter/utils'
import { Box, Button, Typography } from '@mui/material'
import { forwardRef, memo, useCallback } from 'react'

import { initialAddButtonText } from '_consts'

type RenderTitleParams = Parameters<Required<ContainerComponentProps>['renderTitle']>[0]

const optionsBuilder = builders.group({
    title: builders.input().label('Заголовок').nullable(),
    addButtonText: builders.input().label('Текст кнопки добавления').nullable(),
})

type ComponentProps = FormCrafterComponentProps<'dynamic-container', OptionsBuilderOutput<typeof optionsBuilder>>

const Multifield = memo(
    forwardRef<HTMLDivElement, ComponentProps>(
        ({ GridComponent, ResolverContainer, onAddChild, onRemoveChild, childNodes, properties: { title, addButtonText } }, ref) => {
            const finalAddButtonText = addButtonText || initialAddButtonText

            const renderTitle = useCallback(
                ({ properties }: RenderTitleParams, index: number) => (
                    <Box gap={2} display="flex" justifyContent="space-between">
                        {isNotEmpty(properties.title) && (
                            <Typography variant="h6">
                                {properties.title} {index + 1}
                            </Typography>
                        )}
                        <Button onClick={() => onRemoveChild({ index })}>Remove</Button>
                    </Box>
                ),
                [onRemoveChild],
            )

            const renderChild = useCallback<Required<GridComponentProps>['renderChild']>(
                (childNode, index) => <ResolverContainer {...childNode} renderTitle={(params) => renderTitle(params, index)} />,
                [ResolverContainer, renderTitle],
            )

            return (
                <Box ref={ref} gap={4}>
                    <Box gap={2} display="flex" justifyContent="space-between">
                        {title && <Typography variant="h5">{title}</Typography>}
                        <Button onClick={onAddChild}>{finalAddButtonText}</Button>
                    </Box>
                    {isNotEmpty(childNodes) && <GridComponent childNodes={childNodes} renderChild={renderChild} />}
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
