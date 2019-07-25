// import React, { Component } from 'react';
// import GridMDC from "./components/GridMDC";
// import PaperMDC from "./components/PaperMDC";
// import CharCard from "./components/CharCard";
// import Score from "./components/Score";
// import Alert from "./components/Alert";
// import NavBar from "./components/NavBar";
// import BottomNavMDC from "./components/BottomNavMDC";
// import characters from "./characters.json";

// class App extends Component {

//   state = {
//     characters: characters,
//     pickedChars: [],
//     topScore: 0,
//     alertMessage: ""
//   }

//   handlePicked = event => {

//     const name = event.target.attributes.getNamedItem("name").value;
//     this.shuffleCharacters()
//     this.checkGuess(name, this.updateTopScore)
//   }

//   shuffleCharacters = () => {
//     this.setState(this.state.characters = this.shuffleArray(this.state.characters))
//   }

//   shuffleArray = (a) => {
//     console.log(a);
//     var j, x, i;
//     for (i = a.length - 1; i > 0; i--) {
//       j = Math.floor(Math.random() * (i + 1));
//       x = a[i];
//       a[i] = a[j];
//       a[j] = x;
//     }
//     return a;
//   }

//   checkGuess = (name, cb) => {
//     const newState = { ...this.state };
//     if (newState.pickedChars.includes(name)) {
//       newState.alertMessage = `PFFT!`
//       newState.pickedChars = []
//       this.setState(this.state = newState)
//     } else {
//       newState.pickedChars.push(name)
//       newState.alertMessage = `THWIP!`
//       this.setState(this.state = newState)
//     }
//     cb(newState, this.alertWinner)
//   }

//   updateTopScore = (newState, cb) => {
//     if (newState.pickedChars.length > newState.topScore) {
//       newState.topScore++
//       this.setState(this.state = newState)
//     }
//     cb(newState)
//   }

//   alertWinner = (newState) => {
//     if (newState.pickedChars.length === 12) {
//       newState.alertMessage = "EXCELSIOR! YOU WIN TRUE-BELIEVER!!!";
//       newState.pickedChars = [];
//       this.setState(this.state = newState)
//     }
//   }

//   render() {
//     return (
//       <div>
//         <NavBar style={{ background: "#313133", marginBottom: "5px" }} />

//         <GridMDC container direction="column" style={{ margin: "0 auto", maxWidth: 945 }}>

//           <GridMDC item lg={12}>
//             <PaperMDC>
//               {this.state.alertMessage === "THWIP!" ? (
//                 <Alert message={this.state.alertMessage} style={{ color: "green" }} />
//               ) : (
//                   <Alert message={this.state.alertMessage} style={{ color: "red" }} />
//                 )}
//             </PaperMDC>
//           </GridMDC>

//           <GridMDC container justify="space-between">

//             <GridMDC item lg={6} md={6} sm={12} xs={12}>
//               <PaperMDC>
//                 <Score type="Score" score={this.state.pickedChars.length} />
//               </PaperMDC>
//             </GridMDC>

//             <GridMDC item lg={6} md={6} sm={12} xs={12}>
//               <PaperMDC>
//                 <Score type="Top Score" score={this.state.topScore} />
//               </PaperMDC>
//             </GridMDC>

//           </GridMDC>

//         </GridMDC>

//         <GridMDC container spacing={24} justify="center" style={{ maxWidth: 945, margin: "0 auto" }}>
//           {this.state.characters.map(char => (
//             <GridMDC item lg={3} md={3} sm={4} xs={6}>
//             <CharCard
//               id={char.id}
//               name={char.name}
//               image={char.image}
//               key={char.id}
//               handlePicked={this.handlePicked}
//             />
//             </GridMDC>
//           ))}
//         </GridMDC>
//         <BottomNavMDC style={{ background: "#313133", marginTop: "17.5px", paddingTop: "15px", borderTop: "2.5px solid slategray" }}>
//           <a href="https://github.com/GeorgeSchlosser/spider-click" target="_blank" className="link" alt="clicky-game-github-link"><i className="fa fa-github fa-2x"></i></a>
//         </BottomNavMDC>

