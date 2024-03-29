import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Clock from 'react-live-clock';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText'
import { useEffect, useState } from 'react'
import { FixedSizeList as List } from 'react-window';
import useSWR from 'swr';

export default function Home({data}) {
    const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return (
    <div className={styles.container}>
    <main className={styles.main}>
        <Datetime className={styles.clock}/>
      <div className={styles.bottomsection}>
        <GetMusic/>
        <GetData className={styles.child}/>
      </div>
    </main>
    </div>
  )
}


function Datetime() {

return (
    <div>
    <GetDate/>
    <TimeGet/>
    </div>
    )
}

function TimeGet() {
    const [hasMounted, setHasMounted] = useState(false);

      useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
            <h1>Unable to Derive Time</h1>
    )
  }

return (
        <Clock
          format={'hh:mm:ssa'}
          style={{fontSize: '10em'}}
          ticking={true} />
    )
}

function GetDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const [date, setCheck] = useState(new Date());

    useEffect(() => {
        const id = setInterval(() => {
            setCheck(new Date());
        }, 30000);
        
        return () => clearInterval(id); }, [date])

    return (
        <h1 className={styles.date}> 
        {days[date.getDay()]} {months[date.getMonth()]} {date.getDate()} {date.getFullYear()}
        </h1>
    )
}

function GetData() {
    const [current, setCurrent] = useState(null);
    const [next, setNext] = useState(null);

   const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => setNext(data));
   const { input, error, isLoading } = useSWR('/api/finances/itemization', fetcher, { refreshInterval: 20000 })


   if (current != next) {
        setCurrent(next);
        console.log("Shifting Data");
    }


    if(!current) {
        return (
            <h1> WHoops</h1>
        )
    }

//Remove this to get DB again
 
return (
      <div className={styles.list}>
        <ul>
            <div className={styles.datadivider}/>
            <li> Water Plans </li>
            <li> Daily Vitamins </li>
            <li> Strech </li>
        </ul>
    </div>
)


return (
      <div className = {styles.bottomcontainer}>
        <ul className={styles.list}>
            <div className={styles.datadivider}/>
            {current.map((post) => (
                <li><span>{post.Type}</span>:
                    <span> ${post.Total.toFixed(2)}</span>
                </li>
             ))}
        </ul>
    </div>
)
}

function GetMusic() {
    const [current, setCurrent] = useState(null);

   const fetcher = (url) => fetch(url).then((res) => res.json()).then((data) => setCurrent(data));
   const { input, error, isLoading } = useSWR('/api/spotify/current-playing', fetcher, { refreshInterval: 1000 })


   if (current == null) {
        return ( <span> Loading </span>)
    }

    if (!current.isPlaying) {
        return (
                <span> Not Playing </span>
        )
    
    } else {
        return (
                <div className = {styles.playing}>
                <span> Playing: {current.title} </span> <br/>
                <span> Album:   {current.album} </span> <br/>
                <span> Artist:  {current.artist} </span>
                </div>
        )
    }

//    if(!current) {
//        return (
//            <h1> WHoops</h1>
//        )
//    }

return (
        <ul className={styles.list}>
            <div className={styles.datadivider}/>
            
        </ul>
)
}

export async function getStaticProps() {
// get the client
let mysql = require('mysql2/promise');
 var data = [];
 var dummy = [];
// create the connection to database
let connection = await mysql.createConnection({
    host     : process.env.DB_IP,
    database : 'finances',
    user     : process.env.DB_USER,
    password : process.env.DB_PASS 
});

// execute will internally call prepare and query
let [rows,fields]= await connection.execute(
  'SELECT * FROM `itemization`',[2,2]
);
    data = rows;
    console.log(data);
    return {props: {data}};
}
