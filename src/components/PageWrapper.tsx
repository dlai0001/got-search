import React, { ReactNode } from "react"
import './PageWrapper.css'
import NavigationBar from "./NavigationBar"

const PageWrapper = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <NavigationBar />
            <div className="PageWrapper__outer">
                <div className="PageWrapper__page">
                    {children}
                </div>
            </div>
        </>
    )
}

export default PageWrapper