
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