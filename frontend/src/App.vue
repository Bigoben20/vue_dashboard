<template>
  <div>
    <!-- Top Side -->
    <header class="fixed top-0 z-20 flex items-center justify-between w-full bg-white border-b border-gray-300">
      
      <!-- Logo -->
      <div class="block p-2 transition-all duration-500 ease-in-out w-fit h-fit hue-rotate-[197deg] hover:animate-hue-rotate">
        <img alt="Logo" class="h-[55px] w-fit" src="@/assets/logo.svg" />
      </div>

      <!-- Menu Button -->
      <button class="p-2 mr-4 text-2xl text-gray-700 bg-white rounded-lg hoverEffect" @click="sidebarOpen = !sidebarOpen">
        <font-awesome-icon icon="fa-bars" />
      </button>
    </header>

    <!-- Sidebar -->
    <nav class="z-20 fixed top-[72px] left-0 flex flex-col items-start justify-start bg-white h-screen w-[200px] transition-transform ease-in-out duration-300" :class="{'translate-x-[-200px]':!sidebarOpen}">
      <div ref="routerLinks" class="flex flex-col items-stretch justify-center w-full gap-2 px-2 py-4">
        <!-- Router Links -->
        <RouterLink class="items-center gap-1 routerLink" v-for="(router, index) in routerUrls" :key="index" :to="router.path">
          <font-awesome-icon v-if="router.icon" :icon="router.icon"/>
          <span>{{router.name}}</span>
        </RouterLink>
      </div>
      <!-- <div class="w-full p-2 border-y">
        Logout Button
        <router-link to="/logout" class="items-center gap-1 routerLink">
          <font-awesome-icon icon="fa-door-open"/>
          <span>Logout</span>
        </router-link>
      </div> -->
    </nav>

    <!-- Page Contents -->
    <main class="translate-y-[72px] min-h-screen transition-all ease-in-out duration-300 p-2 md:p-6" :class="{'w-full':!sidebarOpen, 'translate-x-[200px] w-[calc(100%-200px)]':sidebarOpen}">
      <RouterView />
    </main>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, onMounted, watch } from 'vue';

export default {
  setup() {
    const router = useRouter();
    const routerUrls = [
      { name: 'Home', path: '/', icon: "fa-gauge-high" },
      { name: 'Exchange', path: '/exchange', icon: "fa-list-ol" },
      { name: 'News', path: '/news', icon: "fa-users" }
    ];
    
    return { routerUrls };
  },
  data() {
    return {
      sidebarOpen: true,
      screenWidth: 0
    }
  },
  mounted() {
    // Sayfa ilk açıldığında ekran genişliğini hesapla
    this.screenWidth = window.innerWidth;

    // Ekran genişliği değiştiğinde güncelle
    window.addEventListener("resize", () => {
      this.screenWidth = window.innerWidth;
      if (this.screenWidth < 768) {
        this.sidebarOpen = false;
      } else {
        this.sidebarOpen = true;
      }
    });
    if (this.screenWidth < 768) {
      this.sidebarOpen = false;
    }
  }
};
</script>
