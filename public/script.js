
let i = 0;
typewriter1();
function typewriter1() {
    let typewriterText1 = "Hello!";
    if (i < typewriterText1.length) {
        document.querySelector('.greetings__english').innerHTML += typewriterText1.charAt(i);
        i++;
        setTimeout(typewriter1, 80);
    } else {
        i = 0;
        setTimeout(typewriter2, 400);
    }
}

function typewriter2() {
    let typewriterText2 = "Hej!";
    if (i < typewriterText2.length) {
        document.querySelector('.greetings__danish').innerHTML += typewriterText2.charAt(i);
        i++;
        setTimeout(typewriter2, 80);
    }
}

fetch('./work-component.json')
    .then(response => response.json())
    .then(function(data){  
        data.components.forEach(component => {
            let templateClone = document.querySelector('#workComponent').content.cloneNode(true);
            templateClone.querySelector('.workComponent__img').src = component.image;
            templateClone.querySelector('.workComponent__img').alt = component.altText;
            templateClone.querySelector('.content__name').innerText = component.name;
            templateClone.querySelector('.content__description').innerText = component.description;
            templateClone.querySelector('.content__challenges').innerText = component.challenges;
            templateClone.querySelector('.links__code').href = component.code;
            templateClone.querySelector('.links__website').href = component.website;

            component.skills.forEach(skill => {
                let pTag = document.createElement("p");
                pTag.appendChild(document.createTextNode(skill));
                pTag.classList.add('skills')
                templateClone.querySelector('.content__skills').appendChild(pTag);
            })

            document.querySelector('.myWork__grid').appendChild(templateClone);
        });
        let workComponents = document.querySelectorAll('.workComponent__imgWrapper');
        workComponents.forEach(component => {
            component.addEventListener('click', function(){

                let componentWrapper = component.parentElement;
                let contentInner = componentWrapper.querySelector('.content__inner');
                if (window.getComputedStyle(contentInner, null).getPropertyValue('height') == "0px") {
                    componentWrapper.querySelector('.content__inner').style.height = "380px"
                } else {
                    componentWrapper.querySelector('.content__inner').style.height = "0px"
                }

            })
        })
    });


// fetch('https://quotes.rest/qod?language=en')
//     .then(response => response.json())
//     .then(function(data){ 
//         console.log(data)
//         document.querySelector('.quote').innerText = data.contents.quotes[0].quote;
//         document.querySelector('.quote__author').innerText = '-' + data.contents.quotes[0].author;
//     });  

