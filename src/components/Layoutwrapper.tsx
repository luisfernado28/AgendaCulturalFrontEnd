

import Footer from './Footer'
import Header from './Header'

interface propTypes {
    children: React.ReactNode
    className?: string
}

function LayoutWrapper(props: propTypes): JSX.Element {
    return (
        <div>
            <Header />
            <header className="App-header">
                {props.children}
            </header>
            <Footer />

        </div>
    )
}

export default LayoutWrapper
