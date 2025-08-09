import './App.css'
import {useEffect, useState} from "react";

const tg = window.Telegram.WebApp

function App() {
    const [data, setData] = useState([])
    console.log(tg.initData)

    useEffect(() => {
        tg.ready();
    }, [])

    const onPing = async () => {
        const user = tg.initData;

        if (!user) {
            alert('User not found');
            return;
        }

        const payload = {
            chatId: tg.initDataUnsafe?.user.id,
            username: tg.initDataUnsafe?.user.first_name,
            role: 'CLIENT',
        };

        setData(`Data sending...`);

        try {
            const response = await fetch('https://c6f39e95ba82.ngrok-free.app/ping', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Something went wrong!');
            }

            const result = await response.json();
            setData(`Sending success: ${JSON.stringify(result)}`);
        } catch (err) {
            console.error(err);
            setData('Something went wrong: ', JSON.stringify(err));
        }

        setTimeout(() => {
            tg.close();
        }, 5000);
    };

    return (
      <div className="container">
          <div>{data}</div>
          <button className="button" onClick={onPing}>
              Ping admin
          </button>
      </div>
    )
}

export default App
