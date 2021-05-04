<template>
    <div id="paymentView">

        <div class="filterHistory">
            <select name="yearData" v-model="filterData.data.yearFilter" class="form-select filterYear">
                <option v-for="year in filteredYears" :key="year" :value="year" >{{ year }}</option>
            </select>
        
            <select name="monthData" v-model="filterData.data.monthFilter" class="form-select filterMonth">
                <option v-for="(month,i) in months" :key="i">
                    {{month}}
                </option>
            </select>
        </div>

        <div class="tag">
            <span class="material-icons">date_range</span>
            <span>{{ filterData.data.monthFilter }} {{ filterData.data.yearFilter }}</span>
        </div>

        <div class="currentbalance">
            <span class="currentbalanceText">Savings: </span>
            <span class="currentbalanceNum">₹ {{ currentbalance }}</span>
        </div>

        <div class="currentincexp">
            <div class="currentincome">
                <span class="currentincomeText">Income</span>
                <div class="currentincomeNum">₹ {{ currentincome }}</div>
            </div>

            <div class="currentexpense">
                <span class="currentexpenseText">Expense</span>
                <div class="currentexpenseNum">₹ {{ currentexpense }}</div>
            </div>
        </div>

        <div v-if="phistoryData.length > 0">
            <app-IPaymentHistory v-for="hist in phistoryData" :key="hist.id" :phdata="hist" />
        </div>
        <div class="noData" v-else>
            No Data Found!
        </div>

    </div>
</template>

<script>
import IPaymentHistory from './IPaymentHistory.vue';
import { computed, reactive, onMounted, toRefs, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    components: {
        'app-IPaymentHistory': IPaymentHistory
    },
    setup() {
        const store = useStore();

        onMounted(() => {
            store.dispatch('getTransactionsFromDb');
        });

        var filteredYears = computed(() => store.getters.getfilteredYears);

        var d = new Date();
        var n = d.toISOString();
        var year = n.slice(0, 4);
        var m = parseInt( n.slice(5, 7));
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[m - 1];
        var filterData = reactive({
            data: {
                yearFilter: year,
                monthFilter: month
            }
        });

        var { yearFilter } = toRefs(filterData.data);
        var { monthFilter } = toRefs(filterData.data);

        watch([yearFilter, monthFilter], (newval) => {
            store.commit('getcurrentDetails', { year: newval[0], month: newval[1] });
        });

        var phistoryData = computed(() => {
            return store.getters.getpaymentHistoryData.filter(temp => {
                return temp.year.match(filterData.data.yearFilter) && temp.month.match(filterData.data.monthFilter);
            })
        });
        
        var currentincome = computed(() => store.getters.getcurrentincome);
        var currentexpense = computed(() => store.getters.getcurrentexpense);
        var currentbalance = computed(() => store.getters.getcurrentbalance);
        
        return{
            phistoryData,
            filterData,
            filteredYears,
            months,
            currentincome,
            currentexpense,
            currentbalance
        };
    }
}
</script>

<style scoped>
    #paymentView{
        width: 60%;
        margin: 0 auto;
    }
    .filterHistory{
        margin: 20px 20px 10px 20px;
        display: flex;
    }
    .filterYear, .filterMonth{
        width: 50%;
    }
    .filterYear{
        margin-right: 5px;
    }
    .filterMonth{
        margin-left: 5px;
    }
    .tag{
        display: flex;
        margin: 0 20px;
        color:rgb(4, 0, 255);
    }
    .noData{
        text-align: center;
        font-weight: bolder;
        font-style: italic;
        margin-top: 50px;
        font-size: larger;
    }
    .currentbalance, .currentincexp{
        margin: 0 30px;
    }
    .currentincexp{
        display: flex;
        margin-top: 5px;
        margin-bottom: 20px;
    }
    .currentexpense{
        margin-left: auto;
    }
    .currentbalanceText, .currentincomeText, .currentexpenseText{
        font-size: large;
        font-weight: bold;
    }
    .currentbalanceNum{
        font-size: 20px;
        font-weight: bold;
        color:rgb(255, 1, 234)
    }
    .currentincomeNum, .currentexpenseNum{
        text-align: center;
        color: rgb(0, 255, 0);
        font-weight: bold;
        font-size: larger;
    }
    .currentexpenseNum{
        color: red;
    }

    @media (max-width: 850px){
         #paymentView{
            width: 100%;
        }
    }
</style>