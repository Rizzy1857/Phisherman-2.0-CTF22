import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Levels from './Components/Levels'
import Flag from './Components/Flag'
import Level2 from './Components/Level2'
import Level3 from './Components/Level3'
import Level4 from './Components/Level4'
import Available from './Components/Available'
import Navbar from './Components/Navbar'
import Score from './Components/Score'
import Login from './Components/Login'
import Logout from './Components/Logout'
import Loading from './Components/Loading'
import Transmission from './Components/Transmission'
import { useEffect, useState } from 'react'
import config from './config'





function App() {
  const [solved, setsolved] = useState([])
  const [info, setinfo] = useState({})
  const [leveling, setlevel] = useState([])
  const [loading, setload] = useState(true)
  const [level2Hints, setlevel2Hints] = useState([])


  useEffect(() => {
    console.log("🚀 [DEBUG] Current API URL:", config.API_BASE_URL);
    async function solves() {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`${config.API_BASE_URL}/solved`, {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('token')}`
            }
          });

          const response = await res.json();
          if (response.success) {

            setinfo(response.solved);
            setlevel(response.level);
            setsolved(response.already_solved);
            setlevel2Hints(response.level2Hints || []);
            clearInterval(interval)
          }
        } catch (err) {
          console.error("Fetch failed:", err);
        }
      }, (5000)); // Increased from 1s to 5s

    }

    solves();
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`${config.API_BASE_URL}/health`, { method: "GET" });
        if (res.ok) {
          setload(false)
          clearInterval(interval);
        }
      } catch { }
    }, 5000); // Increased from 2s to 5s

    return () => {
      clearInterval(interval)
    };
  }, []);




  const Router = createBrowserRouter([
    {
      path: "/",
      element: <><Navbar points={info.score} username={info.name} /><Levels leveling={leveling} /></>
    },
    {
      path: "/flags",
      element: <><Navbar points={info.score} username={info.name} /><Flag flags={solved} points={info.score} score={info.score} /></>
    },
    {
      path: "/level2",
      element: <><Navbar points={info.score} username={info.name} /><Level2 userInfo={info} level2Solved={solved.includes(4)} /></>
    },
    {
      path: "/level3",
      element: <><Navbar points={info.score} username={info.name} /><Level3 userInfo={info} level3Solved={solved.includes(5)} /></>
    },
    {
      path: "/level4",
      element: <><Navbar points={info.score} username={info.name} /><Level4 userInfo={info} level4Solved={solved.includes(6)} /></>
    },
    {
      path: '/scoreboard',
      element: <><Navbar points={info.score} username={info.name} /><Score /></>
    },
    {
      path: '/login',
      element: <><Navbar points={info.score} username={info.name} /><Login /></>
    },
    {
      path: '/unavailable',
      element: <><Navbar points={info.score} username={info.name} /><Available /></>
    },
    {
      path: "/logout",
      element: <Logout />
    },
    {
      path: "/transmission",
      element: <Transmission />
    }
  ])

  if (loading) {
    return (<Loading />)
  }
  return (
    <RouterProvider router={Router} />
  )

}

export default App
