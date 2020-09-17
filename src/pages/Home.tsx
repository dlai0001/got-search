import { LinearProgress, TextField, Snackbar, Box } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import React, { CSSProperties, FunctionComponent, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Link, Route, useHistory, useRouteMatch } from 'react-router-dom'
import CharacterListRow from '../components/CharacterListRow'
import PageWrapper from '../components/PageWrapper'
import useDebouncedValue from '../libs/hooks/useDebouncedValue'
import queryService from '../services/queryService'
import CharacterModal from './CharacterModal'
import characterFromObj from '../libs/utils/characterFromObj'


const TRIGGER_SEARCH_DELAY = 1000
const PAGE_SIZE = 10


const Home: FunctionComponent = () => {
    const [queryString, setQueryString] = useDebouncedValue(TRIGGER_SEARCH_DELAY, '')
    const [page, setPage] = useState(0)

    const history = useHistory();
    const routeMatch = useRouteMatch();

    const { isLoading, isError, data } = useQuery(['searchChars', queryString, page], searchChars)

    // Reset pagination on init and on query changing
    useEffect(() => {
        setPage(1)
    }, [queryString])


    const characters: Character[] = (data?.results as Character[]) ?? []
    const count = data?.count ?? 0

    const handleClose = () => {
        history.push(routeMatch.path)
    }

    return (
        <PageWrapper>
            <h1>Search Game of Thrones Characters</h1>
            <TextField placeholder="Search" style={styles.searchInput} onChange={e => setQueryString(e.target?.value)} />
            <div style={styles.hint}>Note: API only supports exact matches ex: "Jon Snow"</div><br />

            {
                isLoading ?
                    <LinearProgress /> :
                    <span />
            }
            <br />

            {
                !isLoading && isError &&
                <Box>
                    Unable to display results.
                </Box>
            }

            {
                !isLoading && !isError &&
                <PaginationControls count={count} pageSize={PAGE_SIZE} page={page} onChange={(pageNum) => setPage(pageNum)} />
            }

            {
                characters.map(character => <Link to={`/character/${character.slug}`}>
                    <CharacterListRow key={character.slug} character={character} />
                </Link>)
            }
            <br />


            <Route path="/character/:charId" >
                <CharacterModal onClose={handleClose} />
            </Route>


            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={!isLoading && isError}
                autoHideDuration={6000}

                message="Unable to load data from Game of Thrones API"

            />

        </PageWrapper>
    )
}

const searchChars = async (key: string, queryString: string, page: number) => {
    let url = 'https://api.got.show/api/show/characters'

    console.debug('query url', url)

    const result = await queryService.fetch(url)

    if (result.ok) {
        const data: Character[] = (await result.json()).map(characterFromObj) as Character[]

        // since this api does not support query string, we'll use a filter to simulate a paginated query.
        const filtered: Character[] = data.filter(x => x.name.toLowerCase().includes(queryString.toLowerCase()));

        return {
            results: filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
            count: filtered.length,
        }
    } else {
        throw new Error('Failed to fetch data from server.')
    }
}

type PaginationProps = {
    onChange: (pageNum: number) => any,
    page: number,    
    count: number,
    pageSize: number,
}

const PaginationControls: FunctionComponent<PaginationProps> = ({ page, onChange, count, pageSize }) => {

    const from = (page - 1) * PAGE_SIZE + 1
    const to = Math.min(page * PAGE_SIZE, count)

    const numPages = Math.ceil(count / pageSize)

    const onPageSelect = (pageNum: number) => {
        onChange(pageNum)
    }

    return <div style={styles.paginator}>
        <ArrowBack onClick={() => onPageSelect(Math.max(page-1,1))} />
        {
            Array.from({length:numPages}).map((_,idx) => {
                const pageNum = idx + 1
                if (page - 1 === idx) {
                    return <span style={styles.paginatorPageButtonCurrent}>{pageNum}</span>
                }

                return <span key={idx} style={styles.paginatorPageButton} onClick={() => onPageSelect(pageNum)}>{pageNum}</span>
            })
        }
        <ArrowForward onClick={() => onPageSelect(Math.min(page+1,numPages))} />
        <br />
        {`Displaying ${from} to ${to} of ${count} results`}
    </div>
}




const styles = {
    paginatorPageButtonCurrent: {
        color: "black",
        fontWeight: 700,
        padding: '0.5em',
        display: 'inline',        
    },
    paginatorPageButton: {
        color: "gray",
        fontWeight: 400,
        textDecoration: "underline",
        padding: '0.5em',
        display: 'inline',
        cursor: 'pointer',
    },
    searchInput: {
        width: "100%",
    },
    paginator: {
        flexDirection: "column",
        alignItems: "center",
        marginTop: "1em",
        marginBottom: "1em",
    },
    hint: {
        fontSize: '0.5em',
        color: '#AAAAAA',
    }
} as { [key: string]: CSSProperties }

export default Home
