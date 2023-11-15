<template>
  <div class="flex flex-col">
    <div class="title"><span>News</span> <span class="text-primary-100">({{ data.totalResults }})</span></div>
    <div class="flex flex-col items-start w-full gap-4 p-2 my-6 border border-gray-300 rounded bg-primary-100 lg:items-end lg:flex-row">

      <div class="flex flex-col items-stretch w-full gap-4 xs:flex-row xs:items-end lg:w-fit">
        <div class="flex flex-col items-start w-full">
          <label for="beginDate" class="text-gray-100">Begin Date</label>
          <input id="beginDate" v-model="beginDate" type="date" class="w-full bg-gray-100 generalInput">
        </div>
        <div class="flex flex-col items-start w-full">
          <label for="endDate" class="text-gray-100">End Date</label>
          <input id="endDate" v-model="endDate" type="date" class="w-full bg-gray-100 generalInput">
        </div>
      </div>
      <div class="flex flex-col items-stretch w-full gap-4 lg:w-fit md:items-end md:flex-row">
        <div class="flex flex-col items-start w-full">
          <label for="type" class="text-gray-100">Type</label>
          <select id="type" v-model="type" class="w-full bg-gray-100 generalInput">
            <option value="top-headlines">Top Headlines</option>
            <option value="everything">Everything</option>
          </select>
        </div>
        <div class="flex flex-col items-start w-full" v-if="type == 'top-headlines'">
          <label for="country" class="text-gray-100">Countries</label>
          <select id="country" v-model="country" class="w-full bg-gray-100 generalInput">
            <option :value="country.code" v-for="country in countries" :key="country.code" v-text="country.name"></option>
          </select>
        </div>
        <div class="flex flex-col items-start" v-if="type == 'everything'">
          <label for="search" class="text-gray-100">Search</label>
          <input type="text" id="search" v-model="search" class="bg-gray-100 generalInput" :class="{'outline outline-red-500':searchError}">
        </div>
      </div>
      <button-component @click="getNews" color="secondary" classExpand="w-full md:w-fit mt-2 md:mt-0">Search</button-component>
    </div>

    <div class="flex items-center gap-2 my-2">
      <span>Page:</span>
      <button type="button" @click="getNews(n)" class="flex items-center justify-center w-8 h-8 p-2 rounded hoverEffect" :class="{'bg-primary-100/20': n == page, 'bg-white': n != page}" v-for="n in totalPage" :key="n">{{ n }}</button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
      <div class="grid grid-cols-1 p-4 bg-white rounded hover:bg-lime-50 hoverEffect hover:cursor-pointer group" v-for="(article,index) in news" :key="index" @click="goToArticle(article.url)">
        <div class="mb-4 text-lg font-semibold text-gray-800 group-hover:underline group-hover:text-primary-100">
          {{ article.title.replace(" - "+article.author, "") }}
        </div>
        <div class="flex items-end justify-between gap-1">
          <div class="flex items-baseline gap-1 text-sm">
            <span>Source:</span> <span class="font-semibold text-blue-800 break-all">{{ article.author }}</span>
          </div>
          <div class="flex items-baseline justify-end text-xs text-gray-700">
            <span class="whitespace-nowrap">{{ fixDateTime(article.publishedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { httpCall } from '@/api/httpCall';

export default {
  data() {
    return {
      data: [],
      news: [],
      page: 1,
      totalPage: 1,
      type: "top-headlines",
      country: "tr",
      beginDate: "",
      endDate: "",
      search: "",
      countries: [],
      searchError: false
    }
  },
  mounted() {
    this.getNews();
    this.countries = [
      { code: "ae", name: "United Arab Emirates" },
      { code: "ar", name: "Argentina" },
      { code: "at", name: "Austria" },
      { code: "au", name: "Australia" },
      { code: "be", name: "Belgium" },
      { code: "bg", name: "Bulgaria" },
      { code: "br", name: "Brazil" },
      { code: "ca", name: "Canada" },
      { code: "ch", name: "Switzerland" },
      { code: "cn", name: "China" },
      { code: "co", name: "Colombia" },
      { code: "cu", name: "Cuba" },
      { code: "cz", name: "Czech Republic" },
      { code: "de", name: "Germany" },
      { code: "eg", name: "Egypt" },
      { code: "fr", name: "France" },
      { code: "gb", name: "United Kingdom" },
      { code: "gr", name: "Greece" },
      { code: "hk", name: "Hong Kong" },
      { code: "hu", name: "Hungary" },
      { code: "id", name: "Indonesia" },
      { code: "ie", name: "Ireland" },
      { code: "il", name: "Israel" },
      { code: "in", name: "India" },
      { code: "it", name: "Italy" },
      { code: "jp", name: "Japan" },
      { code: "kr", name: "South Korea" },
      { code: "lt", name: "Lithuania" },
      { code: "lv", name: "Latvia" },
      { code: "ma", name: "Morocco" },
      { code: "mx", name: "Mexico" },
      { code: "my", name: "Malaysia" },
      { code: "ng", name: "Nigeria" },
      { code: "nl", name: "Netherlands" },
      { code: "no", name: "Norway" },
      { code: "nz", name: "New Zealand" },
      { code: "ph", name: "Philippines" },
      { code: "pl", name: "Poland" },
      { code: "pt", name: "Portugal" },
      { code: "ro", name: "Romania" },
      { code: "rs", name: "Serbia" },
      { code: "ru", name: "Russia" },
      { code: "sa", name: "Saudi Arabia" },
      { code: "se", name: "Sweden" },
      { code: "sg", name: "Singapore" },
      { code: "si", name: "Slovenia" },
      { code: "sk", name: "Slovakia" },
      { code: "th", name: "Thailand" },
      { code: "tr", name: "Turkey" },
      { code: "tw", name: "Taiwan" },
      { code: "ua", name: "Ukraine" },
      { code: "us", name: "United States of America" },
      { code: "ve", name: "Venezuela" },
      { code: "za", name: "South Africa" }
    ];
  },
  methods: {
    fixDateTime(date){
      let isoString = date;
      let isoDate = new Date(isoString);

      let normalTarih = isoDate.toLocaleDateString("tr-TR", {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                }); // Tarih kısmı
      let normalSaat = isoDate.toISOString().split('T')[1].substring(0, 8); // Saat kısmı

      return normalSaat+" "+normalTarih;
    },
    goToArticle(url){
      window.open(url, '_blank');
    },
    pageCount(totalNews) {
      var bolum = Math.floor(totalNews / 20); // Bölümü hesapla
      var kalan = totalNews % 20; // Kalanı hesapla
      if (kalan == 0) {
        this.totalPage = bolum
      } else {
        this.totalPage = bolum + 1;
      }
    },
    getNews(pageNum = 1) {
      this.page = pageNum;
      this.$store.commit('loadingTrue');
      let data = [];
      if (this.type == "top-headlines") {
        data = {
          type: this.type,
          country: this.country,
          page: this.page
        };
      } else if (this.type == "everything") {
        if (this.search == "") {
          this.searchError = true;
          this.$store.commit('loadingFalse');
          return;
        }
        this.searchError = false;
        data = {
          type: this.type,
          search: this.search,
          page: this.page
        };
      }


      httpCall().post('news', data).then(response => {
        // console.log(response.data);
        this.data = response.data;
        this.news = response.data.articles;
        this.pageCount(this.data.totalResults);
        console.log(this.news);
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.$store.commit('loadingFalse');
      });
    }
  }
}
</script>

<style></style>