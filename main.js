const imgEl = document.querySelector('#qr-img');
const inputEl = document.querySelector('#content-in');
const generateBtn = document.querySelector('#submit');
const contentEl = document.querySelector('#qr-content');
const errorEl = document.querySelector('#error-msg');
const loader = document.querySelector('#loader');

function showError(msg){
    errorEl.style.display = 'block';
    inputEl.style.borderColor = 'red'
    errorEl.innerText = msg;
}


function hideError(){
    errorEl.style.display = 'none';
    inputEl.style.borderColor = '#b9bcc1'
}


function fetchData(){
    if(inputEl.value && inputEl.value.length < 200){
        const apiUrl = 'http://api.qrserver.com/v1/create-qr-code/?data=';
        const inputData = inputEl.value;
        const dataUrl = apiUrl + inputData + '!&size=250x250&bgcolor=d38206'

        imgEl.setAttribute('src', dataUrl)
        contentEl.style.display = 'block'
        contentEl.innerText = inputEl.value
        inputEl.value = ''
        gridLoader()
   
    }else if(inputEl.value == ''){
        showError('Field can not be empty')
    }else if(inputEl.value.length > 200){
        showError('Character limit exceed')
    }
   
}

generateBtn.addEventListener('click', fetchData)

inputEl.onkeydown = (e)=>{
    hideError();
    if(e.keyCode == 13){
        fetchData()
     }
}

function gridLoader(){
    let grid = document.querySelector('.grid');

    if(grid){
        grid.remove();
    }

    const cont = document.querySelector('.qr-container')
    const gridCont = document.createElement('div');
    gridCont.classList.add('grid');
    cont.append(gridCont)
    
    
    function addPixel(id){
        const pixel = document.createElement('div');
        pixel.classList.add('box');
        gridCont.appendChild(pixel)
        pixel.id = 'box-' + id ;
    }
    
    const numberList = []

    for(let i = 0; i < 400; i++){
        addPixel(i)
        numberList.push(i)
    }
    
    let randomArr = numberList.sort(() => 0.5 - Math.random());

    loader.style.display = 'flex';

    const boxes = Array.from(document.querySelectorAll('.box'))

    const removeBoxes = setInterval(() => {
        if(randomArr.length){
            boxes[randomArr[0]].style.opacity = 0; 
            randomArr.shift();   
        }
           
    }, 1);
    
    setTimeout(() => {
        let grid = document.querySelector('.grid')
        grid.remove();  
        loader.style.display = 'none';                      
    }, 1600);
}





