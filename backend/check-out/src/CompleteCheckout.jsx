// CompleteCheckout.jsx

import React from 'react';
import { useLocation } from 'react-router-dom';

const CompleteCheckout = () => {
 

  return (
    <div>
      <p>
        We appreciate your business! A confirmation email will be sent to .
        <br />
        If you have any questions, please email{' '}
        <a href="mailto:orders@example.com">orders@example.com</a>.
      </p>
    </div>
  );
};

export default CompleteCheckout;
