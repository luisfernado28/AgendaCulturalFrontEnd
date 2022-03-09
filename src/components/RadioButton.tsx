import Radio from '@mui/material/Radio'
import { useField } from 'formik'
import { Fragment } from 'react'
import { EventTypeStatus } from '../redux/types'

interface RadioButtonProperties {
    id?: string
    label: string
    defaultChecked?: boolean
    name: string
    value: string | EventTypeStatus | number
    onChange?: (e: any) => void

}

const RadioButton = ({ label, ...props }: RadioButtonProperties): JSX.Element => {
    const [field] = useField(props)

    return (
        <Fragment>
            <div>
                <Radio  {...field} {...props} /> {label}
            </div>
        </Fragment>
    )
}

export default RadioButton
