<template>
    <div id="expenseForm">

        <div class="titleCard">
            <img src="../../assets/expense.jpg" class="expenseIcon" width="45" height="45" alt="expense icon">
            <div class="titleName">Expense Tracker</div>
            <router-link to="/paymenthistory" class="btn btn-primary phistorybtn">Payment History</router-link>
        </div>

        <div class="totalbalance">
            <span class="totalbalanceText">Total Balance: </span>
            <span class="totalbalanceNum">₹ {{ balance }}</span>
        </div>

        <div class="totalincexp">
            <div class="totalincome">
                <span class="totalincomeText">Total Income</span>
                <div class="totalincomeNum">₹ {{ income }}</div>
            </div>

            <div class="totalexpense">
                <span class="totalexpenseText">Total Expense</span>
                <div class="totalexpenseNum">₹ {{ expense }}</div>
            </div>
        </div>

        <div class="expenseFormCard">

            <div class="cardHeader">
                Add New Transaction
            </div>
            
            <div class="hr"></div>
            
            <div>
                <label for="reasonText" class="form-label">Reason</label>
                <input type="text" v-model="v$.reason.$model" class="form-control" id="reasonText" placeholder="Enter reason here...">
                <span v-if="v$.reason.$error">
                    <div id="errorText">{{ v$.reason.$errors[0].$message }}</div>
                </span>
            </div>
        
            <div class="selectExp">
                <label for="selectType" class="form-label">Type</label>
                <select v-model="v$.type.$model" class="form-select" name="selectType" id="selectType">
                    <option value disabled>Select Type</option>
                    <option value="Credit">Credit</option>
                    <option value="Expense">Expense</option>
                </select>
                <span v-if="v$.type.$error">
                    <div id="errorText">{{ v$.type.$errors[0].$message }}</div>
                </span>
            </div>
            
            <div>
                <label for="expAmt" class="form-label">Amount</label>
                <input type="number" v-model="v$.amount.$model" class="form-control" id="expAmt" placeholder="Enter amount here...">
                <span v-if="v$.amount.$error">
                    <div id="errorText">{{ v$.amount.$errors[0].$message }}</div>
                </span>
            </div>
            
            <button class="btn btnTransac" @click="addTransaction">Add Transaction</button>
        
        </div>

    </div>
</template>

<script>
import { onMounted, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import swal from 'sweetalert';
import useVuelidate from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';

export default {
    setup() {
        const store = useStore();

        var transactionObj = reactive({
            data: {
                reason: '',
                type: '',
                amount: '',
                date: '',
                month: '',
                year: ''
            }
        });

        var rules = computed(() => {
            return{
                reason: { required },
                type: { required },
                amount: { required, numeric }
            }
        });

        var v$ = useVuelidate(rules, transactionObj.data);

        onMounted(() => {
            store.dispatch('getTransactionsFromDb');
        });

        var income = computed(() => store.getters.getincome);
        var expense = computed(() => store.getters.getexpense);
        var balance = computed(() => store.getters.getbalance);

        function addTransaction(){
            this.v$.$validate();
            if(!this.v$.$error){
                if(transactionObj.data.amount <= balance.value){
                    var d = new Date();
                    var n = d.toISOString();
                    var date = n.slice(8, 10);
                    var year = n.slice(0, 4);
                    var m = parseInt( n.slice(5, 7));
                    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                    var month = months[m - 1];
                    
                    transactionObj.data.date = date;
                    transactionObj.data.month = month;
                    transactionObj.data.year = year;

                    store.dispatch('saveTransactionToDb', transactionObj.data);
                }
                else{
                    swal("Transaction failed!", "Insufficient balance found!", "warning");
                }
                
            }
        }

        return{
            transactionObj,
            addTransaction,
            income,
            expense,
            balance,
            v$
        };
    }
}
</script>

<style scoped>
    .titleCard{
        display: flex;
        box-shadow: 0 3px 25px rgba(0, 0, 0, 0.12);
        padding: 8px 15px;
        align-items: center;
        position: sticky;
        top:0;
        background: rgb(255, 255, 255);
    }
    .expenseIcon{
        border-radius: 50%;
    }   
    .titleName{
        font-weight: bold;
        font-size: 19px;
        margin-left: 3px;
    }
    .phistorybtn{
        margin-left: auto;
    }
    .totalbalance{
        margin: 20px auto;
        width: 50%;
    }
    .totalbalanceText, .totalincomeText, .totalexpenseText{
        font-size: larger;
        font-weight: bold;
    }
    .totalbalanceNum{
        font-size: 24px;
        font-weight: bold;
        color:rgb(69, 1, 255)
    }
    .totalincexp{
        display: flex;
        margin: 20px auto;
        width: 50%;
    }
    .totalexpense{
        margin-left: auto;
    }
    .totalincomeNum, .totalexpenseNum{
        text-align: center;
        color: rgb(0, 255, 0);
        font-weight: bold;
        font-size: larger;
    }
    .totalexpenseNum{
        color: red;
    }

    .expenseFormCard{
        margin: 20px auto;
        padding: 20px;
        box-shadow: 0 3px 25px rgba(0, 0, 0, 0.15);
        border-radius: 20px;
        width: 50%;
    }
    .expenseFormCard>div{
        margin-bottom: 20px;
    }
    .btnTransac{
        width: 100%;
        margin: 2px 0 2px 0;
        background: rgb(189, 7, 245);
        color: white;
    }
    .btnTransac:focus{
        color: white;
        outline: none;
        box-shadow: 0 0 0 4px rgb(227, 164, 247);
    }
    .cardHeader{
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        font-style: italic;
    }

    @media (max-width: 850px){
        .titleCard{
            position:static;
        }
        .totalbalance{
            width: 90%;
        }
        .totalincexp{
            width: 90%;
        }
        .expenseFormCard{
            width: 90%;
        }
    }
</style>