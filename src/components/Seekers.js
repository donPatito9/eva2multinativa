import React, {Component} from 'react';
import ListUsers from '../components/ListarPacientes';
import Search from '../components/BuscarPaciente';

class Seeker extends Component{
    render(){
        var field = this.props.match.params.search;
        return(
            <div>
                <h1>Buscando: {field}</h1>
                <ListUsers search={field}></ListUsers>
                <Search></Search>
            </div>
        );
    }
}
export default Seeker;