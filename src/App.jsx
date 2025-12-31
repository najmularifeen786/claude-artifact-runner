import Artifact from './Artifact'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 flex justify-center items-start">
       {/* This container centers the artifact and gives it a nice background */}
       <div className="w-full max-w-6xl">
         <Artifact />
       </div>
    </div>
  )
}

export default App