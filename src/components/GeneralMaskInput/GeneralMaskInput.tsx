import { BaseComponentProps, MaskOptions } from '@form-crafter/core'
import { useCombinedRefs } from '@form-crafter/utils'
import { FactoryOpts, InputMask as InputMaskType } from 'imask'
import { FC, ForwardedRef, forwardRef, ReactNode, RefAttributes, useCallback } from 'react'
import { useIMask } from 'react-imask'

type InheritedComponent = FC<BaseComponentProps<{ value?: any }>>

type Props<T extends InheritedComponent> = Parameters<T>[0] & {
    Component: FC<Parameters<T>[0]>
    maskOptions: MaskOptions
    returnMaskedValue?: boolean
    showMask?: boolean
}

const GeneralMaskInputBase = <T extends InheritedComponent>(
    { maskOptions, Component, onChangeProperties, properties, returnMaskedValue = true, showMask = true, ...props }: Props<T>,
    rootRef: ForwardedRef<HTMLInputElement>,
): ReactNode => {
    const handleAccept = useCallback(
        (value: string, maskRef: InputMaskType<FactoryOpts>, event?: InputEvent) => {
            if (event?.target) {
                const finalValue = returnMaskedValue ? value : maskRef.unmaskedValue
                onChangeProperties({ value: finalValue })
            }
        },
        [onChangeProperties, returnMaskedValue],
    )

    const {
        ref,
        value: maskedValue,
        setValue,
    } = useIMask<HTMLInputElement>(
        {
            ...maskOptions,
            autofix: true,
            lazy: !showMask,
        },
        {
            defaultValue: properties.value || undefined,
            onAccept: handleAccept,
        },
    )

    const handleChange = useCallback<typeof onChangeProperties>(
        ({ value, ...params }) => {
            if (value !== undefined) {
                setValue(value)
            }
            if (Object.keys(params).length > 0) {
                onChangeProperties(params)
            }
        },
        [setValue, onChangeProperties],
    )

    const refs = useCombinedRefs(ref, rootRef)

    return <Component ref={refs} {...props} properties={{ ...properties, value: maskedValue }} onChangeProperties={handleChange} />
}

export const GeneralMaskInput = forwardRef(GeneralMaskInputBase) as unknown as (<T extends InheritedComponent>(
    props: Props<T> & RefAttributes<HTMLDivElement>,
) => ReactNode) & {
    displayName?: string | undefined
}

GeneralMaskInput.displayName = 'GeneralMaskInput'
