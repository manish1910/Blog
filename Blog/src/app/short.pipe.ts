import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(value:string ,length:number)
  {
    if(value.length>length)
    {
      return value.substr(0,length)+" ........."
    }
    return value;
  }
}
