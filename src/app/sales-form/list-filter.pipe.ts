import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  transform(list: any[], filterText: string): any {
    if(!filterText){
      return list;
    }
    else{
      return list.filter(item => item.Productname.search(new RegExp(filterText, 'i')) > -1);
    }
    
  }

}
