
import styles from "./calendar.module.css";
import { format, addMonths, subMonths, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { useState } from 'react';

export default function calendar() {

  const [currentDate, setCurrentDate] = useState(new Date());
  const [dropid,setdropid]=useState(-1);
  const [selectdate,setselectdate]=useState(new Date());
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const renderHeader = () => {
    return (
      <div className={styles.yearmonth}>
        <button onClick={prevMonth}>{'<'}</button>
        <div className={styles.month}><button> <h2>{format(currentDate, 'MMMM , yyyy')}</h2> </button></div>
        {/* <div className={styles.month}><h2>{format(currentDate, 'MMMM , yyyy')}</h2></div> */}
        {/* <span>{format(currentDate, 'MMMM yyyy')}</span> */}
        <button onClick={nextMonth}>{'>'}</button>
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    // const rows = [];
    let days = [];
    let day = startDate;

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        let addclass="";
        let drop=styles.dropnone;
        let dropbutton="dropbutton";
        if(!isSameMonth(day, monthStart)){
           addclass=styles.disabled;
        }
        else if(isSameDay(day, new Date()) ){
          addclass=styles.today;
        }
        else if(isSameDay(day, selectdate)){
          addclass=styles.selectdate;
        }
        if(dropid==day){
          drop=styles.dropitem;
          dropbutton=styles.dropnone;
        }
        
        

        days.push(
          <div className={styles.cal}>
            <div key={day} >
              <div className={styles.addnew}>
                 <button className={dropbutton} value={day} onClick={()=>{
                   setdropid(event.target.value);
                  //  console.log(day);
                  //  alert(event.target.value);
                 }} >...</button>
                 <div className={drop}>
                    <a href="">Add Appointment</a>
                    <hr></hr>
                    <a href="">Add Time off</a>
                 </div>
                 
                 <div className={addclass} id={day} onClick={()=>{
                  setselectdate(event.target.id);
                 }}>
                  {format(day, 'd')}
                  </div>
                 
              </div>
              {/* {format(day, 'd')} */}
            </div>
            
            <div className={styles.submeeting}>
              <div className={styles.smtime}>1:15pm</div>
              <div className={styles.smline}>-</div>
              <div className={styles.smname}>chicku</div>
              <div className={styles.smduration}>(30 min Meeting)</div>
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      // rows.push(
      //   <div key={day} className={styles.row}>
      //     {days}
      //   </div>
      // );
      // days = [];
    }

    return days;
  };


  return (
    <main className={styles.main}>
      <div>
        
        
         {renderHeader()}
         

        <div className={styles.container}>
           <div className={styles.date}>
           <div className={styles.day}><div>Sun</div></div>
           <div className={styles.day}>
            <div>Mon</div>
           </div>
          <div className={styles.day}><div>Tue</div></div>
          <div className={styles.day}><div>Wed</div></div>
          <div className={styles.day}><div>Thu</div></div>
          <div className={styles.day}><div>Fri</div></div>
          <div className={styles.day}><div>Sat</div></div>
         

          {renderCells()}
           </div>
        </div>
        </div>
        <div className={styles.formobile}>
             <div className={styles.schedule}>
                <div className={styles.sch_left}>
                  <h2>Academic Calender</h2>
                  <div className={styles.dt_time}><p>21-02-2024</p><li>3:15 pm</li></div>
                  <li>15min</li>
                </div>
                <div className={styles.sch_right}>
                  <ul>
                      <li className={styles.imp}>Important</li>
                      <li className={styles.status}>Online</li>
                      <li className={styles.resch}>Reschedule</li>
                  </ul>
                </div>
              </div>
        </div>
    </main>
  );
}