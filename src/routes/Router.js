import React, {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Inicio from '../components/Home'
import NotFound from '../routes/404'
import AgregarPaciente from '../components/AgregarPaciente'
import ActualizarPaciente from '../components/ActualizarPaciente'
import DetallePaciente from '../components/DetallePaciente'
import ListarPacientes from '../components/ListarPacientes'
import BuscarPaciente from '../components/Seeker'
import Nav from './Nav'

class Router extends Component{
    render(){
        return(
            <BrowserRouter>
            <Nav></Nav>
            <Switch>
                <Route exact path="/" component={Inicio}></Route>
                <Route exact path="/inicio" component={Inicio}></Route>
                <Route path="/paciente/nuevo" component={AgregarPaciente}></Route>
                <Route path="/paciente/actualizar/:id" component={ActualizarPaciente}></Route>
                <Route path="/paciente/detalle/:id" component={DetallePaciente}></Route>
                <Route path="/paciente/listar" component={ListarPacientes}></Route>
                <Route path="/paciente/buscar/:search" component={BuscarPaciente}></Route>
                <Route path="/redirect/:search" render={(props)=>{
                var search = props.match.params.search
                return(<Redirect to={'/paciente/buscar/'+search}></Redirect>)
                }}>

                </Route>
                <Route path="*" component={NotFound}></Route>
            </Switch>
        </BrowserRouter>     
        )
    }
}
export default Router