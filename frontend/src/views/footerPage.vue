<template>
    <div id= "footer">
        <div id="footer-image__container">
            <img id ="footer__image" src="../assets/logo-banner-update-3.png" alt="Logo du réseau social d'entreprise Groupomania"/>
        </div>
        <div id="footer-text__container">
            <div class="footer__container">
                <h2>Nous contacter</h2>
                <p>Vous pouvez nous contacter afin de nous faire part de vos suggestions afin d'améliorer Groupomania</p>
            </div>
            <div class="footer__container">
                <h2>Notre politique de confidentialité</h2>
                <p>Vous pouvez consulter ici nos conditions de confidentialités, de sécurités et de stockage des données confidentielles</p>
            </div>
        </div>
    </div>
</template>

<script>

export default {
   name: 'footerPage'
}
</script>

<style scoped>
    #footer{
        background-color: #5900FF;
        margin-top: 5rem;
        border-radius: 1rem;
    }
    .footer__container{
        width: 40%;
    }
    
    #footer__image{
        width: 30%;
    }
    #footer-text__container{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    h2{
        font-size: 1rem;
    }

</style>


