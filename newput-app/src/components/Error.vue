<template>
    <div class="errorView">
        <div class="errorContent">
            <img src="../assets/pageNotFound.jpg" class="notFoundImg" alt="page not found" />
            <div class="notFoundContent">
                <p class="oopstag">OOPS! PAGE NOT FOUND.</p>
                <p class="sorrytag">Sorry, the page you're looking for doesn't exist.</p>
                <router-link to="/" class="btn btn-primary">Return to Home Page</router-link> 
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
    .errorView{
        margin: 50px;   
    }
    .errorContent{
        display: flex;
        align-items: center;
        justify-content: space-evenly;
    }
    .notFoundImg{
        height: 500px;
        width: 350px;
    }
    .notFoundContent{
        text-align: center;
    }
    .oopstag{
        font-weight: bold;
        font-size: 35px;
        font-style: italic;
    }
    .sorrytag{
        margin: 20px 0;
        font-weight: bold;
    }

    @media (max-width: 968px){
        .notFoundImg{
            height: 400px;
            width: 250px;
        }
    }
    @media (max-width: 600px){
        .notFoundImg{
            height: 200px;
            width: 150px;
        }
        .errorContent{
            flex-direction: column;
        }
        .errorView{
            margin: 20px 25px;   
        }
        .oopstag{
            font-size: 30px;
        }
    }
</style>