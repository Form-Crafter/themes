import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import { ComponentModule } from '@form-crafter/core'

import { buttonModule } from './Button'
import { checkboxModule } from './Checkbox'
import { dateInputModule } from './DateInput'
import { emailModule } from './Email'
import { groupModule } from './Group'
import { inputModule } from './Input'
import { maskInputModule } from './MaskInput'
import { multifieldModule } from './Multifield'
import { radioModule } from './Radio'
import { selectModule } from './Select'
import { textModule } from './Text'
import { textareaModule } from './Textarea'
import { timeInputModule } from './TimeInput'

export const muiTheme: ComponentModule[] = [
    buttonModule,
    checkboxModule,
    dateInputModule,
    emailModule,
    groupModule,
    inputModule,
    maskInputModule,
    multifieldModule,
    radioModule,
    selectModule,
    textModule,
    textareaModule,
    timeInputModule,
]
