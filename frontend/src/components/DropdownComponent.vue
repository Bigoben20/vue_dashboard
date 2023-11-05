<!-- Dropdown.vue -->
<template>
    <div class="relative inline-block text-left">
        <div @click.stop="toggleDropdown"
            class="">
            <slot name="trigger"></slot>
        </div>
        <transition name="fade">
            <div v-if="isOpen" class="absolute right-0 w-fit mt-1 origin-top-right bg-white rounded-lg shadow-lg z-[100] border border-gray-100 focus:outline-none max-h-[150px] overflow-y-auto" ref="dropdown">
                <div class="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <slot></slot>
                </div>
            </div>
        </transition>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { onClickOutside } from '@vueuse/core'


export default {
    setup() {
        const isOpen = ref(false);
        const dropdown = ref(null);

        const toggleDropdown = () => {
            isOpen.value = !isOpen.value;
        };

        const closeDropdown = () => {
            isOpen.value = false;
        };

        onClickOutside(
            dropdown,
            (event) => {
                // console.log(event)
                isOpen.value = false
            },
        )
        
        return {
            isOpen,
            dropdown,
            toggleDropdown,
            closeDropdown
        };
    }
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.1s ease-out;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
  