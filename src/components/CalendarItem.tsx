/*
 * File: CalendarItem.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
import { Fragment } from 'react'
import DatePicker from 'react-multi-date-picker'

const months = [
    ["Enero", "e"], 
    ["Febrero", "f"],
    ["Marzo", "m"],
    ["Abril", "a"],
    ["Mayo", "m"],
    ["Junio", "j"],
    ["Julio", "j"],
    ["Agosto", "a"],
    ["Septiembre", "s"],
    ["Octubre", "o"],
    ["Noviembre", "n"],
    ["Diciembre", "d"],
  ]
  const weekDays = [
    ["Domingo", "Dom"], 
    ["Lunes", "Lun"],
    ["Martes", "Mar"],
    ["Miercoles", "Mier"],
    ["Jueves", "Jue"],
    ["Viernes", "Vie"],
    ["Sabado", "Sab"],
  ]
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

                weekDays={weekDays}
                months={months}
            />
        </Fragment>
    )
}

export default CalendarItem
