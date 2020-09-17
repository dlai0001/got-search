import React from 'react'
import PageWrapper from '../components/PageWrapper'
import { useFavorites } from '../controllers/favorites-controller'
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom'
import CharacterListRow from '../components/CharacterListRow'
import CharacterModal from './CharacterModal'

const Favorites = () => {
    const routeMatch = useRouteMatch()
    const history = useHistory()
    const favorites = Object.values(useFavorites())

    const handleClose = () => {
        history.push(routeMatch.path)
    }

    return (
        <PageWrapper>
            <h1>Favorites</h1>
            {
                favorites.map(character => <Link to={`/favorites/${character.slug}`}>
                    <CharacterListRow key={character.slug} character={character} />
                </Link>)
            }
            <br />

            <Route path="/favorites/:charId" >
                <CharacterModal onClose={handleClose} />
            </Route>
        </PageWrapper>
    )
}

export default Favorites