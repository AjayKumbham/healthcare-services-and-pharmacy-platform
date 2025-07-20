package com.test.test.Controller;

import com.test.test.DTO.PharmaStoreResponse;
import com.test.test.Entity.PharmaMedInventory;
import com.test.test.Entity.PharmaStores;
import com.test.test.Repository.PharmaMedInventoryRepository;
import com.test.test.Repository.PharmaStoresRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class PharmaStoresController {

    @Autowired
    private PharmaStoresRepository pharmaStoresRepository;

    @Autowired
    private PharmaMedInventoryRepository pharmaMedInventoryRepository;

    @GetMapping("/stores/all")
    public List<PharmaStores> getAllStores() {
        return pharmaStoresRepository.findAll();
    }

//    @PostMapping("/update")
//    public ResponseEntity<String> updatePharmaStore(@RequestBody PharmaUpdateRequest updateRequest) {
//        // Find UserDetails by userId
//        Optional<UserDetails> userDetailsOptional = userDetailsRepository.findById(updateRequest.getUserId());
//        if (userDetailsOptional.isEmpty()) {
//            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
//        }
//
//        // Find PharmaStores by userId
//        Optional<PharmaStores> pharmaStoresOptional = pharmaStoresRepository.findByUserId(updateRequest.getUserId());
//        if (pharmaStoresOptional.isEmpty()) {
//            return new ResponseEntity<>("PharmaStore not found", HttpStatus.NOT_FOUND);
//        }
//
//        UserDetails userDetails = userDetailsOptional.get();
//        PharmaStores pharmaStores = pharmaStoresOptional.get();
//
//        // Update UserDetails
//        userDetails.setUsername(updateRequest.getName());
//        userDetails.setEmail(updateRequest.getEmail());
//        userDetailsRepository.save(userDetails);
//
//        // Update PharmaStores
//        pharmaStores.setAddress(updateRequest.getAddress());
//        pharmaStores.setContact(updateRequest.getContact());
//        pharmaStores.setSd(updateRequest.getSd());
//        pharmaStores.setHd(updateRequest.getHd());
//        pharmaStoresRepository.save(pharmaStores);
//
//        return new ResponseEntity<>("Update successful", HttpStatus.OK);
//    }

    // New Endpoint to return a list of PharmaStores
//    @GetMapping("/stores")
//    public ResponseEntity<List<PharmaStoreResponse>> getAllPharmaStores() {
//        List<PharmaStores> pharmaStoresList = pharmaStoresRepository.findAll(); // Fetch all PharmaStores
//        if (pharmaStoresList.isEmpty()) {
//            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // No stores found
//        }
//
//        List<PharmaStoreResponse> responseList = new ArrayList<>();
//        for (PharmaStores pharmaStore : pharmaStoresList) {
//            // Fetch associated UserDetails
//            Optional<UserDetails> userDetailsOptional = userDetailsRepository.findByUserId(pharmaStore.getUserId());
//            if (userDetailsOptional.isPresent()) {
//                UserDetails userDetails = userDetailsOptional.get();
//                String username = userDetails.getUsername(); // Fetch username
//                Integer userId = userDetails.getUserId(); // Fetch userId
//
//                // Create and add response object
//                responseList.add(new PharmaStoreResponse(pharmaStore, username, userId));
//            } else {
//                // If the user is not found, add a response with "Unknown User" and null userId
//                responseList.add(new PharmaStoreResponse(pharmaStore, "Unknown User", null));
//            }
//        }
//
//        return new ResponseEntity<>(responseList, HttpStatus.OK); // Return the list of pharmacies with usernames and
//                                                                  // userIds
//    }

    @PostMapping("/storeinventory")
    public ResponseEntity<List<StoreInventoryResponse>> getStoreInventory(@RequestBody StoreInventoryRequest request) {
        // Fetch list of PharmaMedInventory based on phId
        List<PharmaMedInventory> inventoryList = pharmaMedInventoryRepository.findByPhId(request.getPhId());

        if (inventoryList.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        // Convert PharmaMedInventory to StoreInventoryResponse
        List<StoreInventoryResponse> responseList = inventoryList.stream()
                .map(inventory -> new StoreInventoryResponse(
                        inventory.getPhId(),
                        inventory.getDrugData().getmId(),
                        inventory.getDrugData().getMedName(),
                        inventory.getQuantity(),
                        inventory.getDrugData().getDrugType().name(), // Convert Enum to String
                        inventory.getDrugData().getBrandName()))
                .toList();

        return new ResponseEntity<>(responseList, HttpStatus.OK);
    }

    // DTO to accept the request for inventory
    public static class StoreInventoryRequest {
        private Integer phId;

        // Getters and Setters
        public Integer getPhId() {
            return phId;
        }

        public void setPhId(Integer phId) {
            this.phId = phId;
        }
    }

    // DTO for the response
    public static class StoreInventoryResponse {
        private Integer phId;
        private Integer mId;
        private String medName;
        private Integer quantity;
        private String drugType;
        private String brandName;

        public StoreInventoryResponse(Integer phId, Integer mId, String medName, Integer quantity, String drugType,
                String brandName) {
            this.phId = phId;
            this.mId = mId;
            this.medName = medName;
            this.quantity = quantity;
            this.drugType = drugType;
            this.brandName = brandName;
        }

        // Getters and Setters
        public Integer getPhId() {
            return phId;
        }

        public void setPhId(Integer phId) {
            this.phId = phId;
        }

        public Integer getmId() {
            return mId;
        }

        public void setmId(Integer mId) {
            this.mId = mId;
        }

        public String getMedName() {
            return medName;
        }

        public void setMedName(String medName) {
            this.medName = medName;
        }

        public Integer getQuantity() {
            return quantity;
        }

        public void setQuantity(Integer quantity) {
            this.quantity = quantity;
        }

        public String getBrandName() {
            return brandName;
        }

        public void setBrandName(String brandName) {
            this.brandName = brandName;
        }

        public String getDrugType() {
            return drugType;
        }

        public void setDrugType(String drugType) {
            this.drugType = drugType;
        }
    }

}