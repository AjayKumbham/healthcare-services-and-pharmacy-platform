package com.test.test.Service;

import com.test.test.Entity.PaymentInformation;
import com.test.test.Repository.PaymentInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentInformationService {

    @Autowired
    private PaymentInformationRepository paymentInformationRepository;

    public PaymentInformation savePaymentInformation(PaymentInformation paymentInformation) {
        return paymentInformationRepository.save(paymentInformation);
    }

    public List<PaymentInformation> getPaymentInfo(String membershipId) {
        return paymentInformationRepository.findAllByMembershipId(membershipId);
    }

    public PaymentInformation getPaymentInformationById(Long id) {
        return paymentInformationRepository.findById(id).orElse(null);
    }

    public PaymentInformation updatePaymentInformation(Long id, PaymentInformation paymentInformation) {
        PaymentInformation existingPayment = paymentInformationRepository.findById(id).orElse(null);

        if (existingPayment != null) {
            existingPayment.setCardHolderName(paymentInformation.getCardHolderName());
            existingPayment.setCardNumber(paymentInformation.getCardNumber());
            existingPayment.setExpirationDate(paymentInformation.getExpirationDate());
            existingPayment.setCvv(paymentInformation.getCvv());
            existingPayment.setCardType(paymentInformation.getCardType());
            existingPayment.setUpiId(paymentInformation.getUpiId());
            existingPayment.setMembershipId(paymentInformation.getMembershipId());
            return paymentInformationRepository.save(existingPayment);
        }
        return null;
    }

    public void deletePaymentInformation(Long id) {
        paymentInformationRepository.deleteById(id);
    }
}


