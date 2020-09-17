import React, { createContext, FunctionComponent, useState, useEffect, useContext } from 'react'
import storageService from '../services/storageService'

type FavoritesMap = {
    [key: string]: Character,
}

interface FavoritesAction {
    (character: Character): void
}

type FavoriteContextProps = {
    favorites: FavoritesMap,
    actions: {
        add: FavoritesAction,
        remove: FavoritesAction,
    }
}

const favoritesContext = createContext<FavoriteContextProps>({
    favorites: {},
    actions: {
        add: () => { },
        remove: () => { },
    }
})

interface FavoitesAction {
    (character: Character): void
}

const FAVORITES_STORAGE_KEY = 'favorites'

export const FavoritesProvider: FunctionComponent = ({ children }) => {

    const [favorites, setFavorites] = useState<FavoritesMap>()

    useEffect(() => {
        if (!favorites) {
            console.debug('init favorites')

            const fav = storageService.get<FavoritesMap>(FAVORITES_STORAGE_KEY)
            setFavorites(fav ?? {})
        }
    }, [favorites])

    const addFavorite: FavoitesAction = (character: Character) => {        
        console.debug('addFavorite', character)

        setFavorites(current => {
            const updatedFavorites = Object.assign({}, current)
            updatedFavorites[character.slug] = character

            storageService.set<FavoritesMap>(FAVORITES_STORAGE_KEY, updatedFavorites)

            return updatedFavorites
        })        
    }

    const removeFavorite: FavoitesAction = (character: Character) => {        
        console.debug('removeFavorite', character)

        setFavorites(current => {
            const updatedFavorites = Object.assign({}, current)

            if (updatedFavorites && updatedFavorites[character.slug]) {
                delete updatedFavorites[character.slug]
            }

            storageService.set<FavoritesMap>(FAVORITES_STORAGE_KEY, updatedFavorites)

            return updatedFavorites
        })
    }

    return (
        <favoritesContext.Provider value={
            {
                favorites: favorites || {},
                actions: {
                    add: addFavorite,
                    remove: removeFavorite,
                }
            }
        }>
            {children}
        </favoritesContext.Provider>
    )
}

type FavoritesAcitions = {
    addFavorite: (character: Character) => void,
    removeFavorite: (character: Character) => void,
}

export const useFavorites = (): FavoritesMap => {
    const {
        favorites,
    } = useContext(favoritesContext)

    return favorites
}

export const useFavoritesController = (character: Character) => {

    const {
        favorites,
        actions,
    } = useContext(favoritesContext)

    const isFavorite = !!favorites[character.slug]

    const favorite = () => {
        actions.add(character)
    }

    const unfavorite  = () => {
        actions.remove(character)
    }

    return {
        isFavorite,
        actions: {
            favorite,
            unfavorite,
        }
    }
}

