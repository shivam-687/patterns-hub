
export default class InputValidator{
     private error: string|undefined = undefined;

     constructor(private input: number){}

    notNan = (message?: string) => {
        if(isNaN(this.input)){
            message ? this.error = message : this.error = 'Input must be a number'
        }
        return this;
    }

    isEven = (message?: string) => {
        if(this.input%2!=0){
            message ? this.error = message : this.error = 'Input must be an even number'
        }
        return this;
    }
    isOdd = (message?: string) => {
        if(this.input%2===0){
            message ? this.error = message : this.error = 'Input must be an odd number'
        }
        return this;
    }

    isBetween = (min: number, max: number, message?: string)=>{
        if(!(this.input > min && this.input < max))  message ? this.error = message : this.error = `Input must be between ${min} and ${max}`
        return this;
    }

    success(){
        return this.error ? false : true;
    }

    message(){
        return this.error || '';
    }

    result(){
        return this.error;
    }
}