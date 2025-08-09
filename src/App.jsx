import './App.css'
import {useEffect, useState} from "react";

const tg = window.Telegram.WebApp

function App() {
    const [data, setData] = useState([])
    console.log(tg.initData)

    useEffect(() => {
        // tg.on('close', onClose)
        tg.ready();
    }, [])

    const onClose = () => {
        setData(tg.initData)

        setTimeout(() => {
            tg.close()
        }, [5000])
    }

  return (
      <div className="container">
          <div>{data}</div>
          <button className="button" onClick={onClose}>
              Ping admin
          </button>
      </div>
  )
}

export default App
