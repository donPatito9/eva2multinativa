import React, {Component} from 'react'
import ListUsers from './ListarPacientes'
import {NavLink}  from 'react-router-dom'

class Home extends Component{
    render(){
        return(
            <div>
            <h3>Pacientes</h3>
                <ListUsers home="true"></ListUsers>
                    <ul>
                    <h3>Links a home </h3>
                            <li><NavLink to="/">Component: Inicio</NavLink></li>
                                <li><NavLink to="/paciente/nuevo">Componet: Agregar Pacientes</NavLink></li>
                                <li><NavLink to="/paciente/actualizar/:id">Component: Actualizar Paciente</NavLink></li>
                                <li><NavLink to="/paciente/detalle/:id">Component: Detalles</NavLink></li>
                                <li><NavLink to="/paciente/listar">Component: Listar Pacientes</NavLink></li>
                                <li><NavLink to="/paciente/buscar/:search">Component: Buscar paciente</NavLink></li>    
                     </ul>
               </div>  
        )
    }
}
export default Home