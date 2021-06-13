import axios from 'axios';
import { store } from '../store';
import { router } from '../../routes/routes';
import swal from 'sweetalert';

const state = () => {
    return{
        paymentHistoryData: [],
        income: 0,
        expense: 0,
        balance: 0,
        currentincome: 0,
        currentexpense: 0,
        currentbalance: 0,
        filteredYears: []
    };
};

const getters = {
    getpaymentHistoryData(state){
        return state.paymentHistoryData;
    },

    getincome(state){
        return state.income;
    },

    getexpense(state){
        return state.expense;
    },

    getbalance(state){
        return state.balance;
    },

    getcurrentincome(state){
        return state.currentincome;
    },

    getcurrentexpense(state){
        return state.currentexpense;
    },

    getcurrentbalance(state){
        return state.currentbalance;
    },

    getfilteredYears(state){
        return state.filteredYears;
    }
};

const mutations = {

    getTransactionsFromDb(state, payLoad){

        //payment history total data
        var keys = Object.keys(payLoad);
        var values = Object.values(payLoad);
        var i = 0;

        values.forEach(temp => {
            temp.id = keys[i];
            i++;
        });

        state.paymentHistoryData = values.reverse();
        //end
        
        //unique years for filter
        var yearData = values.map(temp => temp.year);
        var years = yearData.filter((temp, i) => {
            if(temp !== undefined){
                return yearData.indexOf(temp) === i;
            }
        });

        state.filteredYears = years.reverse();
        //end

        //calculate total balance, income and expense 
        var income = 0, expense = 0, balance = 0;

        values.forEach(temp => {
            if(temp.type === 'Credit'){
                income += parseInt(temp.amount);
            }
            else{
                expense += parseInt(temp.amount);
            }
        });

        balance = income - expense;
        
        state.income = income;
        state.expense = expense;
        state.balance = balance;
        //end

        //calculate balance, income and expense for current month
        var d = new Date();
        var n = d.toISOString();
        var year = n.slice(0, 4);
        var m = parseInt( n.slice(5, 7));
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var month = months[m - 1];

        var currentincome = 0, currentexpense = 0, currentbalance = 0; 

        values.forEach(temp => {
            if(temp.year === year && temp.month === month){
                if(temp.type === 'Credit'){
                    currentincome += parseInt(temp.amount);
                }
                else{
                    currentexpense += parseInt(temp.amount);
                }
            }
        });
        currentbalance = currentincome - currentexpense;

        state.currentincome = currentincome;
        state.currentexpense = currentexpense;
        state.currentbalance = currentbalance;
        //end
    },

    saveTransactionToDb(){
        store.dispatch('getTransactionsFromDb');
        router.push("/paymenthistory");
    },

    getcurrentDetails(state, payLoad){
        var currentincome = 0, currentexpense = 0, currentbalance = 0; 

        state.paymentHistoryData.forEach(temp => {
            if(temp.year === payLoad.year && temp.month === payLoad.month){
                if(temp.type === 'Credit'){
                    currentincome += parseInt(temp.amount);
                }
                else{
                    currentexpense += parseInt(temp.amount);
                }
            }
        });
        currentbalance = currentincome - currentexpense;

        state.currentincome = currentincome;
        state.currentexpense = currentexpense;
        state.currentbalance = currentbalance;
    }

};

const actions = {

    async getTransactionsFromDb({ commit, getters }){
        try{
            var fbdbUrl = getters.getfbdburlsettings;
            var authId = getters.getidToken;

            var res = await axios.get(fbdbUrl + '/personal/expenses.json?auth=' + authId);
            if(res.status === 200 && res.data !== null){
                commit('getTransactionsFromDb', res.data);
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    },

    async saveTransactionToDb({ commit, getters }, payLoad){
        try{
            var fbdbUrl = getters.getfbdburlsettings;
            var authId = getters.getidToken;

            var res = await axios.post(fbdbUrl + '/personal/expenses.json?auth=' + authId, payLoad);
            if(res.status === 200 && res.data !== null){
                commit('saveTransactionToDb');
            }
        }
        catch(error){
            swal("", error.response.data.error, "error");
        }
    }

};

export default{
    state,
    getters,
    mutations,
    actions
}