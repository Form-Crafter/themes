import { createComponentModule, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { forwardRef, memo, useMemo } from 'react'

import { GeneralMaskInput } from '_components'

import { inputModule } from '../Input'

const { Component: Input } = inputModule

const optionsBuilder = builders.group({
    mask: builders.input().label('Маска').required(),
    value: builders.input().label('Значение').nullable(),
    label: builders.input().label('Название'),
    placeholder: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const MaskInput = memo(
    forwardRef<HTMLInputElement, ComponentProps>(({ properties: { mask, ...properties }, meta, ...props }, ref) => {
        const maskOptions = useMemo(() => ({ mask, returnMaskedValue: true }), [mask])

        return (
            <GeneralMaskInput
                ref={ref}
                {...props}
                maskOptions={maskOptions}
                Component={Input}
                properties={properties}
                meta={{ ...meta, name: inputModule.name }}
            />
        )
    }),
)

MaskInput.displayName = 'MaskInput'

export const maskInputModule = createComponentModule({
    name: 'mask-input',
    label: 'Mask Input',
    type: 'base',
    optionsBuilder,
    Component: MaskInput,
})
