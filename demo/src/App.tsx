import React, { Component } from 'react'
import './App.css'
import Welcome from './Welcome'
import Counter from './Counter'

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Welcome />
                    <Counter />
                </header>
            </div>
        )
    }
}

export default App
