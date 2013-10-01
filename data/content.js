onMessage = function(response){
    var imageData = response.imageData || [''];
    var r = parseInt(Math.random() * imageData.length);
    function setBGImage(number){
        var position = '';
        switch(imageData[number].pos){
            case '1' :
                position = 'left top';
            break;
            case '2' :
                position = 'right top';
            break;
            case '3' :
                position = 'left bottom';
            break;
            case '4' :
                position = 'right bottom';
            break;
        }
        var repeat = imageData[number].repeat ? '' : 'no-repeat';
        document.body.style.background = ("url('"+ imageData[number].path +"') "+repeat +" fixed " + position);
    }
    var title,
        optionElm,
        selectElm = document.createElement('select');
    selectElm.style.position = 'fixed';
    selectElm.style.right = '5px';
    selectElm.style.bottom = '10px';
    selectElm.addEventListener('change', function(e){
        setBGImage(selectElm.selectedIndex);
    });
    imageData.forEach(function (elm, index){
        title = elm.title;
        optionElm = document.createElement('option');
        optionElm.textContent = title;
        if(index == r){
            optionElm.selected = true;
        }
        selectElm.appendChild(optionElm);
    });
    document.body.appendChild(selectElm);
    setBGImage(r);
}
