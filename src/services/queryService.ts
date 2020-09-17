import unfetch from 'unfetch'

const DELAY = 5000

class QueryService {
    
    /**
     * If delay should be applied.
     */
    delayEnabled = false

    setDelayEnabled(enabled: boolean) {
        this.delayEnabled = enabled;
        console.debug('QueryService DelayEnabled:', this.delayEnabled)
    }

    async fetch(...args: any[]) {
        
        if(this.delayEnabled) {
            console.log(`Awaiting delay`, DELAY)
            await (new Promise(resolve => setTimeout(resolve, DELAY)))
            console.log(`Fetching results from query`, ...args)
            return await (unfetch as any)(...args)
        } 

        console.log(`Fetching results from query`, ...args)
        return await (unfetch as any)(...args)
    }

}

export default new QueryService()