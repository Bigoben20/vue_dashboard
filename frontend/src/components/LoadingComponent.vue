<template>
    <div v-if="show" class="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-70 z-[1000] px-2">
      <div class="w-full max-w-xl p-8 text-center rounded">
        <div class="flex flex-col items-center justify-center gap-4">
          <img src="@/assets/svgs/Spinner.svg" class="" alt="">
          <!-- <span class="text-4xl font-bold tracking-wider text-gray-800">{{ loadingText }}</span> -->
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
        // loadingText: {
        //     type: String,
        //     default: 'Loading...'
        // }
  },
    data() {
      return {
        isLoading: false,
      };
    },
    methods: {
      // AJAX isteği başladığında bu methodu çağırabilirsiniz
      showLoading() {
        this.isLoading = true;
      },
      // AJAX isteği tamamlandığında bu methodu çağırabilirsiniz
      hideLoading() {
        this.isLoading = false;
      }
    }
  };
  </script>
  
  <style>
  /* Burada Tailwind CSS veya kendi özelleştirmelerinizi ekleyebilirsiniz */
  </style>
  