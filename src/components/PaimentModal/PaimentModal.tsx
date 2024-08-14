/*
  Author : Mudey Formation
  Website : https://mudey.fr/
  App Name : E-commerce with React.Js
  Created At : 27/09/2023 19:26:27
*/
import React, { FC, useEffect } from 'react';
import './PaimentModal.css';
import StripeComponent from '../PaymentMethods/Stripe/StripeComponent/StripeComponent';

interface PaimentModalProps {
  close: () => void
}


const PaimentModal: FC<PaimentModalProps> = ({close}) => {



  useEffect(() => {
    window.scrollTo(0, 0)
    const runLocalData = async () => {
      const modal = new (window as any).bootstrap.Modal("#paimentModal",{ keyboard: false })
      modal.show()
    }
    runLocalData()
  })

  return (
    <div className="PaimentModal">
      <div className="modal fade" id="paimentModal"  aria-labelledby="paimentModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="paimentModalLabel">Payment Modal</h1>
              <button onClick={close} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
            </div>
            <div className="modal-body">
              <StripeComponent/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaimentModal;