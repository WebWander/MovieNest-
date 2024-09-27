import Greet from "./components/Greet"
import SearchBox from "./components/SearchBox"


function App() {
  
  return (
    <>
      <h1>Movie App</h1>
      <Greet name="Natasha"/>
      <SearchBox onChange={(text) => console.log(text)}/>
    </>
  )
}

export default App
