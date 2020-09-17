import React, { CSSProperties, FunctionComponent } from 'react'
import FavoriteButton from './FavoriteButton'


type CharacterListRowProps = {
    character: Character,
    onClick?: (character: Character) => any,
}

const CharacterListRow: FunctionComponent<CharacterListRowProps> = ({ character, onClick }) => {


    return <div style={styles.outer}>
        <img src={character.image} style={styles.image} alt={`${character.name}`} onClick={() => onClick && onClick(character)}/>

        <div style={styles.info} onClick={() => onClick && onClick(character)}>
            <h5>{character.name || '(Unnamed)'} <FavoriteButton character={character}/></h5>
            Actor: {character.actor || 'N/A'}<br />
            House: {character.house || 'N/A'}<br />
        </div>

    </div>

}


const styles = {
    outer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-start",
    },
    image: {
        maxHeight: "5em",
        maxWidth: "5em",
        flexGrow: 0,
        flexShrink: 2,
        display: "inline-block",
    },
    info: {
        flexBasis: "20em",
        flexGrow: 1,
        flexShrink: 1,
        display: 'inline-block',
        alignSelf: 'flex-start',
        padding: '1em 2em 1em 2em',
    },

} as { [key: string]: CSSProperties }

export default CharacterListRow