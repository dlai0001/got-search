import React from "react"
import {
    BrowserRouter as Router,
    Route, Switch
} from "react-router-dom"
import Favorites from "./pages/Favorites"
import Home from "./pages/Home"
import "./App.css"
import { FavoritesProvider } from "./controllers/favorites-controller"




export default function App() {
    return (
        <FavoritesProvider>
            <Router>
                <div>
                    <Switch>
                        <Route path="/favorites" >
                            <Favorites />
                        </Route>
                        <Route path="/">
                            <Home />
                        </Route>
                    </Switch>
                </div>
            </Router>
        </FavoritesProvider>
    );
}

