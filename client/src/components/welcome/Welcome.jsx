import {Component} from "react";
import styles from './Welcome.module.css'

export default class Welcome extends Component{
    componentDidMount(){
        console.log('Fui montado');
    }
    render(){
        return(
            <div className={styles.welcome}>
                <h2>Welcome To Countries App</h2>
                <button onClick={()=>{
                    window.location.href='/home'
                    console.log('hola')}}>Go!</button>
            </div>
        )
    }
}