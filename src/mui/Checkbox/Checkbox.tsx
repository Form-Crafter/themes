import { createFormCrafterComponent, FormCrafterComponentProps, SelectionOption } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { toggleArrItem } from '@form-crafter/utils'
import { Box, Checkbox as CheckboxBase, FormControl, FormControlLabel, FormLabel } from '@mui/material'
import { forwardRef, memo, useCallback } from 'react'

const optionsBuilder = builders.group({
    label: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
    values: builders
        .multiSelect()
        .options([
            {
                label: 'Мужской',
                value: 'male',
            },
            {
                label: 'Женский',
                value: 'female',
            },
        ])
        .nullable(),
    options: builders
        .multifield({
            label: builders.input().label('Название').required().default('Например'),
            value: builders.input().label('Значение').required().default('value'),
        })
        .required()
        .label('Список опций')
        .default([
            {
                label: 'Мужской',
                value: 'male',
            },
            {
                label: 'Женский',
                value: 'female',
            },
        ]),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const Checkbox = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ properties: { options, values, label, disabled }, onChangeProperties }, ref) => {
        const isChecked = useCallback((option: Pick<SelectionOption, 'value'>) => (values?.length ? values.includes(option.value) : false), [values])

        const hanleChange = useCallback(
            (valueToChange: SelectionOption['value']) => {
                const finalValues = toggleArrItem(values || [], valueToChange)
                onChangeProperties({ values: finalValues })
            },
            [values, onChangeProperties],
        )

        return (
            <FormControl ref={ref} fullWidth>
                {label && <FormLabel>{label}</FormLabel>}
                <Box sx={{ display: 'flex', gap: 1 }}>
                    {options.map((option) => (
                        <FormControlLabel
                            key={option.value}
                            control={
                                <CheckboxBase
                                    checked={isChecked(option)}
                                    name={option.value}
                                    value={option.value}
                                    disabled={disabled}
                                    onChange={() => hanleChange(option.value)}
                                />
                            }
                            label={option.label}
                        />
                    ))}
                </Box>
            </FormControl>
        )
    }),
)

Checkbox.displayName = 'Checkbox'

export const checkboxModule = createFormCrafterComponent({
    name: 'checkbox',
    label: 'Checkbox',
    type: 'base',
    optionsBuilder,
    Component: Checkbox,
})

// TODO
// Придумать механизм подклчения/переопределния комопнентов
// Подключить в generator и продолжить прибирать ошибки tsc
