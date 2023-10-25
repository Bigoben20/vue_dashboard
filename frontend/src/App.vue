<template>
  <div>
    <header class="fixed top-0 flex justify-center w-screen py-4">
      <nav class="flex items-stretch justify-between w-full">
        <RouterLink to="/" class="w-fit">
          <img alt="Vue logo" class="h-[55px]" src="@/assets/logo.svg" />
        </RouterLink>
        
        <div ref="routerLinks" class="absolute flex items-center justify-center gap-2 left-[50%]">
          <RouterLink to="/">Dashboard</RouterLink>
          <RouterLink to="/admins">Adminler</RouterLink>
        </div>
      </nav>
    </header>
    <main class="pt-[87px]">
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
    const pageTitle = ref(document.title);

    // Sayfa başlığını dinamik olarak güncellemek için bir watcher kullanın
    watch(
      () => router.currentRoute.value.meta.title,
      (newTitle) => {
        pageTitle.value = newTitle || 'Varsayılan Başlık';
      }
    );

    // Vue Router başlangıçta yüklendikten sonra sayfa başlığını güncelleyin
    onMounted(() => {
      pageTitle.value = router.currentRoute.value.meta.title || 'Varsayılan Başlık';
    });

    return { pageTitle };
  },
};
</script>
