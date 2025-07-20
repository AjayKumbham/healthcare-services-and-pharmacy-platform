package com.test.test.Service;

import com.test.test.Entity.DeliveryAddressInformation;
import com.test.test.Entity.DependentInformation;
import com.test.test.Repository.DependentInformationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DependentInformationService {

    @Autowired
    private DependentInformationRepository dependentInformationRepository;

    public DependentInformation saveDependentInformation(DependentInformation dependentInformation) {
        return dependentInformationRepository.save(dependentInformation);
    }

    public List<DependentInformation> getDependentInfo(String membershipId) {
        return dependentInformationRepository.findAllByMembershipId(membershipId);
    }

    public DependentInformation getDependentInformationById(Long id) {
        return dependentInformationRepository.findById(id).orElse(null);
    }

    public DependentInformation updateDependentInformation(Long id, DependentInformation dependentInformation) {
        DependentInformation existingDependent = dependentInformationRepository.findById(id).orElse(null);

        if (existingDependent != null) {
            existingDependent.setName(dependentInformation.getName());
            existingDependent.setRelationship(dependentInformation.getRelationship());
            existingDependent.setAllergies(dependentInformation.getAllergies());
            existingDependent.setAge(dependentInformation.getAge());
            existingDependent.setGender(dependentInformation.getGender());
            existingDependent.setCurrentMedications(dependentInformation.getCurrentMedications());
            existingDependent.setHealthConditions(dependentInformation.getHealthConditions());

            return dependentInformationRepository.save(existingDependent);
        }
        return null;
    }

    public void deleteDependentInformation(Long id) {
        dependentInformationRepository.deleteById(id);
    }
}
