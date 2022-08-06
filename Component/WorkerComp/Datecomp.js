import React from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DateComp({setdate,onSet}){
    var currentDate=new Date();
  
  var appDate=new Date(currentDate);
    const onChange = (even, selectedDate) => {
     var months = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
        if (even.type == "set") {
          // month day year
          var month1=selectedDate.toDateString().split(" ")[1].toLowerCase();
          var year=selectedDate.toDateString().split(" ")[3];
          var month=months.indexOf(month1);
          var day=selectedDate.toDateString().split(" ")[2];
           //  console.log(`${year}-${month<10?`0${month}`:month}-${day}`)
            setdate(`${year}-${month<10?`0${month+1}`:month+1}-${day}`);
            //year month day
           
        } else {
          //cancel Button
          return null;
        }
        onSet()
      };
    return(
        <DateTimePicker
        testID="dateTimePicker"
       value={appDate}
        mode="date"
        is24Hour={false}
        display="default"
        onChange={onChange}
        onTouchCancel={() => onSet()}
        textColor={'red'}
        
      />
    )
}