package com.test.test.Controller;

import com.test.test.Entity.Prescription;
import com.test.test.Entity.Medication;
import com.test.test.Repository.PrescriptionRepository;
import com.test.test.Repository.MedicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;


@RestController
@RequestMapping("/api/auth")
public class PrescriptionController {

    @Autowired
    private PrescriptionRepository prescriptionRepository;

    @Autowired
    private MedicationRepository medicationRepository;

    @PostMapping("/getPrescriptions")
    public ResponseEntity<List<Prescription>> getPrescriptions(@RequestBody String membershipId) {

        if ( membershipId == null ) return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        List<Prescription> prescriptions = prescriptionRepository.findByMembershipId(membershipId);

        int start = 0, end = prescriptions.size() - 1;

        while( start < end ) {
            if ( ( prescriptions.get(start) ).getEndDate() == null ) {
                Prescription temp = prescriptions.get(end);
                prescriptions.set(end, prescriptions.get(start));
                prescriptions.set(start, temp);
                end--;
            }
            start++;
        }

        System.out.println(prescriptions);
        return new ResponseEntity<>(prescriptions, HttpStatus.OK);
    }

    @PostMapping("/addPrescription")
    public ResponseEntity<?> addPrescription(@RequestBody Prescription prescription) {
        if (prescription == null) {
            return new ResponseEntity<>("Invalid prescription data", HttpStatus.BAD_REQUEST);
        }

        // Ensure medications are linked before saving
        if (prescription.getMedications() != null) {
            for (Medication medication : prescription.getMedications()) {
                medication.setPrescription(prescription);
            }
        }

        // Save prescription (Cascade will handle medications)
        Prescription savedPrescription = prescriptionRepository.save(prescription);

        return new ResponseEntity<>(savedPrescription, HttpStatus.CREATED);
    }


    @PostMapping("/endPrescription")
    public ResponseEntity<String> endPrescription(@RequestBody String stringID) {
        Prescription prescription = (prescriptionRepository.findById(Long.parseLong(stringID))).orElse(null);
        if ( prescription != null ) {
            prescription.setEndDate(LocalDate.now());
            prescriptionRepository.save(prescription);
            return new ResponseEntity<>(null, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
}
