/*
 * File: Layoutwrapper.tsx
 * Project: Agenda Cultural Front End React
 * Author: Luis Fernando Choque (luisfernandochoquea@gmail.com)
 * -----
 * Copyright 2021 - 2022 Universidad Privada Boliviana La Paz, Luis Fernando Choque Arana
 */
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
