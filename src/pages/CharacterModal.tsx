import { CircularProgress, Dialog, DialogTitle } from '@material-ui/core'
import React, { FunctionComponent } from 'react'
import { useQuery } from 'react-query'
import { useRouteMatch } from 'react-router-dom'
import FavoriteButton from '../components/FavoriteButton'
import characterFromObj from '../libs/utils/characterFromObj'
import queryService from '../services/queryService'

type CharacterModalProps = {
    onClose?: () => any,
}

const CharacterModal: FunctionComponent<CharacterModalProps> = ({onClose}) => {
    const routeMatch = useRouteMatch<{charId: string}>()
    const characterId = routeMatch.params?.charId

    console.debug('CharacterID', characterId)
    

    const { isLoading, isError, data } = useQuery(['getChar', characterId], getChar)
    const character: Character = data as Character

    const handleClose = () => {
        onClose && onClose()
    }

    if(isLoading) {
        return (
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
                <div style={{display: "flex", alignItems:"center", flexDirection: "column"}}>
                    <h3>Loading...</h3>
                    <CircularProgress />
                </div>
            </Dialog>    
        )
    }

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={true}>
            <DialogTitle >{character.name || '(Unnamed)'}  <FavoriteButton character={character}/></DialogTitle>
            
            <div style={{padding: "1em"}}>
                <img src={character.image} alt={character.name}/><br/>
                Actor: {character.actor}<br/>                
                Gender: {character.gender}<br/>                
                Alive: {character.alive?'yes': 'no'}<br/>                
            </div>
        </Dialog>
    )
}

const getChar = async (key: 'getChar', slug: string) => {

    const url = `https://api.got.show/api/show/characters/bySlug/${slug}/`
    const result = await queryService.fetch(url)

    if (result.ok) {        
        const character = characterFromObj(await result.json())

        return character
    } else {
        throw new Error('Failed to fetch data from server.')
    }
}

export default CharacterModal