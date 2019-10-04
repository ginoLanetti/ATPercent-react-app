
export const returnSequences = (fileContent) => {
    let seqs = (fileContent.toLowerCase()).split('>')
    seqs.shift();
    for (let i = 0; i < seqs.length; i++) {
        //removing labels and line breaks
        seqs[i] = seqs[i].slice(seqs[i].search(/\r?\n|\r/g)); 
        //removing any spaces left
        seqs[i] = seqs[i].trim().replace(/\r?\n\s|\r\s/g, ''); 
    }
    return seqs;
}
export const returnLabels = (fileContent) => {
    let labels = (fileContent.toLowerCase()).split('>')
    labels.shift();
    for (let i = 0; i < labels.length; i++) {
        //removing everything but sequences' label lines 
        labels[i] = labels[i].substring(0, labels[i].search(/\r?\n|\r/g)).trim(); 
    }
    return labels;
}
 //calculating average AT % for given window

//returns array of AT % for each position translated from step value for given sequence 
export const returnATPercentDataSeries= (sequences, step, windowWidth, labels, counter) => {
    const atPercent = (singleSequence, start, windowWidth) => {
       let countAT = 0;
       for (let i = start; i < (start + windowWidth); i++) {
           if ((singleSequence[i] === 'a') || (singleSequence[i] === 't')) {
               countAT++
           }
       }
       return (countAT / windowWidth) * 100;
   }  
   let series = [];
   for(let i = 0; i < counter; i++) {
       let sequence = sequences[i];
       let positions = [];
       let atPercentArray = [];
       let data = [];
       let dataset = {
       title: labels[i],
       disabled: false,
       data: []
       }
       // creating array of positions for given sequence
       let  isIncomplete = false;
       for (let j = 0; j < sequence.length; j += step) {
           if (j+(windowWidth-1) < (sequence.length-1)){
                positions.push(j);
                isIncomplete = true;
           } else if (j+(windowWidth-1) === (sequence.length-1)) {
                positions.push(j);
                isIncomplete = false;
           }
       }
       if (isIncomplete) {
            positions.push((sequence.length) - windowWidth);
       }
       // creating array of AT% for each window 
       for (const position of positions) {
       atPercentArray.push(atPercent(sequence, position, windowWidth));
       };
       //creating dataset for chart rendering
       for (let k = 0; k < positions.length; k++){
       data.push({x: positions[k], y: atPercentArray[k]})
       }
       dataset.data = data;
       series.push(dataset)
   }  
   return series 
}






