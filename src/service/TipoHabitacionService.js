import { Api } from "./ApiService.js";

export default {
    listar(){
        return Api().get(`/tipo-habitacion`);
    },
    guardar(datos){
        return Api().post(`/tipo-habitacion`, datos);
    },
    mostrar(id){
        return Api().get(`/tipo-habitacion/${id}`);        
    },
    modificar(id, datos){
        return Api().put(`/tipo-habitacion/${id}`, datos);
    },
    eliminar(id){
        return Api().delete(`/tipo-habitacion/${id}`);
    }
}