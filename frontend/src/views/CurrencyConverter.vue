<template>
  <div class="flex flex-col ">
    <span class="title">Currency Converter</span>


    <div class="flex flex-col items-start mt-6 gap-y-4 gap-x-8 lg:items-end lg:flex-row">

      <div class="flex items-end gap-4">
        <div class="flex flex-col items-start">
          <label for="beginDate">Begin Date</label>
          <input id="beginDate" v-model="beginDate" type="date" :max="bugununTarihi" class="bg-white generalInput">
        </div>
        <div class="flex flex-col items-start">
          <label for="endDate">End Date</label>
          <input id="endDate" v-model="endDate" type="date" :max="bugununTarihi" class="bg-white generalInput">
        </div>
      </div>
      <div class="flex items-end justify-start">
        <div class="flex flex-col items-start mr-2">
          <label for="currency">Currencies</label>
          <select id="currency" v-model="from" class="w-full bg-white generalInput hover:cursor-pointer">
            <option value="" selected>EUR</option>
            <option :value="currency" v-for="currency in currencies" :key="currency">{{ currency }}</option>
          </select>
        </div>
        <div class="flex items-center h-full gap-2">
          <label for="currency2">To</label>
          <dropdown-component>
            <template v-slot:trigger>
              <div id="currency2" class="flex items-center w-full gap-1 bg-white generalInput hover:cursor-pointer">
                <span>{{ selectedToArray }}</span>
                <font-awesome-icon icon="chevron-down" class="ml-1" />
              </div>
            </template>

            <div v-for="(currency, index) in currencies" :key="index" class="">
              <label v-if="(from == '' && currency != 'EUR') || (from != '' && currency != from)" class="flex gap-1 px-4 py-1 hover:bg-gray-200 active:bg-gray-300 hover:cursor-pointer">
                <input type="checkbox" v-model="toArray[index]">
                <span>{{ currency }}</span>
              </label>
            </div>

          </dropdown-component>
        </div>
      </div>
      <button-component @click="getExchange">Get</button-component>
    </div>

    <div class="flex items-center gap-2 mt-6">
      <span class="text-xl">
        Base Currency:
      </span>
      <div class="px-4 py-1.5 text-sky-700 bg-sky-200 rounded-full w-fit">
        {{ datas.base }}
      </div>
    </div>
    <div v-if="table" class="w-full max-w-xl mt-2 overflow-x-auto bg-white rounded">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th>Currencies</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in datas.rates" :key="index">
            <td>
              <div class="px-4 py-1.5 text-green-700 bg-green-200 rounded-full w-fit">
                {{ index }}
              </div>
            </td>
            <td>
              <span class="font-semibold">
                {{ data }}
              </span>
            </td>
            <td>{{ dateFormat(new Date(datas.date), "dmy") }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else class="w-full mt-2 overflow-x-auto bg-white rounded">
      <table class="w-full table-auto">
        <thead>
          <tr>
            <th>Currencies</th>
            <th class="whitespace-nowrap" v-for="data in Object.keys(datas.rates)" :key="data">Amount ({{ data }})</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in currencies" :key="index">
            <td>
              <div class="px-4 py-1.5 text-green-700 bg-green-200 rounded-full w-fit">
                {{ data }}
              </div>
            </td>
            <td v-for="(amount, x) in Object.keys(datas.rates)" :key="x">
              <span class="font-semibold">{{ datas.rates[amount][data] }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { httpCall } from '@/api/httpCall';

export default {
  data() {
    return {
      table: true,
      bugununTarihi: "",
      beginDate: "",
      endDate: "",
      from: "",
      to: "",
      datas: [],
      currencies: [],
      toArray: {},
      selectedTo: {},
      selectedToArray: "All Currencies"
    }
  },
  setup() {
    const tarih = new Date();
    const yil = tarih.getFullYear();
    const ay = String(tarih.getMonth() + 1).padStart(2, '0');
    const gun = String(tarih.getDate() - 2).padStart(2, '0');

    let bugununTarihi = `${yil}-${ay}-${gun}`;
    // console.log(bugununTarihi);

    return { bugununTarihi };
  },
  created() {
    this.beginDate = this.bugununTarihi;
  },
  mounted() {
    this.$store.commit('loadingTrue');
    httpCall().post('exchange', {
      beginDate: this.beginDate,
      endDate: this.beginDate,
      from: this.from,
      to: this.to
    }).then(response => {
      // console.log(response.data);
      this.datas = response.data;
    }).catch((error) => {
      console.log(error)
    }).finally(() => {
      this.$store.commit('loadingFalse');
    });

    this.currencies = [
      "AUD",
      "BGN",
      "BRL",
      "CAD",
      "CHF",
      "CNY",
      "CZK",
      "DKK",
      "EUR",
      "GBP",
      "HKD",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "ISK",
      "JPY",
      "KRW",
      "MXN",
      "MYR",
      "NOK",
      "NZD",
      "PHP",
      "PLN",
      "RON",
      "SEK",
      "SGD",
      "THB",
      "TRY",
      "USD",
      "ZAR"
    ]
  },
  watch: {
    toArray: {
      handler(newtoArray, oldtoArray) {
        // Veri değiştiğinde bu işlev çağrılır
        console.log("Veri değişti.");

        this.selectedTo = Object.keys(newtoArray).filter((index) => newtoArray[index]);
        if (this.selectedTo.length < 1) {
          this.selectedToArray = "All Currencies";
        } else if (this.selectedTo.length == 1) {
          this.selectedToArray = this.currencies[parseInt(this.selectedTo[0])];
        } else {
          this.selectedToArray = this.selectedTo.length + " selected";
        }
        console.log(this.selectedTo);
        // console.log(Object.keys(this.datas.rates));
        // console.log(selectedItems.length);
        // console.log(this.datas);
      },
      deep: true,
    },
  },
  methods: {
    dateFormat(tarih, type) {
      const yil = tarih.getFullYear();
      const ay = String(tarih.getMonth() + 1).padStart(2, '0');
      const gun = String(tarih.getDate()).padStart(2, '0');
      switch (type) {
        case "dmy":
          return `${gun}/${ay}/${yil}`;
          break;

        default:
          return `${yil}-${ay}-${gun}`;
          break;
      }
    },
    getExchange() {
      this.$store.commit('loadingTrue');

      let endDate = this.endDate;
      if (!this.endDate) {
        endDate = this.beginDate;
      }

      let to = "";
      for (let index = 0; index < this.selectedTo.length; index++) {
        const element = this.currencies[parseInt(this.selectedTo[index])];
        if (index == 0) {
          to = element;
        } else {
          to = to + "," + element;
        }
      }

      httpCall().post('exchange', {
        beginDate: this.beginDate,
        endDate: endDate,
        from: this.from,
        to: to
      }).then(response => {
        // console.log(response.data);
        localStorage.setItem('exchangeData', JSON.stringify(response.data));
        this.datas = response.data;
        if (Object.keys(this.datas.rates).includes(this.beginDate)) {
          this.table = false;
        } else {
          this.table = true;
        }
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