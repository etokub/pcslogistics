


var button = document.getElementsByClassName('tab-button-act'),
tabContent = document.getElementsByClassName('tab-content');
button[0].classList.add('active');
tabContent[0].style.display = 'block';


function tab(e, tab) {
	var i;
	for (i = 0; i < button.length; i++) {
		tabContent[i].style.display = 'none';
		button[i].classList.remove('active');
	}
	document.getElementById(tab).style.display = 'block';
	e.currentTarget.classList.add('active');
}

function addZero(x,n) {
	while (x.toString().length < n) {
		x = "0" + x;
	}
	return x;
};

var input = document.getElementById('docNum'),
oldValue,
regex = new RegExp(/^\d{0,10}$/g),
mask = function(value) {
	var output = [];
	for(var i = 0; i < value.length; i++) {
		if(i !== 0 && i % 6 === 0) {
            output.push(" "); // add the separator
        }
        output.push(value[i]);
    }
    return output.join("");
},
unmask = function(value) {/^\d{0,10}$/g
      var output = value.replace(new RegExp(/[^\d]/, 'g'), ''); // Remove every non-digit character
      return output;
  },
  keydownHandler = function(e) {
  	oldValue = e.target.value;
  },
  inputHandler = function(e) {
  	var el = e.target,
  	newValue = el.value
  	;
  	newValue = unmask(newValue);

  	if(newValue.match(regex)) {
  		newValue = mask(newValue);
  		el.value = newValue;
  	} else {
  		el.value = oldValue;
  	}
  }
  ;

  input.addEventListener('keydown', keydownHandler );
  input.addEventListener('input', inputHandler );
