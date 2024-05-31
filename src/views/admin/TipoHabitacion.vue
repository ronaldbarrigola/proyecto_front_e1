<script setup>
import { onMounted, ref } from "vue"
import Swal from 'sweetalert2'

import tipoHabitacionService from "./../../service/TipoHabitacionService.js"

const tipo_habitaciones = ref([])
const visible = ref(false)
const tipohabitacion = ref({ nombre: "" })

onMounted(() => {
    getTipoHabitaciones()
})

async function getTipoHabitaciones() {
    const { data } = await tipoHabitacionService.listar();
    tipo_habitaciones.value = data;
}

async function guardar() {
    if (tipohabitacion.value._id) {

        try {

            await tipoHabitacionService.modificar(tipohabitacion.value._id, tipohabitacion.value)

            visible.value = false
            getTipoHabitaciones()
            tipohabitacion.value = {}
            Swal.fire({
                title: "Tipo de Habitación Actualizada!",
                text: "Aceptar para continuar!",
                icon: "success"
            });
        } catch (error) {
            alert("Error al actualizar verifique los datos")
        }

    } else {
        try {

            await tipoHabitacionService.guardar(tipohabitacion.value)

            visible.value = false
            getTipoHabitaciones()
            tipohabitacion.value = {}
            Swal.fire({
                title: "Tipo de Habitación Registrada!",
                text: "Aceptar para continuar!",
                icon: "success"
            });
        } catch (error) {
            alert("Error al registrar verifique los datos")
        }
    }

}

function editarTipoHabitacion(th) {
    tipohabitacion.value = th;
    visible.value = true;
}
async function confirmDeleteTipoHabitacion(th) {
    if (confirm("¿Está seguro de eliminar?")) {
        await tipoHabitacionService.eliminar(th._id);

        getTipoHabitaciones()
        Swal.fire({
                title: "Tipo de Habitación Eliminada!",
                text: "Aceptar para continuar!",
                icon: "success"
            });
    }
}
</script>

<template>
    <div class="card">
        <Button label="Nuevo Tipo Habitación" @click="visible = true" />

        <DataTable :value="tipo_habitaciones" tableStyle="min-width: 50rem">
            <Column field="nombre" header="Nombre"></Column>
            <Column field="descripcion" header="descripcion"></Column>
            <Column field="precio_base" header="Precio Base (Bs)"></Column>
            <Column field="comodidades" header="Comodidades"></Column>
            <Column field="capacidad_maxima" header="Capacidad"></Column>
            <Column headerStyle="min-width:10rem;">
                <template #body="slotProps">
                    <Button icon="pi pi-pencil" class="mr-2" severity="success" rounded
                        @click="editarTipoHabitacion(slotProps.data)" />
                    <Button icon="pi pi-trash" class="mt-2" severity="warning" rounded
                        @click="confirmDeleteTipoHabitacion(slotProps.data)" />
                </template>
            </Column>
        </DataTable>
    </div>



    <Dialog v-model:visible="visible" modal header="Tipo Habitación" :style="{ width: '45rem' }">

        <span class="p-text-secondary block mb-5">Ingrese datos de Tipo habitación.</span>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="nombre" class="font-semibold w-6rem">Nombre</label>
            <InputText id="nombre" class="flex-auto" autocomplete="off" v-model="tipohabitacion.nombre" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="desc" class="font-semibold w-6rem">Descripción</label>
            <InputText id="desc" class="flex-auto" autocomplete="off" v-model="tipohabitacion.descripcion" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="pre" class="font-semibold w-6rem">Precio base</label>
            <InputText id="pre" class="flex-auto" autocomplete="off" v-model="tipohabitacion.precio_base" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="com" class="font-semibold w-6rem">Comodidades:</label>
            <div class="flex align-items-center">
                <Checkbox v-model="tipohabitacion.comodidades" inputId="ingredient1" name="com" value="Wi-FI" />
                <label for="ingredient1" class="ml-2"> Wi-FI </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="tipohabitacion.comodidades" inputId="ingredient2" name="com" value="TV Privado" />
                <label for="ingredient2" class="ml-2"> TV Privado </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="tipohabitacion.comodidades" inputId="ingredient3" name="com" value="Desayuno" />
                <label for="ingredient3" class="ml-2"> Desayuno </label>
            </div>
            <div class="flex align-items-center">
                <Checkbox v-model="tipohabitacion.comodidades" inputId="ingredient4" name="com" value="Garaje" />
                <label for="ingredient4" class="ml-2"> Garaje </label>
            </div>
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="cap" class="font-semibold w-6rem">Capacidad</label>
            <InputText id="cap" class="flex-auto" autocomplete="off" v-model="tipohabitacion.capacidad_maxima" />
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Guardar" @click="guardar()"></Button>
        </div>
    </Dialog>
</template>