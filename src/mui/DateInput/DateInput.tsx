import { createFormCrafterComponent, FormCrafterComponentProps, MaskOptions } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import IMask from 'imask'
import { forwardRef, memo, useMemo } from 'react'

import { GeneralMaskInput } from '_components'

import { inputModule } from '../Input'

const { Component: Input } = inputModule

const defaultPattern = 'DD.MM.YYYY'

const optionsBuilder = builders.group({
    value: builders.date().label('Значение').nullable(),
    label: builders.input().label('Название'),
    placeholder: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
    pattern: builders.input().label('Формат даты').default(defaultPattern),
    showMask: builders.checkbox().label('Показывать маску').checked(false),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const DateInput = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ meta, properties: { pattern, showMask, ...properties }, ...props }, ref) => {
        const maskOptions: MaskOptions = useMemo(
            () => ({
                mask: Date,
                pattern: pattern || defaultPattern,
                min: new Date(1900, 0, 1),
                max: new Date(2100, 0, 1),
                blocks: {
                    DD: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 31,
                        maxLength: 2,
                        autofix: 'pad',
                    },
                    MM: {
                        mask: IMask.MaskedRange,
                        from: 1,
                        to: 12,
                        maxLength: 2,
                        autofix: 'pad',
                    },
                    YYYY: {
                        mask: IMask.MaskedRange,
                        from: 1900,
                        to: 2150,
                        autofix: true,
                    },
                },
            }),
            [pattern],
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

DateInput.displayName = 'DateInput'

export const dateInputModule = createFormCrafterComponent({
    name: 'date-input',
    label: 'Date input',
    type: 'base',
    optionsBuilder,
    Component: DateInput,
})
