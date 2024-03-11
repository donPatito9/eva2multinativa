import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'

class UpdatePaciente extends Component{
    url = URL.API
    rutREF = React.createRef()
    nombreREF = React.createRef()
    edadREF = React.createRef()
    sexoREF = React.createRef()
    fechaREF = React.createRef()
    enfermedadREF = React.createRef()
    revisadoREF = React.createRef()
    userId      = null

    state = {
        paciente: {},
        status: null,
        photo: null,
        new: ''
    }

    componentDidMount(){
        this.userId = this.props.match.params.id
        this.getPacienteById(this.userId)
    }

    validator = new SimpleReactValidator()

    changeState = ()=>{
        this.setState({
            paciente: {
                rut: this.rutREF.current.value,
                nombre :this.nombreREF.current.value,
                edad : this.edadREF.current.value,
                sexo : this.sexoREF.current.value,
                fecha : this.fechaREF.current.Date(),
                enfermedad : this.enfermedadREF.current.value,
                revisado : this.revisadoREF.current.value
            }
        })

        this.validator.showMessages()
        this.forceUpdate()
    }

    fileChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })        
    }

    getPacienteById = (id) =>{
        axios.get(this.url+ '/paciente/'+id).then(res=>{
            this.setState({
                paciente: res.data.paciente,
                new: res.data.paciente.photo
            })
        })
    }

    UpdatePaciente = (e) =>{
        e.preventDefault()
        this.changeState()
        if(this.validator.allValid()){
            axios.put(this.url+"/paciente/"+this.userId, this.state.paciente).then(res=>{
                console.log(this.state.paciente)                
                if(res.data.paciente){                    
                    this.setState({
                        paciente: res.data.paciente,
                        status: 'waiting'
                    })
                    if(this.state.photo !== null){
                        var id = this.state.paciente._id
                        const formData = new FormData()
                        formData.append('file', this.state.photo, this.state.photo.name)

                        axios.post(this.url+"/paciente/photo/"+id, formData).then(res=>{
                            if(res.data.paciente){
                                this.setState({
                                    paciente: res.data.paciente,
                                    status: 'success'
                                })
                            }else{
                                this.setState({
                                    paciente: res.data.paciente,
                                    status: 'error'
                                })
                            }
                        })
                    }else{
                        this.setState({
                            status: 'success'
                        })
                    }
                }else{
                    this.setState({
                        status: 'success'
                    })
                }
            })
        }else{
            this.validator.showMessages()
            this.forceUpdate()
            this.setState({
                status: 'error'
            })
        }
    }

    render(){
        if(this.state.status === 'success'){
            return <Redirect to={'/'}></Redirect>
        }
        var paciente = this.state.paciente
        return(
            <div>
                <form onSubmit={this.UpdatePaciente}>
                <table>
                        <tr>
                            <td>Rut</td>
                            <td><input type="text" name="rut" defaultValue={paciente.rut} ref={this.rutREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('rut', this.state.paciente.rut, 'required|alpha_num')
                            }
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td><input type="text" name="nombre" defaultValue={paciente.nombre} ref={this.nombreREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('nombre', this.state.paciente.nombre, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Edad</td>
                            <td><input type="number" name="edad" defaultValue={paciente.edad} ref={this.edadREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('edad', this.state.paciente.edad, 'required|numeric')
                            }
                        </tr>
                        <tr>
                            <td>Sexo</td>
                            <td><input type="text" name="sexo" defaultValue={paciente.sexo} ref={this.sexoREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('sexo', this.state.paciente.sexo, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Foto</td>
                            <td><input type="file" name="photo" onChange={this.fileChange}/></td>
                            {
                                this.state.paciente.fotoPersonal !== null? (
                                    <img src={this.url+'/paciente/photo/' + this.state.new} alt={this.state.paciente.fotoPersonal} width="275px" height="250px" id="photo"></img>
                                ) : (
                                    <img src="" alt="" id="photo"></img>
                                )       
                            }
                        </tr>
                        <tr>
                            <td>Enfermedad</td>
                            <td><input type="text" name="enfermedad" defaultValue={paciente.enfermedad} ref={this.enfermedadREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('enfermedad', this.state.paciente.enfermedad, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Revisado</td>
                            <td><input type="text" name="revisado" defaultValue={paciente.revisado} ref={this.revisadoREF} onChange={this.changeState}/></td>
                            {
                            this.validator.message('revisado', this.state.paciente.revisado, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td><input type="submit" value="Actualizar Paciente"/></td>
                        </tr>
                    </table>      
                </form>
            </div>
        )
    }
}

export default UpdatePaciente