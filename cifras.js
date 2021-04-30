  
document.addEventListener("DOMContentLoaded", function(event){

    var mensagem = document.getElementById('mensagem')
    var btn = document.getElementById('botao')
    var tipoCifra = document.getElementById('cifras')

    var codificar = document.getElementById('codificado')
    var decodificar = document.getElementById('decodificado')

    codificar.onclick = ()=>{
        btn.innerText = 'Codificar'
    }
    decodificar.onclick = ()=>{
        btn.innerText = 'Decodificar'
    }

    tipoCifra.addEventListener('change', function(event){
        var codigo = tipoCifra.value
        var passoLabelClasses = document.getElementById('passoLabel').classList
        var passoInputClasses = document.getElementById('passoInput').classList
        if(codigo === 'base64'){
            passoLabelClasses .add('invisivel')
            passoInputClasses.add('invisivel')
        } else if(codigo === 'cesar'){
            passoLabelClasses .remove('invisivel')
            passoInputClasses.remove('invisivel')
        }
    }) 

    
    
    btn.addEventListener('click', function(event){
        event.preventDefault()
        var metodo = tipoCifra.value
        var msgFinal = ""
        var acao = ''

        if(codificar.checked){
            acao = 'codificar'
        }else if(decodificar.checked)
            acao = 'decodificar'
        else{
            msgFinal = 'Escolha uma ação'
        }
    
        if(metodo === 'base64'){
            console.log('aqui')

            msgFinal = base64(mensagem.value, acao)
            console.log(msgFinal)

        }else if(metodo==='cesar'){
            var passo = document.getElementById('passoInput').value
            msgFinal = cifraCesar(passo, mensagem.value, acao )
    
        } else{
            msgFinal = "Escolha uma cifra."
        }

        document.getElementById('resultado').textContent = msgFinal
    })

})

function base64(mensagem, acao){
    let resultado = ''
    console.log(mensagem, acao)
    if(acao==='codificar'){
        resultado = window.btoa(mensagem)
        console.log(resultado)
    }else if(acao==='decodificar'){
        resultado = window.atob(mensagem)
        console.log(resultado)
    }
    return resultado
}


function cifraCesar( passo, mensagem, acao ){
    var arrMensagem = mensagem.split("")
    var arrNum = arrMensagem.map((item) => { return item.charCodeAt(0) })
    var multiplicador = 1;
    if(acao === 'decodificar')
        multiplicador = -1
        
    var arrDeslocado = arrNum.map((item)=>{ return item+(multiplicador*passo) })
    var stringFinal = String.fromCharCode(...arrDeslocado)

    return stringFinal
}