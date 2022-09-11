import { Injectable } from '@angular/core';

interface IModal {
  id: string;
  isVisible: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modals: IModal[] = [];

  constructor() {}

  isModalOpen(id: string) {
    return !!this.modals.find((element) => element.id === id)?.isVisible;
  }

  toggleModal(id: string) {
    const modal = this.modals.find((element) => element.id === id);
    if (modal) {
      modal.isVisible = !modal.isVisible;
    }
  }

  register(id: string) {
    this.modals.push({ id, isVisible: false });

    console.log(this.modals);
  }

  unregister(id: string) {
    this.modals = this.modals.filter((element) => {
      element.id !== id
    });

  }
}
