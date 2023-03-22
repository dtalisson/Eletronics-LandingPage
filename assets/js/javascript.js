const icon = document.getElementById('menuIcon'); // icone de carrinho
const iconRemove = document.getElementById('iconRemove')     // icone para remover carrinho 


iconRemove.addEventListener('click', removeToggle) 

 function removeToggle() {    // function que vai fazer a classeList do nav ser removida e voltar ao normal 
    const nav = document.getElementById('nav')
    nav.classList.remove('active') 
}



icon.addEventListener('click',toggleCard) // adicionando função ao botão do icone 
function toggleCard() {  // sinalizando a função 
    const nav = document.getElementById('nav')
    nav.classList.toggle('active')
}

if(document.readyState == "loading") { 
    document.addEventListener("DOMContentLoaded", ready) 
} else { 
    ready()
}

let totalAmount = "0,00"

function ready() { 
        const removeProductButton = document.getElementsByClassName('buttonRemove')
            for (let i = 0; i < removeProductButton.length; i++) {
            removeProductButton[i].addEventListener('click', removeProduct)             
        }

    const quantidyInputs = document.getElementsByClassName('inputNumber')  // pegando a quantidade de itens 
    for (let i = 0; i < quantidyInputs.length; i++) {       // percorrendo a quantidade de inputs
        quantidyInputs[i].addEventListener("change", updateTotal)  // no input que estiver sendo "alterado", chame a função UpdateTotal, que consiste em calcular o valor pela quantidade, então assim que mexer no número de input estará mudando o valor total.
        
    }
    const addCartButtons = document.getElementsByClassName('botao')
    for (let i = 0; i < addCartButtons.length; i++) {
       addCartButtons[i].addEventListener("click", addCartProduct)
        
    }
    const finalizarCompra = document.getElementsByClassName("finalizarCompra")[0]
    finalizarCompra.addEventListener("click",checkCompra)

}

function checkCompra() { 
    if(totalAmount === "0,00") { 
        alert('seu carrinho está vazio.')
    }
    else { 
        window.alert(`muito obrigado por comprar nossos produtos. | valor total foi de R$:${totalAmount}`) 
       
    }
}


function checkIfInputUpdate(event) {   // evento que assim que clicar no botão de diminuir o input em zero, o container vai desaparecer ( item excluir ) 
    if (event.target.value === "0") {  // caso o value > for igual a 0 o item vai excluir 
        event.target.parentElement.parentElement.parentElement.remove() 
    } 
    updateTotal()   // chamando a função de calcular caso os inputs pelo valor 
}

function addCartProduct(event) {   // cria uma função de click no event 
    const button = event.target     
    const cartProductInfo = button.parentElement    // entra no parente de button que no caso seria container-products > cartProductInfo
    const productImage = cartProductInfo.getElementsByClassName('productImg')[0].src    // entra no container-products e procura por uma classe ProductImg - IMG [ o src é o enderço da imagem ]
    const productTittle = cartProductInfo.getElementsByClassName('nomeProduct')[0].innerText //entra no container-products e procura por uma classe nomeProduct - span [ o innerText é pra pegar somente o texto e não em si a classe ] 
    const productPrice = cartProductInfo.getElementsByClassName('priceProduct')[0].innerText //entra no container-products e procura por uma classe priceProduct - span [ o innerText é pra pegar somente o texto e não em si a classe ]

     let newCartProduct = document.createElement("div")    // criando um elemento chamado div
     newCartProduct.classList.add("quadrado")    // atribuindo a class ao elemento div de quadrado 

     newCartProduct.innerHTML = `   
     <div class="section-img">
                            <img src="${productImage}" alt="${productTittle}" id="imgSection">
                        </div>
                        <div class="section-conteudo"> 
                            <span class="nomeProduct">${productTittle}
                            <span class="priceProduto">${productPrice}</span>
                            <input type="number" class="inputNumber" value="1" min="0"> 
                            
                        </div>
                            <button type="button" class="buttonRemove"> Remove </button>
     
     ` // dentro da div atribuindo o que a div vai receber.
const cartBody = document.querySelector(".container-box")   // guardando em uma const onde vai ser adicionado o elemento.
cartBody.append(newCartProduct)  // adicionando o elemento na const onde criamos por append()
updateTotal() // chamando a função que assim que eu adicionar o produto no carrinho ele conte no valorTotal

// ambos usando o newCartProduct pois é o cart que é adicionado dinamicamente por isto estamos fazendo alteração nele

newCartProduct.getElementsByClassName('inputNumber')[0].addEventListener("change",checkIfInputUpdate)   // função de assim que clicar na quantidade, o valor ser alterado
newCartProduct.getElementsByClassName('buttonRemove')[0].addEventListener("click",removeProduct) // função de assim que clicar no produto ele remover


}   


function removeProduct(event) {                 // função de remover o produto 
            event.target.parentElement.remove()
            updateTotal()   // chama a função update total que está a baixo que consiste em receber o valor do input e multiplicar pela quantidade 
            
}


function updateTotal() {   // função de calcular o valor, consistindo multiplicando pela quantidade e dando o valor total no span Total

    totalAmount = 0; // criando uma const para guardar o resultado do numero 
    const cartProducts = document.getElementsByClassName('quadrado')   // criando uma const para o cart dos produtos que esta no id (quadrado)
    for (let i = 0; i < cartProducts.length; i++) {    // fazendo um for para percorrer a cada I 
        const productPrice = cartProducts[i].getElementsByClassName('priceProduto')[0].innerText.replace("R$", "").replace(",",".")  // procurando a class PriceProduct no cartProduct, que no caso seria procurar o priceproduct do id quadrado e tirar o R$ por: "", que no caso seria nada e trocar também a virgula por ponto
        const productQuantidade = cartProducts[i].getElementsByClassName('inputNumber')[0].value; // receber o valor inputNumber em valor 
        
        totalAmount += productPrice * productQuantidade   // pegando a quantidade total e fazendo o calculo da quantidade de produtos e valor 
    }
    totalAmount = totalAmount.toFixed(2) // pegando o valor total e formatando ele em duas casas décimais
    totalAmount = totalAmount.replace(".",",") // formatando o texto para tirar o ponto "." por virgula novamente ","
    document.querySelector('.totally span').innerText = totalAmount   // entrando no total de tudo e dando o total 
}