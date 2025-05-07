export default function InputCheck(nom, description) {
    const error = {
      hasError: false,
      type: '',
    };
  
    if (typeof(nom) !== 'string' || typeof(description) !== 'string') {
      return {
        hasError: true,
        type: 'notString',
      };
    }
  
    if (nom.trim() === '' || description.trim() === '') {
      return {
        hasError: true,
        type: 'empty',
      };
    }

    if (nom.length > 255){
        return {
            hasError: true,
            type: 'invalidNameLenght'
        }
    }
    if (description.length > 1000){
        return {
            hasError: true,
            type: 'invalidDescLenght'
        }
    }
  
    return error;
  }
  