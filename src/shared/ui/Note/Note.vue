<script setup lang="ts">
    import './style.css'
</script>

<template>
    <div class="note">
        <i class="pi pi-info-circle" style="font-size: 2rem;"></i>
        
        <span class="note__text">
            <slot></slot>
        </span>
    </div>
</template>