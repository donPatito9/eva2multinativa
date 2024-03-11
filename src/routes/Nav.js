import React, { Component } from 'react'
import {NavLink}  from 'react-router-dom'
import Search from '../components/BuscarPaciente'

class Nav extends Component {
      render() {
        var header = "Menu"
        return (
            <div>
                <h1>{header}</h1>
                <ul>
                    <li><NavLink to="/">Inicio</NavLink></li>
                    <li><NavLink to="/paciente/nuevo">Agregar Paciente</NavLink></li>
                    <li><NavLink to="/paciente/listar">Listar Paciente</NavLink></li>  
                </ul>
                <Search></Search>
            </div>
        )
    }
}
export default Nav