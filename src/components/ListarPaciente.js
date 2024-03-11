import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'

class ListPacientes extends Component {
    url = URL.API

    state = {
        pacientes: [],
        status: null
    }
    componentDidMount() {
        var start = this.props.home
        var search = this.props.search
        if (start === 'true') {
            this.getLastsPacientes()
        } else if (search && search !== null && search !== undefined) {
            this.getPacientesBySearch(search)
        } else {
            this.getPacientes()
        }
    }
    getPacientes = () => {
        axios.get(this.url + '/pacientes').then(res => {
            this.setState({
                pacientes: res.data.pacientes,
                status: 'success'
            })
        })
    }

    getLastsPacientes = () => {
        axios.get(this.url + '/pacientes/last').then(res => {
            this.setState({
                pacientes: res.data.pacientes,
                status: 'success'
            })
        })
    }

    getPacientesBySearch = (search) => {
        axios.get(this.url + '/paciente/search/' + search).then(res => {
            if (res.data.paciente) {
                this.setState({
                    pacientes: res.data.paciente,
                    status: 'success'
                })
            } else {
                this.setState({
                    pacientes: res.data.paciente,
                    status: 'error'
                })
            }
        })
    }

    render() {
        if (this.state.pacientes.length >= 1) {
            return (<table border="1">
                <thead>
                    <tr>
                       
                        <td>Nombre y apellido</td>
                        <td>Foto</td>
                        <td>Opciones</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.pacientes.map((p) => {
                            return (<tr key={p._id}>
                                
                                <td>{p.nombre}</td>
                                
                                
                                
                                <td>{
                                    p.fotoPersonal != null ? (
                                        <img src={this.url + '/paciente/photo/' + p.fotoPersonal} alt={p.nombre} height="100px" width="100px" />
                                    ) :
                                     (
                                        <img src=""alt={p.nombre} height="100px" width="100px" />
                                    )}
                                </td>
                                <td><Link to={'/paciente/detalle/' + p._id}>Detalles</Link></td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>)
        } else if (this.state.pacientes.length === 0 && this.state.status === 'success') {
            return (
                <div>
                    <h2>No hay registros</h2>
                </div>
            )
        } else {
            return (
                <div>
                    <h2></h2>
                </div>
            )
        }
    }
}
export default ListPacientes