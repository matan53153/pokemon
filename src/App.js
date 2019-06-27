import React, { Component } from 'react'
import Block from "./Components/Block.js"
import getDamageFromAttack from "./Components/getDamageFromAttack"
import './Components/App.css'

const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      currentView: true,
      pokemon: {},
      myCards: [],
      searchCards: [],
      myPoke: false
    }
    this.removeAll = this.removeAll.bind(this)
    this.test = this.test.bind(this) 
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/cards")
      .then(response => response.json())
      .then(answer => {
        this.setState({
          pokemon: answer.cards
        })
      })
  }

  removeAll = () => {
    this.setState({
      ...this.state,
      currentView: false,
      myPoke: true
    })
  }

  test = (eachCard) => ({ target }) => {
    const { id, value } = target
    const myCards = this.state.myCards
    myCards.push(eachCard)
    this.setState({
      myCards: myCards,
      searchCards: this.state.searchCards.filter((searched) => searched != eachCard)
    })
  }

  testOther = (eachCard) => ({ target }) => {
    const { id, value } = target
    const searchCards = this.state.searchCards
    searchCards.unshift(eachCard)
    this.setState({
      searchCards: searchCards,
      myCards: this.state.myCards.filter((mine) => mine != eachCard)
    })
  }

  addAll = () => {
      this.setState({
      ...this.state,
      currentView: true,
      myPoke: false
    })
  }

  changeView = (e) => {
    let search = e.target.value
    let searched = [];
    this.state.pokemon.map(function(eachCard) {
        if (eachCard.name.search(search) != -1) {
          if (searched === 0) {
            return 0
          } else {
            searched.push(eachCard)
          }
        }
        })
        this.setState({
          searchCards: searched
        })
  }

  render() {
    const that = this
    return (
      <div className="App" onScroll={this.scrollList}>
        {this.state.currentView === true && 
        <div>
          <header className="Header" onClick={this.removeAll}>All pokemon</header>
          <p className="small">Click to change view</p>
          <input className="SearchBar" type="text" placeholder="Search.." onChange={this.changeView}></input>  
        </div>}
        {this.state.currentView === false && 
        <header onClick={this.addAll}>Pokedex</header>
        }
        <div >
        {this.state.myPoke === true && 
          <div>
          {this.state.myCards.map(function(eachCard) {
            const result = getDamageFromAttack(eachCard)
            return (<div  className="Separate">
                <Block
                  Current = {that.state.myPoke}
                  id = {eachCard.id}
                  onClick={that.testOther(eachCard)}
                  value= 'value'
                  weaknesses = {result.weak}
                  attacks = {result.atk} 
                  hp = {result.hp} 
                  name = {eachCard.name} 
                  imageUrl = {eachCard.imageUrl}
                  happiness = {result.level}
                />
            </div>)
          })}
        </div>
        }
        </div>
        <div >
        {this.state.currentView === true && 
          <div >
          {this.state.searchCards.map(function(eachCard) {
            const result = getDamageFromAttack(eachCard)
            return (<div className="Separate">
                <Block
                  Current = {that.state.myPoke}
                  id = {eachCard.id}
                  value= 'value'
                  onClick={that.test(eachCard)}
                  weaknesses = {result.weak}
                  attacks = {result.atk} 
                  hp = {result.hp} 
                  name = {eachCard.name} 
                  imageUrl = {eachCard.imageUrl}
                  happiness = {result.level}
                />
            </div>)
          })}
        </div>
        }
        </div>
      </div>
      )
  }
}

export default App
