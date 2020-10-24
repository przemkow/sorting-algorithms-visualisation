function createRenderer(array, algName) {
  const wrapper =  document.createElement('div')
  wrapper.classList += 'wrapper';
  wrapper.appendChild(document.createTextNode(algName))
  const presenterNodes = [];
  array.forEach((value, index) => {
    const col = document.createElement('div');
    col.classList += 'col';
    col.style.height = `${value/10}%`;
    // col.innerText = value;
    presenterNodes.push(col);
    wrapper.appendChild(col)
  })

  document.getElementById('app').appendChild(wrapper);


  let temp = null;
  return function (modifierTrack) {
    if(temp) {
      temp.style.backgroundColor = '';
    }
    presenterNodes[modifierTrack.changedIndex].style.height = `${modifierTrack.newValue/10}%`;
    presenterNodes[modifierTrack.changedIndex].style.backgroundColor = 'green';
    temp = presenterNodes[modifierTrack.changedIndex];
  }
}


export {
  createRenderer
}
