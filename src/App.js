import React, { Component } from 'react'
import Block from "./Components/Block.js"
import getDamageFromAttack from "./Components/getDamageFromAttack"
import './Components/App.css'
import AddBar from "./AddBar.js"

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
      currentView: false,
      pokemon: {},
      myCards: [],
      searchCards: [],
      myPoke: true
    }
    this.toggleModal = this.toggleModal.bind(this)
    this.test = this.test.bind(this) 
  }

  componentDidMount() {
    fetch("http://localhost:3030/api/cards")
      .then(response => response.json())
      .then(answer => {
        this.setState({
          pokemon: answer.cards,
          searchCards: answer.cards
        })
      })
  }

  toggleModal = () => {
    this.setState(prevState => {
      return ({
        currentView: !prevState.currentView
      })
    });
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
        <div>
          <header>Pokedex</header>
        </div>
          <div className="Contents">
          {this.state.myCards.map(function(eachCard) {
            const result = getDamageFromAttack(eachCard)
            return (
                <Block
                  type = "myPoke"
                  Current = {that.state.currentView}
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
            )
          })
        }
        </div>
        <div >
        {this.state.currentView === true &&  
        <div >
          <div className="Backdrop" onClick={this.toggleModal} />
          <div className="Modal">
          <input className="SearchBar" type="text" placeholder="Find Pokemon " onChange={this.changeView}></input>  
          <div className="Contents">
          {
            this.state.searchCards.map(function(eachCard) {
            const result = getDamageFromAttack(eachCard)
            return (
                <Block
                  Current = {that.state.currentView}
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
            )
          })}
          </div>
          </div>
        </div>
        }
        </div>
        <div className="Footer">
            <div className="Circle"  onClick={this.toggleModal}>+</div>
        </div>
      </div>
      )
  }
}

export default App
