import React, { Component } from 'react';
import { connect } from 'react-redux';
import SearchBox from '../../components/search-box/SearchBox';
import CardList from '../../components/card-list/CardList';
import './App.css';
import Scroll from '../../components/scroll/Scroll';
import ErrorBoundry from '../error-boundry/ErrorBoundry'

import { setSearchField } from './../../redux/actions';

const mapStateToProps = state => {
    return {
        searchField: state.searchField
    }
}

const mapDispatchToProps = (dispatch) => {
    return { 
        onSearchChange: (event) => dispatch(setSearchField(event.target.value))
    }
}

class App extends Component {

    constructor() {
        super()
        this.state = {
            robots: []
        }
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => this.setState({ robots : users }));
    }

    render() {
        const { robots } = this.state;
        const { searchField, onSearchChange } = this.props;
        const filteredRobots = robots.filter(robot => {
            return robot.name.toLocaleLowerCase().includes(searchField.toLocaleLowerCase());
        });
        return !robots.length ?
            <h1>Loading</h1> :
            (
                <div className='tc'>
                    <h1 className='f1'>RoboFriends</h1>
                    <SearchBox placeholder='Seacrh robots' onSearchChange={onSearchChange}/>
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots={filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);