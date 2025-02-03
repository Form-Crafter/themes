import { createComponentModule, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { TextField } from '@mui/material'
import { forwardRef, memo } from 'react'

const optionsBuilder = builders.group({
    value: builders.date().label('Значение').nullable(),
    label: builders.input().label('Название'),
    placeholder: builders.input().label('Название'),
    disabled: builders.checkbox().label('Блокировка ввода'),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const Email = memo(
    forwardRef<HTMLDivElement, ComponentProps>(({ properties: { label, placeholder, disabled, value }, onChangeProperties }, ref) => {
        return (
            <TextField
                ref={ref}
                fullWidth
                value={value}
                disabled={disabled}
                label={label}
                placeholder={placeholder}
                onChange={(e) => onChangeProperties({ value: e.target.value })}
            />
        )
    }),
)

Email.displayName = 'Email'

export const emailModule = createComponentModule({
    name: 'email',
    label: 'Email',
    type: 'base',
    optionsBuilder,
    Component: Email,
})
