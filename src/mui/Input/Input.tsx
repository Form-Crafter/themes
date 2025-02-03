import { createComponentModule, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { TextField } from '@mui/material'
import { forwardRef, memo } from 'react'

const optionsBuilder = builders.group({
    value: builders.input().label('Значение').nullable(),
    label: builders.input().label('Название'),
    placeholder: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const Input = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ meta, properties: { value, placeholder, label, disabled }, onChangeProperties }, ref) => {
        return (
            <TextField
                ref={ref}
                value={value}
                name={meta.formKey}
                disabled={disabled}
                label={label}
                placeholder={placeholder}
                onChange={(e) => onChangeProperties({ value: e.target.value })}
                fullWidth
            />
        )
    }),
)

Input.displayName = 'Input'

export const inputModule = createComponentModule({
    name: 'input',
    label: 'Input',
    type: 'base',
    optionsBuilder,
    Component: Input,
})
