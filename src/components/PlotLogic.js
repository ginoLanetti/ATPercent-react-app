
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


//returns array of AT % for each position translated from step value for given sequence 
export const returnATPercentData= (sequenceArray, step, range, counter) => {
     //calculating average AT % for given window
     const atPercent = (singleSequence, start, range) => {
        let countAT = 0;
        for (let i = start; i < (start + range); i++) {
            if ((singleSequence[i] === 'a') || (singleSequence[i] === 't')) {
                countAT++
            }
        }
        return (countAT / range) * 100;
    }  
    const sequence = sequenceArray[counter];
    let positions = [];
    let atPercentArray = [];
    let dataset = [];
    // creating array of positions for given sequence
    for (let i = 0; i < sequence.length; i += step) {
        positions.push(i);
    }
    //optimization of last positions
    let division = Math.ceil(range / step)
    if ((range === step) && (sequence % range !== 0)) {
        positions.pop();
        positions.push((sequence.length - 1) - range);
    } else if (step <= 1) {
        positions.splice((positions.length - division), division);
    } else if (step > 1) {
        positions.splice((positions.length - division), division);
        positions.push((sequence.length - 1) - range);
    }

    for (const position of positions) {
        atPercentArray.push(atPercent(sequence, position, range));
    };

    for (let j = 0; j < positions.length; j++){
        dataset.push({x: positions[j], y: atPercentArray[j]})
    }
    return dataset
}