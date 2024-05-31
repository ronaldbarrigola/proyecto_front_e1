import { Api } from "./ApiService.js";

export default {
    listar(){
        return Api().get(`/habitacion`);
    },
    guardar(datos){
        return Api().post(`/habitacion`, datos);
    },
    mostrar(id){
        return Api().get(`/habitacion/${id}`);        
    },
    modificar(id, datos){
        return Api().put(`/habitacion/${id}`, datos);
    },
    eliminar(id){
        return Api().delete(`/habitacion/${id}`);
    }
}