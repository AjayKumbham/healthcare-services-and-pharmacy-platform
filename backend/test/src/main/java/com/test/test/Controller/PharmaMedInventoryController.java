package com.test.test.Controller;

import com.test.test.Entity.DrugData;
import com.test.test.Entity.PharmaMedInventory;
import com.test.test.Repository.DrugDataRepository;
import com.test.test.Repository.PharmaMedInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/auth")
public class PharmaMedInventoryController {  

    @Autowired  
    private PharmaMedInventoryRepository pharmaMedInventoryRepository;

    @GetMapping("/inventory") // Endpoint to retrieve inventory  
    public ResponseEntity<List<InventoryResponse>> getInventory() {  
        List<PharmaMedInventory> inventoryList = pharmaMedInventoryRepository.findAll();
        
        // Transforming PharmaMedInventory to InventoryResponse  
        List<InventoryResponse> responseList = inventoryList.stream()  
            .map(item -> new InventoryResponse(item.getPhId(), item.getDrugData().getmId(), item.getPricePerPill()))  
            .collect(Collectors.toList());  

        return ResponseEntity.ok(responseList);  
    }  

    // Inner Class to define response structure  
    private static class InventoryResponse {  
        private Integer phId;  
        private Integer mId; // Assuming `mId` corresponds to the `id` of DrugData  
        private Double pricePerPill;  

        public InventoryResponse(Integer phId, Integer mId, Double pricePerPill) {  
            this.phId = phId;  
            this.mId = mId;  
            this.pricePerPill = pricePerPill;  
        }  

        public Integer getPhId() {  
            return phId;  
        }  

        public Integer getMId() {  
            return mId;  
        }  

        public Double getPricePerPill() {  
            return pricePerPill;  
        }  
    }

    @Autowired
    private DrugDataRepository drugDataRepository;

    @GetMapping("/all")
    public List<DrugData> getAllDrugs() {
        return drugDataRepository.findAll();
    }

    @GetMapping("/inventory/all")
    public List<PharmaMedInventory> getAllInventory() {
        return pharmaMedInventoryRepository.findAll();
    }
}