package com.test.test.Service;

import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.PaymentInformation;
import com.test.test.Repository.DeliveryAddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeliveryAddressService {

    @Autowired
    private DeliveryAddressRepository deliveryAddressRepository;

    public boolean saveDeliveryAddress(DeliveryAddressInformation deliveryAddress) {
        try {
            deliveryAddressRepository.save(deliveryAddress);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<DeliveryAddressInformation> getAddressInfo(String membershipId) {
        return deliveryAddressRepository.findAllByMembershipId(membershipId);
    }

    public DeliveryAddressInformation getDeliveryAddressInfo(String membershipId) {
        return deliveryAddressRepository.findByMembershipId(membershipId);
    }

    public DeliveryAddressInformation getAddressInformationById(Long id) {
        return deliveryAddressRepository.findById(id).orElse(null);
    }

    public DeliveryAddressInformation updateAddressInformation(Long id, DeliveryAddressInformation deliveryAddressInformation) {
        DeliveryAddressInformation existingAddress = deliveryAddressRepository.findById(id).orElse(null);

        if (existingAddress != null) {
            existingAddress.setHomeNumber(deliveryAddressInformation.getHomeNumber());
            existingAddress.setStreet(deliveryAddressInformation.getStreet());
            existingAddress.setCity(deliveryAddressInformation.getCity());
            existingAddress.setState(deliveryAddressInformation.getState());
//            existingAddress.setSetAsDefault(deliveryAddressInformation.getSetAsDefault());
            existingAddress.setCountry(deliveryAddressInformation.getCountry());
            existingAddress.setPinCode(deliveryAddressInformation.getPinCode());
            existingAddress.setSetAsDefault(!existingAddress.isSetAsDefault());
            return deliveryAddressRepository.save(existingAddress);
        }
        return null;
    }

    public void deleteAddressInformation(Long id) {
        deliveryAddressRepository.deleteById(id);
    }
}