//       </div>
//     )
//   }
// }

// Alternative App

import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import "./app.css";
import characters from "./characters.json";
import Row from "./components/row/Row";
import BottomNavMDC from "./components/BottomNavMDC";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: characters,
      score: 0,
      topScore: 0,
      clicked: Array(12).fill(false)
    };
  }

  // Fisher-Yates shuffle on cards, update state
  shuffle = () => {
    let c = this.state.cards;
    for (let i = c.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [c[i], c[j]] = [c[j], c[i]];
    }
    this.setState({
      cards: [...c]
    })
  }
  // Check the clicked array for an id
  findId = id => {
    return this.state.clicked.find(elem => {
      return elem === id && true;
    });
  }
  // Return the index of where the first null(empty space in clicked array) is found
  returnFirstNull = () => {
    return this.state.clicked.indexOf(false);
  }
  // Insert id into clicked array
  insertId = (id, index) => {
    this.setState({
      clicked: this.state.clicked.map((elem, i) => {
      return i === index ? id : elem;
    })
    });
  }
  // Clear clicked array
  emptyClicked = () => {
    this.setState({
      clicked: Array(12).fill(false)
    });
  }
  // Reset the score
  resetScoreZero = () => {
    this.setState({
      score: 0
    });
  }
  // Increment both the scores (setState is async...)
  incrementBothScores = () => {
    this.setState({
      score: this.state.score + 1,
      topScore: this.state.topScore + 1
    });
  }
  // increment just the score
  incrementScore = () => {
    this.setState({
      score: this.state.score + 1
    });
  }
  // Main game logic here
  handleClick = event => {
    const id = event.target.id;
    if (this.findId(id) !== undefined) {
      // It has already been clicked!
      alert("You lose");
      // Reset the counters...
      this.emptyClicked();
      this.resetScoreZero();
      // reshuffle
      this.shuffle();
    }
    else {
      // Not already clicked...
      // Put the id in the clicked array
      this.insertId(id, this.returnFirstNull());
      // Is the top score bigger than the score?
      if (this.state.topScore > this.state.score) {
        // Update only the score
        this.incrementScore();
      }
      else {
        // Update both because they're the same
        this.incrementBothScores();
      }
      // Shuffle the array
      this.shuffle();
      // Check for win
      if (this.returnFirstNull() === 11) {
        // You win! Reset stuff
        alert("You win!");
        this.emptyClicked();
        this.resetScoreZero();
      }
    }
  }

  render() {

    return (
      <>
        <AppBar position="fixed" color="secondary">
          <nav className="navbar navbar-default myNavColor">
            <div className="container-fluid">
              <div className="navbar-header">
                {/* <Typography variant="h4"  className="navbar-brand whiteText impactFont">
                  Spider-Click
                </Typography> */}
                <h2 className="whiteText impactFont">SPIDER-CLICK</h2>
              </div>

              <ul className="nav navbar-nav whiteText">
                <li>
                  <h4>Current Score: {this.state.score} || High Score: {this.state.topScore}</h4>
                </li>
              </ul>
            </div>
          </nav>
        </AppBar>
        <div id="main-content" className="container">
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i < 4 && <Row {...card} handleClick={this.handleClick} key={i} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 3 && i < 8 && <Row {...card} handleClick={this.handleClick} key={i} />
              ))
            }
          </div>
          <div className="row">
            {
              this.state.cards.map((card, i) => (
                i > 7 && <Row {...card} handleClick={this.handleClick} key={i} />
              ))
            }
          </div>
        </div>
        <BottomNavMDC style={{ background: "#C0000B", marginTop: "17.5px", paddingTop: "15px", borderTop: "2.5px solid slategray" }}>
          <a href="https://github.com/GeorgeSchlosser/spider-click" target="_blank" rel="noopener noreferrer" className="link" alt="clicky-game-github-link"><i className="fa fa-github fa-2x"></i></a>
        </BottomNavMDC>

      </>
    );
  }

}
export default App;