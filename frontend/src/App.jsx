import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Levels from './Components/Levels'
import Flag from './Components/Flag'
import Available from './Components/Available'
import Navbar from './Components/Navbar'
import Score from './Components/Score'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Loading from './Components/Loading'
import { useEffect, useState } from 'react'





function App() {
  const [solved, setsolved] = useState([])
  const [info, setinfo] = useState({})
  const [leveling, setlevel] = useState([])
  const [loading, setload] = useState(true)


  useEffect(() => {
    async function solves() {
      const interval = setInterval(async () => {
        try {
          const res = await fetch("http://localhost:3000/solved", {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json"
            }
          });

          const response = await res.json();
          if (response.success) {

            setinfo(response.solved);
            setlevel(response.level);
            setsolved(response.already_solved);
            clearInterval(interval)
          }
        } catch (err) {
          console.error("Fetch failed:", err);
        }
      }, (1000));

    }

    solves();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch("http://localhost:3000/health", { method: "GET" });
        if (res.ok) {
          setload(false)
          await tool();
          clearInterval(interval);
        }
      } catch { }
    }, 2000);

    return () => {
      clearInterval(interval)
    };
  }, []);




  const Router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar points={info.points} username={info.name} /><Levels leveling={leveling} /></>
    },
    {
      path: "/flags",
      element: <><Navbar points={info.points} username={info.name} /><Flag flags={solved} points={info.points} score={info.score}/></>
    },
    {
      path: '/scoreboard',
      element: <><Navbar points={info.points} username={info.name} /><Score /></>
    },
    {
      path: '/login',
      element: <><Navbar points={info.points} username={info.name} /><Login /></>
    },
    {
      path: '/unavailable',
      element: <><Navbar points={info.points} username={info.name} /><Available /></>
    },
    {
      path: "/logout",
      element: <Logout />
    }
  ])

  if (loading) {
    return(<Loading/>)
  }
    return (
      <RouterProvider router={Router} />
    )

}

export default App
