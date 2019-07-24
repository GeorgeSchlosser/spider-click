import React, { Component } from 'react';
import GridMDC from "./components/GridMDC";
import PaperMDC from "./components/PaperMDC";
import CharCard from "./components/CharCard";
import Score from "./components/Score";
import Alert from "./components/Alert";
import NavBar from "./components/NavBar";
import BottomNavMDC from "./components/BottomNavMDC";
import characters from "./characters.json";

class App extends Component {

  state = {
    characters: characters,
    pickedChars: [],
    topScore: 0,
    alertMessage: ""
  }

  handlePicked = event => {

    const name = event.target.attributes.getNamedItem("name").value;
    this.shuffleCharacters()
    this.checkGuess(name, this.updateTopScore)
  }

  shuffleCharacters = () => {
    this.setState(this.state.characters = this.shuffleArray(this.state.characters))
  }

  shuffleArray = (a) => {
    console.log(a);
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
    }
    return a;
  }

  checkGuess = (name, cb) => {
    const newState = { ...this.state };
    if (newState.pickedChars.includes(name)) {
      newState.alertMessage = `PFFT!`
      newState.pickedChars = []
      this.setState(this.state = newState)
    } else {
      newState.pickedChars.push(name)
      newState.alertMessage = `THWIP!`
      this.setState(this.state = newState)
    }
    cb(newState, this.alertWinner)
  }

  updateTopScore = (newState, cb) => {
    if (newState.pickedChars.length > newState.topScore) {
      newState.topScore++
      this.setState(this.state = newState)
    }
    cb(newState)
  }

  alertWinner = (newState) => {
    if (newState.pickedChars.length === 12) {
      newState.alertMessage = "EXCELSIOR! YOU WIN TRUE-BELIEVER!!!";
      newState.pickedChars = [];
      this.setState(this.state = newState)
    }
  }

  render() {
    return (
      <div>
        <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

        <GridMDC container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

          <GridMDC item lg={12}>
            <PaperMDC>
              {this.state.alertMessage === "THWIP!" ? (
                <Alert message={this.state.alertMessage} style={{ color: "green" }} />
              ) : (
                  <Alert message={this.state.alertMessage} style={{ color: "red" }} />
                )}
            </PaperMDC>
          </GridMDC>

          <GridMDC container justify="space-between">

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
              <PaperMDC>
                <Score type="Score" score={this.state.pickedChars.length} />
              </PaperMDC>
            </GridMDC>

            <GridMDC item lg={6} md={6} sm={12} xs={12}>
              <PaperMDC>
                <Score type="Top Score" score={this.state.topScore} />
              </PaperMDC>
            </GridMDC>

          </GridMDC>

        </GridMDC>

        <GridMDC container spacing={24} justify="center" style={{ maxWidth: 945, margin: "0 auto" }}>
          {this.state.characters.map(char => (
            <GridMDC item lg={3} md={3} sm={4} xs={6}>
            <CharCard
              id={char.id}
              name={char.name}
              image={char.image}
              key={char.id}
              handlePicked={this.handlePicked}
            />
            </GridMDC>
          ))}
        </GridMDC>
        <BottomNavMDC style={{ background: "#313133", marginTop: "17.5px", paddingTop: "15px", borderTop: "2.5px solid slategray" }}>
          <a href="https://github.com/GeorgeSchlosser/spider-click" target="_blank" className="link" alt="clicky-game-github-link"><i className="fa fa-github fa-2x"></i></a>
        </BottomNavMDC>

      </div>
    )
  }
}

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
export default App;