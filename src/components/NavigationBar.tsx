import { AppBar, Tabs, Tab, FormControlLabel, Switch } from "@material-ui/core"
import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react"
import { withRouter, RouteComponentProps } from "react-router-dom"
import queryService from "../services/queryService"

const _ROUTES = [
    '/',
    '/favorites',
]

const NavigationBar = ({ match, history }: RouteComponentProps) => {
    
    const currentTabIndex = _ROUTES.indexOf(match.path)
    const [throttle, setThrottle] = useState(queryService.delayEnabled)

    console.debug('currentTabIndex', currentTabIndex, 'match', match)

    const handleChange = (_event: React.ChangeEvent<{}>, tabIndex: number) => {
        history.push(_ROUTES[tabIndex])
    }

    const handleThrottleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        queryService.setDelayEnabled(event.target.checked)
        setThrottle(event.target.checked)
    }

    return (
        <AppBar position="static" style={styles.appBar}>            
            <nav>
                <Tabs value={currentTabIndex} aria-label="simple tabs example" onChange={handleChange}>
                    <Tab label="Home" />
                    <Tab label="Favorites" />
                </Tabs>
            </nav>
            <div style={styles.throttleSwitch as DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>}>
                <FormControlLabel
                    control={
                        <Switch
                            checked={throttle}
                            onChange={handleThrottleSwitch}
                            name="throttle"
                            color="secondary"
                        />
                    }
                    label="Throttle Connection"
                />
            </div>

        </AppBar>
    )
}

const styles = {
    appBar: {
    },
    throttleSwitch: {
        position: "absolute",
        right: 0,
        display: "inline-block",
    },
}

export default withRouter(NavigationBar)