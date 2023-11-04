<template>
  <div class="flex flex-col ">
    <span class="title">Exchange</span>


    <div class="flex items-end gap-4 mt-6">
      <div class="flex flex-col items-start">
        <label for="beginDate">Begin Date</label>
        <input id="beginDate" v-model="beginDate" type="date" :max="bugununTarihi" class="generalInput">
      </div>
      <div class="flex flex-col items-start">
        <label for="endDate">End Date</label>
        <input id="endDate" v-model="endDate" type="date" :max="bugununTarihi" class="generalInput">
      </div>
      <button-component @click="getExchange">Get</button-component>
    </div>

    <div>
      {{ datas }}
    </div>
  </div>
</template>

<script>
import { httpCall } from '@/api/httpCall';

export default {
  data() {
    return {
      bugununTarihi: "",
      beginDate: "",
      endDate: "",
      from: "",
      to: "",
      datas: []
    }
  },
  mounted() {
    if (!localStorage.getItem('exchangeData')) {
      httpCall().post('exchange', {
        beginDate: this.beginDate,
        endDate: this.endDate,
        from: this.from,
        to: this.to
      }).then(response => {
        console.log(response.data);
        localStorage.setItem('exchangeData',JSON.stringify(response.data));
        this.datas = response.data;
      }).catch((error) => {
        console.log(error)
      });
    } else {
      this.datas = JSON.parse(localStorage.getItem('exchangeData'));
    }

    this.bugununTarihi = this.dateFormat(new Date());
  },
  methods: {
    dateFormat(tarih) {
      const yil = tarih.getFullYear();
      const ay = String(tarih.getMonth() + 1).padStart(2, '0');
      const gun = String(tarih.getDate()).padStart(2, '0');

      return `${yil}-${ay}-${gun}`;
    },
    getExchange() {
      this.endDate = this.beginDate;
      
      httpCall().post('exchange', {
        beginDate: this.beginDate,
        endDate: this.endDate,
        from: this.from,
        to: this.to
      }).then(response => {
        console.log(response.data);
        localStorage.setItem('exchangeData',JSON.stringify(response.data));
        this.datas = response.data;
      }).catch((error) => {
        console.log(error)
      });
    }
  }
}
</script>

<style></style>