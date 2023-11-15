<template>
  <div>
    <span class="title">All Apps</span>
    <div class="flex items-stretch gap-4 mt-6">
      <router-link to="/currency-converter" class="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hoverEffect w-[177px] h-[177px]">
        <img src="@/assets/icons/exchange.png" width="100" alt="">
        <span class="font-semibold">Currency Converter</span>
      </router-link>
      <router-link to="/news" class="flex flex-col items-center gap-2 p-4 bg-white rounded-lg hoverEffect w-[177px] h-[177px]">
        <img src="@/assets/icons/news.png" width="100" alt="">
        <span class="font-semibold">News</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>