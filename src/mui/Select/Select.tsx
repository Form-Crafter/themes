import { createFormCrafterComponent, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { FormControl, InputLabel, ListItemText, MenuItem, Select as SelectBase } from '@mui/material'
import { SelectInputProps } from '@mui/material/Select/SelectInput'
import { forwardRef, memo, useCallback } from 'react'

const optionsBuilder = builders.group({
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
    label: builders.input().label('Название'),
    placeholder: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
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

const Select = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ meta, properties: { options, values, placeholder, label, disabled }, onChangeProperties }, ref) => {
        const handleChange = useCallback<Required<SelectInputProps<string[]>>['onChange']>(
            ({ target: { value } }) => {
                const finalValues = Array.isArray(value) ? value : [value]
                onChangeProperties({ values: finalValues })
            },
            [onChangeProperties],
        )

        return (
            <FormControl ref={ref} fullWidth>
                {label && <InputLabel>{label}</InputLabel>}
                <SelectBase
                    multiple
                    name={meta.formKey}
                    value={values || []}
                    renderValue={(selected) => selected.join(', ')}
                    placeholder={placeholder}
                    disabled={disabled}
                    label={label}
                    onChange={handleChange}
                >
                    {options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            <ListItemText primary={option.label} />
                        </MenuItem>
                    ))}
                </SelectBase>
            </FormControl>
        )
    }),
)

Select.displayName = 'Select'

export const selectModule = createFormCrafterComponent({
    name: 'select',
    label: 'Select',
    type: 'base',
    optionsBuilder,
    Component: Select,
})
