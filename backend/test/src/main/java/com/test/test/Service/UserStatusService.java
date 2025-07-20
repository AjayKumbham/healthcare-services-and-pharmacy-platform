package com.test.test.Service;

import com.test.test.Repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserStatusService {

    @Autowired
    private ContactInformationRepository contactInformationRepository;

    @Autowired
    private DeliveryAddressRepository deliveryAddressRepository;

    @Autowired
    private DependentInformationRepository dependentInformationRepository;

    @Autowired
    private HealthInformationRepository healthInformationRepository;

    @Autowired
    private PaymentInformationRepository paymentInformationRepository;

    @Autowired
    private SecurityInformationRepository securityInformationRepository;

    public Map<String, Boolean> getUserStatus(String membershipId) {
        Map<String, Boolean> statusMap = new HashMap<>();

        statusMap.put("contact", contactInformationRepository.existsByMembershipId(membershipId));
        statusMap.put("address", deliveryAddressRepository.existsByMembershipId(membershipId));
        statusMap.put("dependents", dependentInformationRepository.existsByMembershipId(membershipId));
        statusMap.put("health", healthInformationRepository.existsByMembershipId(membershipId));
        statusMap.put("payment", paymentInformationRepository.existsByMembershipId(membershipId));
        statusMap.put("securityInformation", securityInformationRepository.existsByMembershipId(membershipId));

        return statusMap;
    }
}
