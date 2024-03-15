
import axios from "axios";
import "./calendar.css";
import { format, addMonths, subMonths, startOfWeek, endOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth, isSameDay } from 'date-fns';
import { useState, useEffect, useRef } from 'react';
import { useUserInfo } from "../../contexts/Login";
import DeleteIcon from '@mui/icons-material/Delete';
// import { responsiveFontSizes } from "@mui/material";

export default function Calendar() {
  const token = localStorage.getItem("token");
  const popRef = useRef();
  const [popNote, setpopNote] = useState(false);
  const [item, setItem] = useState("");
  const url = "http://localhost:4000"
  const { user, setUser, isLogged, setLogged } = useUserInfo();
  // console.log(user);



  const [currentDate, setCurrentDate] = useState(new Date());
  const [dropid, setdropid] = useState(-1);
  const [selectdate, setselectdate] = useState(new Date());
  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };


  useEffect(() => {
    async function checkSignin() {
      try {

        const response = await axios.get(url + `/api/auth?token=${token}`);
        // console.log(response.data)
        setUser(response.data.token);
        setLogged(response.data.login)

      } catch (err) {
        console.log(err);
      }
    }
    checkSignin();
  }, [])

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };
  const renderHeader = () => {
    return (
      <div className="yearmonth">
        <button onClick={prevMonth}>{'<'}</button>
        <div className="month"><button> <h2>{format(currentDate, 'MMMM , yyyy')}</h2> </button></div>
        {/* <div className={month}><h2>{format(currentDate, 'MMMM , yyyy')}</h2></div> */}
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
        let addclass = "";
        let drop = "dropnone";
        let dropbutton = "dropbutton";
        if (!isSameMonth(day, monthStart)) {
          addclass = "disabled";
        }
        else if (isSameDay(day, new Date())) {
          addclass = "today";
        }
        else if (isSameDay(day, selectdate)) {
          addclass = "selectdate";
        }
        if (dropid == day) {
          drop = "dropitem";
          dropbutton = "dropnone";
        }



        days.push(
          <div className="cal" id={day} key={day} style={{ cursor: "pointer" }} onClick={(event) => {
            console.log(event.target.id);
            setselectdate(event.target.id);
            setpopNote(true)
          }} >
            <div key={day} >
              <div className='addnew' >


                <div className={addclass} key={day} id={day} >
                  {format(day, 'd')}
                </div>

              </div>
              {/* {format(day, 'd')} */}
            </div>


          </div>
        );
        day = addDays(day, 1);
      }
      // rows.push(
      //   <div key={day} className={ row}>
      //     {days}
      //   </div>
      // );
      // days = [];
    }

    return days;
  };





  useEffect(() => {
    let handler = (e) => {
      if (!popRef.current.contains(e.target)) {
        setpopNote(false)
        document.querySelectorAll(".note").forEach((item) => {
          item.style.filter = "brightness(100%)";
        })
      }
      else {
        if (popNote) {
          document.querySelectorAll(".note").forEach((item) => {
            item.style.filter = "brightness(20%)";
          })
        }
      }
    }
    document.addEventListener("mousedown", handler)

    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })

  const d = format(selectdate, 'd');
  // const d=0;
  const obj = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12"
  }
  const m = format(selectdate, 'MMM');
  const y = format(selectdate, 'yyy');
  // console.log(d+" "+m+" "+" "+y+" MNIN"+obj[m])
  const itemdate = d + "-" + obj[m] + "-" + y;

  const poptodo =()=>{
    let tododata=[]
    user.todo?.map((item => {
              
      if (item.date == itemdate) {
        
        item.items.map((list) => {
          console.log(list);
          // return (
            // <>
            let index=0;
            tododata.push(
              <div className="Item" >
                <input type="checkbox" />
                <p>{list}</p>
                <div className="ItemButton" id={index} onClick={(event)=>{
                  console.log(event.target);
                }}><DeleteIcon /></div>
              </div>
            );
              index++;
            {/* </> */}
          // )
        })
      }

    }))
    return tododata;
  }


  return (
    <main className="main">
      <div>


        {renderHeader()}


        <div className='container'>
          <div className='date'>
            <div className='day'><div>Sun</div></div>
            <div className='day'>
              <div>Mon</div>
            </div>
            <div className='day'><div>Tue</div></div>
            <div className='day'><div>Wed</div></div>
            <div className='day'><div>Thu</div></div>
            <div className='day'><div>Fri</div></div>
            <div className='day'><div>Sat</div></div>


            {renderCells()}
          </div>
        </div>
      </div>
      <div className='formobile'>
        <h1>last part</h1>
      </div>




      <div ref={popRef} className={`pop-up ${popNote ? 'active' : 'inactive'}`} >
        <form className="calendar-form">

          <div className="addItem">
            <input
              className="createArea"
              name="title"
              value={item}
              onChange={(e) => {
                setItem(e.target.value)
                console.log(item)
              }}
              placeholder="Add Item"
              spellCheck="false"
            />


            <button onClick={async (e) => {
              e.preventDefault();
              // console.log(item);

              console.log(itemdate)
              try {
                const response = await axios.get(url + `/edit-todo?id=${user._id}&item=${item}&date=${itemdate}`)
                console.log(response.data.result);
                setUser(response.data.result);
              } catch (err) {
                console.log(err)
              }
              setItem("")

            }} >+</button>

          </div>

          {
            poptodo()
          }

        </form>
      </div>
    </main>
  );
}