import React, { useState, createRef, useMemo } from 'react'

import Picker from 'react-month-picker'
import MonthBox from 'components/monthBox/monthBox'
import './monthPicker.css'

//To Do

// • Get all year and month values of post dates. -// Done
// • Use those dates to set 'Picker' "years" -// Done
// • function 'handleAMonthChange' will set the month to search by -// Done
// • - add another 'where' condition to filter in 'queries' 
// • Tidy up CSS
// • add SASS
// • add if statement to show the date as 'filter by date' instead of selected date initially

export default function monthPicker({
    dates
}) {
    const dateYear = ['']

    {dates && 
        dateYear.shift()
        dates.map(date => {
            const years = parseInt(date.split('-')[0])
            if (!dateYear.includes(years)) {
                dateYear.push(years)
            }
        })
    }

    const [selectedYearMonth, setSelectedYearMonth] = useState('')

    const [singleValue, setSingleValue] = useState({
        year: 2020,
        month: 11
    })

    const pickAMonth = createRef()

    const pickerLang = {
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    }
    
    const makeText = m => {
        if (m && m.year && m.month) return (pickerLang.months[m.month-1] + '. ' + m.year)
        return '?'
    }

    const handleClickMonthBox = () => {
        pickAMonth.current.show()
    }
    const handleAMonthDismiss = value => {
        setSingleValue(value)
    }
    const handleAMonthChange = (value, text) => {
        setSelectedYearMonth((value + '-' + text).toString())
    }

    return (
        <ul>
            <li>
                <div className="edit">
                    <Picker
                        ref={pickAMonth}
                        years={dateYear}
                        value={singleValue}
                        lang={pickerLang.months}
                        onChange={handleAMonthChange}
                        onDismiss={handleAMonthDismiss}
                    >
                        <MonthBox value={makeText(singleValue)} onClick={handleClickMonthBox} />
                    </Picker>
                </div>
            </li>
        </ul>
    )
}