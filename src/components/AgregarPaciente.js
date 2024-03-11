import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import axios from 'axios'
import URL from '../common/Global'
import SimpleReactValidator from 'simple-react-validator'

class NewUser extends Component{
    url = URL.API
    rutREF = React.createRef()
    nombreREF = React.createRef()
    edadREF = React.createRef()
    sexoREF = React.createRef()
    fechaREF = React.createRef()
    enfermedadREF = React.createRef()
    revisadoREF = React.createRef()

    state = {
        paciente: {},
        status: null,
        photo: null,
        force: false
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

    newUser = (e) =>{
        e.preventDefault()
        this.changeState()
        if(this.validator.allValid()){
            axios.post(this.url+"/paciente", this.state.paciente).then(res=>{
                if(res.data.newUser){                    
                    this.setState({
                        paciente: res.data.newUser,
                        status: 'waiting'
                    })
                    if(this.state.photo !== null){
                        console.log(this.state.paciente);
                        var id = this.state.paciente._id
                        const formData = new FormData()
                        formData.append('file', this.state.photo, this.state.photo.name)

                        axios.post(this.url+"/paciente/photo/"+id, formData).then(res=>{
                            if(res.data.paciente){
                                this.setState({
                                    paciente: res.data.user,
                                    status: 'success',
                                    force:true
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
                        return(
                            <div>          
                                <form onSubmit={this.newUser}>
                                    <table>
                                        <tr>
                                            <td>Rut</td>
                            <td><input type="text" name="rut" ref={this.rutREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('rut', this.state.paciente.rut, 'required|alpha_num')
                            }
                        </tr>
                        <tr>
                            <td>Nombre</td>
                            <td><input type="text" name="nombre" ref={this.nombreREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('nombre', this.state.paciente.nombre, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Edad</td>
                            <td><input type="number" name="edad" ref={this.edadREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('edad', this.state.paciente.edad, 'required|numeric')
                            }
                        </tr>
                        <tr>
                            <td>Sexo</td>
                            <td><input type="text" name="sexo" ref={this.sexoREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('sexo', this.state.paciente.sexo, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Foto</td>
                            <td><input type="file" name="photo" onChange={this.fileChange}/></td>
                        </tr>
                        <tr>
                            <td>Enfermedad</td>
                            <td><input type="text" name="enfermedad" ref={this.enfermedadREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('enfermedad', this.state.paciente.enfermedad, 'required|alpha_space')
                            }
                        </tr>
                        <tr>
                            <td>Revisado</td>
                            <td><input type="text" name="revisado" ref={this.revisadoREF} onChange={this.changeState}/></td>
                            {
                                this.validator.message('revisado', this.state.paciente.revisado, 'required|alpha_space')
                            }
                        </tr>
                      
                        <tr>
                            <td><input type="submit" value="Agregar Pacientes"/></td>
                        </tr>
                    </table>                  
                </form>  
                         
            </div>
            
        )
    }
}

export default NewUser