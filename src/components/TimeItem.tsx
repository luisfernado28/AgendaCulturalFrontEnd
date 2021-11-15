/** @jsxRuntime classic */
/** @jsx  jsx */

import { Fragment } from 'react'
import DatePicker from 'react-multi-date-picker'
import TimePicker from 'react-multi-date-picker/plugins/time_picker'
import { jsx, Label, Radio } from 'theme-ui'

interface timePickerProps {
    value?: any,
    onChange?: (e: any) => void
}

const TimePickerItem = (props: timePickerProps): JSX.Element => {
    return (
        <Fragment>
            <DatePicker
                disableDayPicker
                format="HH:mm"
                value={props.value || ""}
                onChange={props.onChange}
                plugins={[
                    <TimePicker hideSeconds />
                ]}
            />
        </Fragment>
    )
}

export default TimePickerItem
