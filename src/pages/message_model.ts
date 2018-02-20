export class message {
    public id: number;
    public title: string;
    public text: string;
    
    // constructor(values: Object = {}) {
    //      Object.assign(this, values);
    // }

    constructor(id: number, title: string, text: string,
        mobileNumber: string,speciality: string, clinicName: string) {  
         this.id = id;
         this.title = title;
         this.text = text;
        
       }
 } 