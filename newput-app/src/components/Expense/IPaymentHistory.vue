<template>
    <div id="Ipaymentview">
        <div class="paymentcard">
            <div class="preaanddate text-truncate">
                <div class="preason ">{{ phdata.reason }}</div>
                <div class="date">{{ phdata.date }} {{ phdata.month }} {{ phdata.year }}</div>
            </div>
            <div class="pamtcred" v-if="phdata.type === 'Credit'">+ ₹{{ phdata.amount }}</div>
            <div class="pamtexp" v-else>- ₹{{ phdata.amount }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['phdata'],
    setup() {
        
        return{

        };
    }
}
</script>

<style scoped>
    .paymentcard{
        display: flex;
        margin: 10px 20px;
        padding: 12px;
        box-shadow: 0 3px 20px rgba(0 , 0 , 0, 0.1);
        border-radius: 15px;
    }
    .preaanddate{
        flex: 1;
    }
    .preason{
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .date{
        font-size: 15px;
        margin-top: 2px;
    }
    .pamtcred{
        margin-left: auto;
        color: rgb(6, 255, 6);
        font-weight: bold;
    }
    .pamtexp{
        margin-left: auto;
        color: rgb(255, 7, 7);
        font-weight: bold;
    }
    
</style>