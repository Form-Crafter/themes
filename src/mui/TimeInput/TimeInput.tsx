import { createFormCrafterComponent, FormCrafterComponentProps, MaskOptions } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import IMask from 'imask'
import { forwardRef, memo, useMemo } from 'react'

import { GeneralMaskInput } from '_components'

import { inputModule } from '../Input'

const { Component: Input } = inputModule

const optionsBuilder = builders.group({
    value: builders.input().label('Значение').nullable(),
    label: builders.input().label('Название'),
    placeholder: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
    showMask: builders.checkbox().label('Показывать маску').checked(false),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const TimeInput = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ meta, properties: { showMask, ...properties }, ...props }, ref) => {
        const maskOptions: MaskOptions = useMemo(
            () => ({
                mask: 'HH:mm',
                autofix: true,
                lazy: !showMask,
                blocks: {
                    HH: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 23,
                        maxLength: 2,
                        autofix: 'pad',
                    },
                    mm: {
                        mask: IMask.MaskedRange,
                        from: 0,
                        to: 59,
                        maxLength: 2,
                        autofix: 'pad',
                    },
                },
            }),
            [showMask],
        )

        return (
            <GeneralMaskInput
                ref={ref}
                {...props}
                maskOptions={maskOptions}
                Component={Input}
                properties={properties}
                showMask={showMask}
                meta={{ ...meta, name: inputModule.name }}
            />
        )
    }),
)

TimeInput.displayName = 'TimeInput'

export const timeInputModule = createFormCrafterComponent({
    name: 'time-input',
    label: 'Time input',
    type: 'base',
    optionsBuilder,
    Component: TimeInput,
})
