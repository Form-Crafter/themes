import { createFormCrafterComponent, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { forwardRef, memo } from 'react'

const optionsBuilder = builders.group({
    text: builders.textarea().label('Текст'),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const Text = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ properties: { text } }, ref) => {
        return <div ref={ref}>{text}</div>
    }),
)

Text.displayName = 'Text'

export const textModule = createFormCrafterComponent({
    name: 'text',
    label: 'Text',
    type: 'base',
    optionsBuilder,
    Component: Text,
})
