import { Injectable } from '@angular/core';

interface IModal{
  id: string,
  isVisible: boolean
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  isModalOpen() {
    return true;
  }

  toggleModal() {
    //this.isVisible = !this.isVisible;
  }

  register(id: string){
    this.modals.push({id, isVisible: false});

    console.log(this.modals);
  }
}
