// script.js
document.getElementById('diceSelect').addEventListener('change', function() {
    let diceType = this.value;
    let dice6 = document.getElementById('cube');
    let dice12 = document.getElementById('dodecahedron');
    
    if (diceType === 'd6') {
        dice6.style.display = 'block';
        dice12.style.display = 'none';
    } else {
        dice6.style.display = 'none';
        dice12.style.display = 'block';
    }
});

document.getElementById('rollButton').addEventListener('click', function() {
    let diceType = document.getElementById('diceSelect').value;
    let dice = document.getElementById(diceType === 'd6' ? 'cube' : 'dodecahedron');
    let rollButton = document.getElementById('rollButton');
    
    if (!dice.classList.contains('rolling') && !rollButton.disabled) {
        rollButton.disabled = true;
        dice.classList.add('rolling');
        
        // Adicionando a animação 'spin' apenas durante a rolagem
        dice.style.animation = 'spin 2s';
        
        setTimeout(() => {
            dice.classList.remove('rolling');
            
            let maxFaces = diceType === 'd6' ? 6 : 12;
            let result = Math.floor(Math.random() * maxFaces) + 1;

            let rotation = getRotationForFace(diceType, result);
            dice.style.transform = rotation;

            alert('Resultado: ' + result);

            // Removendo a animação 'spin' após a rolagem
            dice.style.animation = '';
            
            // Habilitar o botão após a animação e exibição do resultado
            rollButton.disabled = false;
        }, 1000); // duração da animação
    }
});

// Inicializar a visualização correta do dado
document.getElementById('diceSelect').dispatchEvent(new Event('change'));

function getRotationForFace(diceType, face) {
    const rotations = {
        d6: [
            'rotateX(0deg) rotateY(0deg)',       // face 1
            'rotateX(0deg) rotateY(-90deg)',     // face 2
            'rotateX(0deg) rotateY(-180deg)',    // face 3
            'rotateX(0deg) rotateY(90deg)',      // face 4
            'rotateX(90deg) rotateY(0deg)',      // face 5
            'rotateX(-90deg) rotateY(0deg)'      // face 6
        ],
        d12: [
            'rotateX(0deg) rotateY(0deg)',           // face 1
            'rotateX(0deg) rotateY(-72deg)',         // face 2
            'rotateX(0deg) rotateY(-144deg)',        // face 3
            'rotateX(0deg) rotateY(-216deg)',        // face 4
            'rotateX(0deg) rotateY(-288deg)',        // face 5
            'rotateX(63.4deg) rotateY(0deg)',        // face 6
            'rotateX(63.4deg) rotateY(-72deg)',      // face 7
            'rotateX(63.4deg) rotateY(-144deg)',     // face 8
            'rotateX(63.4deg) rotateY(-216deg)',     // face 9
            'rotateX(63.4deg) rotateY(-288deg)',     // face 10
            'rotateX(-63.4deg) rotateY(0deg)',       // face 11
            'rotateX(-63.4deg) rotateY(-72deg)'      // face 12
        ]
    };

    return rotations[diceType][face - 1];
}
