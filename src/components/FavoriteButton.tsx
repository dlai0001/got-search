import React, { FunctionComponent, CSSProperties } from 'react'
import { StarRate, StarBorder } from '@material-ui/icons'
import { useFavoritesController } from '../controllers/favorites-controller'

type FavoriteButtonProps = {
    character: Character,
}

const FavoriteButton: FunctionComponent<FavoriteButtonProps> = ({ character }) => {
    const { isFavorite, actions } = useFavoritesController(character)


    if (isFavorite) {
        return <span onClick={e => {
            e.stopPropagation()
            e.preventDefault()
            actions.unfavorite()
        }}>
            <StarRate style={styles.favBtn} />
        </span>
    }

    return <span onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        actions.favorite()
    }}>
        <StarBorder style={styles.favBtn} />
    </span>
}

const styles = {
    favBtn: {
        color: 'lightcoral',
    }
} as { [key: string]: CSSProperties }

export default FavoriteButton