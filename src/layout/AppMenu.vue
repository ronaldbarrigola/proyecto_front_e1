<script setup>
import { ref } from 'vue';

import AppMenuItem from './AppMenuItem.vue';

const model = ref([
    {
        label: 'Administración',
        items: [{ label: 'Admin', icon: 'pi pi-fw pi-home', to: '/' }]
    },
    {
        label: 'Gestión',
        items: [
            { label: 'Tipos de Habitaciones', icon: 'pi pi-fw pi-id-card', to: '/admin/tipo-habitacion' },
            { label: 'Habitaciones', icon: 'pi pi-fw pi-check-square', to: '/admin/habitacion' },
            { label: 'Huespedes', icon: 'pi pi-fw pi-exclamation-circle', to: '/admin/huespedes' },
        ]
    },
    {
        label: 'Gestión Reservas',
        items: [
            { label: 'Reservas', icon: 'pi pi-fw pi-eye', to: '/admin/reserva', badge: 'NEW' },
            { label: 'Nueva Reserva', icon: 'pi pi-fw pi-globe', to: '/admin/nueva-reserva', }
        ]
    },
    {
        label: 'Gestión Usuarios',
        items: [
            { label: 'Usuarios', icon: 'pi pi-fw pi-user', to: '/admin/usuario' },
            { label: 'Huespedes', icon: 'pi pi-fw pi-desktop', to: '/admin/huespedes' }
        ]
    },
]);
</script>

<template>
    <ul class="layout-menu">
        <template v-for="(item, i) in model" :key="item">
            <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
            <li v-if="item.separator" class="menu-separator"></li>
        </template>
    </ul>
</template>

<style lang="scss" scoped></style>
