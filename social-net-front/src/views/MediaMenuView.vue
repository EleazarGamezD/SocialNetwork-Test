<script setup></script>
<template>

    <Dock :model="items" :position="position">
        <template #icon="{ item }">
            <img :alt="item.label" :src="item.icon" style="width: 100%" />
        </template>
    </Dock>

</template>