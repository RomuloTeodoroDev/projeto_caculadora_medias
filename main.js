const form = document.getElementById('form-atividade');
const imgAprovado ='<img src="./images/aprovado.png" alt="emoji celebrando" />';
const imgReprovado ='<img src="./images/reprovado.png" alt="emoji decepcionado" />';
const atividades = [];//array criado para chamar a função das atividades e notas
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>'
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>'
const notaMinima = parseFloat(prompt("Digite a nota mínima:"))

let linhas = '';

form.addEventListener('submit', function(e) {
    e.preventDefault(); //esta função serve para a página não ficar atualizando  a cada alteração
    
    adicionaLinha();//função criada para adicionar sempre uma linha a cada dados digitados
    atualizaTabela();//função criada para atualizar o campo de inserir dados na tabela
    atualizaMediaFinal();    
}); 

function adicionaLinha(){    
    const inputNomeAtividade = document.getElementById('nome-atividade');//aqui estou chamando um elemento do html
    const inputNotaAtividade = document.getElementById('nota-atividade');//   ''      ''     ''     ''      '' 
    
    if (atividades.includes(inputNomeAtividade.value)) {
        alert( `A atividade: ${inputNomeAtividade.value} já foi inserida`)
    } else {
        atividades.push(inputNomeAtividade.value);
        notas.push(parseFloat(inputNotaAtividade.value));
        
        let linha = '<tr>';
        linha += `<td>${inputNomeAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value}</td>`;
        linha += `<td>${inputNotaAtividade.value >= notaMinima ? imgAprovado : imgReprovado }</td>`;//função criada para dar uma nota a informção digitada com nota mínima para ser aprovado de 7 '?' quer dizer if ':' quer dizer else
        linha += '</tr>';
        
        linhas += linha;   
    }
    
    
    
    inputNomeAtividade.value = '';
    inputNotaAtividade.value = '';
}

function atualizaTabela(){
    const corpoTabela = document.querySelector('tbody');
    corpoTabela.innerHTML = linhas;
}

function atualizaMediaFinal(){
    const mediaFinal = calculaMediaFinal()
    
    document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2)
    document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMinima ? spanAprovado : spanReprovado   
}

function calculaMediaFinal() {
    let somaDasNotas = 0
    
    for (let i = 0; i < notas.length; i++){
        somaDasNotas += notas[i]
    }
    
    return somaDasNotas / notas.length
}