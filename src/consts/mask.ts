import { MaskOptions } from '@form-crafter/core'

export const getInitialMaskOptions = (options: Partial<MaskOptions>) => ({
    ...options,
    returnMaskedValue: true,
})
