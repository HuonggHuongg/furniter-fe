import React, { useEffect, useState } from 'react';
import { addDays, format } from 'date-fns';
import { daysInWeek } from 'date-fns/constants';
import moment from 'moment';

function DateList() {
  const [dateList, setDateList] = useState([]);

  useEffect(() => {
    const currentDate = new Date();

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = addDays(currentDate, i);
      
      const formattedDate = format(date, 'yyyy/MM/dd');
      console.log(formattedDate)
      dates.push(formattedDate);
    }

    setDateList(dates);
  }, []);

  return (
    <ul>
      {dateList.map((date, index) => (
        <li key={index}>
        <span>{date.EE} </span>
        <span>{date.dd}</span>
        </li>
      ))}
    </ul>
  );
}

export default DateList;