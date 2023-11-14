<template>
  <div class="flex flex-col ">
    <span class="title">Currency Converter</span>


    <div class="flex flex-col items-start mt-6 gap-y-4 gap-x-8 lg:items-end lg:flex-row">

      <div class="flex items-end gap-4">
        <div class="flex flex-col items-start">
          <label for="beginDate">Begin Date</label>
          <input id="beginDate" v-model="beginDate" type="date" class="generalInput">
        </div>
        <div class="flex flex-col items-start">
          <label for="endDate">End Date</label>
          <input id="endDate" v-model="endDate" type="date" class="generalInput">
        </div>
      </div>
      <div class="flex items-end gap-4">
        <div class="flex flex-col items-start">
          <label for="type">Type</label>
          <select id="type" v-model="type" class="generalInput">
            <option value="top-headlines">Top Headlines</option>
            <option value="everything">Everything</option>
          </select>
        </div>
        <div class="flex flex-col items-start">
          <label for="country">Countries</label>
          <select id="country" v-model="country" class="generalInput">
            <option :value="country.code" v-for="country in countries" :key="country.code" v-text="country.name"></option>
          </select>
        </div>
      </div>
      <button-component @click="getNews">Search</button-component>
    </div>

    <div class="grid gap-4 mt-10 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
      <div class="grid grid-cols-2 p-4 bg-white rounded hoverEffect hover:cursor-pointer group" v-for="(article,index) in news" :key="index" @click="goToArticle(article.url)">
        <div class="col-span-2 mb-4 text-base font-semibold text-gray-800 group-hover:underline group-hover:text-primary-100">
          {{ article.title.replace(" - "+article.author, "") }}
        </div>
        <div class="flex items-baseline gap-1 text-sm ">
          <span>Author:</span> <span class="font-bold text-blue-900">{{ article.author }}</span>
        </div>
        <div class="flex items-baseline justify-end text-xs text-gray-700">
          <span>{{ fixDateTime(article.publishedAt) }}</span>
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
      countries: []
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

      let normalTarih = isoDate.toLocaleDateString(); // Tarih kısmı
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
    getNews() {
      httpCall().post('news', {
        type: this.type,
        country: this.country,
        page: this.page
      }).then(response => {
        // console.log(response.data);
        this.data = response.data;
        this.news = response.data.articles;
        console.log(this.news);
      }).catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style></style>