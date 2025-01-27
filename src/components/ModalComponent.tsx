import React, { useEffect } from 'react';
import { Modal as BootstrapModal } from 'bootstrap';
import { close, useAppStore } from '@/stores/app.store';

const ModalComponent: React.FC = () => {
 const app = useAppStore()

  useEffect(() => {
    const modalElement = document.getElementById('myModal');
    let bootstrapModal: BootstrapModal | null = null;

    if (modalElement) {
      bootstrapModal = new BootstrapModal(modalElement);
      
      // Show or hide modal based on 'show' prop
      if (app.modal.show) {
        bootstrapModal.show();
      } else {
        bootstrapModal.hide();
      }

      const handleModalClose = () => close.modal && close.modal();
      modalElement.addEventListener('hidden.bs.modal', handleModalClose);

      // Cleanup event listener and modal instance on unmount
      return () => {
        modalElement.removeEventListener('hidden.bs.modal', handleModalClose);
        bootstrapModal?.dispose();
      };
    }
  }, [app.modal.show]);
  if (!app.modal.show) return false;
  return (
    <div className="modal fade" id="myModal" tabIndex={-1} aria-labelledby="myModalLabel" aria-hidden="true">
      <div className={`modal-dialog modal-${app.modal.size || 'md'} modal-dialog-centered`}>
        <div className="modal-content">
          <div className="modal-body">
            <button type="button" className="btn-close float-end" data-bs-dismiss="modal" aria-label="Close"></button>
            {app.modal.body}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalComponent;