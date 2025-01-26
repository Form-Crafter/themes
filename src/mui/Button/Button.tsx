import { createFormCrafterComponent, FormCrafterComponentProps } from '@form-crafter/core'
import { builders } from '@form-crafter/options-builder'
import { Button as ButtonBase } from '@mui/material'
import { forwardRef, memo } from 'react'

const defautType = 'button'

const optionsBuilder = builders.group({
    text: builders.input().label('Текст кнопки').required(),
    type: builders
        .select()
        .label('Тип тега')
        .default(defautType)
        .options([
            { label: 'Submit', value: 'submit' },
            { label: 'Button', value: defautType },
        ])
        .required(),
})

type ComponentProps = FormCrafterComponentProps<'base', typeof optionsBuilder>

const Button = memo(
    forwardRef<HTMLButtonElement, ComponentProps>(({ properties: { text, type } }, ref) => {
        return (
            <ButtonBase ref={ref} type={type[0] as Parameters<typeof ButtonBase>[0]['type']}>
                {text}
            </ButtonBase>
        )
    }),
)

Button.displayName = 'Button'

export const buttonModule = createFormCrafterComponent({
    name: 'button',
    label: 'Button',
    type: 'base',
    optionsBuilder,
    Component: Button,
})
