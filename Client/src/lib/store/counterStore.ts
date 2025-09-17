import { makeAutoObservable } from "mobx"

export default class CounterStore {
    title='Counter store'
    count=0;
    events:string []=[
       `Initial count is ${this.count}` 
    ]
   constructor(){
    // makeObservable(this,{
    //     count:observable,
    //     title:observable,
    //     setIncrement:action.bound,
    //     setDecrement:action
    // })
    makeAutoObservable(this)
   }

   setIncrement(amount =1){ 
    this.count +=amount;
    this.events.push(`Increment by ${amount} now  count is ${this.count}` )
   }
   
   setDecrement=(amount =1)=>{
    this.count -=amount;
     this.events.push(`decrement by ${amount} now  count is ${this.count}` )
   }
   
}