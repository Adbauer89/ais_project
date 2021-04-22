import React, {useState, Fragment} from 'react';

const SearchMenu = () => {
    const [menuState, setMenuState] = useState('closed');

    const toggleMenu = () => {
        let newState = '';

        if (menuState === 'closed') {
            newState = 'open';
        } else {
            newState = 'closed';
        }

        setMenuState(newState);
    }

    // TODO Add exit button
    return (
        <Fragment>
            <section className={`search-menu-container`}>
                <section className={`search-menu ${menuState}`}>
                    <section className={`search-menu-buttons-container`}>
                        <section className={`search-menu-buttons`}>
                        <button className={`zoom-button`} onClick={toggleMenu}>0</button>
                        <button className={`zoom-button`} onClick={toggleMenu}>+</button>
                        <button className={`zoom-button`} onClick={toggleMenu}>-</button>
                        </section>
                    </section>
                    <section className={`vessel-search`}>
                        <section className={`text-right`}>
                            <button className={`exit-button zoom-button`} onClick={toggleMenu}>X</button>
                        </section>
                        <section className={`search-panel text-center`}>
                            <section className={`panel-container`}>
                                <section className={`panel-inner p-2`}>
                                    Search by Vessel MMSI
                                    <form>
                                        <input type={`text`} placeholder={`Vessel MMSI`}/>
                                    </form>
                                </section>
                            </section>
                            <section className={`panel-container`}>
                                <section className={`panel-inner`}>
                                    Search by Destination Port
                                    <form>
                                        <input type={`text`} placeholder={`Port Name`}/>
                                    </form>
                                </section>
                            </section>
                        </section>
                    </section>
                </section>
            </section>
        </Fragment>
    )
}

export default SearchMenu;
