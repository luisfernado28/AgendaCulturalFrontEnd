

import { Fragment } from 'react'
import DatePicker from 'react-multi-date-picker'

interface calendarProps {
    value: any,
    onChange: (e: any) => void
    rangeOrMultiuple: string,
}

const CalendarItem = (props: calendarProps): JSX.Element => {
    const multipleDates= props.rangeOrMultiuple === "false" ? true:false
    return (
        <Fragment>
            <DatePicker
                value={props.value || ""}
                onChange={props.onChange}
                multiple= {multipleDates} //For multiple dates 
                range= {!multipleDates}// For range 

            />
        </Fragment>
    )
}

export default CalendarItem
