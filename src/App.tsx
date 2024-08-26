import './App.css'
import HomeApi from './components/HomeApi'
import BackgroundImg from './assets/images/pattern-bg-desktop.png'

function App() {

  return (
    <>
      <div className="">
          <div className="absolute -z-10">
            <img src={BackgroundImg} alt="BackgroundImg" className="object-cover w-screen h-60"/>
          </div>
        <div className="p-10 space-y-10 text-center">
          <h1 className="text-3xl font-bold text-white">
            IP Address Tracker
          </h1>
        
          <div className="">
            <HomeApi />
          </div>
          
        </div>
      </div>
    </>
  )
}

export default App
