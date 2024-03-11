import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'

class Paciente extends Component{
    url = URL.API

    state = {
        paciente: false,
        status: null
    }

    componentDidMount(){
        this.getPacienteById()
    }

    getPacienteById = () => {
        var id = this.props.match.params.id
        console.log(this.props)
        axios.get(this.url + "/paciente/"+id).then(res=>{
            this.setState({
                paciente: res.data.paciente,
                status: 'success'
            })
        }).catch(err=>{
            this.setState({
                paciente: false,
                status: 'success'
            })
        })
    }

    deletePacienteById = (id) => {
        axios.delete(this.url + "/paciente/" + id).then(res =>{
            this.setState({
                paciente: res.data.paciente,
                status: 'deleted'
            })
        })
    }

    render(){
        return(
            <div>
                {
                    this.state.status === 'deleted' && <Redirect to="/"></Redirect>
                }
                {
                    this.state.paciente &&
                    <div>
                        <table border="1px">
                           
                            <tr>
                                <td>Nombre y Apellido</td>
                                <td>{this.state.paciente.nombre}</td>
                            </tr>
                                                    
                            <tr>
                                <td>Foto</td>
                                {
                                    this.state.paciente.fotoPersonal !== null? (
                                        <img src={this.url+'/paciente/photo/' + this.state.paciente.fotoPersonal} alt={this.state.paciente.fotoPersonal} width="275px" height="250px"></img>
                                    ) : (
                                        <img src="" alt=""></img>
                                    )   
                                }
                            </tr>
                           <tr>
                                <td><Link to={'/paciente/actualizar/'+this.state.paciente._id}>Actualizar</Link></td>
                                <td><button onClick={()=>{this.deletePacienteById(this.state.paciente._id)}}>Eliminar</button></td>
                            </tr>
                        </table>            
                    </div>
                }
                {
          !this.state.paciente && this.state.status === 'success' &&
          <div>
              <h2>Paciente no Existe</h2>
              <h3>Intente de Nuevo</h3>
              <Link to={'/'}>Regresar</Link>
          </div>          
                }
                {
                    this.state.status == null &&
                    <div>
                        <h2>Cargando......</h2>
                    </div>
                }
            </div>
        )
    }
}

export default Paciente