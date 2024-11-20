/*const gifImage = document.getElementById('gifImage');
const gifSrc = gifImage.src;  // Salva o caminho original do GIF

gifImage.addEventListener('mouseenter', () => {
  // Quando o mouse entra, o GIF deve continuar sua animação (não mudar nada, apenas continuar a animação)
  gifImage.style.animationPlayState = 'running'; // Ativa a animação
});

gifImage.addEventListener('mouseleave', () => {
  // Quando o mouse sai, o GIF deve "rebobinar"
  gifImage.style.animationPlayState = 'paused'; // Pausa a animação no último quadro

  // Rebobina o GIF (volta para o primeiro quadro)
  gifImage.src = '';  // Esvazia o src
  gifImage.src = gifSrc;  // Reatribui o src original, fazendo o GIF reiniciar
}); */ 



// Função que permite o drop (impede o comportamento padrão)
function allowDrop(event) {
    event.preventDefault(); // Impede o comportamento padrão de abrir o item arrastado no navegador
}

// Função que manipula o evento de "dragstart" (quando o item começa a ser arrastado)
function drag(event) {
    // Passa o ID da imagem que está sendo arrastada
    const draggedElement = event.target; // O elemento que está sendo arrastado (no caso, o quadrado da direita)
    
    // Se o alvo do arrasto for uma imagem (em vez do quadrado inteiro), então obtemos o pai
    if (draggedElement.tagName === "IMG") {
        event.dataTransfer.setData("text", draggedElement.parentNode.id); // Armazena o id do quadrado, não da imagem
        event.dataTransfer.setData("imgSrc", draggedElement.src); // Armazena o caminho da imagem
    } else {
        event.dataTransfer.setData("text", draggedElement.id); // Caso o alvo seja o quadrado
        event.dataTransfer.setData("imgSrc", draggedElement.querySelector('img').src); // Armazena o caminho da imagem
    }
}

// Função que manipula o evento de "drop" (quando o item é solto)
function drop(event) {
    event.preventDefault(); // Impede o comportamento padrão (não realizar o drop)

    const draggedId = event.dataTransfer.getData("text"); // Obtém o ID do quadrado arrastado
    const draggedImageSrc = event.dataTransfer.getData("imgSrc"); // Obtém o caminho da imagem

    const targetBox = event.target; // O quadrado de destino onde a imagem será solta

    // Verifica se o alvo do drop é uma caixa válida (não aceita se for uma imagem)
    if (targetBox.classList.contains('box')) {
        // Verifica se já existe uma imagem dentro do quadrado à esquerda
        const existingImage = targetBox.querySelector('img');
        
        // Se já houver uma imagem, remova a imagem anterior
        if (existingImage) {
            targetBox.removeChild(existingImage); // Remove a imagem anterior
        }

        // Cria a nova imagem
        const newImage = document.createElement('img');
        newImage.src = draggedImageSrc; // Define o caminho da nova imagem
        newImage.style.width = '100%'; // Ajusta a imagem para preencher o quadrado
        newImage.style.height = '100%';
        newImage.style.objectFit = 'cover'; // Ajuste de proporção para cobrir o quadrado
        newImage.style.position = 'absolute'; // A nova imagem vai ficar por baixo da caixa
        newImage.style.top = '0';
        newImage.style.left = '0';
        newImage.style.zIndex = '-1'; // Garante que a imagem fique por baixo da caixa

        // Adiciona a nova imagem à caixa
        targetBox.appendChild(newImage);

        // Atualiza o ID do quadrado para refletir o novo ID do elemento arrastado
        targetBox.id = draggedId; // Atualiza o ID do quadrado à esquerda com o ID da imagem arrastada
    } else {
        console.error('Elemento arrastado não encontrado!'); // Mensagem de erro se não encontrar o elemento
    }
}

// Adiciona os eventos de dragstart e dragover usando addEventListener para evitar o uso de inline events
document.addEventListener('DOMContentLoaded', () => {
    const draggables = document.querySelectorAll('.draggable');
    const boxes = document.querySelectorAll('.box');

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', drag);
    });

    boxes.forEach(box => {
        box.addEventListener('dragover', allowDrop);
        box.addEventListener('drop', drop);
    });
});


//document.getElementById('backgroundMusic').play().catch(function(error) {
//    console.log("Erro ao tentar reproduzir o áudio: ", error);
//});