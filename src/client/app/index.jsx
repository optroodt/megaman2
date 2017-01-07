import React from 'react';
import {render} from 'react-dom';

class Boss extends React.Component {
    getClass(){
        var cls = 'boss b' + (this.props.index + 1);
        if(this.props.defeated){
            return cls +' defeated';
        } else {
            return cls;
        }
        
    }

    handleBossClick(){
        this.props.handleBossClick(this.props.index);
    }

    render(){
        return <div className={this.getClass()} onClick={this.handleBossClick.bind(this)}/>
    }
}

class Bosses extends React.Component {

    isDefeated(index){
        return this.props.defeated[index];
    }

    render () {
        const handleBossClick = this.props.handleBossClick;
        const isDefeated = this.isDefeated.bind(this);

        return <div>
            {this.props.bosses.map(function(obj, i) {return <Boss key={i} index={i} defeated={isDefeated(i)} handleBossClick={handleBossClick} />;})}
            </div>
    }
}

class Dot extends React.Component {
    getClass(){
        if(this.props.active){
            return "dot on";
        } else {
            return "dot";
        }
    }
    render () {
        return <div className={this.getClass()} key={this.props.index}/>
    }
}

class Tank extends React.Component {
    getCountClass() {
        return 'count c'+ this.props.tanks;
    }

    render() {
       return  <div className="tank-container">
            <div className="tank" onClick={this.props.onTankClick}></div>
            <div className={this.getCountClass()}/>
        </div>
    }
}

class Password extends React.Component {
    dotActive(pos){
        return this.props.dots.indexOf(pos) > -1;
    }

    render() {
        var dots = [];
        for(var i=0; i<25; i++){
            dots.push(i);
        }
        const active = this.dotActive.bind(this);

        return <div className="password-container">
            <div className="password">
            {dots.map(function(i) {return <Dot key={i} index={i} active={active(i)}/>;})}
            </div>
            <Tank tanks={this.props.tanks} onTankClick={this.props.onTankClick}/>
        </div>
    }
}

class App extends React.Component {

    cellToIndex(cell){
        var mul = ['B', 'C', 'D', 'E'].indexOf(cell.charAt(0));
        return (mul * 5) + parseInt(cell.charAt(1), 10) -1;
    }

    calculatePassword(){
        const state = this.state;
        const cti = this.cellToIndex;

        var dots = this.props.bosses.map(function(obj, i){
            var idx = cti(obj[1]) + state.tanks;
            idx %= 20;

            if(state.defeated[i] === false){
                idx = (idx + obj[2]) % 20;
            }
            return idx + 5;
        })
        dots.push(this.state.tanks);
        return dots;

    }
    constructor(props) {
        super(props);
        var defeated = {};
        for(var i = 0; i < this.props.bosses.length; i++){
            defeated[i] = false;
        }

        this.state = {tanks:0, defeated: defeated};
    }

    handleBossClick(index){
        var defeated = this.state.defeated;
        defeated[index] = !defeated[index];
        this.setState({defeated: defeated});
    }

    handleTankClick(){
        var tanks = (this.state.tanks + 1) % 5;
        this.setState({tanks: tanks});
    }

    render () {
        return <div>
            <div className="main" id="bosses"><Bosses defeated={this.state.defeated} bosses={this.props.bosses} handleBossClick={this.handleBossClick.bind(this)}/></div>
            <div className="main" id="password"><Password dots={this.calculatePassword()} tanks={this.state.tanks} onTankClick={this.handleTankClick.bind(this)}/></div>
        </div>;
      }
}

App.defaultProps = {
    bosses: [   
        ['Bubble Man', 'D1', 17],
        ['Air Man', 'E3', 14],
        ['Quick Man', 'B4', 5],
        ['Heat Man', 'B2', 13],
        ['Wood Man', 'D3', 12],
        ['Metal Man', 'E5', 16],
        ['Flash Man', 'C1', 13],
        ['Crash Man', 'C5', 7]
    ]
};
    
render(<App/>, document.getElementById('app'));