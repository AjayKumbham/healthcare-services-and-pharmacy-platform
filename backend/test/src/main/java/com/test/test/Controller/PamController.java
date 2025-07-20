package com.test.test.Controller;

import com.test.test.Entity.DrugData;
import com.test.test.Repository.DrugDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class PamController {

    private final DrugDataRepository drugDataRepository;

    @Autowired
    public PamController(DrugDataRepository drugDataRepository) {
        this.drugDataRepository = drugDataRepository;
    }

    // Endpoint to get all drug data
    @GetMapping("/pam/inventory")
    public ResponseEntity<List<DrugData>> getAllDrugs() {
        List<DrugData> allDrugs = drugDataRepository.findAll();
        return ResponseEntity.ok(allDrugs);
    }
}